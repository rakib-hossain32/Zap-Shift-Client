import React from "react";
import bookingIcon from "../../assets/bookingIcon.png";

const Works = () => {
  const works = [
    {
      img: bookingIcon,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: bookingIcon,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: bookingIcon,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: bookingIcon,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-secondary text-3xl font-extrabold">How it Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {works.map((work, inx) => (
          <div
            key={inx}
            className=" bg-white shadow-xl space-y-5 rounded-2xl p-8 hover:scale-110 transition  hover:bg-cyan-100/10 "
          >
            <img src={work.img} alt="" />
            <h3 className="text-secondary text-xl font-bold">{work.title}</h3>
            <p
              className="text-zinc-600
text-base"
            >
              {work.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
