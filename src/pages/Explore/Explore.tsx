import {
  Loader,
  TextInput,
  ActionIcon,
  Badge,
  Drawer,
  Select,
} from "@mantine/core";
import {
  IconCircleXFilled,
  IconFilter,
  IconMoodSad,
  IconSearch,
} from "@tabler/icons-react";
import { BASE_URL, BUSINESS_CATEGORIES } from "./../../constants/index";
import { useEffect, useState } from "react";
import axios from "axios";
import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { transformBusinesses } from "../../utils";

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

  const searchBusinesses = async () => {
    window.scrollTo(0, 0); // scroll to top of the page when searching
    try {
      setILoading(true);
      const res = await axios.get(
        `${baseUrl}/customer/searchBusinesses/${searchQuery}`
      );

      // handle searching when a filter is selected
      if (selectedFilter) {
        setBusinesses(
          transformBusinesses(
            res.data.businesses.filter(
              (business: Business) => business.category === selectedFilter
            )
          )
        );
      } else {
        setBusinesses(transformBusinesses(res.data.businesses));
      }
      setIsError({ status: false, message: "", code: 0 });
    } catch (err: any) {
      setIsError({
        status: true,
        message: err.response.data.message,
        code: err.response.status,
      });
    } finally {
      setILoading(false);
    }
  };

  const filterBusinesses = async (selected: string) => {
    try {
      setILoading(true);
      const res = await axios.get(
        `${baseUrl}/customer/filterbycategory/${selected}`
      );
      setBusinesses(transformBusinesses(res.data.businesses));
      setSearchQuery("");
      setIsError({ status: false, message: "", code: 0 });
    } catch (err: any) {
      setIsError({
        status: true,
        message: err.response.data.message,
        code: err.response.status,
      });
    } finally {
      setILoading(false);
    }
  };

  useEffect(() => {
    // debounce the search and clean up after unmount
    const timeout = setTimeout(() => {
      searchBusinesses();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    if (selectedFilter === null) {
      filterBusinesses("");
    } else if (searchQuery === "" && selectedFilter !== "") {
      filterBusinesses(selectedFilter);
    }
  }, [selectedFilter]);

  useEffect(() => {
    document.title = "Explore";
  });

  return (
    <div className="w-full min-h-screen bg-gray-900 px-4 relative">
      <div className="bg-gray-900 sticky top-0 z-10 pt-4 pb-2 flex flex-col gap-2">
        <TextInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          classNames={{
            root: "w-full border-none",
            input: "text-white bg-gray-500",
          }}
          rightSection={searchQuery ? <IconCircleXFilled /> : <IconSearch />}
          rightSectionProps={
            searchQuery ? { onClick: () => setSearchQuery("") } : {}
          }
          placeholder="Search for a business..."
          size="lg"
        />
        <div className="flex gap-4">
          <ActionIcon className="bg-transparent" onClick={open}>
            <IconFilter />
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
              />
            </div>
          </Drawer>
          <div className="flex gap-2 justify-start items-center overflow-scroll hide-scrollbar">
            {selectedFilter && (
              <>
                <span className="text-white font-semibold">Category: </span>
                <Badge className="min-w-18 w-fit" radius={"sm"} size="lg">
                  {selectedFilter}
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          {isError.status && isError.code === 404 ? (
            <div className="w-full min-h-screen flex flex-col gap-1 justify-center items-center text-white">
              <IconMoodSad size={64} />
              <h1 className="text-xl font-semibold">No businesses found</h1>
            </div>
          ) : (
            <div className="pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {businesses.map((business: Business) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
