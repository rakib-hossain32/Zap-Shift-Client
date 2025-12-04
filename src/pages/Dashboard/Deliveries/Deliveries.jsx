import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router";

export default function Deliveries() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/parcels?email=${user.email}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((data) => {
          console.log(data);
          if (data.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  //   const data = [
  //     {
  //       id: "#PTD 145124547",
  //       store: "Rafa Enterprise",
  //       name: "Shakil",
  //       address: "বালিয়াকান্দি, পাশ্চাৎ পাড়া, পলাশবাড়ী 01773649877",
  //       status: "Paid Return",
  //       amount: { cod: 100, charge: 121, discount: 0 },
  //       payment: "Unpaid",
  //     },
  //     {
  //       id: "#PTD 145124547",
  //       store: "Rafa Enterprise",
  //       name: "রাকিবুল",
  //       address: "নাসিরনগর, গাজীপুর সদর, পলাশবাড়ী",
  //       status: "Delivered",
  //       amount: { time: "1 day ago" },
  //       payment: "Paid",
  //     },
  //     {
  //       id: "#PTD 145124547",
  //       store: "Rafa Enterprise",
  //       name: "Anika",
  //       address: "আব্দুল্লাহপুর, উত্তরা, ঢাকা 01978654321",
  //       status: "Pending",
  //       amount: { cod: 150, charge: 175, discount: 25 },
  //       payment: "Pending",
  //     },
  //     {
  //       id: "#PTD 145124547",
  //       store: "Rafa Enterprise",
  //       name: "রাকিবুল",
  //       address: "নাসিরনগর, গাজীপুর সদর, পলাশবাড়ী",
  //       status: "Cancelled",
  //       amount: { time: "2 days ago" },
  //       payment: "Overdue",
  //     },
  //     {
  //       id: "#PTD 145124547",
  //       store: "Rafa Enterprise",
  //       name: "Rameez",
  //       address: "রামপুরা, ঢাকা 018236456789",
  //       status: "Refunded",
  //       amount: { cod: 200, charge: 220, discount: 0 },
  //       payment: "Refunded",
  //     },
  //   ];

  //   const statusColor = {
  //     "Paid Return": "text-green-600",
  //     Delivered: "text-green-500",
  //     Pending: "text-yellow-500",
  //     Cancelled: "text-red-500",
  //     Refunded: "text-blue-500",
  //   };

  //   const paymentColor = {
  //     Unpaid: "bg-yellow-100 text-yellow-600",
  //     Paid: "bg-green-100 text-green-600",
  //     Pending: "bg-yellow-100 text-yellow-600",
  //     Overdue: "bg-red-100 text-red-600",
  //     Refunded: "bg-blue-100 text-blue-600",
  //   };

  return (
    <div className="  min-h-screen">
      <h1 className="text-3xl font-bold my-6">All Deliveries</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total</p>
          <h2 className="text-3xl font-bold">{parcels.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Return</p>
          <h2 className="text-3xl font-bold">1,325</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Paid Return</p>
          <h2 className="text-3xl font-bold">50</h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="p-4">Tracking ID</th>

              <th className="p-4">Recipient Info</th>
              <th className="p-4">Delivery Status</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr className="border-t " key={index}>
                <Link to={`/parcel-track/${parcel.trackingId}`}>
                  <td className="p-4  max-w-36 break-all cursor-pointer hover:underline">
                    {/* {row.id} */}
                    {parcel.trackingId}
                  </td>
                </Link>

                <td className="p-4">
                  <p className="font-semibold">
                    {/* {row.name} */}
                    {parcel?.receiverName}
                  </p>
                  <p className="text-sm text-gray-600">{/* {row.address} */}</p>
                </td>
                <td
                  className={`p-4 font-medium 
                    
                    `}
                >
                  {parcel?.deliveryStatus}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {/* {row.amount.cod && <p>COD ৳ {row.amount.cod}</p>}
                  {row.amount.charge && <p>Charge ৳ {row.amount.charge}</p>}
                  {row.amount.discount !== undefined && (
                    <p>Discount ৳ {row.amount.discount}</p>
                  )}
                  {row.amount.time && <p>{row.amount.time}</p>} */}
                  {parcel.cost}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      parcel.payment_status === "paid"
                        ? "bg-green-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {parcel.payment_status === "paid" ? "paid" : "payment"}
                  </span>
                </td>
                <td className="p-4 space-x-2 text-center space-y-2">
                  {parcel.payment_status === "paid" ? (
                    <NavLink
                      to={`/dashboard/payment/${parcel._id}`}
                      onClick={(e) =>
                        parcel.payment_status === "paid" && e.preventDefault()
                      }
                      className={`px-4 py-1 rounded-lg 
    ${
      parcel.payment_status === "paid"
        ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
        : "bg-green-100 text-green-600 cursor-pointer"
    }
  `}
                    >
                      Pay
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/dashboard/payment/${parcel._id}`}
                      className="bg-green-100 text-green-600 px-4 py-1 rounded-lg cursor-pointer"
                    >
                      Pay
                    </NavLink>
                  )}
                  <Link
                    to={"/dashboard/payment-history"}
                    className="bg-gray-100 text-gray-600 px-4 py-1 rounded-lg cursor-pointer"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="bg-red-100 text-red-600 px-4 py-1 rounded-lg cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
