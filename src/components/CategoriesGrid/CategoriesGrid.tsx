import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBurger,
  IconShoppingBag,
  IconHeart,
  IconFirstAidKit,
  IconBeach,
  IconBook,
  IconHome,
  IconBrush,
  IconIroning,
  IconCar,
  IconSchool,
  IconDots,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Restaurants and Cafés", icon: IconBurger, color: "violet" },
  { title: "Retail Stores", icon: IconShoppingBag, color: "grape" },
  { title: "Health and Beauty Services", icon: IconHeart, color: "blue" },
  {
    title: "Medical and Healthcare Services",
    icon: IconFirstAidKit,
    color: "green",
  },
  { title: "Tourism and Hospitality", icon: IconBeach, color: "teal" },
  { title: "Education and Training Centers", icon: IconSchool, color: "cyan" },
  { title: "Real Estate and Construction", icon: IconHome, color: "pink" },
  { title: "Arts and Entertainment", icon: IconBrush, color: "red" },
  { title: "Home Services", icon: IconIroning, color: "orange" },
  { title: "Auto Services", icon: IconCar, color: "indigo" },
  { title: "Book Store", icon: IconBook, color: "lime" },
  { title: "Other", icon: IconDots, color: "dark" },
];

const CategoriesGrid = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const items = categories.map((item) => (
    <UnstyledButton
      key={item.title}
      className={
        "p-2 flex flex-col items-center justify-center text-center rounded-md h-[90px] bg-white dark:bg-dark-700 transition-all duration-150 ease-in-out hover:shadow-md hover:scale-105"
      }
      onClick={() =>
        navigate("/explore", {
          state: { category: item.title === "Other" ? null : item.title },
        })
      }
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={"bg-gray-100"}>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
};

export default CategoriesGrid;
