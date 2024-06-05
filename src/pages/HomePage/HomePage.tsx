import { LatLng, LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Circle,
} from "react-leaflet";
import { BUSINESS_CATEGORIES } from "../../constants";
import {
  ActionIcon,
  Button,
  // Card,
  Divider,
  Loader,
  Title,
  Image,
  Text,
  Container,
  Input,
  Select,
  List,
  ThemeIcon,
  Box,
  Slider,
  rem,
} from "@mantine/core";
import {
  // IconArrowBigLeftFilled,
  // IconArrowBigRightFilled,
  IconCheck,
  IconGripHorizontal,
  IconTarget,
} from "@tabler/icons-react";
import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import CompactBusinessCard from "../../components/CompactBusinessCard/CompactBusinessCard";
import { getLocalStorage } from "../../services/LocalStorageService";
import { transformBusinesses } from "../../utils";

// Business Category Illustrations
// import ArtsAndEntertainmentIll from "../../assets/categories-art/arts-and-entertainment.svg";
// import AutoServicesIll from "../../assets/categories-art/auto-services.svg";
// import BookStoreIll from "../../assets/categories-art/book-store.svg";
// import EducationAndTrainingIll from "../../assets/categories-art/education-and-training-centers.svg";
// import HealthAndBeautyIll from "../../assets/categories-art/health-and-beauty-services.svg";
// import HomeServicesIll from "../../assets/categories-art/home-services.svg";
// import MedicalAndHealthcareIll from "../../assets/categories-art/medical-and-healthcare-services.svg";
// import RealEstateAndConstructionIll from "../../assets/categories-art/real-estate-and-construction.svg";
// import RestaurantsAndCafesIll from "../../assets/categories-art/restaurants-and-cafes.svg";
// import RetailStoresIll from "../../assets/categories-art/retail-stores.svg";
// import TourismAndHospitalityIll from "../../assets/categories-art/tourism-and-hospitality.svg";

import heroImage from "../../assets/hero-image.svg";
import { useForm } from "@mantine/form";
import CategoriesGrid from "../../components/CategoriesGrid/CategoriesGrid";
import SkeletonGrid from "../../components/SkeletonGrid/SkeletonGrid";
import axiosInstance from "../../services/AxiosService";

const ResetButton = ({ userLocation }: { userLocation: LatLngExpression }) => {
  const map = useMap();
  const resetCenter = () => {
    const currentZoom = map.getZoom();

    map.flyTo(userLocation, currentZoom > 17 ? currentZoom : 17);
  };
  return (
    <ActionIcon
      className="absolute z-[999999] right-3 top-3 bg-gray-100 text-black border border-gray-400 shadow-lg"
      size="lg"
      onClick={resetCenter}
    >
      <IconTarget />
    </ActionIcon>
  );
};
// TODO: Refine the Popup
// TODO: Handle Loading and Error states

