import React from "react";
import serviceImg from "../../assets/service.png";

const OurServices = () => {
  const services = [
    {
      img: serviceImg,
      title: "Express  & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      img: serviceImg,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      img: serviceImg,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      img: serviceImg,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      img: serviceImg,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      img: serviceImg,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <div className="bg-secondary text-center p-24 rounded-3xl">
      <h2 className="text-white text-4xl font-extrabold ">Our Services</h2>
      <p
        className="text-zinc-300
 font-medium max-w-[718px] mx-auto my-8"
      >
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, inx) => (
          <div
            className="bg-white rounded-2xl py-8 px-6 space-y-4 hover:scale-105 transition hover:bg-lime-300"
            key={inx}
          >
            <img className="inline" src={service.img} alt="" />
            <h3 className="text-secondary text-2xl font-bold">
              {service.title}
            </h3>
            <p className="text-zinc-600 font-medium leading-6">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
