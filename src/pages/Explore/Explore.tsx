import {
  TextInput,
  Select,
  Pagination,
  Box,
  Text,
  Card,
  Image,
  Title,
  rem,
} from "@mantine/core";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
  IconCircleXFilled,
  IconMoodSad,
  IconSearch,
} from "@tabler/icons-react";
import { BASE_URL, BUSINESS_CATEGORIES } from "../../constants/index";
import { useEffect, useState, useCallback, useMemo } from "react";
import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";
import { transformBusinesses } from "../../utils";
import { useLocation } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import clsx from "clsx";

import { useHeadroom } from "@mantine/hooks";
import SkeletonGrid from "../../components/SkeletonGrid/SkeletonGrid";
import { getLocalStorage } from "../../services/LocalStorageService";
import axiosInstance from "../../services/AxiosService";
import { Category } from "../../defines";

const paginationLimits = ["10", "25", "50", "100"];

const Explore = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(location.state?.search || "");
  const [isLoading, setILoading] = useState(true);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
    code: 0,
  });
  const [businesses, setBusinesses] = useState<Array<Business>>([]);
  const [favoriteBusinesses, setFavoriteBusinesses] = useState<Array<Business>>(
    []
  );
  const [selectedFilter, setSelectedFilter] = useState<string>(
    location.state?.category || ""
  );
  const [category, setCategory] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLimitSelect, setPaginationLimitSelect] = useState("10");
  const pinned = useHeadroom({ fixedAt: 140 });
  const userId = getLocalStorage("userId");

  async function getCategories() {
    try {
      const response = await axiosInstance.get(`/admin/listCategories`);
      setCategory(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  }
  const searchBusinesses = useCallback(
    async (
      page: number,
      limit: number,
      category?: (typeof BUSINESS_CATEGORIES)[number],
      search?: string
    ) => {
      try {
        setILoading(true);
        const res = await axiosInstance.get(
          `/customer/searchBusinesses/${search || ""}`,
          {
            params: {
              category: category || undefined,
              page: page,
              limit: limit,
            },
          }
        );
        setBusinesses(transformBusinesses(res.data.businesses));
        setTotalPages(res.data.totalPages);
        setIsError({ status: false, message: "", code: 0 });
      } catch (err: any) {
        setIsError({
          status: true,
          message: err.response?.data?.message || "An error occurred",
          code: err.response?.status || 500,
        });
      } finally {
        setILoading(false);
      }
    },
    []
  );

  const getFavoriteBusinesses = useCallback(async () => {
    const res = await axiosInstance.get(`/customer/GetFavorites/${userId}`);
    setFavoriteBusinesses(transformBusinesses(res.data.favoriteBusinesses));
  }, []);

  const isFavorite = (businessId: string) => {
    return favoriteBusinesses.some((business) => business._id === businessId);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchBusinesses(
        currentPage,
        parseInt(paginationLimitSelect),
        selectedFilter,
        searchQuery
      );
    }, 500); // Reduced debounce time for better UX

    return () => clearTimeout(timeout);
  }, [
    searchQuery,
    currentPage,
    selectedFilter,
    paginationLimitSelect,
    searchBusinesses,
  ]);

  useEffect(() => {
    getFavoriteBusinesses();
  }, [businesses]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);
    }, 480);

    return () => clearTimeout(timeout);
  }, [searchQuery, selectedFilter, paginationLimitSelect]);

  useEffect(() => {
    document.title = "Explore";
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, selectedFilter, paginationLimitSelect, businesses]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const clearFilter = useCallback(() => {
    setSelectedFilter("");
  }, []);

  const businessList = useMemo(
    () => (
      <div className="pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {businesses.map((business: Business) => (
          <BusinessCard
            key={business._id}
            business={{ ...business, isFavorite: isFavorite(business._id) }}
          />
        ))}
      </div>
    ),
    [businesses]
  );

  return (
    <div className="w-full min-h-screen bg-white px-4 relative">
      <div style={{ height: rem(82 + 70), width: "100%" }} />
      <div
        className="bg-white p-4"
        style={{
          position: "fixed",
          top: "70px",
          left: 0,
          right: 0,
          zIndex: 1000000,
          transform: `translate3d(0, ${pinned ? 0 : rem(-70)}, 0)`,
          transition: "transform 150ms ease",
        }}
      >
        <TextInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          classNames={{
            root: "w-full border-none",
            input: "bg-gray-100",
          }}
          rightSection={
            searchQuery ? (
              <IconCircleXFilled onClick={clearSearch} />
            ) : (
              <IconSearch />
            )
          }
          placeholder="Search for a business..."
          size="lg"
        />
      </div>
      <Box className="space-y-4 mb-10">
        <Title order={2}>Categories</Title>
        <Carousel
          slideSize={"auto"}
          slideGap={{ base: "xl", sm: "md" }}
          align="start"
          draggable
          containScroll="trimSnaps"
          nextControlIcon={
            <IconArrowBigRightFilled className="text-gray-900" />
          }
          previousControlIcon={
            <IconArrowBigLeftFilled className="text-gray-900" />
          }
          classNames={{
            control:
              "h-full bg-black/10 flex rounded-none p-3 shadow-lg border-0",
            controls: "h-full top-0 p-0 rounded-md overflow-hidden",
          }}
        >
          {category.map((category, idx) => (
            <Carousel.Slide key={idx} className="flex">
              <Card
                className={clsx({
                  "flex-center gap-4 p-5 text-black text-center bg-black/5 h-[200px] w-[200px] hover:bg-primary/30 border hover:border-primary":
                    true,
                  "bg-primary/20 border-primary":
                    selectedFilter === category.name,
                })}
                shadow="sm"
                radius="md"
                onClick={() =>
                  selectedFilter === category.name
                    ? clearFilter()
                    : setSelectedFilter(category.name)
                }
              >
                <Text>{category.name}</Text>
                <div>
                  <Image
                    className="w-24 h-24 object-contain"
                    src={`${BASE_URL}/${category.image}`}
                    alt={category.name}
                  />
                </div>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
      {isLoading ? (
        <div className="w-full min-h-screen">
          <SkeletonGrid cardsCount={10} />
        </div>
      ) : (
        <div className="w-full min-h-screen">
          {isError.status && isError.code === 404 ? (
            <div className="min-h-screen flex-center flex-col gap-1 justify-center items-center text-gray-900">
              <IconMoodSad size={64} />
              <h1 className="text-xl font-semibold">No businesses found</h1>
            </div>
          ) : (
            businessList
          )}
        </div>
      )}
      {!isError.status && isError.code !== 404 && (
        <Box className="w-full flex-center p-5">
          <Pagination
            size={"xl"}
            value={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
          <Select
            className="w-24 ml-4"
            value={paginationLimitSelect}
            onChange={(value) => {
              setPaginationLimitSelect(value as string);
            }}
            data={paginationLimits}
            size="md"
            checkIconPosition="right"
          />
        </Box>
      )}
    </div>
  );
};

export default Explore;
