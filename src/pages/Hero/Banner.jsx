import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../assets/banner/banner1.png";
import bannerImg2 from "../../assets/banner/banner2.png";
import bannerImg3 from "../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      interval={3500}
      swipeable={true}
      emulateTouch={true}
    >
      {[bannerImg1, bannerImg2, bannerImg3].map((img, i) => (
        <div key={i} className="relative w-full">
          {/* Banner Image */}
          <img
            src={img}
            className="w-full object-cover max-h-[600px] md:max-h-[750px]"
          />

          {/* Button Group */}
          {/* DESKTOP BUTTONS (inside image) */}
          <div
            className="
      hidden md:flex
      absolute bottom-16 left-24 
      flex-row items-center gap-5
    "
          >
            <button className="px-8 py-4 bg-lime-300 rounded-[99px] text-stone-900 font-bold text-xl shadow-sm">
              Track Your Parcel
            </button>

            <div className="p-4 bg-stone-900 rounded-full flex items-center justify-center">
              <ArrowUpRight className="text-white" size={22} />
            </div>

            <button className="px-8 py-4 rounded-xl  outline-1 outline-zinc-300 text-stone-900 font-bold text-xl hover:bg-black hover:text-white transition">
              Be A Rider
            </button>
          </div>
          <div className="md:hidden w-full flex flex-col items-center gap-4 mt-4 px-4">
            <button className="w-full px-6 py-3 bg-lime-300 rounded-[99px] text-stone-900 font-bold text-base shadow-sm">
              Track Your Parcel
            </button>

            <div className="p-3 bg-stone-900 rounded-full flex items-center justify-center">
              <ArrowUpRight className="text-white" size={20} />
            </div>

            <button className="w-full px-6 py-3 rounded-xl  outline-1 outline-zinc-300 text-stone-900 font-bold text-base hover:bg-black hover:text-white transition">
              Be A Rider
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
