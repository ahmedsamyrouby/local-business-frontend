import { Navigate, Outlet } from "react-router-dom";
import { userRoles } from "../defines";

const PrivateRoute = ({ roles }: { roles: userRoles[] }) => {
  const isAuthenticated = !!localStorage.getItem("userToken");
  const userRole: userRoles = localStorage.getItem("role") as userRoles;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(userRole) === -1) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
