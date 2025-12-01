import React from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logo/Logo";
import { Outlet, useNavigate } from "react-router";
import authImage from "../assets/authImage.png";
const AuthLayout = () => {

  const navigate = useNavigate()

  return (
    <div className=" min-h-screen bg-white mt-10 max-w-[1500px] mx-auto flex flex-col">
      <motion.button
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-end gap-1 cursor-pointer select-none group "
      >
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Logo />
        </motion.div>

        <motion.span
          onClick={() =>navigate('/') }
          className="text-3xl font-bold tracking-tight text-gray-800 -ml-2 group-hover:text-lime-500 transition"
          whileHover={{ scale: 1.03 }}
        >
          ZapShift
        </motion.span>
      </motion.button>

      <div className=" flex items-center justify-center">
        <div className="flex-1 flex   justify-center ">
          <Outlet />
        </div>
        <div className="flex-1 flex justify-center flex-col bg-amber-50">
          <img src={authImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
