import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/index";
import { DashboardContainer } from "./styles";

export default function Dashboard() {
  return (
    <DashboardContainer>
      <Sidebar />
      <main>
        <Outlet></Outlet>
      </main>
    </DashboardContainer>
  );
}
