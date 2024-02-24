import { Button, Image, Text, ScrollArea, Title } from "@mantine/core";
import { useMediaQuery } from "react-responsive";
import { FaLocationDot } from "react-icons/fa6";
import Photo from "../../assets/images/3564954.jpg";
import Photo2 from "../../assets/images/3514981.jpg";
import { useState } from "react";

function OwnerBuisness({
  isIpadHeight,
  isIphoneHeight,
}: {
  isIpadHeight?: boolean;
  isIphoneHeight?: boolean;
}) {
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isContent, setIsContent] = useState(false);
  const [content, setContent] = useState(0);

  return (
    <div
      className={
        !isLarge
          ? "flex flex-col px-3 pb-7 pt-1 gap-2 rounded-sm"
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
          // classNames={{ scrollbar: "bg-primary" }}
        >
          <div className="flex flex-col gap-2">
            <div
              className={
                isContent && content
                  ? "bg-black w-full rounded "
                  : "w-full hover:ease-in delay-150 duration-200 hover:p-1 rounded "
              }
            >
              <Image
                src={Photo2}
                radius="md"
                className="h-28 hover:shadow-xl transition-shadow object-cover w-full"
                fit="-moz-initial"
                onClick={() => {
                  setIsContent(!isContent);
                  setContent(2);
                }}
              />
              {content == 2 && isContent ? <Content /> : null}
            </div>
            <div
              className={
                isContent && content
                  ? "bg-black w-full rounded "
                  : "w-full hover:ease-in delay-150 duration-200 hover:p-1 rounded "
              }
            >
              <Image
                src={Photo}
                radius="md"
                className="h-28 hover:shadow-xl transition-shadow object-cover w-full"
                onClick={() => {
                  setIsContent(!isContent);
                  setContent(1);
                }}
              />
              {content == 1 && isContent ? <Content /> : null}
            </div>
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

function Content() {
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      <div className="flex gap-1">
        <Text className="bg-primary rounded-lg w-34 p-1 text-center text-sm text-gray-300 font-serif italic font-bold">
          Business Name :
        </Text>
        <Text className="font-bold pb-1 text-gray-300 text-lg">Market</Text>
      </div>
      <div className="flex gap-1">
        <Text className="bg-primary rounded-lg w-34 p-1 text-center text-sm text-gray-300 font-serif italic font-bold">
          country:
        </Text>
        <Text className="font-bold pb-1 text-gray-300 text-lg">Egypt</Text>
      </div>
      <div className="flex gap-1">
        <Text className="bg-primary rounded-lg w-34 p-1 text-center text-sm text-gray-300 font-serif italic font-bold">
          Active :
        </Text>
        <Text className="font-bold pb-1 text-gray-300 text-lg">24Hours</Text>
      </div>
      <div className="flex gap-1">
        <Text className="flex bg-primary rounded-lg w-34 p-1 text-center text-sm text-gray-300 font-serif italic font-bold">
          <FaLocationDot className="mr-1 mt-0.5" />
          Location :
        </Text>
        <Text className="font-bold pb-1 text-gray-300 text-lg"></Text>
      </div>

      <div className="flex col-span-2 gap-1">
        <Text className="bg-primary h-8  rounded-lg p-1 text-center text-sm text-gray-300 font-serif italic font-bold">
          Description:
        </Text>
        <Text className="font-bold pb-1 text-gray-300 text-lg">
          Welcome to our Buisness we have different products of different
          categories
        </Text>
      </div>
    </div>
  );
}
