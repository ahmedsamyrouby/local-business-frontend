import { Avatar } from "@mantine/core";

const ChatCard = () => {
  return (
    <div className="flex mb-1 items-center space-x-4 cursor-pointer rounded-sm p-2 hover:bg-black/5">
      <Avatar color="#99896B" />
      <div>
        <h1 className="font-semibold text-white">Grocery Store</h1>
        <p className="text-sm text-white/80">I'm fine thanks.</p>
      </div>
    </div>
  );
};

export default ChatCard;