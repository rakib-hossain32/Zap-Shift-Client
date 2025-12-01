import {
  Menu,
  User,
  Grid,
  Package,
  Truck,
  DollarSign,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import StatusPill from "../StatusPill";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";

// Data
const stats = [
  { id: 1, label: "To Pay", value: 129 },
  { id: 2, label: "Ready Pick Up", value: 1325 },
  { id: 3, label: "In Transit", value: 50 },
  { id: 4, label: "Ready to Deliver", value: 50 },
  { id: 5, label: "Delivered", value: 50 },
];

const chartData = [
  { day: "Mon", value: 12000 },
  { day: "Tue", value: 18000 },
  { day: "Wed", value: 9000 },
  { day: "Thu", value: 13000 },
  { day: "Fri", value: 15000 },
  { day: "Sat", value: 23000 },
  { day: "Sun", value: 11000 },
];

const shipments = new Array(7).fill(0).map((_, i) => ({
  id: `#RZ${1000 + i}`,
  client: ["Rasel Ahmed", "Rakib Hossain", "Rahim"][i % 3],
  date: "Jan " + (3 + i) + ", 2025",
  weight: `${5 + i} kg`,
  shipper: ["DHL", "Instap", "FedEx", "UPS"][i % 4],
  price: (2000 + i * 500).toLocaleString(),
  status: ["Delivered", "Transit", "Waiting", "Pending"][i % 4],
}));

export default function MyParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
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

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}

          {/* Main Content */}
          <main className="flex-1">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold text-slate-800">
                  Dashboard Overview : {parcels.length}
                </h1>
                <p className="text-sm text-slate-500">
                  You can access all your data and information from anywhere.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-full shadow-sm">
                  <Bell size={16} />
                  <div className="text-sm">{ user?.displayName}</div>
                </div>
                <NavLink to={'/dashboard/add-parcel'} className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-600">
                  + Add Parcel
                </NavLink>
              </div>
            </header>

            {/* Stats */}
            <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {stats.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: s.id * 0.04 }}
                  className="col-span-1 bg-white p-4 rounded-2xl shadow-sm flex flex-col"
                >
                  <div className="text-sm text-slate-400">{s.label}</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-800">
                    {s.value}
                  </div>
                </motion.div>
              ))}
            </section>

            {/* Chart */}
            <section className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Overall Statistics</h3>
                  <div className="text-sm text-slate-500">This Week</div>
                </div>

                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E7ECEB" />
                      <XAxis dataKey="day" />
                      <YAxis
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#9AE6B4"
                        strokeWidth={3}
                        dot={{ r: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Shipping Reports</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div>This Week</div>
                    <div className="p-1 rounded-full hover:bg-slate-100">⋮</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm table-auto">
                    <thead className="text-slate-400 text-left">
                      <tr>
                        <th className="py-2">#</th>
                        <th className="py-2">Client</th>
                        <th className="py-2">Date</th>
                        <th className="py-2">Weight</th>
                        <th className="py-2">Shipper</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>

                    <tbody className="text-slate-600">
                      {shipments.map((row) => (
                        <tr key={row.id} className="border-t">
                          <td className="py-3">{row.id}</td>
                          <td className="py-3">{row.client}</td>
                          <td className="py-3">{row.date}</td>
                          <td className="py-3">{row.weight}</td>
                          <td className="py-3">{row.shipper}</td>
                          <td className="py-3">৳ {row.price}</td>
                          <td className="py-3">
                            <StatusPill status={row.status} />
                          </td>
                          <td className="py-3 flex gap-2">
                            <button className="text-slate-500 hover:text-emerald-500">
                              Edit
                            </button>
                            <button className="text-slate-400">⋮</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Showing 1 - 7 of 7
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-md bg-slate-100">
                      Previous
                    </button>
                    <div className="px-3 py-1 rounded-md bg-emerald-50">1</div>
                    <button className="px-3 py-1 rounded-md bg-slate-100">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

// // Sidebar NavItem
// function NavItem({ icon, label, active, collapsed }) {
//   return (
//     <button
//       className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
//       ${
//         active
//           ? "bg-emerald-50 text-emerald-600"
//           : "hover:bg-slate-50 text-slate-600"
//       }
//     `}
//     >
//       <span>{icon}</span>
//       {!collapsed && <span className="text-sm font-medium">{label}</span>}
//     </button>
//   );
// }

// // Status Pill
// function StatusPill({ status }) {
//   const map = {
//     Delivered: "bg-emerald-100 text-emerald-700",
//     Transit: "bg-sky-100 text-sky-700",
//     Waiting: "bg-amber-100 text-amber-700",
//     Pending: "bg-rose-100 text-rose-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-medium ${
//         map[status] || "bg-slate-100"
//       }`}
//     >
//       {status}
//     </span>
//   );
// }
