import axios from "axios";
import { LatLng, LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { BASE_URL } from "../../constants";
import { ActionIcon, Button, Divider, Loader } from "@mantine/core";
import { IconTarget } from "@tabler/icons-react";
import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import CompactBusinessCard from "../../components/CompactBusinessCard/CompactBusinessCard";
import { getLocalStorage } from "../../services/LocalStorageService";
import { transformBusinesses } from "../../utils";

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

// TODO: Add types for businesses
// TODO: Refine the Popup
// TODO: Handle Loading and Error states

const HomePage = () => {
  const [userLocation, setUserLocation] = useState<
    LatLngExpression | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [nearbyBusinesses, setNearbyBusinesses] = useState([] as any[]);
  const mapRef = useRef<any>(null);
  const navigate = useNavigate();
  const userId = getLocalStorage("userId");
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<
    Array<Business>
  >([]);

  const getNearbyBusinesses = async () => {
    const nearbyBusinesses = await axios.get(
      `${BASE_URL}/Customer/getBusinessesNearby`,
      {
        params: {
          latitude: (userLocation as LatLng).lat,
          longitude: (userLocation as LatLng).lng,
          minDistance: 0,
          maxDistance: 100000,
        },
      }
    );

    setNearbyBusinesses(nearbyBusinesses.data.data);
  };

  const getRecommendedBusinesses = async () => {
    const recommendedBusinesses = await axios.get(
      `${BASE_URL}/Customer/recommend/${userId}`
    );
    setRecommendedBusinesses(transformBusinesses(recommendedBusinesses.data));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (userLocation) {
      getNearbyBusinesses();
    }
  }, [userLocation]);

  useEffect(() => {
    if (userId) {
      getRecommendedBusinesses();
    }
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex-center bg-gray-900">
        <Loader size="xl" color="#99896B" />
      </div>
    );

  return (
    <div className="bg-gray-900 p-8">
      <div className="w-full p-4 flex justify-around">
        {nearbyBusinesses.length > 0 ? (
          <div className="w-1/2 overflow-y-auto max-h-[700px] scroll-smooth styled-scrollbar p-12 bg-white/5">
            <h2 className={"text-3xl mb-2 font-bold text-white"}>
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
          <div className="w-1/2 max-h-[700px] p-12 bg-white/5 flex-center flex-col gap-4">
            <h2 className="text-3xl font-bold text-white">
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
        <div className="p-28">
          <div className="max-w-[500px] w-[500px] max-h-[500px] h-[500px]">
            <MapContainer
              center={userLocation}
              className="w-full h-full"
              zoom={17}
              minZoom={12}
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
                      lat: business.business.coordinates[0],
                      lng: business.business.coordinates[1],
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
            </MapContainer>
          </div>
        </div>
      </div>
      <Divider className="border-t-white/80" />
      <div className="py-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-white">
          Recommended <span className="text-primary">For You</span>
        </h2>
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
      </div>
    </div>
  );
};

export default HomePage;
