import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-gray-100 md:bg-white ">
        <Outlet />
      </div>
    </>
  );
};

export default OwnerLayout;
