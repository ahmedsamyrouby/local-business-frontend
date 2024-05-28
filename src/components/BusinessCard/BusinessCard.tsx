import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Rating,
  Text,
} from "@mantine/core";
import { IconHeart, IconMapPin } from "@tabler/icons-react";

import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

import marketPlaceholder from "../../assets/images/market.png";

export type Business = {
  _id: string;
  businessName: string;
  category: string;
  country: string;
  logo: string;
  rate?: number;
  description?: string;
};

export interface BusinessCardProps {
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
  console.log(business);
  return (
    <Card withBorder className="rounded-md p-3 bg-gray-100/50 shadow-sm">
      <Card.Section>
        <Image
          className="h-60"
          src={
            business?.logo?.length! > 0
              ? `${BASE_URL}/${business.logo}`
              : marketPlaceholder
          }
        />
      </Card.Section>

      <Card.Section className="mt-4 border-b space-y-2 border-gray-200 px-4 pb-4">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {business.businessName}
          </Text>
          <Badge size="sm" variant="light" color="pink.7">
            {business.country}
          </Badge>
        </Group>
        <Rating value={business.rate} size={"md"} fractions={2} readOnly />
        <Text className="text-sm truncate">
          {business.description || "No description available"}
        </Text>
      </Card.Section>

      <Card.Section className={"mt-2 border-b border-gray-200 px-4 pb-4"}>
        <Group gap={"sm"}>
          <Text mt="md" className={"uppercase text-sm font-bold"} c="dimmed">
            Category
          </Text>
        </Group>
        <Badge variant="light">{business.category}</Badge>
      </Card.Section>

      <Group mt="xs">
        <Button
          radius="md"
          style={{ flex: 1 }}
          onClick={() => navigate(`/explore/${business._id}`)}
        >
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={"text-pink-600"} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
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
          {business?.logo?.length! > 0 ? (
            <Image
              className={"object-cover h-full w-full"}
              src={`${BASE_URL}/${business.logo}`}
            />
          ) : (
            <Image
              className={"object-contain bg-white h-full w-full p-4"}
              src={marketPlaceholder}
            />
          )}
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
              <p className="text-sm">{business.country}</p>
            </div>
          </div>
          {business.rate ? (
            <Rating value={business.rate} size={"md"} fractions={2} readOnly />
          ) : (
            <span className="h-5"></span>
          )}
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
export { DesktopBusinessCard, MobileBusinessCard };
