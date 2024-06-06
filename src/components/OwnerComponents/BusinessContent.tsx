import {
  Button,
  Image,
  Text,
  Title,
  FileButton,
  Modal,
  UnstyledButton,
  Badge,
} from "@mantine/core";
import { GoPlusCircle } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { businessContent } from "../../services/ConvertStringToFile";
import { NavigateFunction } from "react-router-dom";
import "../../pages/OwnerProfile/index.css";
import { useDisclosure } from "@mantine/hooks";
import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import StaticMap from "../../components/StaticMap/StaticMap";
import ReviewBody from "./ReviewBody";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { getLocalStorage } from "../../services/LocalStorageService";
// import Business from "./Business";
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
  const navigate = useNavigate();
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
  const userToken = getLocalStorage("userToken");
  const [notificationsNumber, setNotificationNumber] = useState(0);
  async function getRating() {
    try {
      const response = await axios.get(
        `${BASE_URL}/businessOwner/rating/${content._id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
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
        `${BASE_URL}/customer/countRatings/${content._id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log(response);
      setData2(response.data.ratingCounts);
    } catch (err) {
      console.log(err);
    }
  }
  async function getRequestsOfServicesNumber() {
    await axios
      .get(`http://localhost:3011/businessOwner/getAllService/${content._id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        let number: number = 0;
        res.data.data.map((req: { approvalStatus: string }) => {
          if (req.approvalStatus === "Pending") {
            number = number + 1;
          }
        });

        setNotificationNumber(number);
      });
  }
  useEffect(() => {
    getRating();
    getRatingCount();
    getRequestsOfServicesNumber();
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
      {content.status === "rejected" ? (
        <div className="flex justify-center items-center h-36 ">
          <div className="flex flex-col gap-y-1">
            <Text className="text-white font-semibold">
              Please,update your business{" "}
            </Text>
            <div className="text-center">
              <Button
                className="h-7 w-18 pb-1 hover:opacity-90 bg-green-600 text-center"
                onClick={() => {
                  onNavigate("/business-form", {
                    state: {
                      method: "put",
                      api: `${BASE_URL}/businessOwner/updateMyBusinessInfo/${content._id}`,
                      type: content.eventOrNot,
                      operation: "edit",
                      data: content,
                    },
                  });
                }}
              >
                <RxUpdate className="w-5 h-5" />
                Update
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex grid grid-cols-9 px-3 mx-3.5 mt-4">
            <div className="col-span-1 border-b-2 hover:border-primary h-9 m-0 p-0 text-center">
              <UnstyledButton
                className="text-white hover:text-primary flex justify-center pb-2 w-full h-full"
                onClick={() => {
                  navigate("/request", {
                    state: {
                      id: content._id,
                      businessName: content.businessName,
                    },
                  });
                }}
              >
                <span className="text-end mb-10">
                  <IoNotifications
                    className="hover:opacity-80 hover:text-primary h-8 w-8 text-white"
                    onClick={() => {}}
                    style={{ color: "#584D3A" }}
                  />
                  <div style={{ marginTop: "-50px" }}>
                    {notificationsNumber ? (
                      <Badge size="xs" circle className="bg-red-600">
                        {notificationsNumber}
                      </Badge>
                    ) : null}
                  </div>
                </span>
              </UnstyledButton>
            </div>
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
            {content.description && (
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
            )}
            <div className="col-span-3 border-b-2"></div>
          </div>
          {selectedButton === 1 && (
            <div className="grid grid-cols-2 flex text-white px-12 py-3">
              <li>
                <b className="text-primary">Business name:</b>{" "}
                {content.businessName}
              </li>
              <li>
                <b className="text-primary">Type:</b>{" "}
                {content.eventOrNot === "Event"
                  ? content.eventOrNot
                  : "Service"}
              </li>
              {content.address && (
                <li>
                  <b className="text-primary">Address:</b> {content.address}
                </li>
              )}
              <li>
                <b className="text-primary">Category:</b> {content.category}
              </li>
              <li>
                <b className="text-primary">Open:</b>{" "}
                {content.workTime.startTime}
              </li>
              <li>
                <b className="text-primary">Close:</b>{" "}
                {content.workTime.endTime}
              </li>
              {content.eventOrNot === "Event" && (
                <li>
                  <b className="text-primary">Expire date:</b>{" "}
                  {content.expirationDate.slice(0, -14)}
                </li>
              )}
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
          {selectedButton === 3 && (
            <div className="m-5 w-full flex justify-center rounded-lg">
              <StaticMap
                location={{
                  lat: content.business.coordinates[0],
                  lng: content.business.coordinates[1],
                }}
              />
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
                        width: Number.isNaN(rateThree)
                          ? "0px"
                          : `${rateThree}%`,
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
                      {Number.isNaN(rateFive)
                        ? `0%`
                        : `${rateFive.toFixed(1)}%`}
                    </Text>
                  </div>
                  <div className="flex ml-2">
                    <MdStar className="text-yellow-600" size={20} />
                    <MdStar className="text-yellow-600" size={20} />
                    <MdStar className="text-yellow-600" size={20} />
                    <MdStar className="text-yellow-600" size={20} />
                    <MdStarBorder className="text-yellow-600" size={20} />
                    <Text className="text-white ml-1 text-sm">
                      {Number.isNaN(rateFour)
                        ? `0%`
                        : `${rateFour.toFixed(1)}%`}
                    </Text>
                  </div>
                  <div className="flex ml-2">
                    <MdStar className="text-yellow-600" size={20} />
                    <MdStar className="text-yellow-600" size={20} />
                    <MdStar className="text-yellow-600" size={20} />
                    <MdStarBorder className="text-yellow-600" size={20} />
                    <MdStarBorder className="text-yellow-600" size={20} />
                    <Text className="text-white ml-1 text-sm">
                      {Number.isNaN(rateThree)
                        ? `0%`
                        : `${rateThree.toFixed(1)}%`}
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
                      {content.reviews.map((review) =>
                        review.content ? (
                          <ReviewBody
                            userName={review.userName}
                            review={review.content}
                            time={review.timestamp}
                            reviewId={review._id}
                            customerId={review.customerId}
                            content={content}
                          />
                        ) : null
                      )}
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
                    type: content.eventOrNot,
                    operation: "edit",
                    data: content,
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
      )}
    </>
  );
}

export default Content;
