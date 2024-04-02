import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex-center min-h-screen overflow-x-hidden bg-gray-900 md:bg-dark md:p-8">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
