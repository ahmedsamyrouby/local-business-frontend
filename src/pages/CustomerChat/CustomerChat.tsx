import { Avatar, Button, Input } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import ChatCard from "../../components/CustomerChat/ChatCard";
import LeftMessage from "../../components/CustomerChat/LeftMessage";
import RightMessage from "../../components/CustomerChat/RightMessage";
import { Link } from "react-router-dom";

const CustomerChat = () => {
  return (
    <div
      className="w-full bg-gray-900 px-4 relative"
      style={{
        minHeight: "calc(100vh - 67.75px)",
      }}
    >
      <div
        className="flex max-w-screen-xl mx-auto bg-blue-900"
        style={{
          minHeight: "calc(100vh - 67.75px)",
        }}
      >
        <div className="w-1/4 bg-gray-200 p-4">
          <Input placeholder="Search" rightSection={<IconSearch />} />
          <ul className="py-4">
            <li>
              <ChatCard />
              <ChatCard />
              <ChatCard />
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar color="#99896B" />
              <h1 className="text-xl font-semibold">Grocery Store</h1>
            </div>
            <div className="flex-center gap-1">
              <Link
                to="/explore/65f70d807a0881d4b47ea2cb"
                className="font-semibold"
              >
                Go to business
              </Link>
              <IconArrowRight size={18} />
            </div>
          </div>
          <div className="bg-white p-4 h-80 overflow-y-auto flex-grow">
            <LeftMessage message="Hello, Samy." isFirstMessage />
            <LeftMessage message="How are you?" isFirstMessage={false} />
            <RightMessage message="Hello" />
            <RightMessage message="I'm fine thanks." />
          </div>
          <div className="bg-gray-100 p-4">
            <div className="flex gap-2">
              <Input className="flex-grow" placeholder="Type a message" />
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerChat;
