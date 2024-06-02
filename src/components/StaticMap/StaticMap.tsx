import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "../Map/map.css";

type StaticMapProps = {
  location: LatLngExpression;
};

function StaticMap({ location: center }: StaticMapProps) {
  return (
    <div className="relative h-96 w-96">
      <MapContainer
        center={center}
        zoom={17}
        touchZoom={false}
        className="w-full h-full"
        dragging={false}
        doubleClickZoom={false}
        closePopupOnClick={false}
        zoomSnap={0}
        zoomDelta={0}
        trackResize={false}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{
          zIndex: "0",
        }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="centerMarker"></div>
    </div>
  );
}

export default StaticMap;
