import { NavLink } from "react-router-dom";
import UserIcon from "../Icons/UserIcon";
import RequestIcon from "../Icons/RequestIcon";
import profileImage from "../../assets/profile.png";
import { SidebarContainer, UserSwitcher } from "./styles";
export default function Sidebar() {
  return (
    <>
      <SidebarContainer>
        <ul>
          <li>
            <NavLink to="/Dashboard/customers">
              <UserIcon fill={"black"} />
              Customers
            </NavLink>
          </li>

          <li>
            <NavLink to="/Dashboard/requests">
              <RequestIcon fill={"black"} />
              Requests
            </NavLink>
          </li>
        </ul>

        <UserSwitcher>
          <img src={profileImage} alt="User Name Profile Image" />

          <div className="info">
            <span className="name">Evano</span>
            <span className="title">Project Manager</span>
          </div>

          <div className="arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </UserSwitcher>
      </SidebarContainer>
    </>
  );
}
