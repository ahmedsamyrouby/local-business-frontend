import {
  Button,
  Image,
  Text,
  ScrollArea,
  Title,
  FileButton,
  Modal,
  UnstyledButton,
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
import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
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
            : `${BASE_URL}/${businesses.logo}`
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
          onUploadLogo={onUploadLogo}
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
  onUploadLogo,
}: {
  content: businessContent;
  onDelete: (value: string) => void;
  onUpdateMedia: (images: File[], _id: string) => void;
  onNavigate: NavigateFunction;
  onUploadLogo: (image: File, _id: string) => void;
}) {
  const [selectedButton, setSelectedButton] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState({ rating: "" });
  const [data2, setData2] = useState({
    oneStarCount: "",
    twoStarCount: "",
    threeStarCount: "",
    fourStarCount: "",
    fiveStarCount: "",
  });
  async function getRating() {
    try {
      const response = await axios.get(
        `${BASE_URL}/businessOwner/rating/${content._id}`
      );
      console.log(response);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getRatingCount() {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/countRatings/${content._id}`
      );
      console.log(response);
      setData2(response.data.ratingCounts);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRating();
    getRatingCount();
  }, []);
  const totalRate: number =
    Number(data2.oneStarCount) +
    Number(data2.twoStarCount) +
    Number(data2.threeStarCount) +
    Number(data2.fourStarCount) +
    Number(data2.fiveStarCount);
  const rateOne: number = (Number(data2.oneStarCount) * 100) / totalRate;
  const rateTwo: number = (Number(data2.twoStarCount) * 100) / totalRate;
  const rateThree: number = (Number(data2.threeStarCount) * 100) / totalRate;
  const rateFour: number = (Number(data2.fourStarCount) * 100) / totalRate;
  const rateFive: number = (Number(data2.fiveStarCount) * 100) / totalRate;
  console.log(content.reviews);
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
      <div className="flex grid grid-cols-8 px-3 mx-3.5 mt-4">
        <div
          className={
            selectedButton == 1
              ? "col-span-1 border-b-2 border-primary h-9 m-0 p-0 text-center"
              : "col-span-1 border-b-2 hover:border-primary h-9 m-0 p-0 text-center"
          }
        >
          <UnstyledButton
            className={
              selectedButton == 1
                ? "text-primary text-center pb-2 w-full h-full"
                : "text-white hover:text-primary text-center pb-2 w-full h-full"
            }
            onClick={() => {
              setSelectedButton(1);
            }}
          >
            <span>About</span>
          </UnstyledButton>
        </div>
        <div
          className={
            selectedButton == 2
              ? "col-span-1 border-b-2 border-primary h-9 m-0 p-0 text-center"
              : "col-span-1 border-b-2 hover:border-primary h-9 m-0 p-0 text-center"
          }
        >
          <UnstyledButton
            className={
              selectedButton == 2
                ? "text-primary text-center pb-2 w-full h-full"
                : "text-white hover:text-primary text-center pb-2 w-full h-full"
            }
            onClick={() => {
              setSelectedButton(2);
            }}
          >
            <span>Media</span>
          </UnstyledButton>
        </div>
        <div
          className={
            selectedButton == 3
              ? "col-span-1 border-b-2 border-primary h-9 m-0 p-0 text-center"
              : "col-span-1 border-b-2 hover:border-primary h-9 m-0 p-0 text-center"
          }
        >
          <UnstyledButton
            className={
              selectedButton == 3
                ? "text-primary text-center pb-2 w-full h-full"
                : "text-white hover:text-primary text-center pb-2 w-full h-full"
            }
            onClick={() => {
              setSelectedButton(3);
            }}
          >
            <span>Location</span>
          </UnstyledButton>
        </div>
        <div
          className={
            selectedButton == 4
              ? "col-span-1 border-b-2 border-primary h-9 m-0 p-0 text-center"
              : "col-span-1 border-b-2 hover:border-primary h-9 m-0 p-0 text-center"
          }
        >
          <UnstyledButton
            className={
              selectedButton == 4
                ? "text-primary text-center pb-2 w-full h-full"
                : "text-white hover:text-primary text-center pb-2 w-full h-full"
            }
            onClick={() => {
              setSelectedButton(4);
            }}
          >
            <span>Reviews</span>
          </UnstyledButton>
        </div>
        <div
          className={
            selectedButton == 5
              ? "col-span-1 border-b-2 border-primary h-9 m-0 p-0 text-center"
              : "col-span-1 border-b-2 hover:border-primary h-9 m-0 p-0 text-center"
          }
        >
          <UnstyledButton
            className={
              selectedButton == 5
                ? "text-primary text-center pb-2 w-full h-full"
                : "text-white hover:text-primary text-center pb-2 w-full h-full"
            }
            onClick={() => {
              setSelectedButton(5);
            }}
          >
            <span>Description</span>
          </UnstyledButton>
        </div>
        <div className="col-span-3 border-b-2"></div>
      </div>
      {selectedButton === 1 && (
        <div className="grid grid-cols-2 flex text-white px-12 py-3">
          <li>
            <b className="text-primary">Business name:</b>{" "}
            {content.businessName}
          </li>
          <li>
            <b className="text-primary">Category:</b> {content.category}
          </li>
          <li>
            <b className="text-primary">Open:</b> {content.workTime.startTime}
          </li>
          <li>
            <b className="text-primary">Close:</b> {content.workTime.endTime}
          </li>
          <li>
            <b className="text-primary">Days:</b>{" "}
            {content.days.map((day) => `${day} `)}
          </li>
          <li>
            <b className="text-primary">Country:</b> {content.Country}
          </li>
        </div>
      )}
      {selectedButton === 2 && (
        <div className="flex my-3.5 mx-6 gap-1 overflow-x-scroll gallery">
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
      )}
      {/* <div>Locatin here</div> */}
      {selectedButton === 4 && (
        <>
          <div className="flex grid grid-cols-4">
            <div className="col-span-1 mx-8 my-2">
              <Title className="text-7xl text-center text-yellow-600">
                {data.rating}
              </Title>
              <div className="flex">
                <StarRating rate={Number(data.rating)} />
              </div>
              <div>
                <Text className="text-yellow-600 font-semibold">
                  Business Rating
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 col-span-2 my-5 w-full">
              <div className="flex w-full bg-white h-2">
                <div
                  className="bg-gray-500 h-2"
                  style={{
                    width: Number.isNaN(rateFive) ? "0px" : `${rateFive}%`,
                  }}
                ></div>
              </div>
              <div className="w-full bg-white h-2">
                <div
                  className="bg-gray-500 h-2"
                  style={{
                    width: Number.isNaN(rateFour) ? "0px" : `${rateFour}%`,
                  }}
                ></div>
              </div>
              <div className="w-full bg-white h-2">
                <div
                  className="bg-gray-500 h-2"
                  style={{
                    width: Number.isNaN(rateThree) ? "0px" : `${rateThree}%`,
                  }}
                ></div>
              </div>
              <div className="w-full bg-white h-2">
                <div
                  className="bg-gray-500 h-2"
                  style={{
                    width: Number.isNaN(rateTwo) ? "0px" : `${rateTwo}%`,
                  }}
                ></div>
              </div>
              <div className="w-full bg-white h-2">
                <div
                  className="bg-gray-500 h-2"
                  style={{
                    width: Number.isNaN(rateOne) ? "0px" : `${rateOne}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-y-1 col-span-1 my-3">
              <div className="flex ml-2">
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <Text className="text-white ml-1 text-sm">
                  {Number.isNaN(rateFive) ? `0%` : `${rateFive.toFixed(1)}%`}
                </Text>
              </div>
              <div className="flex ml-2">
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <Text className="text-white ml-1 text-sm">
                  {Number.isNaN(rateFour) ? `0%` : `${rateFour.toFixed(1)}%`}
                </Text>
              </div>
              <div className="flex ml-2">
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <Text className="text-white ml-1 text-sm">
                  {Number.isNaN(rateThree) ? `0%` : `${rateThree.toFixed(1)}%`}
                </Text>
              </div>
              <div className="flex ml-2">
                <MdStar className="text-yellow-600" size={20} />
                <MdStar className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <Text className="text-white ml-1 text-sm">
                  {Number.isNaN(rateTwo) ? `0%` : `${rateTwo.toFixed(1)}%`}
                </Text>
              </div>
              <div className="flex ml-2">
                <MdStar className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <MdStarBorder className="text-yellow-600" size={20} />
                <Text className="text-white ml-1 text-sm">
                  {Number.isNaN(rateOne) ? `0%` : `${rateOne.toFixed(1)}%`}
                </Text>
              </div>
            </div>
          </div>
          <div
            className={
              content.reviews.length === 0
                ? "flex justify-center text-xl text-white p-9 pt-0"
                : "flex text-white p-9 pt-0"
            }
          >
            {content.reviews.length === 0 ? (
              "No reviews found yet"
            ) : (
              <table
                className="table-fixed border-collapse w-full"
                style={{ marginBlock: "13px" }}
              >
                <thead className="border-b-2 border-white">
                  <tr className="">
                    <th className="text-primary text-left p-2 border-b-2 font-normal">
                      Customer
                    </th>
                    <th className="text-primary text-center p-2 pr-0 w-80 border-b-2 font-normal">
                      Review
                    </th>
                    <th className="text-primary text-right p-2 pl-0 w-26 border-b-2 font-normal">
                      Time
                    </th>
                    <th className="text-primary p-2 border-b-2 font-normal"></th>
                  </tr>
                </thead>
                <tbody className="border-b-2 border-white">
                  {content.reviews.map((review) => (
                    <ReviewBody
                      userName={review.userName}
                      review={review.content}
                      time={review.timestamp}
                      userId={review._id}
                      content={content}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      {selectedButton === 5 && (
        <div className="flex text-white px-12 py-3">
          <li>{content.description}</li>
        </div>
      )}

      <div className=" flex justify-end gap-x-0.5 m-2">
        <FileButton
          onChange={(file) => {
            onUploadLogo(file, content._id);
          }}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <Button
              {...props}
              className="h-7 w-18 pb-1 hover:opacity-90 bg-blue-400 text-center"
            >
              <MdCloudUpload className={"w-5 h-5"} /> Logo
            </Button>
          )}
        </FileButton>
        <Button
          className="h-7 w-18 pb-1 hover:opacity-90 bg-green-600 text-center"
          onClick={() => {
            onNavigate("/business-form", {
              state: {
                method: "put",
                api: `${BASE_URL}/businessOwner/updateMyBusinessInfo/${content._id}`,
              },
            });
          }}
        >
          <MdEdit className="w-5 h-5" /> Edit
        </Button>
        <Button
          className="h-7 w-18 pb-1 hover:opacity-90 bg-red-600 text-center"
          onClick={() => onDelete(content._id)}
        >
          <MdDelete className={"w-5 h-5"} /> Delete
        </Button>
      </div>
    </>
  );
}
function ReviewBody({
  userName,
  review,
  time,
  userId,
  content,
}: {
  userName: string;
  review: string;
  time: string;
  userId: string;
  content: businessContent;
}) {
  async function reportReview() {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    console.log(userId);
    await axios({
      method: "post",
      url: `${BASE_URL}/report/${userId}/${content._id}`,
      data: { reason: text },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <tr>
      <td className="text-white text-left p-2 border-b-2">{userName}</td>
      <td className="text-white text-center p-2 pr-0 border-b-2 ">{review}</td>
      <td className="text-white text-right p-2 pl-0 pr-0 border-b-2">
        {time.slice(0, -8)}
      </td>
      <td className="text-white text-right border-b-2">
        <Button className="h-8 bg-red-700" onClick={reportReview}>
          Report
        </Button>
      </td>
    </tr>
  );
}
function StarRating({ rate }: { rate: number }) {
  return (
    <>
      {[...Array(rate)].map(() => (
        <MdStar className="text-yellow-600" size={22} />
      ))}
      {[...Array(5 - rate)].map(() => (
        <MdStarBorder className="text-yellow-600" size={20} />
      ))}
    </>
  );
}
