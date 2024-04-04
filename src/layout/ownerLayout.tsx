import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-gray-900 md:bg-dark ">
        <Outlet />
      </div>
    </>
  );
};

export default OwnerLayout;
