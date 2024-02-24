import { LatLngExpression } from "leaflet";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "./map.css";

function Map() {
  const [center, setCenter] = useState<LatLngExpression>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location", error);
          setCenter({
            lat: 30,
            lng: 30,
          });
        }
      );
    } else {
      console.log("Error using geolocation API.");
      setCenter({
        lat: 30,
        lng: 30,
      });
    }
  }, []);

  function UpdatePosition() {
    const map = useMapEvents({
      moveend() {
        setCenter(map.getCenter());
      },
    });
    return null;
  }

  if (!center) return null;

  return (
    <div>
      <MapContainer
        center={center}
        zoom={17}
        style={{ height: "700px", width: "500px" }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <UpdatePosition />
      </MapContainer>
      <div className="centerMarker"></div>
    </div>
  );
}

export default Map;
