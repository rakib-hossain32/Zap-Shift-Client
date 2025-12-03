import React, { useState } from "react";
import {
  Menu,
  User,
  Grid,
  Package,
  Truck,
  DollarSign,
  ChevronDown,
  BellIcon,
  Motorbike,
} from "lucide-react";

import NavItem from "../pages/Dashboard/NavItem";

import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Commet } from "react-loading-indicators";

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { user } = useAuth();
  const { role, isLoading } = useRole();
  console.log(role)

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`
              bg-white rounded-2xl shadow-md p-4 sticky top-6 h-[86vh]
              transition-all duration-300
              ${isCollapsed ? "w-20" : "w-64"}
            `}
          >
            {/* Logo + Menu */}
            <div className="flex items-center gap-3 px-2 py-3 ">
              <NavLink
                to={"/"}
                className="w-10 h-10 rounded-lg bg-emerald-400 flex items-center justify-center text-white font-bold cursor-pointer"
              >
                Z
              </NavLink>

              {!isCollapsed && (
                <div>
                  <h3 className="text-slate-800 font-semibold">ZapShift</h3>
                  <p className="text-sm text-slate-400">Admin</p>
                </div>
              )}

              <button
                className={`p-1 rounded-md hover:bg-slate-100 ${
                  isCollapsed || "ml-auto"
                }`}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <Menu size={18} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6 space-y-1">
              <NavItem
                to="/dashboard/my-parcels"
                icon={<Grid size={16} />}
                label="Dashboard"
                active
                collapsed={isCollapsed}
              />
              <NavItem
                to="/dashboard/deliveries"
                icon={<Truck size={16} />}
                label="Deliveries"
                collapsed={isCollapsed}
              />
              {role.role === "admin" && (
                <>
                  <NavItem
                    to="/dashboard/rider-management"
                    icon={<Package size={16} />}
                    label="Rider Management"
                    collapsed={isCollapsed}
                  />
                  <NavItem
                    to="/dashboard/assign-riders"
                    icon={<Motorbike size={16} />}
                    label="Assign Rider"
                    collapsed={isCollapsed}
                  />
                  <NavItem
                    to="/dashboard/users-management"
                    icon={<User size={16} />}
                    label="Users Management"
                    collapsed={isCollapsed}
                  />
                </>
              )}
              <NavItem
                to="/pricing"
                icon={<DollarSign size={16} />}
                label="Pricing Plan"
                collapsed={isCollapsed}
              />
            </nav>

            {/* Extra Options */}
            {!isCollapsed && (
              <div className="mt-6 border-t pt-4 text-sm text-slate-500">
                <button className="w-full text-left py-2 hover:bg-slate-50 rounded-md px-2">
                  Settings
                </button>
                <button className="w-full text-left py-2 hover:bg-slate-50 rounded-md px-2">
                  Change Password
                </button>
                <button className="w-full text-left py-2 hover:bg-slate-50 rounded-md px-2">
                  Help
                </button>
                <button className="w-full text-left py-2 text-red-500 hover:bg-red-50 rounded-md px-2">
                  Logout
                </button>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 ">
            <nav className="navbar justify-between left-0 sticky top-0   bg-white border-b border-secondary/30 z-1000">
              <h2 className=" font-bold text-secondary text-2xl">
                Zap Shift Dashboard
              </h2>
              <div className="flex items-center space-x-4">
                {/* নোটিফিকেশন আইকন */}
                <button className="p-2 text-gray-500 hover:text-gray-700 relative rounded-full hover:bg-gray-100 transition-colors">
                  <BellIcon className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* ইউজার প্রোফাইল */}
                <div className="flex items-center space-x-3 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                    <img
                      src={user?.photoURL}
                      referrerPolicy="no-referrer"
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                </div>
              </div>
            </nav>
            <div className="">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// import { Truck } from 'lucide-react';
// import React from 'react';
// import { Link, NavLink, Outlet } from 'react-router';

// // import { useState } from "react";
// // // import Sidebar from "./Sidebar";
// // // import Header from "./Header";

// const DashboardLayout = () => {
//     return (
//       <div className="drawer lg:drawer-open max-w-7xl mx-auto ">
//         <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content ">
//           {/* Navbar */}
//           <nav className="navbar w-full ">
//             <label
//               htmlFor="my-drawer-4"
//               aria-label="open sidebar"
//               className="btn btn-square btn-ghost"
//             >
//               {/* Sidebar toggle icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 strokeWidth="2"
//                 fill="none"
//                 stroke="currentColor"
//                 className="my-1.5 inline-block size-4"
//               >
//                 <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
//                 <path d="M9 4v16"></path>
//                 <path d="M14 10l2 2l-2 2"></path>
//               </svg>
//             </label>
//             <div className="px-4 font-semibold">Zap Shift Dashboard</div>
//           </nav>
//           <Outlet />
//           {/* Page content here */}
//         </div>

//         <div className="drawer-side is-drawer-close:overflow-visible">
//           <label
//             htmlFor="my-drawer-4"
//             aria-label="close sidebar"
//             className="drawer-overlay"
//           ></label>
//           <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//             {/* Sidebar content here */}
//             <ul className="menu w-full grow">
//               {/* List item */}
//               <li>
//                 <Link
//                   to="/"
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Homepage"
//                 >
//                   {/* Home icon */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                     strokeWidth="2"
//                     fill="none"
//                     stroke="currentColor"
//                     className="my-1.5 inline-block size-4"
//                   >
//                     <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
//                     <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                   </svg>
//                   <span className="is-drawer-close:hidden">Home</span>
//                 </Link>
//               </li>

//               <li>
//                 <NavLink
//                   to={"my-parcels"}
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Settings"
//                 >
//                   <Truck size={18} />
//                   <span className="is-drawer-close:hidden">My Parcels</span>
//                 </NavLink>
//               </li>

//               {/* List item */}
//               <li>
//                 <button
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Settings"
//                 >
//                   {/* Settings icon */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                     strokeWidth="2"
//                     fill="none"
//                     stroke="currentColor"
//                     className="my-1.5 inline-block size-4"
//                   >
//                     <path d="M20 7h-9"></path>
//                     <path d="M14 17H5"></path>
//                     <circle cx="17" cy="17" r="3"></circle>
//                     <circle cx="7" cy="7" r="3"></circle>
//                   </svg>
//                   <span className="is-drawer-close:hidden">Settings</span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default DashboardLayout;

// import React, { useState } from "react";
// import {
//   Menu,
//   User,
//   Grid,
//   Package,
//   Truck,
//   DollarSign,
//   Bell,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import NavItem from "../pages/Dashboard/NavItem";

// // import NavItem from "../NavItem";

// // Data
// const stats = [
//   { id: 1, label: "To Pay", value: 129 },
//   { id: 2, label: "Ready Pick Up", value: 1325 },
//   { id: 3, label: "In Transit", value: 50 },
//   { id: 4, label: "Ready to Deliver", value: 50 },
//   { id: 5, label: "Delivered", value: 50 },
// ];

// const chartData = [
//   { day: "Mon", value: 12000 },
//   { day: "Tue", value: 18000 },
//   { day: "Wed", value: 9000 },
//   { day: "Thu", value: 13000 },
//   { day: "Fri", value: 15000 },
//   { day: "Sat", value: 23000 },
//   { day: "Sun", value: 11000 },
// ];

// const shipments = new Array(7).fill(0).map((_, i) => ({
//   id: `#RZ${1000 + i}`,
//   client: ["Rasel Ahmed", "Rakib Hossain", "Rahim"][i % 3],
//   date: "Jan " + (3 + i) + ", 2025",
//   weight: `${5 + i} kg`,
//   shipper: ["DHL", "Instap", "FedEx", "UPS"][i % 4],
//   price: (2000 + i * 500).toLocaleString(),
//   status: ["Delivered", "Transit", "Waiting", "Pending"][i % 4],
// }));

// export default function ZapShiftDashboard() {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#F4F7F6] text-slate-700 font-sans">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex gap-6">
//           {/* Sidebar */}
//           <aside
//             className={`
//               bg-white rounded-2xl shadow-md p-4 sticky top-6 h-[86vh]
//               transition-all duration-300
//               ${isCollapsed ? "w-20" : "w-64"}
//             `}
//           >
//             {/* Logo + Menu */}
//             <div className="flex items-center gap-3 px-2 py-3">
//               <div className="w-10 h-10 rounded-lg bg-emerald-400 flex items-center justify-center text-white font-bold">
//                 Z
//               </div>

//               {!isCollapsed && (
//                 <div>
//                   <h3 className="text-slate-800 font-semibold">ZapShift</h3>
//                   <p className="text-sm text-slate-400">Admin</p>
//                 </div>
//               )}

//               <button
//                 className="ml-auto p-1 rounded-md hover:bg-slate-100"
//                 onClick={() => setIsCollapsed(!isCollapsed)}
//               >
//                 <Menu size={18} />
//               </button>
//             </div>

//             {/* Navigation */}
//             <nav className="mt-6 space-y-1">
//               <NavItem
//                 icon={<Grid size={16} />}
//                 label="Dashboard"
//                 active
//                 collapsed={isCollapsed}
//               />
//               <NavItem
//                 icon={<Truck size={16} />}
//                 label="Deliveries"
//                 collapsed={isCollapsed}
//               />
//               <NavItem
//                 icon={<Package size={16} />}
//                 label="Invoices"
//                 collapsed={isCollapsed}
//               />
//               <NavItem
//                 icon={<User size={16} />}
//                 label="Stores"
//                 collapsed={isCollapsed}
//               />
//               <NavItem
//                 icon={<DollarSign size={16} />}
//                 label="Pricing Plan"
//                 collapsed={isCollapsed}
//               />
//             </nav>

//             {/* Extra Options */}
//             {!isCollapsed && (
//               <div className="mt-6 border-t pt-4 text-sm text-slate-500">
//                 <button className="w-full text-left py-2 hover:bg-slate-50 rounded-md px-2">
//                   Settings
//                 </button>
//                 <button className="w-full text-left py-2 hover:bg-slate-50 rounded-md px-2">
//                   Change Password
//                 </button>
//                 <button className="w-full text-left py-2 hover:bg-slate-50 rounded-md px-2">
//                   Help
//                 </button>
//                 <button className="w-full text-left py-2 text-red-500 hover:bg-red-50 rounded-md px-2">
//                   Logout
//                 </button>
//               </div>
//             )}
//           </aside>

//           {/* Main Content */}
//           <main className="flex-1 ">
//             <header className="flex items-center justify-between mb-6 shadow rounded-2xl p-5">
//               <div>
//                 <h1 className="text-xl font-semibold text-slate-800">
//                   Dashboard Overview
//                 </h1>
//                 <p className="text-sm text-slate-500">
//                   You can access all your data and information from anywhere.
//                 </p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-full shadow-sm">
//                   <Bell size={16} />
//                   <div className="text-sm">Zahid Hossain</div>
//                 </div>
//                 <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-600">
//                   + Add Parcel
//                 </button>
//               </div>
//             </header>

//             {/* Stats */}

//             {/* Chart */}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// // // Sidebar NavItem
// // function NavItem({ icon, label, active, collapsed }) {
// //   return (
// //     <button
// //       className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
// //       ${
// //         active
// //           ? "bg-emerald-50 text-emerald-600"
// //           : "hover:bg-slate-50 text-slate-600"
// //       }
// //     `}
// //     >
// //       <span>{icon}</span>
// //       {!collapsed && <span className="text-sm font-medium">{label}</span>}
// //     </button>
// //   );
// // }

// // // Status Pill
// // function StatusPill({ status }) {
// //   const map = {
// //     Delivered: "bg-emerald-100 text-emerald-700",
// //     Transit: "bg-sky-100 text-sky-700",
// //     Waiting: "bg-amber-100 text-amber-700",
// //     Pending: "bg-rose-100 text-rose-700",
// //   };

// //   return (
// //     <span
// //       className={`px-3 py-1 rounded-full text-xs font-medium ${
// //         map[status] || "bg-slate-100"
// //       }`}
// //     >
// //       {status}
// //     </span>
// //   );
// // }

// const DashboardLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // আইকনগুলির জন্য সাধারণ SVG কম্পোনেন্ট
//   const Icon = ({ children, className = "w-5 h-5" }) => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       {children}
//     </svg>
//   );

//   const MenuIcon = (props) => (
//     <Icon {...props}>
//       <line x1="3" y1="12" x2="21" y2="12" />
//       <line x1="3" y1="6" x2="21" y2="6" />
//       <line x1="3" y1="18" x2="21" y2="18" />
//     </Icon>
//   );

//   const BellIcon = (props) => (
//     <Icon {...props}>
//       <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
//     </Icon>
//   );

//   const ChevronDown = (props) => (
//     <Icon {...props}>
//       <path d="M6 9l6 6 6-6" />
//     </Icon>
//   );

//   const DashboardIcon = (props) => (
//     <Icon {...props}>
//       <path d="M3 3v18h18" />
//       <path d="M18.7 8l-5.1 5.2-2.8-2.7-5.5 5.5" />
//     </Icon>
//   );

//   const TruckIcon = (props) => (
//     <Icon {...props}>
//       <rect x="1" y="3" width="15" height="10" rx="2" />
//       <path d="M17 9h4l2 3v3h-2v1h-5v-1H7v1H2v-4h18" />
//       <path d="M5 19h1" />
//       <path d="M17 19h1" />
//     </Icon>
//   );

//   const FileTextIcon = (props) => (
//     <Icon {...props}>
//       <path d="M15 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7z" />
//       <path d="M14 2v4a2 2 0 002 2h4" />
//       <path d="M10 9H8" />
//       <path d="M16 13H8" />
//       <path d="M16 17H8" />
//     </Icon>
//   );

//   const StoreIcon = (props) => (
//     <Icon {...props}>
//       <path d="M21 12V7M21 7V3H13M21 7L13 1" />
//       <path d="M3 11v9a2 2 0 002 2h14a2 2 0 002-2v-9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
//     </Icon>
//   );

//   const TagIcon = (props) => (
//     <Icon {...props}>
//       <path d="M18.7 6.3l-5-5-5 5-5 5-5 5V21h15l5-5-5-5z" />
//     </Icon>
//   );

//   const MapIcon = (props) => (
//     <Icon {...props}>
//       <path d="M3 3v18h18" />
//       <path d="M7 11.5L12 16.5L17 11.5" />
//       <path d="M12 16.5L12 3" />
//     </Icon>
//   );

//   const SettingsIcon = (props) => (
//     <Icon {...props}>
//       <circle cx="12" cy="12" r="3" />
//       <path d="M19.4 15a1.4 1.4 0 00-.8-2.6L16.2 11c-.4-.5-.9-1-1.4-1.4L13.6 7.4a1.4 1.4 0 00-2.6-.8L9 7.8c-.5.4-1 1-1.4 1.4L5.4 10.4a1.4 1.4 0 00-.8 2.6L7.8 15c.4.5.9 1 1.4 1.4L10.4 18.6a1.4 1.4 0 002.6.8L15 16.2c.5-.4 1-1 1.4-1.4l2.2-2.2z" />
//     </Icon>
//   );

//   const LockIcon = (props) => (
//     <Icon {...props}>
//       <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//       <path d="M7 11V7a5 5 0 0110 0v4" />
//     </Icon>
//   );

//   const HelpCircleIcon = (props) => (
//     <Icon {...props}>
//       <circle cx="12" cy="12" r="10" />
//       <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
//       <path d="M12 17h.01" />
//     </Icon>
//   );

//   const LogOutIcon = (props) => (
//     <Icon {...props}>
//       <path d="M18.88 9.17A8.001 8.001 0 1018.88 15.83" />
//       <path d="M22 12H10" />
//       <path d="M22 12l-3-3" />
//       <path d="M22 12l-3 3" />
//     </Icon>
//   );

//   const PlusIcon = (props) => (
//     <Icon {...props}>
//       <path d="M12 5v14" />
//       <path d="M5 12h14" />
//     </Icon>
//   );

//   // Sidebar মেনু আইটেম

//   // KDI (Key Dashboard Indicator) কার্ড ডেটা
//   const kdiData = [
//     { title: "To Pay", count: "129", icon: DashboardIcon },
//     { title: "Ready Pick Up", count: "1,325", icon: TruckIcon },
//     { title: "In Transit", count: "50", icon: MapIcon },
//     { title: "Ready to Deliver", count: "50", icon: FileTextIcon },
//     { title: "Delivered", count: "50", icon: StoreIcon },
//   ];

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 font-sans">
//       {/* Sidebar */}
//       <div className="hidden lg:block">
//         <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
//       </div>
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
//         {/* Header/Navbar */}
//         <Header toggleSidebar={toggleSidebar} />

//         {/* Scrollable Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
//           {/* Dashboard Header and Button */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Dashboard Overview
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 You can access all your data and information from anywhere.
//               </p>
//             </div>
//             <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-colors mt-4 sm:mt-0">
//               <PlusIcon className="w-5 h-5" />
//               <span>Add Parcel</span>
//             </button>
//           </div>

//           {/* KDI Cards Grid */}

//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
