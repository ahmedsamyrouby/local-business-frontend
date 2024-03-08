import axios from "axios";
import L, { LatLng, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { BASE_URL, MAP_TOKEN } from "../../constants";

const isPM = () => {
  const date = new Date();
  return date.getHours() >= 12;
};

// TODO: Add types for businesses
// TODO: Add reset center button
// TODO: Add Navbar
// TODO: Refine the Popup

const HomePage = () => {
  const [userLocation, setUserLocation] = useState<
    LatLngExpression | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [nearbyBusinesses, setNearbyBusinesses] = useState([] as any[]);

  const getNearbyBusinesses = async () => {
    // fetch nearby businesses
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
    console.log(nearbyBusinesses);
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

  console.log(userLocation);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={userLocation}
        className="w-full h-full"
        zoom={25}
        minZoom={12}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            isPM()
              ? `https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${MAP_TOKEN}`
              : `https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${MAP_TOKEN}`
          }
        />

        {userLocation && (
          <CircleMarker
            center={userLocation}
            color={"#171717"}
            fillColor="#99896B"
            fillRule="evenodd"
            fillOpacity={0.75}
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
      </MapContainer>
    </div>
  );
};

export default HomePage;
