import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import {
  IconAlertTriangle,
  IconBookmark,
  IconBookmarkFilled,
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
import CopyToClipboard from "react-copy-to-clipboard";
import { transformBusinesses } from "../../utils";
import {
  Business,
  MobileBusinessCard,
} from "../../components/BusinessCard/BusinessCard";

const BusinessDetails = () => {
  const { id } = useParams();
  const reviewForm = useForm({
    initialValues: {
      review: "",
      rating: null,
    },
  });
  const requestServiceForm = useForm({
    initialValues: {
      request: "",
    },

    validate: {
      request: (value) =>
        value.length > 0 ? null : "Request details are required",
    },
  });
  const [business, setBusiness] = useState<any>({});
  const [businessRating, setBusinessRating] = useState<number | undefined>(
    undefined
  );
  const [addReviewOpened, { open: openAddReview, close: closeAddReview }] =
    useDisclosure(false);
  const [
    requestServiceOpened,
    { open: openRequestService, close: closeRequestService },
  ] = useDisclosure(false);
  const customerId = getLocalStorage("userId");
  const [addReviewLoading, setAddReviewLoading] = useState(false);
  const userId = getLocalStorage("userId");
  const [isFavorite, setIsFavorites] = useState<boolean>(false);
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<
    Array<Business>
  >([]);
  const location = useLocation();

  const getBusiness = async () => {
    const res = await axios.get(`${BASE_URL}/customer/getBusinessById/${id}`);
    setBusiness(res.data.data);
  };

  const getBusinessRating = async () => {
    const res = await axios.get(`${BASE_URL}/businessOwner/rating/${id}`);
    setBusinessRating(res.data.rating);
  };

  const requestAService = async (values: { request: string }) => {
    const res = await axios.post(
      `${BASE_URL}/customer/${customerId}/serviceRequest/${id}`,
      {
        requestDetails: values.request,
      }
    );
    if (res.status === 201 || res.status === 200) {
      notifications.show({
        message: "Service requested successfully",
        autoClose: 2000,
        icon: <IconSquareCheck />,
        classNames: {
          icon: "bg-transparent text-green-500",
        },
      });
    }
    closeRequestService();
    requestServiceForm.reset();
  };

  const getRecommendedBusinesses = async () => {
    const res = await axios.get(`${BASE_URL}/Customer/recommend/${userId}`);
    setRecommendedBusinesses(transformBusinesses(res.data));
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

  const addToFavorites = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Customer/favorites/${customerId}/${id}`
      );

      if (res.status === 201) {
        notifications.show({
          message: "Business added to favorites successfully",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
        setIsFavorites(true);
      }
    } catch (error: any) {
      notifications.show({
        message: error.response.data.error,
        autoClose: 2000,
        icon: <IconAlertTriangle />,
        classNames: {
          icon: "bg-transparent text-yellow-500",
        },
      });
    }
  };

  const getFavorites = async () => {
    const res = await axios.get(`${BASE_URL}/customer/GetFavorites/${userId}`);
    const favoriteBusiness = transformBusinesses(res.data.favoriteBusinesses);
    setIsFavorites(favoriteBusiness.some((business) => business._id === id));
  };

  const deleteFromFavorites = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/Customer/DeleteFavorites/${customerId}/${id}`
      );

      if (res.status === 200) {
        notifications.show({
          message: "Business removed from favorites successfully",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
        setIsFavorites(false);
      }
    } catch (error: any) {
      notifications.show({
        message: error.response.data.error,
        autoClose: 2000,
        icon: <IconAlertTriangle />,
        classNames: {
          icon: "bg-transparent text-yellow-500",
        },
      });
    }
  };

  useEffect(() => {
    getBusiness();
    getFavorites();
    getBusinessRating();
    getRecommendedBusinesses();
  }, [location.pathname]);

  return (
    <div className="w-full min-h-screen bg-gray-900 overflow-hidden">
      {business.media && business.media.length > 0 && (
        <div>
          <Carousel withIndicators height={400} loop>
            {business.media.map((image: string, index: number) => (
              <Carousel.Slide key={index}>
                <img
                  src={`${BASE_URL}/${image}`}
                  alt={`${business.businessName} image ${index}`}
                  className="w-full h-full object-cover"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      )}
      <div className="max-w-[1350px] mx-auto relative">
        <div className="flex justify-between mt-5 p-5">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <div className="space-y-2">
                <div className="rounded overflow-hidden w-44 max-h-44">
                  <img
                    className="w-full h-full object-cover"
                    src={`${BASE_URL}/${business.logo}`}
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <Button className="w-full" onClick={openRequestService}>
                      Request a Service
                    </Button>
                  </div>
                  <div className="flex gap-2 justify-between items-center">
                    {isFavorite ? (
                      <ActionIcon size={"xl"} onClick={deleteFromFavorites}>
                        <IconBookmarkFilled />
                      </ActionIcon>
                    ) : (
                      <ActionIcon size={"xl"} onClick={addToFavorites}>
                        <IconBookmark />
                      </ActionIcon>
                    )}
                    <ActionIcon size={"xl"}>
                      <IconMessage />
                    </ActionIcon>
                    <CopyToClipboard
                      text={window.location.href}
                      onCopy={() => {
                        notifications.show({
                          message: "Link copied to clipboard",
                          autoClose: 2000,
                          icon: <IconSquareCheck />,
                          classNames: {
                            icon: "bg-transparent text-green-500",
                          },
                        });
                      }}
                    >
                      <ActionIcon size={"xl"}>
                        <IconShare />
                      </ActionIcon>
                    </CopyToClipboard>
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
        <div className="flex">
          {business.reviews && (
            <div className="w-2/3 me-5">
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
            </div>
          )}
          <Divider className="border-l-white/80" orientation="vertical" />
          {recommendedBusinesses && (
            <div className="w-1/3 p-5">
              <h1 className="text-white text-2xl font-bold">
                Recommended <span className="text-primary">For You</span>
              </h1>
              <div className="flex flex-col gap-2">
                {recommendedBusinesses.map((business: Business) => (
                  <MobileBusinessCard key={business._id} business={business} />
                ))}
              </div>
            </div>
          )}
        </div>
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
        <form
          onSubmit={requestServiceForm.onSubmit((values) =>
            requestAService(values)
          )}
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
              {...requestServiceForm.getInputProps("request")}
            />
          </div>
          <Button type="submit" className="mt-5 w-full">
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default BusinessDetails;
