import React from "react";

export default function TestimonialCard({ review }) {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow p-6 border border-gray-200">
      {/* Quote Icon */}
      <div className="text-teal-300 text-4xl mb-4">&#10077;</div>

      {/* Text */}
      <p className="text-gray-600 leading-relaxed mb-4">{review.review}</p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-800 rounded-full">
          <img
            className="w-10 h-10  rounded-full"
            src={review.user_photoURL}
            alt=""
          />
        </div>
        <div>
          <h4 className="font-semibold text-teal-900">{review.userName}</h4>
          <p className="text-gray-500 text-sm">{review.user_email}</p>
        </div>
      </div>
    </div>
  );
}
