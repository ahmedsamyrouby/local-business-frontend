import { ActionIcon, Button, Drawer, Menu } from "@mantine/core";
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
  IconUser,
} from "@tabler/icons-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../services/LocalStorageService";

const NavBar = () => {
  const [mobileNavOpened, { open, close }] = useDisclosure(false);
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
            <Button leftSection={<IconUser />} className="bg-white/20 text-md">
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
              onClick={logOut}
              color="red"
              leftSection={<IconLogout />}
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
          opened={mobileNavOpened}
          onClose={close}
          position={"right"}
        >
          <div className="flex flex-col gap-4 text-xl">
            <div className="mb-3">
              <Drawer.Title className="text-[1.5rem] font-semibold mb-2">
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
