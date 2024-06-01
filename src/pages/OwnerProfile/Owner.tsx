import { useMediaQuery } from "react-responsive";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Menu, Text, UnstyledButton } from "@mantine/core";
import { MdMenu } from "react-icons/md";
import { SiGooglemybusiness } from "react-icons/si";
// import { IoNotifications } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import OwnerInfo from "./OwnerInfo";
import OwnerBuisness from "./OwnerBuisness";
import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../services/LocalStorageService";

function OwnerProfile() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });
  const isSmall = useMediaQuery({ query: "(min-width: 484px)" });
  const isIpadHeight = useMediaQuery({ query: "(min-height: 1180px)" });
  const isIphoneHeight = useMediaQuery({ query: "(min-height: 844px)" });
  function logOut() {
    removeLocalStorage("userId");
    navigate("/login");
  }

  return (
    <>
      <Drawer
        size={isSmall ? 450 : 312}
        classNames={{ body: "p-0 h-full" }}
        offset={10}
        lockScroll={false}
        removeScrollProps={{ removeScrollBar: true }}
        radius="lg"
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        withCloseButton={false}
      >
        <OwnerInfo
          isSmall={isSmall}
          isIpadHeight={isIpadHeight}
          isIphoneHeight={isIphoneHeight}
        />
      </Drawer>

      <div className="flex flex-col gap-y-7">
        {" "}
        <nav
          className="flex justify-between w-full p-2 md:px-10 bg-gradient-to-r from-primary to-bg-white"
          // style={{
          //   background: " linear-gradient(to right, #584D3A , #d1d5db)",
          // }}
        >
          <div className="flex md:gap-x-4 gap-x-1">
            <SiGooglemybusiness className="text-white h-8 w-8" />
            <Text className="text-white font-serif font-bold text-base pt-1 pl-1">
              Local Business
            </Text>
          </div>
          <div className="flex md:gap-x-8 gap-x-2">
            <AiFillMessage
              className="hover:opacity-80 h-8 w-8 text-gray-400"
              onClick={() => {
                navigate("/chat");
              }}
              // style={{ color: "#584D3A" }}
            />

            <Menu
              withArrow
              position="bottom-end"
              shadow="md"
              width={200}
              transitionProps={{
                transition: "scale",
                duration: 150,
              }}
            >
              <Menu.Target>
                <UnstyledButton className="hover:opacity-80">
                  <IoSettings
                    className=" h-8 w-8 text-gray-400"
                    // style={{ color: "#584D3A" }}
                  />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  onClick={() => navigate("/changePassword")}
                  leftSection={<CgArrowsExchangeAlt />}
                >
                  Change Password
                </Menu.Item>
                <Menu.Item
                  onClick={() => navigate("/setupProfile")}
                  leftSection={<MdEdit />}
                >
                  Setup profile{" "}
                </Menu.Item>
                <Menu.Item
                  onClick={() => logOut()}
                  leftSection={<RxExit />}
                  className="text-red-600"
                >
                  Log Out{" "}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </nav>
        <div
          className={
            isIpadHeight
              ? "flex w-screen px-10 "
              : isIphoneHeight
              ? "flex w-full h-screen px-3 "
              : "flex justify-center lg:gap-24 w-screen px-2 "
          }
          style={{ height: "39.39rem" }}
        >
          {isLarge ? (
            <OwnerInfo
              isSmall={isSmall}
              isIpadHeight={isIpadHeight}
              isIphoneHeight={isIphoneHeight}
            />
          ) : null}
          <div
            className="bg-gray-100 rounded-lg"
            style={{
              height: isIpadHeight
                ? "55rem"
                : isIphoneHeight
                ? "100%"
                : "39.39rem",
              width: "55rem",
            }}
          >
            {!isLarge && (
              <Button
                className={
                  isIpadHeight
                    ? "bg-gray-900 mt-5"
                    : isIphoneHeight
                    ? "bg-gray-900 mt-3 pl-1"
                    : "bg-gray-900 pr-4 pl-2"
                }
                onClick={open}
              >
                <MdMenu
                  className={
                    isIpadHeight
                      ? "w-14 h-14 hover:opacity-80"
                      : isIphoneHeight
                      ? "w-12 h-12 hover:opacity-80"
                      : "w-8 h-8 hover:opacity-80"
                  }
                />
              </Button>
            )}
            <OwnerBuisness
              isIpadHeight={isIpadHeight}
              isIphoneHeight={isIphoneHeight}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default OwnerProfile;
