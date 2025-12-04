import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Commet } from "react-loading-indicators";
import { toast } from "react-toastify";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    console.log(parcel);
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    let message = `Parcel Status is updated with ${status.replace("_", " ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success(message);
        }
      });
  };

  //   console.log(parcels);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  return (
    <div>
      {/* <!-- component --> */}
      <div className="w-full mx-auto">
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
          <div className=" ">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Parcels Pending Pickup : {parcels.length}
              </h3>
              <p className="text-slate-500">Review each person before edit</p>
            </div>
          </div>
        </div>
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
                    Action
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
                    Other Actions
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
                  <td className="p-4 border-b border-slate-200">
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
                    {parcel.deliveryStatus === "driver_assigned" ? (
                      <>
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(parcel, "rider_arriving")
                          }
                          className="btn btn-primary text-secondary rounded-xl text-xs"
                        >
                          Accept
                        </button>
                        <button className="btn btn-warning rounded-xl text-xs">
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-blue-900 uppercase rounded-md select-none whitespace-nowrap bg-blue-500/20  px-2 py-1 font-sans text-xs font-bold">
                        Rider Accepted
                      </span>
                    )}
                  </td>
                  <td className="p-4 border-b border-slate-200 space-x-3">
                    {/* {parcel.deliveryStatus === "driver_assigned" ? ( */}
                    {parcel.deliveryStatus === "driver_assigned" ? (
                      <span className="text-secondary text-center">
                        please accept <br /> and next step.
                      </span>
                    ) : (
                      <div className="flex flex-col space-y-1">
                        {parcel.deliveryStatus === "parcel_picked_up" ? (
                          <span className="text-lime-900 uppercase rounded-md select-none whitespace-nowrap bg-lime-500/20  px-2 py-1 font-sans text-xs font-bold">
                            {parcel.deliveryStatus}
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleDeliveryStatusUpdate(
                                parcel,
                                "parcel_picked_up"
                              )
                            }
                            className="btn btn-primary text-secondary rounded-xl text-xs"
                          >
                            Mark as Picked Up
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(
                              parcel,
                              "parcel_delivered"
                            )
                          }
                          className="btn btn-warning rounded-xl text-xs"
                        >
                          Mark as Delivered
                        </button>
                      </div>
                    )}
                    {/* ) : (
                      <span className="text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20  px-2 py-1 font-sans text-sm font-bold">
                        Rider Accepted
                      </span>
                    )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
