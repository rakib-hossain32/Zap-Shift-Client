
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Commet } from "react-loading-indicators";
import { toast } from "react-toastify";

export default function RiderManagement() {
  const axiosSecure = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rider-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("riders");
      return res.data;
    },
  });

  // console.log(riders)

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };

    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success(`Rider Status is set to ${status}`);
        // console.log("rider status updated");
      }
    });
  };

  const handleApprove = (rider) => {
    updateRiderStatus(rider, "approved");
  };
  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };
  const handleDelete = (rider) => {
    console.log(rider);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Rider Details
      </h1>

      {/* TABLE FORMAT */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-gray-700">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 font-bold ">SN.</th>
              <th className="p-3 font-bold">Rider Info</th>
              <th className="p-3 font-bold">Phone</th>
              <th className="p-3 font-bold">Status</th>
              <th className="p-3 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index} className=" border-b">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <p>
                    <span className="font-bold">Rider Name: </span>
                    {rider.riderName}
                  </p>
                  <p>
                    <span className="font-bold">Rider Email: </span>
                    {rider.email}
                  </p>
                  <p>
                    <span className="font-bold">Rider NID: </span>
                    {rider.nid}
                  </p>
                  <p>
                    <span className="font-bold">Rider Region: </span>
                    {rider.riderRegion}
                  </p>
                  <p>
                    <span className="font-bold">Rider District: </span>
                    {rider.riderDistrict}
                  </p>
                </td>
                <td className="p-3">{rider.phone}</td>

                <td className="p-3">
                  <span
                    className={`font-semibold px-3 py-1 rounded-full text-white ${
                      rider.status === "pending"
                        ? "bg-yellow-500"
                        : rider.status === "approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>
                <td className="p-3 ">
                  <div className="flex flex-wrap gap-1 items-center">
                    <button
                      disabled={
                        rider.status === "approved" ||
                        rider.status === "rejected"
                      }
                      onClick={() => handleApprove(rider)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg shadow-md cursor-pointer disabled:cursor-not-allowed"
                    >
                      <CheckCircle size={15} />
                    </button>

                    <button
                      disabled={
                        rider.status === "approved" ||
                        rider.status === "rejected"
                      }
                      onClick={() => handleReject(rider)}
                      className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg shadow-md cursor-pointer disabled:cursor-not-allowed"
                    >
                      <XCircle size={15} />
                    </button>

                    <button
                      disabled={
                        rider.status === "approved" ||
                        rider.status === "rejected"
                      }
                      onClick={() => handleDelete(rider)}
                      className={`flex items-center gap-2 
    bg-red-600 text-white px-3 py-2 rounded-lg shadow-md
    hover:bg-red-700 cursor-pointer

   
    disabled:cursor-not-allowed 
   
  `}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ACTION BUTTONS */}
    </div>
  );
}
