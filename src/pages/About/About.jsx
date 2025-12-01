import React, { useState } from "react";
import { motion } from "framer-motion";
// Removed Card components for a cleaner custom premium layout

const tabs = ["Story", "Mission", "Success", "Team & Others"];

const content = {
  Story:
    "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it’s a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
  Mission:
    "Our mission is to revolutionize parcel delivery with technology-driven logistics, ensuring transparency, reliability, and seamless customer experience. We believe in continuously improving speed, safety, and satisfaction.",
  Success:
    "From a small local startup to a nationwide delivery partner — our success is built on trust, innovation, and dedication. With thousands of successful deliveries, we continue to grow every day.",
  "Team & Others":
    "Behind every successful delivery is a passionate team working tirelessly to ensure everything runs smoothly. Our experts in logistics, customer care, and technology work as one to deliver excellence.",
};

export default function About() {
  const [active, setActive] = useState("Story");

  return (
    <div className="w-full px-4 md:px-16 lg:px-28 py-10   flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">About Us</h2>
        <p className="text-gray-600 text-sm md:text-base mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="flex flex-wrap gap-4 mb-6 border-b pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`pb-2  md:text-base font-medium transition-all duration-300 border-b-2 ${
                active === tab
                  ? "text-green-700 border-green-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-gray-700 text-sm md:text-lg leading-relaxed">
            {content[active]}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
