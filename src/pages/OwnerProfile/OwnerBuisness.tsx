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
import Swal from "sweetalert2";
// import { useDisclosure } from "@mantine/hooks";
// import { MdStar } from "react-icons/md";
// import { MdStarBorder } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
// import Swal from "sweetalert2";
// import StaticMap from "../../components/StaticMap/StaticMap";
function OwnerBuisness({
  isIpadHeight,
  isIphoneHeight,
  businessType,
}: {
  isIpadHeight?: boolean;
  isIphoneHeight?: boolean;
  businessType: string;
}) {
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const [isContent, setIsContent] = useState("");
  const [onClose, setOnClose] = useState(false);
  const userId = getLocalStorage("userId");
  const [data, setData] = useState([]);
  const userToken = getLocalStorage("userToken");
  async function deleteBusiness(_id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `${BASE_URL}/businessOwner/deleteBusiness/${_id}`,
          headers: { Authorization: `Bearer ${userToken}` },
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }
  async function uploadLogo(file: File, _id: string) {
    try {
      const formData = new FormData();
      formData.append("logo", file);
      await axios.patch(
        `${BASE_URL}/businessOwner/addLogoToBusiness/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
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
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
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
        `${BASE_URL}/businessOwner/getAllUserBusinesses/${userId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setData(response.data.data.businesses);
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
          className={isIpadHeight ? "text-primary text-5xl" : "text-primary"}
        >
          Your Buisness
        </Title>
      </div>
      <div>
        <ScrollArea
          h={isIpadHeight ? 640 : isIphoneHeight ? 600 : 420}
          offsetScrollbars
          scrollbarSize={6}
          className="rounded-lg"
        >
          <div
            className={
              businessType === "events" &&
              data.filter(
                (business: businessContent) => business.eventOrNot == "Event"
              ).length === 0
                ? "flex flex-col items-center justify-center h-64"
                : businessType === "services" &&
                  data.filter(
                    (business: businessContent) =>
                      business.eventOrNot == "notEvent"
                  ).length === 0
                ? "flex flex-col items-center justify-center h-64"
                : data.length === 0
                ? "flex flex-col items-center justify-center h-64"
                : "flex flex-col gap-2"
            }
          >
            {businessType === "events" &&
              (data.filter(
                (business: businessContent) => business.eventOrNot === "Event"
              ).length === 0 ? (
                <div className="">
                  <Text className="text-xl text-center font-semibold text-gray-200">
                    No events yet
                  </Text>
                  <Text className="text-xl font-semibold text-gray-200">
                    You can add by clicking on +Add
                  </Text>
                </div>
              ) : (
                data
                  .filter(
                    (business: businessContent) =>
                      business.eventOrNot == "Event"
                  )
                  .map((business: businessContent) => (
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
                  ))
              ))}
            {businessType === "services" &&
              (data.filter(
                (business: businessContent) =>
                  business.eventOrNot === "notEvent"
              ).length !== 0 ? (
                data
                  .filter(
                    (business: businessContent) =>
                      business.eventOrNot == "notEvent"
                  )
                  .map((business: businessContent) => (
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
                  ))
              ) : (
                <div className="">
                  <Text className="text-xl text-center font-semibold text-gray-200">
                    No services yet
                  </Text>
                  <Text className="text-xl font-semibold text-gray-200">
                    You can add by clicking on +Add
                  </Text>
                </div>
              ))}
            {businessType === "all" &&
              (data.length !== 0 ? (
                data.map((business: businessContent) => (
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
                ))
              ) : (
                <div className="">
                  <Text className="text-xl text-center font-semibold text-gray-200">
                    Empty of business
                  </Text>
                  <Text className="text-xl font-semibold text-gray-200">
                    You can add by clicking on +Add
                  </Text>
                </div>
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
                type: businessType,
                status: "pending",
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
            + Add {businessType === "all" ? "" : businessType}
          </Text>
        </Button>
      </div>
    </div>
  );
}
export default OwnerBuisness;
