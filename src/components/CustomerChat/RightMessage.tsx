import dayjs from "dayjs";

const RightMessage = ({ message, time }: { message: string; time: string }) => {
  return (
    <div className="flex flex-col items-end my-1">
      <div className="bg-primary text-white p-2 rounded-md max-w-3/4">
        <p className="text-sm">{message}</p>
        <div className="text-xs text-black/50 mt-1">
          {dayjs(time).format("h:mm A")}
        </div>
      </div>
    </div>
  );
};

export default RightMessage;
