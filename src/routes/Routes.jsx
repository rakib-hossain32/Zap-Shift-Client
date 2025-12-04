import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Coverage from "../pages/Coverage/Coverage";
import About from "../pages/About/About";
import AuthLayout from "../Root/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../Root/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Deliveries from "../pages/Dashboard/Deliveries/Deliveries";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import RiderManagement from "../pages/Dashboard/RiderManagement/RiderManagement";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRouter from "./AdminRouter";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        element: (
          <PrivateRoute>
            <Coverage />
          </PrivateRoute>
        ),
        loader: () => fetch("./serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "about-us",
        Component: About,
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("./serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "rider",
        Component: Rider,
        loader: () => fetch("./serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/parcel-track/:trackingId",
        Component: ParcelTrack,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "add-parcel",
        // Component: SendParcel
        element: <SendParcel isAddParcel={true} />,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "deliveries",
        Component: Deliveries,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },

      // rider route
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            {" "}
            <AssignedDeliveries />
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            {" "}
            <CompletedDeliveries />
          </RiderRoute>
        ),
      },

      // admit route
      {
        path: "rider-management",
        element: (
          <AdminRouter>
            <RiderManagement />
          </AdminRouter>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRouter>
            <AssignRiders />
          </AdminRouter>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRouter>
            <UsersManagement />
          </AdminRouter>
        ),
      },
    ],
  },
]);
