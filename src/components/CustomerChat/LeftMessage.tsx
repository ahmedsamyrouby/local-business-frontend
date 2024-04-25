import { Avatar } from "@mantine/core";

const LeftMessage = ({
  message,
  isFirstMessage,
}: {
  message: string;
  isFirstMessage: boolean;
}) => {
  return (
    <div className="flex gap-4 pb-0.5">
      {isFirstMessage && <Avatar color="#99896B" />}
      {!isFirstMessage && (
        <div
          style={{
            width: "38px",
          }}
        />
      )}
      <div className="bg-gray-100 p-2 rounded">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LeftMessage;
