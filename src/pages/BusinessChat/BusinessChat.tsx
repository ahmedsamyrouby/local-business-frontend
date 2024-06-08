import {
  Avatar,
  Button,
  Input,
  Menu,
  Title,
  Image,
  UnstyledButton,
  Divider,
} from "@mantine/core";
import ChatCard from "../../components/Chat/ChatCard";
import LeftMessage from "../../components/Chat/LeftMessage";
import RightMessage from "../../components/Chat/RightMessage";
import { IconSearch } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import localLinkerLogo from "../../assets/local-linker-logo.svg";
import { IoSettings } from "react-icons/io5";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { removeLocalStorage } from "../../services/LocalStorageService";
import axiosInstance from "../../services/AxiosService";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../CustomerChat/CustomerChat";
import dayjs from "dayjs";
import { getInitials } from "../../utils";

const BusinessChat = () => {
  const [chats, setChats] = useState<
    {
      customerId: string;
      lastMessage: {
        content: string;
        timestamp: string;
        userName: string;
      };
    }[]
  >([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("" as any);
  const [activeChat, setActiveChat] = useState("" as any);
  const navigate = useNavigate();
  const location = useLocation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  async function logOut() {
    const res = await axiosInstance.post("/auth/logout");
    console.log(res);
    if (res.status === 200) {
      removeLocalStorage("userToken");
      removeLocalStorage("userId");
      removeLocalStorage("role");
      removeLocalStorage("name");
      removeLocalStorage("email");
      removeLocalStorage("phone");
      navigate("/login");
    } else {
      console.log("Error logging out");
    }
  }

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView();
  };

  const getAllUserBusinesses = async () => {
    try {
      const res = await axiosInstance.get(
        "/businessOwner/getCustomerMessages/" + location.state.id
      );

      setChats(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllMessages = async () => {
    try {
      const res = await axiosInstance.get(
        `/customer/getAllMessages/${activeChat}/${location.state.id}`
      );
      setMessages(res.data.messages);
      console.log(res.data.messages);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axiosInstance.post(
        `/businessOwner/sendMessageToCustomer/${location.state.id}/${activeChat}`,
        {
          message: message,
        }
      );
      scrollToBottom();
      getAllMessages();
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const filterChatByCustomerName = (customerName: string) => {
    return chats.filter((chat) =>
      chat.lastMessage.userName
        .toLowerCase()
        .includes(customerName.toLowerCase())
    );
  };

  const isFirstMessage = (index: number) => {
    if (index === 0) return true;
    const currTime = dayjs(messages[index].timestamp);
    const prevTime = dayjs(messages[index - 1].timestamp);
    return currTime.diff(prevTime, "minute") > 20;
  };

  useEffect(() => {
    getAllUserBusinesses();
  }, []);

  useEffect(() => {
    if (activeChat) {
      getAllMessages();
    }
  }, [activeChat]);

  // add interval to get new messages every 0.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeChat) {
        getAllMessages();
      }
    }, 300);

    return () => clearInterval(interval);
  }, [activeChat]);

  return (
    <>
      <nav className="flex justify-between w-full px-2 py-4 border-b gap-5">
        <div className="w-full flex-center justify-between">
          <Link
            to={"/ownerprofile"}
            className="text-xl font-bold flex-center gap-2"
          >
            <div className="w-10 h-10">
              <Image
                className="w-full"
                src={localLinkerLogo}
                alt="Local Linker Logo"
              />
            </div>
            <Title order={3}>Local Linker</Title>
          </Link>
        </div>
        <div className="flex md:gap-x-8 gap-x-2">
          <Menu
            withArrow
            position="bottom-end"
            shadow="md"
            width={200}
            transitionProps={{
              transition: "scale",
              duration: 150,
            }}
          >
            <Menu.Target>
              <UnstyledButton className="hover:opacity-80">
                <IoSettings
                  className=" h-8 w-8 text-gray-400"
                  // style={{ color: "#584D3A" }}
                />
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                onClick={() => navigate("/changePassword")}
                leftSection={<CgArrowsExchangeAlt />}
              >
                Change Password
              </Menu.Item>
              <Menu.Item
                onClick={() => navigate("/setupProfile")}
                leftSection={<MdEdit />}
              >
                Setup profile{" "}
              </Menu.Item>
              <Menu.Item
                onClick={() => logOut()}
                leftSection={<RxExit />}
                className="text-red-600"
              >
                Log Out{" "}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </nav>
      <div
        className="w-full bg-gray-white px-4 relative"
        style={{
          minHeight: "calc(100vh - 67.75px)",
        }}
      >
        <div
          className="flex max-w-screen-xl mx-auto bg-gray-100"
          style={{
            minHeight: "calc(100vh - 67.75px)",
          }}
        >
          <div className="w-1/4 bg-gray-100 p-4">
            <Title order={4} className="text-center">
              {location.state.businessName ?? "Chats"}
            </Title>
            <Divider className="my-4" />
            <div className="flex flex-col gap-2">
              {chats.map((chat) => (
                <ChatCard
                  key={chat.customerId}
                  customerName={chat.lastMessage.userName}
                  lastMessage={chat.lastMessage.content}
                  time={chat.lastMessage.timestamp}
                  onClick={setActiveChat.bind(this, chat.customerId)}
                  isSelected={activeChat === chat.customerId}
                />
              ))}
            </div>
          </div>
          {!activeChat ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Select a chat to start messaging
              </h1>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar color="black">
                    {getInitials(
                      chats.find((chat) => chat.customerId === activeChat)
                        ?.lastMessage.userName as string
                    )}
                  </Avatar>
                  <h1 className="text-xl font-semibold text-black">
                    {
                      chats.find((chat) => chat.customerId === activeChat)
                        ?.lastMessage.userName
                    }
                  </h1>
                </div>
              </div>
              <div className="bg-gray-100/20 p-4 h-80 overflow-y-auto hide-scrollbar flex-grow">
                {messages.map((message: ChatMessage, index: number) => {
                  const isFirst = isFirstMessage(index);
                  const formattedTimestamp = dayjs(message.timestamp).format(
                    "MMM D, YYYY h:mm A"
                  );

                  return (
                    <div key={message._id}>
                      {isFirst && (
                        <div className="text-xs text-gray-500 self-center mb-2 flex-center">
                          {formattedTimestamp}
                        </div>
                      )}
                      {message.sender === "customer" ? (
                        <LeftMessage
                          key={message._id}
                          message={message.content}
                          time={formattedTimestamp}
                        />
                      ) : (
                        <RightMessage
                          key={message._id}
                          message={message.content}
                          time={formattedTimestamp}
                        />
                      )}
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
              <div className="bg-gray-900 p-4">
                <div className="flex gap-2">
                  <Input
                    className="flex-grow"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BusinessChat;
