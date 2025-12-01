import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Commet } from "react-loading-indicators";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();

  const { data: parcel = {}, isLoading } = useQuery({
    queryKey: ["payment", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/parcels/${parcelId}`
      );
      return res.data;
    },
  });
  console.log(parcel);

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  return (
    <div className="w-80 bg-white shadow rounded mx-auto mt-5">
      {" "}
      <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center">
        {" "}
        <div className="flex justify-between">
          {" "}
          <button className="text-white hover:text-blue-500">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />{" "}
            </svg>{" "}
          </button>{" "}
        </div>{" "}
        <div>
          {" "}
          <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
            {" "}
            available{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
      <div className="p-4 flex flex-col items-center">
        {" "}
        <p className="text-gray-400 font-light text-xs text-center">
          {parcel.parcelType}
        </p>{" "}
        <h1 className="text-gray-800 text-center mt-1">{parcel.parcelName}</h1>{" "}
        <p className="text-center text-gray-800 mt-1">$ {parcel.cost}</p>{" "}
        <div className="inline-flex items-center mt-2">
          {" "}
          <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              />{" "}
            </svg>{" "}
          </button>{" "}
          <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
            {" "}
            1{" "}
          </div>{" "}
          <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />{" "}
            </svg>{" "}
          </button>{" "}
        </div>{" "}
        <button
          onClick={handlePayment}
          className="py-2 px-4 bg-lime-500 text-white rounded hover:bg-lime-600 active:bg-lime-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center cursor-pointer"
        >
          {" "}
          Payment Now{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />{" "}
          </svg>{" "}
        </button>{" "}
      </div>
    </div>
  );
};

export default Payment;
