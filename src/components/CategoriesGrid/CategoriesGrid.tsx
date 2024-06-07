import { Card, Text, SimpleGrid, UnstyledButton, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/AxiosService";
import { BASE_URL } from "../../constants";
import { Category } from "../../defines";

const CategoriesGrid = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const navigate = useNavigate();
  async function getCategories() {
    try {
      const response = await axiosInstance.get(`/admin/listCategories`);
      setCategory(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  const items = category.slice(0, Math.min(category.length, 24)).map((item) => (
    <UnstyledButton
      key={item._id}
      className={
        "p-2 flex flex-col items-center justify-center text-center rounded-md h-[90px] bg-white dark:bg-dark-700 transition-all duration-150 ease-in-out hover:shadow-md hover:scale-105"
      }
      onClick={() =>
        navigate("/explore", {
          state: { category: item.name === "Other" ? null : item.name },
        })
      }
    >
      <Image src={`${BASE_URL}/${item.icon}`} className="w-7" />
      <Text size="xs" mt={7}>
        {item.name}
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
