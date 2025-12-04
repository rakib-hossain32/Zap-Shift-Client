import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&riderDistrict=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      // console.log(res.data, selectedParcel.senderDistrict)
      return res.data;
    },
  });

  // Modal open
  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setModalOpen(true);
  };

  // Modal close
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAssign = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.riderName,
      trackingId: selectedParcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}/assign`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Rider has been Assigned");
        }
      });
  };

  // console.log(riders);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold my-5 text-center">Rider Assign Page</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">Tracking ID</th>
              <th className="p-3">Sender</th>
              <th className="p-3">Receiver</th>
              <th className="p-3">Cost</th>
              <th className="p-3 ">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Assign Rider</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="border border-b">
                <td className="p-3 font-bold text-sm">{parcel.trackingId}</td>

                <td className="p-3 text-sm">
                  <p>
                    <b>{parcel.senderName}</b>
                  </p>
                  <p className="text-gray-500 text-sm">{parcel.senderEmail}</p>
                  <p className="text-gray-500">
                    {parcel.senderRegion} - {parcel.senderDistrict}
                  </p>
                </td>

                <td className="p-3 text-sm">
                  <p>
                    <b>{parcel.receiverName}</b>
                  </p>
                  <p className="text-gray-500 text-sm">
                    {parcel.receiverEmail}
                  </p>
                  <p className="text-gray-500">
                    {parcel.receiverRegion} - {parcel.receiverDistrict}
                  </p>
                </td>

                <td className="p-3">{parcel.cost} TK</td>

                <td className=" w-32">
                  <span className="px-3  py-1 rounded-full text-white bg-orange-600 text-sm">
                    {parcel.deliveryStatus}
                  </span>
                </td>

                <td className="px-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      parcel.payment_status === "paid"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => openModal(parcel)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- MODAL ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">
              Assign Rider for{" "}
              <span className="text-blue-600">{selectedParcel.trackingId}</span>
            </h2>

            {/* ========== RIDER TABLE ========== */}
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">Name</th>
                  <th className="border px-3 py-2 text-left">Phone</th>
                  <th className="border px-3 py-2 text-left">Region</th>
                  <th className="border px-3 py-2 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {riders.map((rider, ) => (
                  <tr key={rider._id}>
                    <td className="border px-3 py-2">{rider.riderName}</td>
                    <td className="border px-3 py-2">{rider.phone}</td>
                    <td className="border px-3 py-2">{rider.riderDistrict}</td>
                    <td className="border px-3 py-2">
                      <button
                        onClick={() => handleAssign(rider)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow cursor-pointer text-sm"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ========== ASSIGN BUTTON ========== */}
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 mt-4 cursor-pointer text-sm "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRiders;
