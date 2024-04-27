import { ActionIcon, Avatar, Button, Divider, Drawer, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBriefcase,
  IconHome,
  IconLogout,
  IconMail,
  IconMenu2,
  IconMessage,
  IconPhone,
  IconSearch,
  IconStar,
} from "@tabler/icons-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../services/LocalStorageService";
import { getInitials } from "../../utils";

const NavBar = () => {
  const [mobileNavOpened, { open, close }] = useDisclosure(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userData = {
    name: getLocalStorage("name"),
    email: getLocalStorage("email"),
    phone: getLocalStorage("phone"),
  };
  function logOut() {
    removeLocalStorage("userId");
    navigate("/login");
  }

  return (
    <nav className="bg-gray-450 px-3 py-4 flex justify-between items-center">
      <div>
        <Link to={"/"} className="text-xl font-bold text-gray-200 flex gap-2">
          <IconBriefcase size={26} />
          Local Businesses
        </Link>
      </div>
      {/* DESKTOP NAV */}
      <div className="text-white hidden md:flex gap-4 items-center">
        <NavLink to={"/"} className={"h-max"}>
          Home
        </NavLink>
        <NavLink to={"/explore"}>Explore</NavLink>
        <NavLink to={"/customer-chat"}>Chat</NavLink>
        <Menu
          shadow="sm"
          width={200}
          classNames={{
            dropdown: "z-[99999999]",
          }}
        >
          <Menu.Target>
            <Button
              leftSection={
                <Avatar size={"sm"} color="white">
                  {userData.name ? getInitials(userData.name) : null}
                </Avatar>
              }
              className="bg-white/20 text-md"
            >
              {userData.name}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item disabled>
              <div className="mb-4">
                <p className="text-black">
                  <span className="font-semibold">Email: </span> <br />
                  {userData.email}
                </p>
                <p className="text-black">
                  <span className="font-semibold">Phone Number: </span> <br />
                  {userData.phone}
                </p>
              </div>
            </Menu.Item>
            <Menu.Item
              color="black"
              onClick={() => navigate("/favorites")}
              leftSection={<IconStar size={18} />}
              className={
                location.pathname.includes("favorites")
                  ? "text-primary bg-primary/15"
                  : ""
              }
            >
              Favorites
            </Menu.Item>
            <Menu.Item
              onClick={logOut}
              color="red"
              leftSection={<IconLogout size={18} />}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      {/* MOBILE NAV */}
      <div className="md:hidden">
        <Drawer
          classNames={{
            inner: "z-[99999999]",
            content: "flex flex-col space-between",
            body: "flex flex-col justify-between h-full",
          }}
          size={"lg"}
          opened={mobileNavOpened}
          onClose={close}
          position={"right"}
        >
          <div className="flex flex-col gap-4 text-md">
            <div className="mb-3">
              <Drawer.Title className="text-lg font-semibold mb-2 p-3 flex gap-3 justify-center items-center bg-gray-100">
                <Avatar color="#99896B">
                  {userData.name ? getInitials(userData.name) : null}
                </Avatar>
                {userData.name}
              </Drawer.Title>
              <div className="flex flex-col gap justify-center">
                <div className="flex gap-1 items-center">
                  <IconMail size={18} /> {userData.email}
                </div>
                <div className="flex gap-1 items-center">
                  <IconPhone size={18} /> {userData.phone}
                </div>
              </div>
              <Divider className="my-3" />
            </div>
            <NavLink
              to={"/"}
              className={"flex gap-1 items-center"}
              onClick={close}
            >
              <IconHome /> Home
            </NavLink>
            <NavLink
              to={"/explore"}
              className={"flex gap-1 items-center"}
              onClick={close}
            >
              <IconSearch /> Explore
            </NavLink>
            <NavLink
              to={"/customer-chat"}
              className={"flex gap-1 items-center"}
              onClick={close}
            >
              <IconMessage /> Chat
            </NavLink>
            <NavLink
              to={"/favorites"}
              className={"flex gap-1 items-center"}
              onClick={close}
            >
              <IconStar /> Favorites
            </NavLink>
          </div>
          <div>
            <Button
              leftSection={<IconLogout />}
              className="bg-red-500 text-white w-full"
              size={"lg"}
            >
              Logout
            </Button>
          </div>
        </Drawer>
        <ActionIcon className="bg-transparent">
          <IconMenu2 onClick={open} size={24} className="text-primary" />
        </ActionIcon>
      </div>
    </nav>
  );
};

export default NavBar;
