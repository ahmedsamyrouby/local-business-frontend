import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import {
  IconAlertTriangle,
  IconArrowBearRight2,
  IconBuilding,
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconMapPin,
  IconMessage,
  IconPlus,
  IconShare,
  IconSquareCheck,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Text,
  Modal,
  Rating,
  Textarea,
  rem,
  Title,
} from "@mantine/core";
import { BASE_URL } from "../../constants";
import { useCallback, useEffect, useState } from "react";
import ReviewCard, { Review } from "../../components/ReviewCard/ReviewCard";
import { useDisclosure } from "@mantine/hooks";
import { getLocalStorage } from "../../services/LocalStorageService";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import StaticMap from "../../components/StaticMap/StaticMap";
import CopyToClipboard from "react-copy-to-clipboard";
import { transformBusinesses } from "../../utils";
import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";
import marketPlaceholder from "../../assets/images/market.png";
import SkeletonGrid from "../../components/SkeletonGrid/SkeletonGrid";
import CustomerChat from "../CustomerChat/CustomerChat";
import axiosInstance from "../../services/AxiosService";

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
  const [chatOpened, { open: openChat, close: closeChat }] =
    useDisclosure(false);
  const customerId = getLocalStorage("userId");
  const [addReviewLoading, setAddReviewLoading] = useState(false);
  const userId = getLocalStorage("userId");
  const [isFavorite, setIsFavorites] = useState<boolean>(false);
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<
    Array<Business>
  >([]);
  const [isFetchingRecommended, setIsFetchingRecommended] =
    useState<boolean>(false);
  const location = useLocation();

  const getBusiness = useCallback(async () => {
    const res = await axiosInstance.get(`/customer/getBusinessById/${id}`);
    setBusiness(res.data.data);
  }, [id]);

  const getBusinessRating = useCallback(async () => {
    const res = await axiosInstance.get(`/businessOwner/rating/${id}`);
    setBusinessRating(res.data.rating);
  }, [id]);

  const requestAService = async (values: { request: string }) => {
    const res = await axiosInstance.post(
      `/customer/${customerId}/serviceRequest/${id}`,
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

  const getRecommendedBusinesses = useCallback(async () => {
    try {
      setIsFetchingRecommended(true);
      const res = await axiosInstance.get(`/Customer/recommend/${userId}`);
      setRecommendedBusinesses(transformBusinesses(res.data));
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingRecommended(false);
    }
  }, [userId]);

  const addReview = async (values: {
    review: string;
    rating: number | null;
  }) => {
    const reviewRes = await axiosInstance.post(
      `/customer/${customerId}/writeReview/${id}`,
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
    const ratingRes = await axiosInstance.post(
      `/customer/${customerId}/rate/${id}`,
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
    try {
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
    } finally {
      setAddReviewLoading(false);
      closeAddReview();
      getBusiness();
      reviewForm.reset();
    }
  };

  const addToFavorites = async () => {
    try {
      const res = await axiosInstance.post(
        `/Customer/addtofavorites/${customerId}/${id}`
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

  const getFavorites = useCallback(async () => {
    const res = await axiosInstance.get(`/customer/GetFavorites/${userId}`);
    const favoriteBusiness = transformBusinesses(res.data.favoriteBusinesses);
    setIsFavorites(favoriteBusiness.some((business) => business._id === id));
  }, [userId, id]);

  const deleteFromFavorites = async () => {
    try {
      const res = await axiosInstance.delete(
        `/Customer/DeleteFavorites/${customerId}/${id}`
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
  }, [
    location.pathname,
    getBusiness,
    getFavorites,
    getBusinessRating,
    getRecommendedBusinesses,
  ]);

  useEffect(() => {
    document.title = business.businessName;
  }, [business.businessName]);
  return (
    <div>
      <div style={{ height: rem(70), width: "100%" }} />
      {business.media && business.media.length > 0 && (
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
      )}
      <div className="max-w-[1350px] mx-auto relative my-10 flex gap-10">
        <div className="w-full flex flex-col gap-12 justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <div className="space-y-2 w-44">
                <div className="rounded overflow-hidden max-h-44">
                  {business?.logo?.length! > 0 ? (
                    <img
                      className="w-full h-full object-cover"
                      src={`${BASE_URL}/${business.logo}`}
                      alt={business.businessName}
                    />
                  ) : (
                    <img
                      className="w-full h-full bg-white object-contain p-4 border"
                      src={marketPlaceholder}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Button className="w-full" onClick={openRequestService}>
                    Request a Service
                  </Button>
                  <div className="flex gap-2 justify-between items-center">
                    <ActionIcon
                      size={"xl"}
                      onClick={
                        isFavorite ? deleteFromFavorites : addToFavorites
                      }
                    >
                      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
                    </ActionIcon>
                    <ActionIcon size={"xl"} onClick={openChat}>
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
                    <h1 className="text-[28px] font-bold text-black">
                      {business.businessName}
                    </h1>
                    <Rating value={businessRating} readOnly />
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <div className="flex items-center gap-1 text-primary">
                        <IconMapPin size={"18px"} />
                        <p className="text-gray-900">{business.Country}</p>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <IconBuilding size={"18px"} />
                        <p className="text-gray-900">{business.category}</p>
                      </div>
                      {business.workTime && (
                        <div className="flex items-center gap-1 text-primary">
                          <IconClock size={"18px"} />
                          <p className="text-gray-900">
                            {business.workTime.startTime} -{" "}
                            {business.workTime.endTime}
                          </p>
                        </div>
                      )}
                    </div>
                    {business.days && business.days.length > 0 && (
                      <div>
                        <h2 className="font-semibold text-primary">
                          Working Days:
                        </h2>
                        {business.days.map((day: string) => (
                          <p key={day} className="text-gray-900">
                            {day}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {business.description && (
              <div className="w-full">
                <h1 className="text-primary text-2xl font-bold w-full py-5">
                  About
                </h1>
                <p className="text-black bg-gray-100 p-5 rounded-md">
                  {business.description}
                </p>
              </div>
            )}
          </div>

          {business.reviews && (
            <div>
              <div className="w-full py-5 flex justify-between items-center">
                <h1 className="text-primary text-2xl font-bold">Reviews</h1>
                <Button rightSection={<IconPlus />} onClick={openAddReview}>
                  Add Review
                </Button>
              </div>
              {business.reviews.length ? (
                <div className="py-2 px-5 overflow-hidden rounded-md bg-gray-100">
                  {business.reviews.map(
                    (review: Review, idx: number) =>
                      review.content && (
                        <div key={review._id}>
                          <ReviewCard review={review} />
                          {idx !== business.reviews.length - 1 && (
                            <Divider className="border-t-white" />
                          )}
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="w-full h-40 flex-center rounded-md bg-gray-100">
                  <p className="text-gray-900 text-lg">No reviews yet</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          {business.business && (
            <div className="sticky top-[70px] flex flex-col gap-3 border p-5 rounded-md">
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

              <Box>
                <Title order={4}>Address</Title>
                <Text>{business.address}</Text>
                <Button
                  className="w-full"
                  component="a"
                  onClick={openAddReview}
                  href={`http://maps.google.com/maps?z=15&t=m&q=${business.business.coordinates[1]},${business.business.coordinates[0]}`}
                  target="_blank"
                  rightSection={<IconArrowBearRight2 />}
                >
                  Get Dierctions
                </Button>
              </Box>
            </div>
          )}
        </div>
      </div>

      {/* RECOMMENDED BUSINESSES SECTION */}
      <Box className="p-12 flex flex-col gap-6">
        <h2 className="text-3xl font-bold">
          Recommended <span className="text-primary">For You</span>
        </h2>
        {isFetchingRecommended ? (
          <SkeletonGrid cardsCount={5} />
        ) : (
          <Carousel
            slideSize={{ base: "100%", xs: "50%", md: "20%" }}
            slideGap={{ base: 0, xs: "md" }}
            align="start"
            draggable
            containScroll="trimSnaps"
            withControls={recommendedBusinesses.length > 5}
          >
            {recommendedBusinesses.map((business, idx) => (
              <Carousel.Slide key={idx}>
                <BusinessCard key={business._id} business={business} />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Box>

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

      <Modal
        title={business.businessName}
        opened={chatOpened}
        onClose={closeChat}
        size={"xl"}
        centered
        classNames={{
          title: "text-primary text-center ms-7 text-[1.25rem] w-full",
          inner: "z-[1200]",
          overlay: "z-[1100]",
        }}
      >
        <CustomerChat customerId={userId!} businessId={id!} />
      </Modal>
    </div>
  );
};

export default BusinessDetails;
