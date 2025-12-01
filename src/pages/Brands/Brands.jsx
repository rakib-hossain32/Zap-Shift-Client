import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import casioImg from "../../assets/brands/casio.png";
import amazonImg from "../../assets/brands/amazon.png";
import moonstarImg from "../../assets/brands/moonstar.png";
import starImg from "../../assets/brands/star.png";
import peopleImg from "../../assets/brands/start_people.png";
import randImg from "../../assets/brands/randstad.png";
import parcel from "../../assets/live-tracking.png";
import delivery from "../../assets/safe-delivery.png";

const Brands = () => {
  const brands = [
    casioImg,
    amazonImg,
    moonstarImg,
    starImg,
    peopleImg,
    peopleImg,
    randImg,
  ];

  const services = [
    {
      image: parcel,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      image: delivery,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      image: delivery,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <div className="mt-24">
      <h2
        className="text-secondary text-center text-3xl
font-extrabold mb-10"
      >
        {" "}
        We've helped thousands of sales teams
      </h2>
      <div className="">
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
        >
          {brands.map((brand, inx) => (
            <SwiperSlide key={inx}>{<img src={brand} />}</SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className=" border-2 border-dashed  border-teal-900 my-10"></div>
      <div className=" space-y-8 mt-20">
        {services.map((service, inx) => (
          <div
            key={inx}
            className="bg-white rounded-2xl shadow flex gap-10 p-8 items-center"
          >
            <img src={service.image} alt="" />
            <div className=" border-2 border-dashed "></div>
            <div className=" space-y-5">
              <h3 className="text-secondary text-2xl font-extrabold">
                {" "}
                {service.title}
              </h3>
              <p className="text-zinc-600 text-base font-medium">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border mt-10 border-dashed border-secondary"></div>
    </div>
  );
};

export default Brands;
