import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, userSignOut } = useAuth();

  const links = [
    { path: "/services", label: "Services" },
    { path: "/coverage", label: "Coverage" },
    { path: "/about-us", label: "About Us" },
    { path: "/send-parcel", label: "Send Parcel" },
    { path: "/rider", label: "Be a Rider" },
    user && { path: "/dashboard/my-parcels", label: "My Parcels" },
  ].filter(Boolean);

  // Stagger animation for desktop menu
  const navItemVariant = {
    hidden: { opacity: 0, y: -6 },
    show: { opacity: 1, y: 0 },
  };

  // Mobile menu animation
  const mobileMenuVariant = {
    hidden: { opacity: 0, y: -15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.32, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    userSignOut()
      .then(() => {})
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // console.log(links);

  return (
    <header
      className="
      w-full sticky top-0 z-50 
      backdrop-blur-xl bg-white/70 
      border-b border-white/20 
      shadow-[0_3px_15px_rgba(0,0,0,0.06)]
      transition-all duration-300 rounded-3xl
    "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        {/* Logo + brand */}
        <motion.button
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-end gap-1 cursor-pointer select-none group"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Logo />
          </motion.div>

          <motion.span
            onClick={() => navigate("/")}
            className="text-3xl font-bold tracking-tight text-gray-800 -ml-2 group-hover:text-lime-500 transition"
            whileHover={{ scale: 1.03 }}
          >
            ZapShift
          </motion.span>
        </motion.button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-5 text-[16px] font-medium text-gray-600">
          {links.map((item, index) => (
            <motion.div
              key={item.path}
              variants={navItemVariant}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.05 * index }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative transition  ${
                    isActive
                      ? "text-black bg-lime-400 font-semibold py-2 px-3 rounded-full"
                      : "hover:text-black"
                  }`
                }
              >
                {item.label}
                {/* Animated Underline */}
                <motion.span
                  layoutId="active-underline"
                  className={`
                    absolute left-0 -bottom-1 h-0.5 bg-lime-400 rounded-full
                    ${location.pathname === item.path ? "w-full" : "w-0"}
                  `}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                  }}
                ></motion.span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Sign In */}
          {user ? (
            <motion.button
              onClick={() => handleSignOut()}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
              className="
            px-6 py-2.5 border border-gray-300 rounded-xl 
            text-lg font-medium text-zinc-700
            hover:bg-gray-100 
            shadow-sm transition cursor-pointer
          "
            >
              LogOut
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate("/login")}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
              className="
            px-6 py-2.5 border border-gray-300 rounded-xl 
            text-lg font-medium text-zinc-700
            hover:bg-gray-100 
            shadow-sm transition cursor-pointer
          "
            >
              Sign In
            </motion.button>
          )}

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.04 }}
            className="
            px-6 py-2.5 rounded-xl text-lg font-semibold 
            bg-lime-400 hover:bg-lime-500 
            flex items-center gap-2 shadow-md
            transition
          "
          >
            Be a rider
            <ArrowUpRight
              size={22}
              className="bg-black text-white rounded-full p-1 shadow-md"
            />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={mobileMenuVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="
              md:hidden bg-white px-6 py-6 space-y-6 
              shadow-[0_8px_20px_rgba(0,0,0,0.12)]
              rounded-b-2xl
            "
          >
            {links.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  className="block text-gray-900 text-lg font-medium hover:text-black"
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}

            {/* Buttons */}
            <motion.button
              onClick={() => navigate("/auth/login")}
              whileTap={{ scale: 0.92 }}
              className="
                w-full px-5 py-3 border border-gray-300 rounded-xl 
                text-lg font-medium hover:bg-gray-100 transition
              "
            >
              Sign In
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              className="
                w-full px-5 py-3 rounded-xl bg-lime-400 hover:bg-lime-500 
                flex items-center justify-center gap-2 text-lg font-semibold shadow-md 
                transition
              "
            >
              Be a rider
              <ArrowUpRight
                size={18}
                className="bg-black text-white rounded-full p-1"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
