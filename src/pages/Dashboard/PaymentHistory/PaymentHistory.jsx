import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";


export default function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/payments?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">
        Payment History
      </h1>

      <div className="bg-white shadow-md rounded-xl border border-gray-100">
        {/* FOR LARGE SCREENS */}
        <div className="overflow-hidden hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-gray-100/60">
              <tr className="text-gray-600 text-sm">
                <th className="p-4 ">Parcel Info</th>
                <th className="p-4">Recipient Info</th>
                <th className="p-4">Tracking Number</th>
                <th className="p-4">Payment Info</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((item, idx) => (
                <tr
                  key={idx}
                  className={`text-sm ${
                    idx % 2 !== 0 ? "bg-gray-50/50" : "bg-white"
                  }`}
                >
                  <td className="p-4  font-medium text-gray-700">
                    {item.parcelId}
                  </td>

                  <td className="p-4  text-gray-700">
                    <p className="font-semibold">{item.customerEmail}</p>
                    <p className="text-gray-500">{item.transactionId}</p>
                    <p className="text-gray-500">{item.paymentStatus}</p>
                    <p className="text-gray-600 text-sm">{moment(item.paidAt).format("DD MMM YYYY, h:mm A")}</p>
                  </td>

                  <td className="p-4  text-gray-700">{item.trackingId}</td>

                  <td className="p-4  text-gray-700 font-semibold">
                    {item.amount}
                  </td>

                  <td className="p-4  text-center">
                    <button className="px-5 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="md:hidden p-4 space-y-4">
          {payments.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <div className="mb-3">
                <p className="text-gray-700 font-semibold">
                  Parcel: {item.parcelId}
                </p>
              </div>

              <div className="text-gray-600 text-sm space-y-1">
                <p>
                  <span className="font-semibold">Customer:</span>{" "}
                  {item.customerEmail}
                </p>
                <p>
                  <span className="font-semibold">Transaction:</span>{" "}
                  {item.transactionId}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {item.paymentStatus}
                </p>
                <p>
                  <span className="font-semibold">Paid At:</span> {item.paidAt}
                </p>
                <p>
                  <span className="font-semibold">Tracking:</span>{" "}
                  {item.trackingId}
                </p>
                <p className="font-semibold text-gray-800">
                  Amount: {item.amount}
                </p>
              </div>

              <div className="mt-4">
                <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
