import { Routes, Route } from "react-router-dom";
import Login from "../pages/Authentication/Login/Login";
import AuthLayout from "../layout/AuthLayout";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";
import OTP from "../pages/Authentication/OTP/OTP";
import ResetPassword from "../pages/Authentication/ResetPassword/ResetPassword";
import HomePage from "../pages/HomePage/HomePage";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import BusinessForm from "../pages/Authentication/SignUp/BusinessForm";
import OwnerProfile from "../pages/OwnerProfile/Owner";
import SetupOwnerInfo from "../pages/SetupProfile/SetUpOwnerInfo";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Explore from "../pages/Explore/Explore";
import BusinessDetails from "../pages/BusinessDetails/BusinessDetails";
import Layout from "../layout/Layout";
import CustomerChat from "../pages/CustomerChat/CustomerChat";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/business-form" element={<BusinessForm />} />
        <Route path="/ownerprofile" element={<OwnerProfile />} />
        <Route path="/setupProfile" element={<SetupOwnerInfo />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<BusinessDetails />} />
        <Route path="/customer-chat" element={<CustomerChat />} />
      </Route>
    </Routes>
  );
}
