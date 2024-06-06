import { Button, Input } from "@mantine/core";
import LeftMessage from "../../components/Chat/LeftMessage";
import RightMessage from "../../components/Chat/RightMessage";
import { useEffect, useRef, useState, useMemo } from "react";
import { notifications } from "@mantine/notifications";
import { IconAlertSquare } from "@tabler/icons-react";
import dayjs from "dayjs";
import axiosInstance from "../../services/AxiosService";

export interface ChatMessage {
  businessId: string;
  customerId: string;
  sender: "businessOwner" | "customer";
  content: string;
  timestamp: string;
  userName: string;
  _id: string;
}

interface CustomerChatProps {
  customerId: string;
  businessId: string;
}

const CustomerChat = ({ customerId, businessId }: CustomerChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    try {
      setIsSending(true);
      const res = await axiosInstance.post(
        `/customer/sendMessageToBusinessOwner/${customerId}/${businessId}`,
        {
          message: message,
        }
      );
      scrollToBottom();
    } catch (error) {
      notifications.show({
        message: "Error sending message",
        autoClose: 2000,
        icon: <IconAlertSquare />,
        classNames: {
          icon: "bg-transparent text-red-500",
        },
      });
    } finally {
      setIsSending(false);
    }
    setMessage("");
    getAllMessages();
  };

  const getAllMessages = async () => {
    const res = await axiosInstance.get(
      `/customer/getAllMessages/${customerId}/${businessId}`
    );
    if (JSON.stringify(res.data.messages) !== JSON.stringify(messages)) {
      setMessages(res.data.messages);
    }
  };

  const isFirstMessage = (index: number) => {
    if (index === 0) return true;
    const currTime = dayjs(messages[index].timestamp);
    const prevTime = dayjs(messages[index - 1].timestamp);
    return currTime.diff(prevTime, "minute") > 20;
  };

  const memoizedMessages = useMemo(() => {
    return messages.map((message, index) => {
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
          {message.sender === "businessOwner" ? (
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
    });
  }, [messages]);

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllMessages();
    }, 3000); // Changed to 3000 to reduce frequency and avoid too many requests
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex mx-auto bg-gray-100 h-[650px]">
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-100/20 p-4 h-80 overflow-y-auto hide-scrollbar flex-grow">
          {memoizedMessages}
          <div ref={chatEndRef} />
        </div>
        <div className="bg-gray-200/10 p-4">
          <div className="flex gap-2">
            <Input
              className="flex-grow"
              placeholder="Type a message"
              value={message}
              onChange={(event) => setMessage(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button onClick={sendMessage} loading={isSending}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerChat;
