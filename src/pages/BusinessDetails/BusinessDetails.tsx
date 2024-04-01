import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import {
  IconBuilding,
  IconClock,
  IconMapPin,
  IconPhone,
  IconPlus,
} from "@tabler/icons-react";
import { Button, Divider, Modal, Rating, Textarea } from "@mantine/core";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useEffect, useState } from "react";
import ReviewCard, { Review } from "../../components/ReviewCard/ReviewCard";
import { useDisclosure } from "@mantine/hooks";
import Map from "../../components/Map/Map";

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState<any>({});
  const [opened, { open, close }] = useDisclosure(false);

  const getBusiness = async () => {
    const res = await axios.get(`${BASE_URL}/customer/getBusinessById/${id}`);
    setBusiness(res.data.data);
  };

  useEffect(() => {
    getBusiness();
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
      <div className="max-w-[1350px] mx-auto">
        <div className="flex gap-6 mt-5 p-10">
          <div className="rounded overflow-hidden w-44">
            <img
              className="w-full h-full object-cover"
              src="http://placeholder.com/150"
            />
          </div>
          <div>
            <h1 className="text-[28px] font-bold text-white">
              {business.businessName}
            </h1>
            <div className="flex items-center gap-1 text-primary">
              <IconMapPin size={"18px"} />
              <p className="text-white/80">{business.Country}</p>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <IconPhone size={"18px"} />
              <p className="text-white/80">+20 123 456 7891</p>{" "}
              {/* TODO - get real phone number */}
            </div>
            <div className="flex items-center gap-1 text-primary">
              <IconBuilding size={"18px"} />
              <p className="text-white/80">{business.category}</p>
            </div>
            {business.workTime && (
              <div className="flex items-center gap-1 text-primary">
                <IconClock size={"18px"} />
                <p className="text-white/80">
                  {business.workTime.startTime} - {business.workTime.endTime}
                </p>
              </div>
            )}
          </div>
        </div>
        <Divider className="border-t-white/80" />
        {business.description && (
          <>
            <div className="flex justify-between gap-3 p-5">
              <div>
                <h1 className="text-white text-2xl font-bold">About</h1>
                <p className="text-white/80">{business.description}</p>
              </div>
              <div className="w-96">
                <a
                  href="https://maps.google.com/maps?&amp;q=31,31"
                  target="_blank"
                >
                  <Map
                    location={{
                      lat: 31,
                      lng: 31,
                    }}
                    setLocation={() => {}}
                  />
                </a>
              </div>
            </div>
            <Divider className="border-t-white/80" />
          </>
        )}
        {business.reviews && (
          <>
            <div className="w-full p-5 flex justify-between items-center">
              <h1 className="text-white text-2xl font-bold">Reviews</h1>
              <Button rightSection={<IconPlus />} onClick={open}>
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
        opened={opened}
        onClose={close}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form>
          <div className="space-y-5 h-fit">
            <h1 className="text-2xl font-bold w-full text-center">
              Add a review
            </h1>
            <div className="w-full flex flex-col gap-1 items-center justify-center">
              <span className="font-[500]">Overall Rating</span>
              <Rating size={"lg"} />
            </div>
            <Divider />
            <Textarea
              classNames={{
                input: "h-40",
              }}
              label={"Write a review for the business"}
              placeholder={"Write your review here..."}
            />
          </div>
          <Button type="submit" className="mt-5 w-full">
            Submit Review
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default BusinessDetails;
