import { Image, Text, Button, FileButton } from "@mantine/core";
import { MdDelete } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import photo from "../../assets/images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import { BASE_URL } from "../../constants";
import { getLocalStorage } from "../../services/LocalStorageService";
import axios from "axios";
function ChangeImage({
  isIpadHeight,
  setSuccess,
  close,
  setImg,
  img,
  getOwnerInfo,
}: {
  isIpadHeight: boolean | undefined;
  setSuccess: (value: boolean) => void;
  close: () => void;
  setImg?: (value: string | null) => void;
  img: string | null | undefined;
  getOwnerInfo?: () => Promise<void>;
}) {
  const userId = getLocalStorage("userId");
  async function handelUpdateButton(file: File | null) {
    console.log(file);
    console.log(userId);

    const formData = new FormData();
    formData.append("userProfile", file);
    await axios
      .patch(
        `${BASE_URL}/businessOwner/addImageToUserProfile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        getOwnerInfo();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          close();
          setTimeout(() => {
            setSuccess(false);
          }, 1000);
        }, 2000);
      });
  }
  function handelRemoveButton() {
    // setImg("");
    setTimeout(() => {
      close();
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }, 2000);
  }
  return (
    <div className="flex flex-col mt-5 gap-y-2">
      <div className="flex justify-center mt-4">
        <Image
          src={img == "Null" ? photo : `${BASE_URL}/${img}`}
          className={
            isIpadHeight
              ? "flex-none rounded-full h-56 w-56 p-1"
              : "flex-none rounded-full h-44 w-44 p-1"
          }
          style={{ marginTop: "-70px" }}
        />
      </div>
      <div className="flex flex-col">
        <Text
          className={isIpadHeight ? "font-bold text-xl mb-3" : "font-bold mb-1"}
        >
          Do you want to Upload image?
        </Text>
        <div className="flex justify-center sm:items-center gap-1">
          <FileButton
            onChange={(e) => {
              handelUpdateButton(e);
              setSuccess(true);
            }}
          >
            {(props) => (
              <Button
                {...props}
                className={
                  isIpadHeight
                    ? "bg-primary text-xl h-12 hover:opacity-80  "
                    : "bg-primary hover:opacity-80"
                }
              >
                <MdCloudUpload
                  className={isIpadHeight ? "mr-1 w-6 h-6" : "mr-1"}
                />{" "}
                Upload
              </Button>
            )}
          </FileButton>
          <Button
            className={
              isIpadHeight
                ? "bg-red-600 text-xl h-12 hover:opacity-80 "
                : "bg-red-600 hover:opacity-80"
            }
            onClick={() => {
              handelRemoveButton();
              setSuccess(true);
            }}
          >
            <MdDelete
              className={isIpadHeight ? "mr-1 w-6 h-6" : "mr-1 w-4 w-4"}
            />{" "}
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ChangeImage;
