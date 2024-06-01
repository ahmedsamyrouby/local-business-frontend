import { Image, Title, Text, Anchor } from "@mantine/core";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { FaCheckCircle } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import { BASE_URL } from "../../constants";
import photo from "../../assets/images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { getLocalStorage } from "../../services/LocalStorageService";
import ChangeImage from "./ChangeImage";
function OwnerInfo({
  isSmall,
  isIpadHeight,
  isIphoneHeight,
}: {
  isSmall?: boolean;
  isIpadHeight?: boolean;
  isIphoneHeight?: boolean;
}) {
  const userId = getLocalStorage("userId");
  const [opened, { open, close }] = useDisclosure(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    birthday: "",
    role: "",
    phone: "",
    gender: "",
    userProfile: "",
  });

  const getOwnerInfo = async () => {
    try {
      const respone = await axios.get(
        `${BASE_URL}/businessOwner/getUserByUserID/${userId}`
      );
      setData(respone.data.data);
      // setImg(`${BASE_URL}/${data.userProfile}`);
      // console.log(img);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };
  useEffect(() => {
    getOwnerInfo();
  }, []);

  return (
    <>
      <Modal
        classNames={{
          body: !success
            ? isIpadHeight
              ? "h-96 w-96 flex justify-center items-center"
              : "h-80 w-80 flex justify-center items-center"
            : "flex justify-center w-96",
          content: "bg-gradient-to-r from-primary to-gray-300 flex flex-col ",
        }}
        opened={opened}
        onClose={close}
        size={"auto"}
        withCloseButton={false}
        centered
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {success ? (
          <div className="flex">
            <FaCheckCircle className="text-green-400 mr-1.5 mt-1.5" />
            <Text className="font-bold">Successfully</Text>
          </div>
        ) : (
          <ChangeImage
            isIpadHeight={isIpadHeight}
            setSuccess={setSuccess}
            close={close}
            img={data.userProfile}
            getOwnerInfo={getOwnerInfo}
          />
        )}
      </Modal>
      <div
        className="flex flex-col bg-gray-900 rounded-lg overflow-hidden drop-shadow-lg"
        style={{
          height: "100%",
          width: isSmall
            ? isIpadHeight
              ? "100%"
              : isIphoneHeight
              ? "100%"
              : "28.1rem"
            : "19.5rem",
        }}
      >
        <div
          className={
            isIpadHeight
              ? "bg-gradient-to-b from-gray-300 to-bg-gray-900 w-full h-44"
              : isIphoneHeight
              ? "bg-gradient-to-b from-gray-300 to-bg-gray-900 w-full h-36"
              : "bg-gradient-to-b from-gray-300 to-bg-gray-900 w-full h-24"
          }
        ></div>
        {/* //Image */}
        <div className="flex px-6 pb-2">
          <Image
            src={
              data.userProfile === "Null"
                ? photo
                : `${BASE_URL}/${data.userProfile}`
            }
            className={
              isIpadHeight
                ? "flex-none rounded-full h-48 w-48 p-1 bg-gray-900 cursor-pointer"
                : isIphoneHeight
                ? "flex-none rounded-full h-32 w-32 p-1 bg-gray-900 cursor-pointer"
                : "flex-none rounded-full h-36 w-36 p-1 bg-gray-900 cursor-pointer"
            }
            style={{
              marginTop: isIpadHeight ? "-90px" : "-70px",
            }}
            onClick={open}
          />
          {data.userProfile === `Null` && (
            <FaPlus
              className={
                isIpadHeight
                  ? "w-9 h-9 mt-12 bg-gray-900 rounded-full border-2 border-white text-gray-300 cursor-pointer"
                  : "w-6 h-6 mt-9 bg-gray-900 rounded-full border-2 border-white text-gray-300 cursor-pointer"
              }
              style={{ marginLeft: "-40px" }}
              onClick={open}
            />
          )}
        </div>
        <Title
          className={
            isIpadHeight
              ? "pl-6 mt-6 text-gray-300 text-4xl"
              : "pl-6 text-gray-300 text-2xl"
          }
        >
          {data.name}
        </Title>
        {/* //Owner Information */}
        <div
          className={
            isIpadHeight
              ? "flex flex-col px-4 py-4 my-6 gap-y-1.5"
              : isIphoneHeight
              ? "flex flex-col px-4 py-4 gap-y-1"
              : "flex flex-col px-4 py-4 gap-y-1"
          }
        >
          <div className="flex gap-2">
            <Title
              className={
                isIpadHeight
                  ? "text-2xl text-gray-300"
                  : isIphoneHeight
                  ? "text-lg text-gray-300"
                  : "text-sm text-gray-300"
              }
            >
              User:{" "}
            </Title>
            <Text
              className={
                isIpadHeight
                  ? "text-2xl text-gray-400"
                  : isIphoneHeight
                  ? "text-lg text-gray-400"
                  : "text-sm text-gray-400"
              }
            >
              {data.role}
            </Text>
          </div>
          <div className="flex gap-2">
            <Title
              className={
                isIpadHeight
                  ? "text-2xl text-gray-300"
                  : isIphoneHeight
                  ? "text-lg text-gray-300"
                  : "text-sm text-gray-300"
              }
            >
              Date of Birth:{" "}
            </Title>
            <Text
              className={
                isIpadHeight
                  ? "text-2xl text-gray-400"
                  : isIphoneHeight
                  ? "text-lg text-gray-400"
                  : "text-sm text-gray-400"
              }
            >
              {data.birthday.slice(0, -14)}
            </Text>
          </div>
          <div className="flex gap-2">
            <Title
              className={
                isIpadHeight
                  ? "text-2xl text-gray-300"
                  : isIphoneHeight
                  ? "text-lg text-gray-300"
                  : "text-sm text-gray-300"
              }
            >
              Gender:{" "}
            </Title>
            <Text
              className={
                isIpadHeight
                  ? "text-2xl text-gray-400"
                  : isIphoneHeight
                  ? "text-lg text-gray-400"
                  : "text-sm text-gray-400"
              }
            >
              {data.gender}
            </Text>
          </div>
        </div>
        {/* Contact */}
        <div
          className={
            isIpadHeight
              ? "flex flex-col gap-y-3 border-gray-300 border-t-2 mx-4"
              : isIphoneHeight
              ? "flex flex-col gap-y-2.5 border-gray-300 border-t-2 mx-4 "
              : "flex flex-col gap-y-1 border-gray-300 border-t-2 mx-4 "
          }
        >
          {/* Email */}
          <Title
            className={
              isIpadHeight
                ? "text-gray-300 text-3xl mt-8 mb-4"
                : "text-gray-300 text-2xl mt-4"
            }
          >
            CONTACT
          </Title>
          <div className="flex">
            <MdEmail
              className={
                isIpadHeight
                  ? "w-9 h-9 text-gray-300 pr-1"
                  : isIphoneHeight
                  ? "w-7 h-7 text-gray-300 pr-1"
                  : "w-6 h-6 text-gray-300 pr-1"
              }
            />
            <CopyToClipboard
              text={data.email}
              onCopy={(_text, result) => console.log(result)}
            >
              <Anchor
                className={
                  isIpadHeight
                    ? "text-2xl text-gray-400"
                    : isIphoneHeight
                    ? "text-md text-gray-400"
                    : "text-sm text-gray-400"
                }
              >
                {data.email}
              </Anchor>
            </CopyToClipboard>
          </div>
          {/* phone */}
          <Text className="flex">
            <FaPhoneAlt
              className={
                isIpadHeight
                  ? "w-9 h-9 text-gray-300 pr-1"
                  : isIphoneHeight
                  ? "w-7 h-7 text-gray-300 pr-1"
                  : "w-6 h-6 text-gray-300 pr-1"
              }
            />
            <CopyToClipboard
              text="HossamIbrahim@gmail.com"
              onCopy={(_text, result) => console.log(result)}
            >
              <Anchor
                className={
                  isIpadHeight
                    ? "text-2xl text-gray-400"
                    : isIphoneHeight
                    ? "text-md text-gray-400"
                    : "text-sm text-gray-400"
                }
              >
                {`(+20) ${data.phone}`}
              </Anchor>
            </CopyToClipboard>
          </Text>
        </div>
      </div>
    </>
  );
}
export default OwnerInfo;
