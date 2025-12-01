import { motion } from "framer-motion";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0d0d] text-gray-300 py-12 rounded-3xl max-w-7xl mx-auto mt-10 shadow-xl">
      <div className="flex flex-col items-center text-center px-6">
        {/* Logo */}
        <button className="flex items-end  cursor-pointer select-none mb-2">
          <Logo />
          <span className="text-3xl font-bold tracking-tight text-gray-800 -ml-3">
            ZapShift
          </span>
        </button>

        {/* Description */}
        <p className="max-w-xl text-[14px] text-gray-400 leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-dashed border-gray-700 my-6" />

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-[15px] text-gray-300 mb-6">
          <a href="#" className="hover:text-white transition">
            Services
          </a>
          <a href="#" className="hover:text-white transition">
            Coverage
          </a>
          <a href="#" className="hover:text-white transition">
            About Us
          </a>
          <a href="#" className="hover:text-white transition">
            Pricing
          </a>
          <a href="#" className="hover:text-white transition">
            Blog
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
        <div className="w-full border-t border-dashed border-gray-700 " />

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d0d0d] border border-gray-600 hover:bg-gray-800 transition"
          >
            {/* <img src="/icons/linkedin.svg" className="w-5" alt="LinkedIn" /> */}
            <Linkedin size={15} />
          </a>
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d0d0d] border border-gray-600 hover:bg-gray-800 transition"
          >
            {/* <img src="/icons/x.svg" className="w-5" alt="Twitter" /> */}
            <Twitter size={15} />
          </a>
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d0d0d] border border-gray-600 hover:bg-gray-800 transition"
          >
            {/* <img src="/icons/facebook.svg" className="w-5" alt="Facebook" /> */}
            <Facebook size={15} />
          </a>
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d0d0d] border border-gray-600 hover:bg-gray-800 transition"
          >
            {/* <img src="/icons/youtube.svg" className="w-5" alt="YouTube" /> */}
            <Youtube size={15} />
          </a>
          {/* Copyright */}
          <div className="mt-10 text-gray-500 text-sm border-t border-gray-800 pt-5 w-full text-center">
            © {new Date().getFullYear()} ZapShift — All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
