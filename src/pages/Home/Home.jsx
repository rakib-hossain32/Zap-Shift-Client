import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from "react-icons/fa";
import Banner from "../Hero/Banner";
import Works from "../Works/Works";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Priority from "../Priority/Priority";
import Reviews from "../Reviews/Reviews";
import FAQSection from "../FAQSection/FAQSection";

const reviewsPromise = fetch("/reviews.json").then(res => res.json())

const Home = () => {
  return (
    <div className="min-h-screen   py-4">
      <Banner />
      <Works />
      <OurServices />
      <Brands />
      <Priority />
      <Reviews reviewsPromise={reviewsPromise} />
      <FAQSection/>
    </div>
  );
};

export default Home;
