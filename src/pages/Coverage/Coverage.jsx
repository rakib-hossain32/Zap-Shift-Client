import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenter = useLoaderData();
  const mapRef = useRef(null);
  console.log(serviceCenter);

  const position = [23.685, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    console.log(location);

    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
      );
      if (district) {
          const coord = [district.latitude, district.longitude]
          mapRef.current.flyTo(coord,14)
      }
  };

  return (
    <div className="bg-white rounded-2xl py-20 px-24 mt-10 shadow-xl">
      <h2
        className="text-secondary text-6xl
font-extrabold"
      >
        We are available in 64 districts
      </h2>
      <form onSubmit={handleSearch}>
        <div className="join w-xl my-10">
          <input
            className="input join-item rounded-l-full"
            name="location"
            placeholder="Search"
          />
          <button className="btn join-item rounded-r-full bg-primary border-primary">Search</button>
        </div>
      </form>
      <div className="border opacity-10"></div>
      <div className="space-y-10 mt-10">
        <h2
          className="text-secondary text-3xl
font-extrabold "
        >
          We deliver almost all over Bangladesh
        </h2>
        <div className=" w-full h-[800px]">
          <MapContainer
            className="h-[800px]"
            center={position}
            zoom={9}
            scrollWheelZoom={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceCenter.map((center) => (
              <Marker
                key={center.city}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <strong>{center.city}</strong> <br />{" "}
                  {center.covered_area.join(", ")}.
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
