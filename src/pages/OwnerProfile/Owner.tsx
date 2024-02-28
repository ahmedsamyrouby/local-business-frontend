import { useMediaQuery } from "react-responsive";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import { MdMenu } from "react-icons/md";
import OwnerInfo from "./OwnerInfo";

import OwnerBuisness from "./OwnerBuisness";

function OwnerProfile() {
  const [opened, { open, close }] = useDisclosure(false);
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });
  const isSmall = useMediaQuery({ query: "(min-width: 484px)" });
  const isIpadHeight = useMediaQuery({ query: "(min-height: 1180px)" });
  const isIphoneHeight = useMediaQuery({ query: "(min-height: 844px)" });

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
      <div
        className={
          isIpadHeight
            ? "flex w-screen px-10 "
            : isIphoneHeight
            ? "flex w-full h-screen px-3 "
            : "flex lg:gap-24 w-screen px-16 "
        }
      >
        {isLarge ? (
          <OwnerInfo
            isSmall={isSmall}
            isIpadHeight={isIpadHeight}
            isIphoneHeight={isIphoneHeight}
          />
        ) : null}
        <div
          className="bg-gray-900 rounded-lg"
          style={{
            height: isIpadHeight
              ? "55rem"
              : isIphoneHeight
              ? "100%"
              : "39.39rem",
            width: "50rem",
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
    </>
  );
}
export default OwnerProfile;
