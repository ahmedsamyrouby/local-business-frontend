import { ActionIcon, Badge, Image, Rating } from "@mantine/core";
import { IconBookmark, IconMapPin, IconShare } from "@tabler/icons-react";

import Spinneys from "../../assets/images/spinneys-logo.jpg";

export type Business = {
  _id: string;
  businessName: string;
  category: string;
  Country: string;
};

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <article
      key={business._id}
      className="mt-4 flex justify-between bg-gray-200 w-full h-32 p-2 rounded-sm"
    >
      <div className="flex gap-2">
        <div className="min-w-24 max-w-28 h-full rounded-sm overflow-hidden relative">
          <Image className={"object-cover h-full w-full"} src={Spinneys} />
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
          <Rating value={3} size={"md"} />
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
        <ActionIcon size={32} className="bg-transparent text-primary p-1">
          <IconBookmark />
        </ActionIcon>
        <ActionIcon size={32} className="bg-transparent text-primary p-1">
          <IconShare />
        </ActionIcon>
      </div>
    </article>
  );
};

export default BusinessCard;