const HomePage = () => {
  const [userLocation, setUserLocation] = useState<
    LatLngExpression | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [isFetchingRecommended, setIsFetchingRecommended] = useState(false);
  const [nearbyBusinesses, setNearbyBusinesses] = useState([] as any[]);
  const mapRef = useRef<any>(null);
  const navigate = useNavigate();
  const userId = getLocalStorage("userId");
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<
    Array<Business>
  >([]);
  const [mapRadius, setMapRadius] = useState(1);
  const searchForm = useForm({
    initialValues: {
      searchQuery: "",
      category: "",
    },
  });

  const getNearbyBusinesses = async () => {
    const nearbyBusinesses = await axiosInstance.get(
      `/Customer/getBusinessesNearby`,
      {
        params: {
          latitude: (userLocation as LatLng).lat,
          longitude: (userLocation as LatLng).lng,
          minDistance: 0,
          maxDistance: mapRadius * 1000,
        },
      }
    );

    setNearbyBusinesses(nearbyBusinesses.data.data);
  };

  const getRecommendedBusinesses = async () => {
    try {
      setIsFetchingRecommended(true);
      const recommendedBusinesses = await axiosInstance.get(
        `/Customer/recommend/${userId}`
      );
      setRecommendedBusinesses(transformBusinesses(recommendedBusinesses.data));
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetchingRecommended(false);
    }
  };

  const searchFormSubmit = (values: {
    searchQuery: string;
    category: string;
  }) => {
    navigate("/explore", {
      state: {
        search: values.searchQuery,
        category: values.category,
      },
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
    document.title = "Homepage";
  }, []);

  useEffect(() => {
    if (userLocation) {
      getNearbyBusinesses();
    }
  }, [userLocation, mapRadius]);

  useEffect(() => {
    if (userId) {
      getRecommendedBusinesses();
    }
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex-center bg-white">
        <Loader size="xl" />
      </div>
    );

  return (
    <Container fluid className="bg-white p-8">
      <div style={{ height: rem(70), width: "100%" }} />
      {/* HERO SECTION */}
      <Box className="flex justify-around items-center mb-10">
        <div className="w-1/2 flex flex-col gap-8">
          <div>
            <Title className={"text-5xl mb-2"}>
              Discover{" "}
              <span className="bg-primary/25 py-1 px-3 rounded-md">
                local businesses
              </span>{" "}
              <br />
              near you
            </Title>
            <Text className="text-gray-400 pe-5">
              From hidden gems to well-known favorites, our comprehensive
              listings and user reviews make it easy to find the perfect local
              business for your needs. Whether it's dining, shopping, or
              professional services, we've got you covered with trustworthy
              recommendations.
            </Text>
          </div>
          <div>
            <List
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck style={{ width: 12, height: 12 }} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Wide Range of Listings</b> – Find restaurants, shops, and
                services.
              </List.Item>
              <List.Item>
                <b>Trusted Customer Reviews</b> – Read reviews from other
                customers.
              </List.Item>
              <List.Item>
                <b>Quick and Easy Search</b> – Find what you need in no time.
              </List.Item>
              <List.Item>
                <b>Trusted Recommendations</b> – Discover local favorites and
                hidden gems.
              </List.Item>
            </List>
          </div>
          <form
            className="p-3 rounded-md bg-black/5 flex gap-1"
            onSubmit={searchForm.onSubmit(searchFormSubmit)}
          >
            <Input
              {...searchForm.getInputProps("searchQuery")}
              placeholder="Enter business name..."
              className="flex-grow"
            />
            <Select
              {...searchForm.getInputProps("category")}
              placeholder="Category"
              data={[...BUSINESS_CATEGORIES]}
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="w-[600px]">
          <Image src={heroImage} />
        </div>
      </Box>
      {/* <Box className="space-y-4 px-10 mb-10">
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
                  className="flex-center gap-4 p-5 text-black text-center bg-black/5 h-[200px] w-[200px]"
                  shadow="sm"
                  radius="md"
                  onClick={() => navigate("/explore", { state: { category } })}
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
      </Box> */}
      <Divider className="border-t-white/80" />

      {/* NEARBY BUSINESSES SECTION */}
      <div className="w-full p-4 flex justify-around">
        {nearbyBusinesses.length > 0 ? (
          <div className="w-1/2 overflow-y-auto max-h-[700px] scroll-smooth styled-scrollbar p-12 bg-black/5">
            <h2 className={"text-3xl mb-2 font-bold"}>
              <span className="text-primary">{nearbyBusinesses.length}</span>
              {nearbyBusinesses.length > 1 ? " Businesses" : " Business"} Found
              Near You. Explore Now!
            </h2>
            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyBusinesses.map((business) => (
                <CompactBusinessCard key={business._id} business={business} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-1/2 max-h-[700px] p-12 bg-black/5 flex-center flex-col gap-4">
            <h2 className="text-3xl font-bold">
              No Businesses Found Near You. Explore Now!
            </h2>
            <Button
              className="bg-primary text-white p-4 rounded-md h-auto"
              size="lg"
              onClick={() => navigate("/explore")}
            >
              Explore
            </Button>
          </div>
        )}
        <div className="w-[540px] flex flex-col items-center gap-8 text-center">
          <Title order={2}>
            Discover Nearby Businesses Within{" "}
            <span className="text-primary">{mapRadius}</span> km
          </Title>
          <Slider
            className="min-w-full"
            classNames={{
              thumb:
                "text-gray-200 bg-white rounded-sm border border-gray-300 w-[1.75rem] h-[1.375rem]",
            }}
            thumbChildren={
              <IconGripHorizontal
                style={{ width: 20, height: 20 }}
                stroke={1.5}
              />
            }
            showLabelOnHover
            value={mapRadius}
            onChange={(value) => {
              setMapRadius(value);
            }}
            step={1}
            min={1}
            max={15}
          />
          <div className="max-w-[500px] w-[500px] max-h-[500px] h-[500px]">
            <MapContainer
              center={userLocation}
              className="w-full h-full"
              zoom={17}
              // minZoom={12}
              ref={mapRef}
            >
              <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
              />

              {userLocation && (
                <CircleMarker
                  center={userLocation}
                  color={"#ffffff"}
                  fillColor="#0975ce"
                  fillRule="evenodd"
                  fillOpacity={1}
                />
              )}

              {nearbyBusinesses.map((business, index) => {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: business.business.coordinates[1],
                      lng: business.business.coordinates[0],
                    }}
                  >
                    <Popup>
                      <h1 className="font-bold text-xl text-sky-400">
                        {business.businessName}
                      </h1>
                      <p>{business.category}</p>
                      <p>{business.description}</p>
                    </Popup>
                  </Marker>
                );
              })}
              <ResetButton userLocation={userLocation as LatLngExpression} />
              <Circle
                center={userLocation!}
                radius={mapRadius * 1000}
                color="white"
              />
            </MapContainer>
          </div>
        </div>
      </div>
      <Divider className="border-t-white/80" />

      {/* RECOMMENDED BUSINESSES SECTION */}
      <Box className="py-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold">
          Recommended <span className="text-primary">For You</span>
        </h2>
        {isFetchingRecommended ? (
          <SkeletonGrid cardsCount={5} />
        ) : (
          <Carousel
            slideSize={{ base: "100%", xs: "50%", md: "20%" }}
            slideGap={{ base: 0, xs: "md" }}
            align="start"
            draggable
            containScroll="trimSnaps"
            withControls={recommendedBusinesses.length > 5}
          >
            {recommendedBusinesses.map((business, idx) => (
              <Carousel.Slide key={idx}>
                <BusinessCard key={business._id} business={business} />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Box>

      {/* CATEGORIES SECTION */}
      <Box className="my-12 flex-center flex-col gap-6">
        <Title>Categories</Title>
        <Box className="w-1/2">
          <CategoriesGrid />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
