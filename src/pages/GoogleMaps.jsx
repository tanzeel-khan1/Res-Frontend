import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HomeLocationMap = () => {
  // New York coordinates (example)
  const homeLocation = [40.7128, -74.006];

  return (
    <MapContainer
      center={homeLocation}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={homeLocation}>
        <Popup>My Restaurant – New York</Popup>
      </Marker>
    </MapContainer>
  );
};

export default HomeLocationMap;
