import React, { useEffect } from "react";
import { motion } from "framer-motion";
import riderImg from "../../assets/agent-pending.png";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";

const Rider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const servicesCenter = useLoaderData();

  // Initialize useForm with empty defaultValues
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      riderName: "",
      email: "",
      riderRegion: "",
      riderDistrict: "",
      license: "",
      nid: "",
      phone: "",
      bikeModel: "",
      bikeReg: "",
      about: "",
    },
  });

  // Set default values when user data is available
  useEffect(() => {
    if (user) {
      reset({
        riderName: user.displayName || "",
        email: user.email || "",
        riderRegion: "",
        riderDistrict: "",
        license: "",
        nid: "",
        phone: "",
        bikeModel: "",
        bikeReg: "",
        about: "",
      });
    }
  }, [user, reset]);

  // Extract unique regions
  const regions = [...new Set(servicesCenter.map((s) => s.region))];

  // Watch selected region
  const riderRegion = useWatch({ control, name: "riderRegion" });

  // Get districts based on selected region
  const districtsByRegion = (region) => {
    if (!region) return [];
    return servicesCenter
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const handleBeARider = (data) => {
    // console.log("Form Data:", data);
    // You can send data to server here
    axiosSecure.post("/riders", data)
      .then((res) => {
        if (res.data.insertedId) {
          // console.log("Server Response:", res.data);
          toast.success('Your application has been submitted. we will reach to you in 132 days')
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "Your file has been deleted.",
          //   icon: "success",
          // });
        }
    });
  };

  return (
    <div className="w-full bg-[#F5F7FA] py-14 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-md p-10 md:p-16"
      >
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold text-[#0A2A29]">
          Be a Rider
        </h1>

        <p className="text-slate-600 mt-2 max-w-xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <hr className="my-8 border-slate-200" />

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT FORM */}
          <motion.form
            onSubmit={handleSubmit(handleBeARider)}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-[#0A2A29] mb-3">
              Tell us about yourself
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* Your Name */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  {...register("riderName")}
                  placeholder="Your Name"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66]"
                />
              </div>

              {/* Driving License */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  Driving License Number
                </label>
                <input
                  {...register("license")}
                  placeholder="Driving License Number"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Your Email"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66]"
                />
              </div>

              {/* Region */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  Your Region
                </label>
                <select
                  {...register("riderRegion")}
                  className="border border-slate-300 rounded-lg px-4 py-2 bg-white text-sm focus:ring-2 focus:ring-[#CAEB66]"
                >
                  <option value="">Select your Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  Your District
                </label>
                <select
                  {...register("riderDistrict")}
                  className="border border-slate-300 rounded-lg px-4 py-2 bg-white text-sm focus:ring-2 focus:ring-[#CAEB66]"
                >
                  <option value="">Pick a District</option>
                  {riderRegion &&
                    districtsByRegion(riderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
              </div>

              {/* NID */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">NID No</label>
                <input
                  {...register("nid")}
                  placeholder="NID"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66]"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66]"
                />
              </div>

              {/* Bike Model */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  Bike Brand Model and Year
                </label>
                <input
                  {...register("bikeModel")}
                  placeholder="Bike Brand Model and Year"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66]"
                />
              </div>

              {/* Bike Registration */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  Bike Registration Number
                </label>
                <input
                  {...register("bikeReg")}
                  placeholder="Bike Registration Number"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66]"
                />
              </div>

              {/* About */}
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  About Yourself
                </label>
                <input
                  {...register("about")}
                  placeholder="Tell Us About Yourself"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66]"
                />
              </div>
            </div>

            <button className="w-full bg-[#CAEB66] hover:bg-[#b6d85a] transition mt-3 py-3 rounded-lg font-medium text-[#0A2A2A] cursor-pointer">
              Submit
            </button>
          </motion.form>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <img src={riderImg} alt="Rider" className="w-80 md:w-[380px]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Rider;
