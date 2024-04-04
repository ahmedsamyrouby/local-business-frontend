import { Title, ScrollArea, Input } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import "./index.css";

function Chat() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-7/12 h-screen bg-black rounded-l-lg">
        <svg
          width="25"
          height="25"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white mt-4 ml-4 cursor-pointer hover:opacity-80"
          onClick={() => navigate("/ownerprofile")}
        >
          <path
            d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        <Title className="text-center text-white m-4">Chats</Title>
        <ScrollArea className="w-full h-full">
          <div className="flex flex-col gap-y-0.5 m-1">
            {" "}
            <div className="w-full p-1 hover:opacity-80 cursor-pointer bg-primary rounded-lg">
              <ul className="p-4 ">
                {" "}
                <li style={{ color: "#5c4f4faf" }}>
                  <Title className="flex justify-between text-xl">
                    Mohand{" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Title>
                </li>
                <li style={{ color: "#FFFEFA" }}>
                  "I have an provlem in my house electricty"
                </li>
              </ul>
            </div>{" "}
            <div className="w-full p-1 hover:opacity-80 cursor-pointer bg-primary rounded-lg">
              <ul className="p-4 ">
                {" "}
                <li style={{ color: "#5c4f4faf" }}>
                  <Title className="flex justify-between text-xl">
                    Hossam{" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Title>
                </li>
                <li style={{ color: "#FFFEFA" }}>
                  "I have an provlem in my house electricty"
                </li>
              </ul>
            </div>{" "}
            <div className="w-full p-1 hover:opacity-80 cursor-pointer bg-primary rounded-lg">
              <ul className="p-4 ">
                {" "}
                <li style={{ color: "#5c4f4faf" }}>
                  <Title className="flex justify-between text-xl">
                    Ahmed samy{" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Title>
                </li>
                <li style={{ color: "#FFFEFA" }}>
                  "I have an provlem in my house electricty"
                </li>
              </ul>
            </div>{" "}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col justify-end items-center backGround w-full h-screen  ">
        <div className="flex w-full ml-10">
          {" "}
          <Input placeholder="Type..." className="w-10/12 m-5"></Input>
          <IoSend className="text-primary w-9 h-9 mt-5" />
        </div>
      </div>
    </div>
  );
}
export default Chat;
