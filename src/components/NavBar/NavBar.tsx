import { ActionIcon, Button, Drawer, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBriefcase,
  IconHome,
  IconLogout,
  IconMenu,
  IconMessage,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [mobileNavOpened, { open, close }] = useDisclosure(false);
  return (
    <nav className="bg-primary px-3 py-4 flex justify-between items-center">
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
              User's Name
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item color="red" leftSection={<IconLogout />}>
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
            <Drawer.Title className="text-[1.5rem] font-semibold mb-3">
              User's Name
            </Drawer.Title>
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
        <ActionIcon>
          <IconMenu onClick={open} size={24} />
        </ActionIcon>
      </div>
    </nav>
  );
};

export default NavBar;
