import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-light-gray">
      <Outlet />
    </div>
  );
};

export default Layout;