import {
  Button,
  Image,
  Text,
  ScrollArea,
  Title,
  FileButton,
  Modal,
} from "@mantine/core";
import { useMediaQuery } from "react-responsive";
import { GoPlusCircle } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import pending from "../../assets/images/PendingImage.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { getLocalStorage } from "../../services/LocalStorageService";
import { businessContent } from "../../services/ConvertStringToFile";
import { notifications } from "@mantine/notifications";
import { IconSquareCheck } from "@tabler/icons-react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./index.css";
import { useDisclosure } from "@mantine/hooks";

function OwnerBuisness({
  isIpadHeight,
  isIphoneHeight,
}: {
  isIpadHeight?: boolean;
  isIphoneHeight?: boolean;
}) {
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const [isContent, setIsContent] = useState("");
  const [onClose, setOnClose] = useState(false);
  // const [content, setContent] = useState(0);
  const userId = getLocalStorage("userId");
  const [data, setData] = useState([]);
  async function deleteBusiness(_id: string) {
    await axios({
      method: "delete",
      url: `${BASE_URL}/businessOwner/deleteBusiness/${_id}`,
    }).then((res) => {
      getBusinesses();
      notifications.show({
        message: res.data.message,
        autoClose: 2000,
        icon: <IconSquareCheck />,
        classNames: {
          icon: "bg-transparent text-green-500",
        },
      });
    });
  }
  async function updateMedia(images: File[], _id: string) {
    for (let i = 0; i < images.length; i++) {
      try {
        const formData = new FormData();
        formData.append("media", images[i]);
        await axios.patch(
          `${BASE_URL}/businessOwner/updateMyBusinessMedia/${_id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        getBusinesses();
      } catch (err) {
        console.log(err);
      }
    }
  }
  const getBusinesses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/businessOwner/getAllUserBusinesses/${userId}`
      );
      setData(response.data.data.businesses);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };
  useEffect(() => {
    getBusinesses();
  }, []);
  return (
    <div
      className={
        !isLarge
          ? "flex flex-col px-1.5 pb-7 pt-1 gap-2 rounded-sm"
          : "flex flex-col p-7 gap-2"
      }
    >
      <div className="text-center text-gray-300 mb-4">
        <Title
          className={isIpadHeight ? "text-gray-300 text-5xl" : "text-gray-300"}
        >
          Your Buisness
        </Title>
      </div>
      <div>
        <ScrollArea
          h={isIpadHeight ? 640 : isIphoneHeight ? 600 : 460}
          offsetScrollbars
          scrollbarSize={6}
          // classNames={{ scrollbar: "bg-primary" }}
        >
          <div className="flex flex-col gap-2">
            {data.map((business: businessContent) => (
              <Business
                key={business._id}
                onDelete={deleteBusiness}
                onUpdateMedia={updateMedia}
                isContent={isContent}
                setIsContent={setIsContent}
                businesses={business}
                onClose={onClose}
                setOnClose={setOnClose}
                onNavigate={navigate}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="hover:ease-in delay-150 duration-200 hover:p-1">
        <Button
          className={
            isIpadHeight
              ? "flex w-full h-16 bg-primary"
              : isIphoneHeight
              ? "flex w-full h-16 bg-primary"
              : "flex w-full h-12 bg-primary"
          }
          onClick={() => {
            navigate("/business-form", {
              state: {
                method: "post",
                api: `${BASE_URL}/businessOwner/addMultipleBusinesses/${userId}`,
              },
            });
          }}
        >
          <Text
            className={
              isIpadHeight
                ? "font-serif italic font-bold text-2xl"
                : isIphoneHeight
                ? "font-serif italic font-bold text-2xl"
                : "font-serif italic font-bold "
            }
          >
            + Add
          </Text>
        </Button>
      </div>
    </div>
  );
}
export default OwnerBuisness;
function Business({
  isContent,
  setIsContent,
  onClose,
  setOnClose,
  onDelete,
  onUpdateMedia,
  onNavigate,
  businesses,
}: {
  isContent: string;
  setIsContent: (value: string) => void;
  onClose: boolean;
  setOnClose: (value: boolean) => void;
  onDelete: (value: string) => void;
  onUpdateMedia: (images: File[], _id: string) => void;
  onNavigate: NavigateFunction;
  businesses: businessContent;
}) {
  function handelOpenImage() {
    setIsContent(businesses._id);
    setOnClose(!onClose);
  }
  return (
    <div
      className={
        onClose
          ? "bg-black w-full rounded-xl "
          : "w-full hover:ease-in delay-150 duration-200 hover:p-1 rounded "
      }
    >
      <Image
        src={
          businesses.status == "pending"
            ? pending
            : `${BASE_URL}/${businesses.attachment}`
        }
        radius="md"
        className="h-28 hover:shadow-xl transition-shadow object-cover w-full"
        fit="-moz-initial"
        onClick={handelOpenImage}
      />
      {isContent == businesses._id && onClose ? (
        <Content
          content={businesses}
          onDelete={onDelete}
          onUpdateMedia={onUpdateMedia}
          onNavigate={onNavigate}
        />
      ) : null}
    </div>
  );
}

function Content({
  content,
  onDelete,
  onNavigate,
  onUpdateMedia,
}: {
  content: businessContent;
  onDelete: (value: string) => void;
  onUpdateMedia: (images: File[], _id: string) => void;
  onNavigate: NavigateFunction;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="xl"
        withCloseButton={false}
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        classNames={{
          body: "p-0 ",
          content: "bg-gradient-to-r from-primary to-gray-300  ",
          root: "rounded-xl",
        }}
      >
        <div className="flex m-3.5 gap-1 overflow-x-scroll gallery ">
          {content.media.map((image, i) => (
            <Image
              key={i}
              className="w-96 h-96 rounded-lg"
              src={`${BASE_URL}/${image}`}
              fit="contain"
            />
          ))}
        </div>
      </Modal>
      <table className="table-fixed mx-2 mt-3">
        <thead className="border-b-2 border-white ">
          <tr className="">
            <th className="text-primary px-1.5">Business</th>
            <th className="text-primary">Category</th>
            <th className="text-primary px-1.5">Country</th>
            <th className="text-primary px-1.5">From</th>
            <th className="text-primary px-1.5">To</th>
            <th className="text-primary px-1.5">Location</th>
            <th className="text-primary px-1.5">Address</th>
            <th className="text-primary px-1.5">Description</th>
          </tr>
        </thead>
        <tbody className="border-b-2 border-white">
          <tr>
            <td className="text-white px-1.5">{content.businessName}</td>
            <td className="text-white ">{content.category}</td>
            <td className="text-white px-1.5">{content.Country}</td>
            <td className="text-white px-1.5">{content.workTime.startTime}</td>
            <td className="text-white px-1.5">{content.workTime.endTime}</td>
            <td className="text-white px-1.5">Location</td>
            <td className="text-white ">
              {content.address} ain shams ah gharbia
            </td>
            <td className="text-white ">{content.description}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex m-3.5 gap-1 overflow-x-scroll gallery">
        {content.media.map((image, i) => (
          <Image
            key={i}
            className="w-24 h-24 rounded-md cursor-pointer hover:p-1"
            src={`${BASE_URL}/${image}`}
            onClick={open}
          />
        ))}
        <div>
          <FileButton
            onChange={(files: File[]) => {
              onUpdateMedia(files, content._id);
            }}
            accept="image/png,image/jpeg"
            multiple
          >
            {(props) => (
              <Button {...props} className="p-0 m-0 bg-black w-24 h-24">
                <div className="flex flex-col justify-center items-center w-24 h-24 rounded-md bg-gray-300 hover:opacity-80">
                  <GoPlusCircle className="w-10 h-10 hover:w-9 hover:h-9" />
                  <h2>Add Media</h2>
                </div>
              </Button>
            )}
          </FileButton>
        </div>
      </div>
      <div className=" flex justify-end gap-x-0.5 m-2">
        <Button
          className="h-7 w-18 pb-1 hover:opacity-90 bg-green-500 text-center"
          onClick={() => {
            onNavigate("/business-form", {
              state: {
                method: "put",
                api: `${BASE_URL}/businessOwner/updateMyBusinessInfo/${content._id}`,
              },
            });
          }}
        >
          <MdCloudUpload className="w-5 h-5 mr-1" /> Update
        </Button>
        <Button
          className="h-7 w-18 pb-1 hover:opacity-90 bg-red-500 text-center"
          onClick={() => onDelete(content._id)}
        >
          <MdDelete className={"w-5 h-5"} /> Delete
        </Button>
      </div>
    </>
  );
}
