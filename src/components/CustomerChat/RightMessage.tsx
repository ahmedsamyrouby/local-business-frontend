const RightMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex gap-4 justify-end pb-0.5">
      <div className="bg-primary text-white p-2 rounded">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default RightMessage;
