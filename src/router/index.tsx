import { Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login/Login";
import Layout from "../layout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
