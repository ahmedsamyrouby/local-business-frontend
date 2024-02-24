import { Image, Text, Button, FileButton } from "@mantine/core";
import { MdDelete } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import photo from "../../assets/images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
function ChangeImage({
  isIpadHeight,
  setSuccess,
  close,
  setFile,
  file,
}: {
  isIpadHeight: boolean | undefined;
  setSuccess: (value: boolean) => void;
  close: () => void;
  setFile: React.Dispatch<React.SetStateAction<Blob | null | undefined>>;
  file: Blob | null | undefined;
}) {
  function handelUpdateButton(e: File | null) {
    console.log(e);
    setFile(e);
    setTimeout(() => {
      close();
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }, 2000);

    console.log(file);
  }
  function handelRemoveButton() {
    setFile(null);
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
          src={file == null ? photo : URL.createObjectURL(file)}
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
