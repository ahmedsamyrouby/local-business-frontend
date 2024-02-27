import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/User.context";

export default function ProtectedRoute({ children }) {
  const user = useContext(UserContext);
  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
}
