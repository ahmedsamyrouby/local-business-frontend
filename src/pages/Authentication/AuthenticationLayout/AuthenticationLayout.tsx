import { Title } from "@mantine/core";
import Logo from "../../../assets/logo";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 flex flex-col h-screen md:overflow-hidden md:h-auto md:flex-row md:rounded-lg md:max-w-[900px] border shadow">
      <div className="w-screen md:w-[45%] flex-center flex-col ps-10 py-16">
        <Logo color="#15AABF" />
        <Title className="text-primary">Local Linker</Title>
      </div>
      <div className="flex flex-col justify-center items-center grow gap-4 text-center py-8 px-6 md:w-[55%] md:gap-8 md:py-14 md:px-12">
        {children}
      </div>
    </div>
  );
};
export default AuthenticationLayout;
