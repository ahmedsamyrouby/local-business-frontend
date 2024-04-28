import {
  Button,
  // Image,
  Text,
  ScrollArea,
  Title,
  // FileButton,
  // Modal,
  // UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "react-responsive";
// import { GoPlusCircle } from "react-icons/go";
// import { MdDelete } from "react-icons/md";
// import { MdCloudUpload } from "react-icons/md";
// import pending from "../../assets/images/PendingImage.jpg";
// import approved from "../../assets/images/Untitled design (3).png";
// import rejected from "../../assets/images/Untitled design (4).png";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { getLocalStorage } from "../../services/LocalStorageService";
import { businessContent } from "../../services/ConvertStringToFile";
import { notifications } from "@mantine/notifications";
import { IconSquareCheck } from "@tabler/icons-react";
// import { NavigateFunction, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Business from "../../components/OwnerComponents/Business";
// import { useDisclosure } from "@mantine/hooks";
// import { MdStar } from "react-icons/md";
// import { MdStarBorder } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
// import Swal from "sweetalert2";
// import StaticMap from "../../components/StaticMap/StaticMap";
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
          icon: "bg-transparent text-green-600",
        },
      });
    });
  }
  async function uploadLogo(file: File, _id: string) {
    try {
      const formData = new FormData();
      formData.append("logo", file);
      await axios.patch(
        `${BASE_URL}/businessOwner/addLogoToBusiness/${_id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      getBusinesses();
    } catch (err) {
      console.log(err);
    }
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
          className="rounded-lg"
        >
          <div className="flex flex-col gap-2">
            {data.map((business: businessContent) => (
              <Business
                key={business._id}
                onDelete={deleteBusiness}
                onUpdateMedia={updateMedia}
                onUploadLogo={uploadLogo}
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
