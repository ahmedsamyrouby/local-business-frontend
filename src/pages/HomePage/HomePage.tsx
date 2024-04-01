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
import { BASE_URL, MAP_TOKEN } from "../../constants";
import { ActionIcon } from "@mantine/core";
import { IconTarget } from "@tabler/icons-react";

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
// TODO: Add Navbar
// TODO: Refine the Popup
// TODO: Improve the isPM function
// TODO: Handle Loading and Error states

const HomePage = () => {
  const [userLocation, setUserLocation] = useState<
    LatLngExpression | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [nearbyBusinesses, setNearbyBusinesses] = useState([] as any[]);
  const mapRef = useRef<any>(null);

  const getNearbyBusinesses = async () => {
    const nearbyBusinesses = await axios.get(
      `${BASE_URL}/businessOwner/getBusinessesNearby`,
      {
        params: {
          latitude: (userLocation as LatLng).lat,
          longitude: (userLocation as LatLng).lng,
          minDistance: 0,
          maxDistance: 1000000,
        },
      }
    );

    setNearbyBusinesses(nearbyBusinesses.data.data);
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-screen w-full relative">
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
  );
};

export default HomePage;
