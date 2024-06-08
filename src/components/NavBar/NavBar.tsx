import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Drawer,
  Menu,
  Portal,
  Title,
  Image,
  rem,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import {
  IconHome,
  IconLogout,
  IconMail,
  IconMenu2,
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
import localLinkerLogo from "../../assets/local-linker-logo.svg";
import axiosInstance from "../../services/AxiosService";

const NavBar = () => {
  const [mobileNavOpened, { open, close }] = useDisclosure(false);
  const pinned = useHeadroom({ fixedAt: 140 });
  const location = useLocation();
  const navigate = useNavigate();
  const userData = {
    name: getLocalStorage("name"),
    email: getLocalStorage("email"),
    phone: getLocalStorage("phone"),
  };
  async function logOut() {
    const res = await axiosInstance.post("/auth/logout");
    console.log(res);
    if (res.status === 200) {
      removeLocalStorage("userToken");
      removeLocalStorage("userId");
      removeLocalStorage("role");
      removeLocalStorage("name");
      removeLocalStorage("email");
      removeLocalStorage("phone");
      navigate("/login");
    } else {
      console.log("Error logging out");
    }
  }

  return (
    <Portal>
      <nav
        className="bg-white border-b px-3 py-4 flex justify-between items-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000000,
          height: rem(70),
          transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
          transition: `transform ${pinned ? "110ms" : "300ms"} ease`,
        }}
      >
        <div>
          <Link to={"/"} className="text-xl font-bold flex-center gap-2">
            <div className="w-10 h-10">
              <Image
                className="w-full"
                src={localLinkerLogo}
                alt="Local Linker Logo"
              />
            </div>
            <Title order={3}>Local Linker</Title>
          </Link>
        </div>
        {/* DESKTOP NAV */}
        <div className="text-gray-900 hidden md:flex gap-4 items-center">
          <NavLink to={"/"} className={"h-max"}>
            Home
          </NavLink>
          <NavLink to={"/explore"}>Explore</NavLink>
          <Menu
            shadow="sm"
            width={200}
            classNames={{
              dropdown: "z-[99999999]",
            }}
            offset={{
              crossAxis: -50,
            }}
          >
            <Menu.Target>
              <Button
                leftSection={
                  <Avatar size={"sm"} color="black">
                    {userData.name ? getInitials(userData.name) : null}
                  </Avatar>
                }
                className="bg-white/20 text-gray-900 text-md"
              >
                {userData.name}
              </Button>
            </Menu.Target>

            <Menu.Dropdown className="w-[250px]">
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
    </Portal>
  );
};

export default NavBar;
