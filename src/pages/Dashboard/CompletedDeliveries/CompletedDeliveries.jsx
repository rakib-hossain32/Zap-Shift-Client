import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Commet } from "react-loading-indicators";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    
  } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  console.log(parcels);
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  return (
    <div>
      {" "}
      <h1 className="text-3xl font-bold my-6">
        All Deliveries : {parcels.length}
      </h1>
      <div className="">
        <table className="w-full mt-4 text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                  Sender Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    ></path>
                  </svg>
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                  Receiver Location
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    ></path>
                  </svg>
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                  Delivery Status
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    ></path>
                  </svg>
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                  Cost
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    ></path>
                  </svg>
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                  Payout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    ></path>
                  </svg>
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                  Actions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    ></path>
                  </svg>
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="p-4 border-b border-slate-200">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-700">
                      {parcel.senderName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {parcel.senderEmail}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-700">
                      {parcel.receiverName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {parcel.receiverRegion}
                    </p>
                    <p className="text-sm text-slate-500">
                      {parcel.receiverDistrict}
                    </p>
                  </div>
                </td>
                <td className=" border-b border-slate-200">
                  <div className="w-max">
                    <div
                      className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold ${
                        parcel.deliveryStatus === "driver_assigned"
                          ? "text-red-900 uppercase rounded-md select-none whitespace-nowrap bg-red-500/20"
                          : "text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20"
                      }`}
                    >
                      <span className="">{parcel.deliveryStatus}</span>
                    </div>
                  </div>
                </td>

                <td className="p-4 border-b border-slate-200 space-x-3">
                  {parcel.cost}
                </td>
                <td className="p-4 border-b border-slate-200 ">
                  {calculatePayout(parcel)}
                </td>
                <td className="p-4 border-b border-slate-200 ">
                  <button
                    //   onClick={() =>
                    //     handleDeliveryStatusUpdate(parcel, "rider_arriving")
                    //   }
                    className="btn btn-primary text-secondary rounded-xl text-xs"
                  >
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
