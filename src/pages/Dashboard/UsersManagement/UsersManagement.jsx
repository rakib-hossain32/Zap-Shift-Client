
import { Trash2, UserPlus, UserMinus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Commet } from "react-loading-indicators";
import Swal from "sweetalert2";

// UsersManagement - Pure React + TailwindCSS
// Sample data provided by user is used as initial state.
export default function UsersManagement() {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //   const [users, setUsers] = useState([
  //     {
  //       _id: "692d1036da0241bf29772887",
  //       email: "saidul@gmail.com",
  //       displayName: "Saidul",
  //       photoURL: "https://i.ibb.co/NbLRbP8/heroimg.jpg",
  //       role: "rider",
  //       createdAt: 1764560950465, // ms epoch as provided
  //     },
  //   ]);

  const promoteToAdmin = (user) => {
    const roleInfo = { role: "admin" };
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
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: `${user?.displayName} marked as an Admin`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const demoteToUser = (user) => {
      const roleInfo = { role: "user" };
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
          axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: `${user?.displayName}  remove from Admin`,
                icon: "success",
              });
            }
          });
        }
      });
  };

  const handleDelete = (id) => {
    // if (window.confirm("Are you sure you want to delete this user?")) 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Users Management</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Desktop / Tablet Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/12 p-3 text-left text-sm font-medium text-gray-600">
                  #
                </th>
                <th className="w-2/12 p-3 text-left text-sm font-medium text-gray-600">
                  User
                </th>
                <th className="w-3/12 p-3 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="w-2/12 p-3 text-left text-sm font-medium text-gray-600">
                  Role
                </th>
                <th className="w-2/12 p-3 text-left text-sm font-medium text-gray-600">
                  Created
                </th>
                <th className="w-2/12 p-3 text-center text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((u, idx) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-700">{idx + 1}</td>

                  <td className="p-3 text-sm text-gray-700 flex items-center gap-3">
                    <img
                      referrerPolicy="no-referrer"
                      src={u.photoURL}
                      alt={u.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{u.displayName}</div>
                    </div>
                  </td>

                  <td className="p-3 text-sm text-gray-600">{u.email}</td>

                  <td className="p-3 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-indigo-600"
                          : u.role === "rider"
                          ? "bg-emerald-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-3 text-sm text-gray-600">
                    {new Date(u.createdAt).toLocaleString()}
                  </td>

                  <td className="p-3 text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      {u.role !== "admin" ? (
                        <button
                          onClick={() => promoteToAdmin(u)}
                          title="Promote to admin"
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md cursor-pointer"
                        >
                          <UserPlus size={16} /> Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => demoteToUser(u)}
                          title="Demote to user"
                          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md cursor-pointer"
                        >
                          <UserMinus size={16} /> Demote
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(u._id)}
                        title="Delete user"
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards for small screens */}
        <div className="block md:hidden p-4">
          <div className="space-y-4">
            {users.map((u) => (
              <div
                key={u._id}
                className="border p-4 rounded-xl shadow-sm bg-white"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={u.photoURL}
                    alt={u.displayName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{u.displayName}</div>
                    <div className="text-sm text-gray-600">{u.email}</div>
                    <div className="text-xs mt-1 text-gray-500">
                      {new Date(u.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {u.role !== "admin" ? (
                    <button
                      onClick={() => promoteToAdmin(u._id)}
                      className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md flex items-center justify-center gap-2"
                    >
                      <UserPlus size={16} /> Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => demoteToUser(u._id)}
                      className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md flex items-center justify-center gap-2"
                    >
                      <UserMinus size={16} /> Demote
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(u._id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}

            {users.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
