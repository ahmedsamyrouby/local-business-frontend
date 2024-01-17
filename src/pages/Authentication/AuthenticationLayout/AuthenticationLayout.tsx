import { Image } from "@mantine/core";
import loginArt from "../../../assets/images/login-art.jpg";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-900 flex flex-col h-screen md:overflow-hidden md:h-auto md:flex-row md:rounded-lg md:max-w-[900px]">
      <div className="w-screen md:w-[45%]">
        <Image className="w-full h-full object-cover" src={loginArt} />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 text-center py-8 px-6 md:w-[55%] md:gap-8 md:py-14 md:px-12">
        {children}
      </div>
    </div>
  );
};
export default AuthenticationLayout;
