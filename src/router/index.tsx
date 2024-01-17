import { Routes, Route } from "react-router-dom";
import Login from "../pages/Authentication/Login/Login";
import Layout from "../layout";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}
