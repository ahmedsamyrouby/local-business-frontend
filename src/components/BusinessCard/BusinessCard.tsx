import { Badge, Button, Image } from "@mantine/core";
import {
  IconArrowRight,
  IconMapPin,
} from "@tabler/icons-react";

import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

export type Business = {
  _id: string;
  businessName: string;
  category: string;
  Country: string;
  logo: string;
};

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const isMobile = useMediaQuery("(max-width: 48em)");
  return isMobile ? (
    <MobileBusinessCard business={business} />
  ) : (
    <DesktopBusinessCard business={business} />
  );
};

const DesktopBusinessCard = ({ business }: BusinessCardProps) => {
  const navigate = useNavigate();
  return (
    <article
      key={business._id}
      className="bg-white rounded-md shadow-lg overflow-hidden"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/explore/${business._id}`);
      }}
    >
      <div className="relative">
        <Image
          src={`${BASE_URL}/${business.logo}`}
          alt={business.businessName}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{business.businessName}</h1>
        <div className="flex items-center mb-2">
          <IconMapPin size={"18px"} />
          <p className="text-gray-600 ml-2">{business.Country}</p>
        </div>
        <div className="flex items-center mb-2">
          {/* <Rating value={3} size={"md"} /> */}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <ActionIcon size={32} className="bg-transparent text-primary mr-2">
              <IconBookmark />
            </ActionIcon>
            <ActionIcon size={32} className="bg-transparent text-primary">
              <IconShare />
            </ActionIcon> */}
            <Button
              rightSection={<IconArrowRight />}
              className="bg-transparent text-primary mr-2 p-0"
            >
              View Business
            </Button>
          </div>
          <Badge
            radius={"sm"}
            className="z-2 text-md border border-primary max-w-40"
            variant="light"
            size="lg"
          >
            {business.category}
          </Badge>
          {/* Show different badge for open/closed */}
          {/* <Badge
      radius={"sm"}
      className="text-xs bg-red-700 ml-2 px-2 py-1"
    >
      Closed
    </Badge> */}
        </div>
      </div>
    </article>
  );
};

const MobileBusinessCard = ({ business }: BusinessCardProps) => {
  const navigate = useNavigate();
  return (
    <article
      key={business._id}
      className="mt-4 flex justify-between bg-gray-200 w-full h-32 p-2 rounded-sm"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/explore/${business._id}`);
      }}
    >
      <div className="flex gap-2">
        <div className="min-w-24 max-w-28 h-full rounded-sm overflow-hidden relative">
          <Image
            className={"object-cover h-full w-full"}
            src={`${BASE_URL}/${business.logo}`}
          />
          {/* TODO - Add "Open now" and "Closed" Badge depending on working hours */}
          {/* <Badge
                radius={"sm"}
                className="text-[10px] bg-red-700 absolute top-1.5 left-1.5"
              >
                Closed
              </Badge> 
          */}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-xl font-bold">{business.businessName}</h1>
            <div className="flex items-center gap-1 text-gray-500">
              <IconMapPin size={"18px"} />
              <p className="text-sm">{business.Country}</p>
            </div>
          </div>
          {/* TODO - get real business rating */}
          {/* <Rating value={3} size={"md"} /> */}
          <Badge
            radius={"sm"}
            className="z-2 text-[10px] border border-primary max-w-40"
            variant="light"
          >
            {business.category}
          </Badge>
        </div>
      </div>
      <div className="h-full flex flex-col justify-between">
        {/* <ActionIcon size={32} className="bg-transparent text-primary p-1">
          <IconBookmark />
        </ActionIcon>
        <ActionIcon size={32} className="bg-transparent text-primary p-1">
          <IconShare />
        </ActionIcon> */}
      </div>
    </article>
  );
};

export default BusinessCard;
