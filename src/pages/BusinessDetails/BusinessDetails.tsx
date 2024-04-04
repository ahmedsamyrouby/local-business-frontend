import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import {
  IconBookmark,
  IconBuilding,
  IconClock,
  IconMapPin,
  IconMessage,
  IconPlus,
  IconShare,
  IconSquareCheck,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Button,
  Divider,
  Modal,
  Rating,
  Textarea,
} from "@mantine/core";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useEffect, useState } from "react";
import ReviewCard, { Review } from "../../components/ReviewCard/ReviewCard";
import { useDisclosure } from "@mantine/hooks";
import { getLocalStorage } from "../../services/LocalStorageService";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import StaticMap from "../../components/StaticMap/StaticMap";

const BusinessDetails = () => {
  const { id } = useParams();
  const reviewForm = useForm({
    initialValues: {
      review: "",
      rating: null,
    },
  });
  const [business, setBusiness] = useState<any>({});
  const [businessRating, setBusinessRating] = useState<number | null>(null);
  const [addReviewOpened, { open: openAddReview, close: closeAddReview }] =
    useDisclosure(false);
  const [
    requestServiceOpened,
    { open: openRequestService, close: closeRequestService },
  ] = useDisclosure(false);
  const customerId = getLocalStorage("userId");
  const [addReviewLoading, setAddReviewLoading] = useState(false);

  const getBusiness = async () => {
    const res = await axios.get(`${BASE_URL}/customer/getBusinessById/${id}`);
    setBusiness(res.data.data);
  };

  const getBusinessRating = async () => {
    const res = await axios.get(`${BASE_URL}/businessOwner/rating/${id}`);
    setBusinessRating(res.data.rating);
  };

  const addReview = async (values: {
    review: string;
    rating: number | null;
  }) => {
    const reviewRes = await axios.post(
      `${BASE_URL}/customer/${customerId}/writeReview/${id}`,
      {
        review: values.review,
      }
    );
    return reviewRes;
  };

  const addRating = async (values: {
    review: string;
    rating: number | null;
  }) => {
    const ratingRes = await axios.post(
      `${BASE_URL}/customer/${customerId}/rate/${id}`,
      {
        starRating: values.rating,
      }
    );
    return ratingRes;
  };

  const reviewBusiness = async (values: {
    review: string;
    rating: number | null;
  }) => {
    setAddReviewLoading(true);
    if (values.review && !values.rating) {
      const res = await addReview(values);
      if (res.status === 201) {
        notifications.show({
          message: "Review added successfully",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
      }
    } else if (values.rating && !values.review) {
      const res = await addRating(values);
      if (res.status === 201) {
        notifications.show({
          message: "Rating added successfully",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
      }
    } else {
      const res = await addReview(values);
      const res2 = await addRating(values);
      if (res.status === 201 && res2.status === 201) {
        notifications.show({
          message: "Review and Rating added successfully",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
      }
    }
    closeAddReview();
    getBusiness();
    reviewForm.reset();
    setAddReviewLoading(false);
  };

  useEffect(() => {
    getBusiness();
    getBusinessRating();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 overflow-hidden">
      {business.media && business.media.length > 0 && (
        <div>
          <Carousel withIndicators height={400} loop>
            {business.media.map((image: string, index: number) => (
              <Carousel.Slide key={index}>
                <img
                  src={image}
                  alt={`${business.businessName} image ${index}`}
                  className="w-full h-full object-cover"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      )}
      <div className="max-w-[1350px] mx-auto relative">
        <div className="flex justify-between mt-5 p-10">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <div className="space-y-2">
                <div className="rounded overflow-hidden w-44 max-h-44">
                  <img
                    className="w-full h-full object-cover"
                    src="http://placeholder.com/150"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <Button className="w-full" onClick={openRequestService}>
                      Request a Service
                    </Button>
                  </div>
                  <div className="flex gap-2 justify-between items-center">
                    <ActionIcon size={"xl"}>
                      <IconBookmark />
                    </ActionIcon>
                    <ActionIcon size={"xl"}>
                      <IconMessage />
                    </ActionIcon>
                    <ActionIcon size={"xl"}>
                      <IconShare />
                    </ActionIcon>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="mb-2">
                    <h1 className="text-[28px] font-bold text-white">
                      {business.businessName}
                    </h1>
                    <Rating value={businessRating} readOnly />
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <div></div>
                      <div className="flex items-center gap-1 text-primary">
                        <IconMapPin size={"18px"} />
                        <p className="text-white/80">{business.Country}</p>
                      </div>
                      {/* <div className="flex items-center gap-1 text-primary">
              <IconPhone size={"18px"} />
              <p className="text-white/80">+20 123 456 7891</p>{" "}
              // TODO - get real phone number
            </div> */}
                      <div className="flex items-center gap-1 text-primary">
                        <IconBuilding size={"18px"} />
                        <p className="text-white/80">{business.category}</p>
                      </div>
                      {business.workTime && (
                        <div className="flex items-center gap-1 text-primary">
                          <IconClock size={"18px"} />
                          <p className="text-white/80">
                            {business.workTime.startTime} -{" "}
                            {business.workTime.endTime}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      {business.days && business.days.length > 0 && (
                        <div>
                          <h2 className="font-semibold text-white">
                            Working Days:
                          </h2>
                          <>
                            {business.days.map((day: string) => (
                              <p className="text-white/80">{day}</p>
                            ))}
                          </>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {business.description && (
              <>
                <div className="flex justify-between gap-3">
                  <div>
                    <h1 className="text-white text-2xl font-bold">About</h1>
                    <p className="text-white/80">{business.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          {business.business && (
            <div>
              <a
                href={`http://maps.google.com/maps?z=15&t=m&q=${business.business.coordinates[0]},${business.business.coordinates[1]}`}
                target="_blank"
              >
                <StaticMap
                  location={{
                    lat: business.business.coordinates[0],
                    lng: business.business.coordinates[1],
                  }}
                />
              </a>
            </div>
          )}
        </div>
        <Divider className="border-t-white/80" />

        {business.reviews && (
          <>
            <div className="w-full p-5 flex justify-between items-center">
              <h1 className="text-white text-2xl font-bold">Reviews</h1>
              <Button rightSection={<IconPlus />} onClick={openAddReview}>
                Add Review
              </Button>
            </div>
            {business.reviews.length ? (
              <div className="rounded overflow-hidden mb-10">
                {business.reviews.map((review: Review, idx: number) => (
                  <>
                    <ReviewCard key={review._id} review={review} />
                    {idx !== business.reviews.length - 1 && (
                      <Divider className="border-t-gray-900" />
                    )}
                  </>
                ))}
              </div>
            ) : (
              <div className="w-full h-40 flex items-center justify-center">
                <p className="text-white/80 text-lg">No reviews yet</p>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        opened={addReviewOpened}
        onClose={closeAddReview}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        classNames={{
          inner: "z-[1200]",
          overlay: "z-[1100]",
        }}
      >
        <form
          onSubmit={reviewForm.onSubmit((values) => reviewBusiness(values))}
        >
          <div className="space-y-5 h-fit">
            <h1 className="text-2xl font-bold w-full text-center">
              Add a review
            </h1>
            <div className="w-full flex flex-col gap-1 items-center justify-center">
              <span className="font-[500]">Overall Rating</span>
              <Rating size={"lg"} {...reviewForm.getInputProps("rating")} />
            </div>
            <Divider />
            <Textarea
              classNames={{
                input: "h-40",
              }}
              label={"Write a review for the business"}
              placeholder={"Write your review here..."}
              {...reviewForm.getInputProps("review")}
            />
          </div>
          <Button
            type="submit"
            className="mt-5 w-full"
            loading={addReviewLoading}
          >
            Submit Review
          </Button>
        </form>
      </Modal>
      <Modal
        opened={requestServiceOpened}
        onClose={closeRequestService}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        classNames={{
          inner: "z-[1200]",
          overlay: "z-[1100]",
        }}
      >
        <div className="space-y-5 h-fit">
          <h1 className="text-2xl font-bold w-full text-center">
            Request a Service
          </h1>
          <Textarea
            classNames={{
              input: "h-40",
            }}
            label={"Service request details"}
            placeholder={"Write your service request details here..."}
          />
        </div>
        <Button type="submit" className="mt-5 w-full">
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default BusinessDetails;
