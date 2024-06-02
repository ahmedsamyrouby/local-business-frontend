import dayjs from "dayjs";

const LeftMessage = ({ message, time }: { message: string; time: string }) => {
  return (
    <div className="flex flex-col items-start my-1">
      <div className="bg-gray-200 p-2 rounded-md max-w-3/4">
        <p className="text-sm">{message}</p>
        <div className="text-xs text-gray-500 mt-1">
          {dayjs(time).format("h:mm A")}
        </div>
      </div>
    </div>
  );
};

export default LeftMessage;
