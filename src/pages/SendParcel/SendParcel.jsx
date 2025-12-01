import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SendParcel = ({ isAddParcel }) => {
  const servicesCenter = useLoaderData();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  // console.log(servicesCenter);
  const axiosSecure = useAxiosSecure();
  const { user, } = useAuth();
  const navigate = useNavigate()

  const duplicateRegion = servicesCenter.map((s) => s.region);
  // console.log(duplicateRegion)
  const regions = [...new Set(duplicateRegion)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  // console.log(regions);

  const districtsByRegion = (region) => {
    // console.log(region)
    const regionDistricts = servicesCenter.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    // console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minPrice = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minPrice + extraCharge;
      }
    }
    // console.log("cost", cost);
    data.cost = cost;

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Conform and Continue Payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcels
        axiosSecure.post("/parcels", data).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success("Parcel has created. Please Pay!");
            navigate('/dashboard/deliveries')
          }
        });

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  return (
    <div
      className={`w-full bg-[#F5F7FA] ${isAddParcel ? "py-6" : "py-14"} px-4`}
    >
      <div
        className={`max-w-6xl mx-auto bg-white rounded-3xl shadow-md  ${
          isAddParcel ? "p-5 md:p-9" : "p-10 md:p-16"
        }`}
      >
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-semibold text-[#03373D]">
          Add Parcel
        </h1>

        <p className="text-slate-600 mt-2 max-w-xl">
          Enter your parcel details
        </p>

        <hr className="my-8 border-slate-200" />
        <form onSubmit={handleSubmit(handleSendParcel)}>
          {/* Parcel Type Radio */}
          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="document"
                defaultChecked
                {...register("parcelType")}
                className="
      appearance-none 
      w-5 h-5
      border-2 border-[#CAEB66]
      rounded-full
      relative
      cursor-pointer
      transition-all
      after:content-['']
      after:w-3 after:h-3
      after:bg-[#CAEB66]
      after:rounded-full
      after:absolute
      after:top-1/2 after:left-1/2
      after:-translate-x-1/2 after:-translate-y-1/2
      after:scale-0
      after:transition-all
      checked:after:scale-100
    "
              />
              <span className="text-[#03373D] font-medium">Document</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType")}
                className="
      appearance-none 
      w-5 h-5
      border-2 border-[#CAEB66]
      rounded-full
      relative
      cursor-pointer
      transition-all
      after:content-['']
      after:w-3 after:h-3
      after:bg-[#CAEB66]
      after:rounded-full
      after:absolute
      after:top-1/2 after:left-1/2
      after:-translate-x-1/2 after:-translate-y-1/2
      after:scale-0
      after:transition-all
      checked:after:scale-100
    "
              />
              <span className="text-[#03373D] font-medium">Not-Document</span>
            </label>
          </div>

          {/* Parcel Name + Weight */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <input
              type="text"
              className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
              placeholder="Parcel Name"
              {...register("parcelName")}
            />
            <input
              type="number"
              className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
              placeholder="Parcel Weight (KG)"
              {...register("parcelWeight")}
            />
          </div>

          {/* Grid: Sender + Receiver */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Sender */}
            <div>
              <h2 className="text-lg font-semibold text-[#03373D] mb-4">
                Sender Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  defaultValue={user?.displayName}
                  type="text"
                  {...register("senderName")}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                  placeholder="Sender Name"
                />

                <input
                  type="tel"
                  {...register("senderContact")}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm  focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                  placeholder="Sender Contact No"
                />

                <input
                  defaultValue={user?.email}
                  type="text"
                  {...register("senderEmail")}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66] focus:outline-none md:col-span-2"
                  placeholder="sender@gmail.com"
                />

                <select
                  {...register("senderRegion")}
                  defaultValue={"Select your Region"}
                  className="border border-slate-300 rounded-lg px-4 py-2 bg-white text-sm md:col-span-2 focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                >
                  <option disabled={true}>Select your Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="border border-slate-300 rounded-lg px-4 py-2 bg-white text-sm focus:ring-2 focus:ring-[#CAEB66] focus:outline-none md:col-span-2 "
                >
                  <option disabled={true}>Pick a District</option>
                  {districtsByRegion(senderRegion).map((d, i) => (
                    <option value={d} key={i}>
                      {d}
                    </option>
                  ))}
                </select>

                <textarea
                  {...register("senderInstruction")}
                  rows="3"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm md:col-span-2 focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h2 className="text-lg font-semibold text-[#03373D] mb-4">
                Receiver Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  {...register("receiverName")}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                  placeholder="Receiver Name"
                />

                <input
                  type="tel"
                  {...register("receiverContact")}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                  placeholder="Receiver Contact No"
                />
                <input
                  type="text"
                  {...register("receiverEmail")}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm md:col-span-2 focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                  placeholder="receiver@gmail.com"
                />

                <select
                  {...register("receiverRegion")}
                  defaultValue={"Select your Region"}
                  className="border border-slate-300 rounded-lg px-4 py-2 bg-white text-sm md:col-span-2 focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                >
                  <option disabled={true}>Select your Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <select
                  {...register("receiverDistrict")}
                  defaultValue={"Pick a District"}
                  className="border border-slate-300 rounded-lg px-4 py-2 bg-white text-sm md:col-span-2 focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtsByRegion(receiverRegion).map((d, i) => (
                    <option value={d} key={i}>
                      {d}
                    </option>
                  ))}
                </select>

                <textarea
                  {...register("receiverInstruction")}
                  rows="3"
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm md:col-span-2 focus:ring-2 focus:ring-[#CAEB66] focus:outline-none"
                  placeholder="Delivery Instruction"
                />
              </div>
            </div>
          </div>

          {/* Pickup Note */}
          <p className="text-xs text-slate-500 mt-6">
            * PickUp Time 4pm–7pm Approx.
          </p>

          {/* Button */}
          <button className="mt-6 bg-[#CAEB66] hover:bg-[#b8dc57] px-8 py-3 rounded-lg font-medium text-[#03373D] shadow-md transition cursor-pointer">
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
