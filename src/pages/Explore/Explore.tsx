import {
  Loader,
  TextInput,
  ActionIcon,
  Badge,
  Drawer,
  Select,
  Pagination,
  Box,
  Text,
} from "@mantine/core";
import {
  IconCircleXFilled,
  IconFilter,
  IconMoodSad,
  IconSearch,
} from "@tabler/icons-react";
import { BASE_URL, BUSINESS_CATEGORIES } from "../../constants/index";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { transformBusinesses } from "../../utils";

const paginationLimits = ["10", "25", "50", "100"];

const Explore = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 56.25em)");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setILoading] = useState(true);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
    code: 0,
  });
  const [businesses, setBusinesses] = useState<Array<Business>>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const baseUrl = BASE_URL;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLimitSelect, setPaginationLimitSelect] = useState("10");

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
      <div className="bg-white sticky top-0 z-10 pt-4 pb-2 flex flex-col gap-2">
        <TextInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          classNames={{
            root: "w-full border-none",
            input: "text-white bg-gray-100",
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
        <div className="flex gap-4 py-2">
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
              <Badge className="min-w-18 w-fit" radius={"sm"} size="lg">
                {selectedFilter}
              </Badge>
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-screen">
          {isError.status && isError.code === 404 ? (
            <div className="flex flex-col gap-1 justify-center items-center text-white">
              <IconMoodSad size={64} />
              <h1 className="text-xl font-semibold">No businesses found</h1>
            </div>
          ) : (
            businessList
          )}
        </div>
      )}
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
    </div>
  );
};

export default Explore;
