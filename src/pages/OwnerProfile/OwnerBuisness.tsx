import { Button, Image, Text, ScrollArea, Title } from "@mantine/core";
import { useMediaQuery } from "react-responsive";
import { FaLocationDot } from "react-icons/fa6";
// import Photo from "../../assets/images/3564954.jpg";
// import Photo2 from "../../assets/images/3514981.jpg";
import { MdDelete } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import pending from "../../assets/images/PendingImage.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { getLocalStorage } from "../../services/LocalStorageService";
import { businessContent } from "../../services/ConvertStringToFile";
import { notifications } from "@mantine/notifications";
import { IconSquareCheck } from "@tabler/icons-react";

function OwnerBuisness({
  isIpadHeight,
  isIphoneHeight,
}: {
  isIpadHeight?: boolean;
  isIphoneHeight?: boolean;
}) {
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });
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
  const getBusinesses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/businessOwner/getAllUserBusinesses/65de844b1604b9dc1c42d7fd`
      );
      setData(response.data.data.businesses);
      console.log(response.data);
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
          ? "flex flex-col px-3 pb-7 pt-1 gap-2 rounded-sm"
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
                isContent={isContent}
                setIsContent={setIsContent}
                businesses={business}
                onClose={onClose}
                setOnClose={setOnClose}
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
  businesses,
}: {
  isContent: string;
  setIsContent: (value: string) => void;
  onClose: boolean;
  setOnClose: (value: boolean) => void;
  onDelete: (value: string) => void;
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
        src={businesses.status == "pending" ? pending : ""}
        radius="md"
        className="h-28 hover:shadow-xl transition-shadow object-cover w-full"
        fit="-moz-initial"
        onClick={handelOpenImage}
      />
      {isContent == businesses._id && onClose ? (
        <Content content={businesses} onDelete={onDelete} />
      ) : null}
    </div>
  );
}

function Content({
  content,
  onDelete,
}: {
  content: businessContent;
  onDelete: (value: string) => void;
}) {
  return (
    <div className="flex grid grid-cols-2 gap-y-1.5 p-2.5">
      <div className="flex gap-2">
        <Text className="flex bg-primary rounded-lg w-34 p-1 text-center text-sm text-white font-serif italic font-bold">
          Business Name
        </Text>
        <Text className="font-bold text-center text-gray-300 text-md">
          {content.businessName}
        </Text>
      </div>

      <div className="flex gap-2">
        <Text className="bg-primary rounded-lg w-34 p-1 text-center text-sm text-white font-serif italic font-bold">
          Category
        </Text>
        <Text className="font-bold pr-1 text-center text-gray-300 text-md">
          {content.category}
        </Text>
      </div>
      {content.Country != "" ? (
        <div className="flex gap-2">
          <Text className="flex bg-primary rounded-lg w-34 p-1 text-center text-sm text-white font-serif italic font-bold">
            country
          </Text>
          <Text className="font-bold text-center text-gray-300 text-md">
            {content.Country}
          </Text>
        </div>
      ) : null}
      {content.workTime.startTime && (
        <div className="flex gap-2">
          <Text className="flex bg-primary rounded-lg w-34 p-1 text-center text-sm text-white font-serif italic font-bold">
            <IoTimeOutline className="mr-1 mt-0.5" />
            Active From :
          </Text>
          <Text className="font-bold text-center text-gray-300 text-md">
            {content.workTime.startTime}
          </Text>
        </div>
      )}
      {content.workTime.endTime && (
        <div className="flex gap-2">
          <Text className="flex bg-primary rounded-lg w-34 p-1 text-center text-sm text-white font-serif italic font-bold">
            <IoTimeOutline className="mr-1 mt-0.5" /> Active To :
          </Text>
          <Text className="font-bold text-center text-gray-300 text-md">
            {content.workTime.endTime}
          </Text>
        </div>
      )}
      <div className="flex gap-2">
        <Text className="flex bg-primary rounded-lg w-34 p-1 text-center text-sm text-white font-serif italic font-bold">
          Addres :
        </Text>
        <Text className="font-bold text-center text-gray-300 text-md">
          {content.address}
        </Text>
      </div>
      <div className="flex gap-2">
        <Text className="flex bg-primary rounded-lg w-34 p-1 text-center text-sm text-white font-serif italic font-bold">
          <FaLocationDot className="mr-1 mt-0.5" />
          Location :
        </Text>
        <Text className="font-bold text-center text-gray-300 text-md"></Text>
      </div>

      <div className="flex col-span-2 gap-1">
        <Text className="bg-primary h-8  rounded-lg p-1 text-center text-sm text-white font-serif italic font-bold">
          Description:
        </Text>
        <Text className="font-bold text-center text-gray-300 text-md">
          {content.description}
        </Text>
      </div>
      <div className=" flex justify-end col-span-2 gap-x-0.5 mt-1">
        <Button className="h-7 w-18 pb-1 hover:opacity-90 bg-green-500 text-center">
          <MdCloudUpload className="w-5 h-5 mr-1" /> Update
        </Button>
        <Button
          className="h-7 w-18 pb-1 hover:opacity-90 bg-red-500 text-center"
          onClick={() => onDelete(content._id)}
        >
          <MdDelete className={"w-5 h-5"} /> Delete
        </Button>
      </div>
    </div>
  );
}
