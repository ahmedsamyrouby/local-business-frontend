import { Routes, Route } from "react-router-dom";
import Login from "../pages/Authentication/Login/Login";
import Layout from "../layout";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";
import OTP from "../pages/Authentication/OTP/OTP";
import ResetPassword from "../pages/Authentication/ResetPassword/ResetPassword";
import HomePage from "../pages/HomePage/HomePage";
import SignUp from "../pages/Authentication/SignUp/SignUp";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/homepage" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
