import {
  TextInput,
  // ActionIcon,
  // Drawer,
  Select,
  Pagination,
  Box,
  Text,
  // Pill,
  Card,
  Image,
  Title,
  rem,
} from "@mantine/core";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
  IconCircleXFilled,
  // IconFilter,
  IconMoodSad,
  IconSearch,
} from "@tabler/icons-react";
import { BASE_URL, BUSINESS_CATEGORIES } from "../../constants/index";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import BusinessCard, {
  Business,
  BusinessCardSkeleton,
} from "../../components/BusinessCard/BusinessCard";
// import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { transformBusinesses } from "../../utils";
import { useLocation } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import clsx from "clsx";

import ArtsAndEntertainmentIll from "../../assets/categories-art/arts-and-entertainment.svg";
import AutoServicesIll from "../../assets/categories-art/auto-services.svg";
import BookStoreIll from "../../assets/categories-art/book-store.svg";
import EducationAndTrainingIll from "../../assets/categories-art/education-and-training-centers.svg";
import HealthAndBeautyIll from "../../assets/categories-art/health-and-beauty-services.svg";
import HomeServicesIll from "../../assets/categories-art/home-services.svg";
import MedicalAndHealthcareIll from "../../assets/categories-art/medical-and-healthcare-services.svg";
import RealEstateAndConstructionIll from "../../assets/categories-art/real-estate-and-construction.svg";
import RestaurantsAndCafesIll from "../../assets/categories-art/restaurants-and-cafes.svg";
import RetailStoresIll from "../../assets/categories-art/retail-stores.svg";
import TourismAndHospitalityIll from "../../assets/categories-art/tourism-and-hospitality.svg";
import { useHeadroom } from "@mantine/hooks";

const paginationLimits = ["10", "25", "50", "100"];

const Explore = () => {
  const location = useLocation();
  // const [opened, { open, close }] = useDisclosure(false);
  // const isMobile = useMediaQuery("(max-width: 56.25em)");
  const [searchQuery, setSearchQuery] = useState(location.state?.search || "");
  const [isLoading, setILoading] = useState(true);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
    code: 0,
  });
  const [businesses, setBusinesses] = useState<Array<Business>>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(
    location.state?.category || ""
  );
  const baseUrl = BASE_URL;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLimitSelect, setPaginationLimitSelect] = useState("10");
  const pinned = useHeadroom({ fixedAt: 140 });

  const searchBusinesses = useCallback(
    async (
      page: number,
      limit: number,
      category?: (typeof BUSINESS_CATEGORIES)[number],
      search?: string
    ) => {
      try {
        setILoading(true);
        const res = await axios.get(
          `${baseUrl}/customer/searchBusinesses/${search || ""}`,
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
    [baseUrl]
  );

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
          <BusinessCard key={business._id} business={business} />
        ))}
      </div>
    ),
    [businesses]
  );

  return (
    <div className="w-full min-h-screen bg-white px-4 relative">
      <div style={{ height: rem(82+70), width: "100%" }} />
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
        {/* <div className="flex gap-4 py-2">
          <ActionIcon className="bg-transparent" onClick={open}>
            <IconFilter className="text-gray-900" />
          </ActionIcon>
          <Drawer
            offset={8}
            radius="md"
            opened={opened}
            onClose={close}
            title="Filters"
            position={isMobile ? "bottom" : "left"}
          >
            <div>
              <Select
                checkIconPosition="right"
                value={selectedFilter}
                onChange={(value) => setSelectedFilter(value as string)}
                data={BUSINESS_CATEGORIES}
                label="Category"
                placeholder="Filter by category"
                clearable
              />
            </div>
          </Drawer>
          {selectedFilter && (
            <div className="flex-center gap-2">
              <Text className={"uppercase font-bold"} c="dimmed">
                Category:{" "}
              </Text>
              <Pill
                className="min-w-18 w-fit"
                radius={"sm"}
                size="lg"
                withRemoveButton
                onRemove={clearFilter}
              >
                {selectedFilter}
              </Pill>
            </div>
          )}
        </div> */}
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
          {BUSINESS_CATEGORIES.slice(0, BUSINESS_CATEGORIES.length - 1).map(
            (category, idx) => (
              <Carousel.Slide key={idx} className="flex">
                <Card
                  className={clsx({
                    "flex-center gap-4 p-5 text-black text-center bg-black/5 h-[200px] w-[200px] hover:bg-primary/30 border hover:border-primary":
                      true,
                    "bg-primary/20 border-primary": selectedFilter === category,
                  })}
                  shadow="sm"
                  radius="md"
                  onClick={() =>
                    selectedFilter === category
                      ? clearFilter()
                      : setSelectedFilter(category)
                  }
                  // onClick={() => navigate("/explore", { state: { category } })}
                >
                  <Text>{category}</Text>
                  <div>
                    <Image
                      className="w-24 h-24 object-contain"
                      src={
                        {
                          "Restaurants and Cafés": RestaurantsAndCafesIll,
                          "Retail Stores": RetailStoresIll,
                          "Health and Beauty Services": HealthAndBeautyIll,
                          "Medical and Healthcare Services":
                            MedicalAndHealthcareIll,
                          "Tourism and Hospitality": TourismAndHospitalityIll,
                          "Education and Training Centers":
                            EducationAndTrainingIll,
                          "Real Estate and Construction":
                            RealEstateAndConstructionIll,
                          "Arts and Entertainment": ArtsAndEntertainmentIll,
                          "Home Services": HomeServicesIll,
                          "Auto Services": AutoServicesIll,
                          "Book Store": BookStoreIll,
                        }[category]
                      }
                      alt={category}
                    />
                  </div>
                </Card>
              </Carousel.Slide>
            )
          )}
        </Carousel>
      </Box>
      {isLoading ? (
        <div className="w-full min-h-screen">
          <SkeletonGrid />
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

const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(10)].map((_, idx) => (
        <BusinessCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default Explore;
