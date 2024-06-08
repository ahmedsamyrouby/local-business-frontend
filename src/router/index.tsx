import { Routes, Route, useNavigate } from "react-router-dom";
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
import CustomerLayout from "../layout/CustomerLayout";
import OwnerLayout from "../layout/ownerLayout";
import Requests from "../pages/OwnerProfile/Request";
import Favorites from "../pages/Favourites/Favorites";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/Error/NotFound";
import UnAuthorized from "../pages/Error/UnAuthorized";
import BusinessChat from "./../pages/BusinessChat/BusinessChat";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute roles={["businessOwner"]} />}>
        <Route path="/" element={<OwnerLayout />}>
          <Route path="/ownerprofile" element={<OwnerProfile />} />
          <Route path="/request" element={<Requests />} />
          <Route path="/chat" element={<BusinessChat />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/business-form" element={<BusinessForm />} />
        <Route path="/setupProfile" element={<SetupOwnerInfo />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>
      <Route element={<PrivateRoute roles={["customer"]} />}>
        <Route element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:id" element={<BusinessDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Route>
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
