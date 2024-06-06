import { Avatar, Divider } from "@mantine/core";
import dayjs from "dayjs";
import { getInitials } from "./../../utils/index";
import clsx from "clsx";

const ChatCard = ({
  customerName,
  lastMessage,
  onClick,
  time,
  isSelected,
}: {
  customerName: string;
  lastMessage: string;
  onClick?: () => void;
  time: string;
  isSelected?: boolean;
}) => {
  return (
    <>
      <div
        className={clsx(
          "p-4 flex gap-4 cursor-pointer rounded",
          isSelected ? "bg-primary/10" : "hover:bg-gray-100"
        )}
        onClick={onClick}
      >
        <Avatar color="black">{getInitials(customerName)}</Avatar>
        <div className="w-full flex-center justify-between">
          <div>
            <h1 className="font-semibold text-gray-900">{customerName}</h1>
            <p className="text-sm text-gray-700">{lastMessage}</p>
          </div>
          <div className="text-xs text-gray-500">
            {dayjs(time).format("h:mm A")}
          </div>
        </div>
      </div>
      <Divider className="border-t-white" />
    </>
  );
};

export default ChatCard;
