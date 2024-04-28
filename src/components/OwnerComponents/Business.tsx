import { Image } from "@mantine/core";

import pending from "../../assets/images/PendingImage.jpg";
import approved from "../../assets/images/Untitled design (3).png";
import rejected from "../../assets/images/Untitled design (4).png";

import { BASE_URL } from "../../constants";

import { businessContent } from "../../services/ConvertStringToFile";

import { NavigateFunction } from "react-router-dom";
import "../../pages/OwnerProfile/index.css";
import Content from "./BusinessContent";

function Business({
  isContent,
  setIsContent,
  onClose,
  setOnClose,
  onDelete,
  onUpdateMedia,
  onUploadLogo,
  onNavigate,
  businesses,
}: {
  isContent: string;
  setIsContent: (value: string) => void;
  onClose: boolean;
  setOnClose: (value: boolean) => void;
  onDelete: (value: string) => void;
  onUpdateMedia: (images: File[], _id: string) => void;
  onUploadLogo: (file: File, _id: string) => void;
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
            : businesses.status === "accepted"
            ? businesses.logo
              ? `${BASE_URL}/${businesses.logo}`
              : approved
            : rejected
        }
        radius="md"
        className="h-28 hover:shadow-xl transition-shadow object-cover w-full"
        fit="-moz-initial"
        onClick={handelOpenImage}
      />
      {isContent == businesses._id &&
      onClose &&
      businesses.status === "accepted" ? (
        <Content
          content={businesses}
          onDelete={onDelete}
          onUpdateMedia={onUpdateMedia}
          onNavigate={onNavigate}
          onUploadLogo={onUploadLogo}
        />
      ) : null}
    </div>
  );
}
export default Business;
