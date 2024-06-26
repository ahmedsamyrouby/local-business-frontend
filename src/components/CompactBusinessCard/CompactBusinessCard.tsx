import { useNavigate } from "react-router-dom";
import { BusinessCardProps } from "../BusinessCard/BusinessCard";
import { BASE_URL } from "../../constants";
import { IconArrowRight, IconMapPin } from "@tabler/icons-react";
import { ActionIcon, Badge, Image, Rating } from "@mantine/core";

import marketPlaceholder from "../../assets/images/market.png";

const CompactBusinessCard = ({ business }: BusinessCardProps) => {
  const navigate = useNavigate();

  return (
    <article
      className="bg-white rounded-md shadow-lg overflow-hidden cursor-pointer"
      onClick={() => navigate(`/explore/${business._id}`)}
    >
      <div className="relative">
        {business?.logo?.length! > 0 ? (
          <Image
            src={`${BASE_URL}/${business.logo}`}
            alt={business.businessName}
            className="w-full h-40 object-cover"
          />
        ) : (
          <Image
            src={marketPlaceholder}
            alt={business.businessName}
            className="w-full h-40 object-contain p-4"
          />
        )}
      </div>
      <div className="p-2">
        <h1 className="text-lg font-bold">{business.businessName}</h1>
        <div className="flex items-center mb-1">
          <IconMapPin size={"16px"} />
          <p className="text-gray-600 ml-1">{business.Country}</p>
        </div>
        {business.rate && <Rating value={business.rate} size={"sm"} />}
        <div className="flex justify-between gap-1 items-center">
          <Badge
            radius={"sm"}
            size="sm"
            className="border border-primary"
            variant="light"
          >
            {business.category}
          </Badge>
          <ActionIcon className="bg-transparent text-primary text-sm">
            <IconArrowRight />
          </ActionIcon>
        </div>
      </div>
    </article>
  );
};

export default CompactBusinessCard;
