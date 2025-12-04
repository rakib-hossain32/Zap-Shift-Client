import React from "react";
import { CheckCircle, Clock, Truck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const STATUS_ORDER = [
  "pending-pickup",
  "driver_assigned",
  "rider_arriving",
  "parcel_picked_up",
  "parcel_delivered",
];

const STATUS_META = {
  "pending-pickup": { label: "Pending pickup", icon: Clock },
  driver_assigned: { label: "Driver assigned", icon: Truck },
  rider_arriving: { label: "Rider arriving", icon: MapPin },
  parcel_picked_up: { label: "Picked up", icon: Truck },
  parcel_delivered: { label: "Delivered", icon: CheckCircle },
};

function formatDate(iso) {
  try {
    const d = new Date(iso);

    return (
      d.toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " | " +
      d.toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "short", // Dec
        year: "numeric",
      })
    );
  } catch {
    return iso;
  }
}


export default function ParcelTracking() {
  const axios = useAxios();
  const { trackingId } = useParams();

  const { data: trackings = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axios.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  const events = [...trackings].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt).toDateString()
  );

  const lastStatus = events.length ? events[events.length - 1].status : null;
  const currentIndex = STATUS_ORDER.indexOf(lastStatus);
  const progressPct =
    currentIndex < 0
      ? 0
      : Math.round(((currentIndex + 1) / STATUS_ORDER.length) * 100);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 ">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold">Parcel Tracking</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Live timeline of parcel events
        </p>
      </header>

      <section className="bg-white rounded-2xl shadow p-8 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500">Tracking ID</div>
            <div className="font-medium text-lg">
              {trackings[0]?.trackingId ?? "—"}
            </div>
          </div>

          <div className="sm:flex-1">
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-linear-to-r from-indigo-500 via-teal-400 to-emerald-400"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>{progressPct}% complete</span>
              <span>
                {STATUS_ORDER[currentIndex]
                  ? STATUS_META[STATUS_ORDER[currentIndex]].label
                  : "Not started"}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-slate-500">Last update</div>
            <div className="font-medium">
              {events.length
                ? formatDate(events[events.length - 1].createdAt)
                : "—"}
            </div>
          </div>
        </div>

        <ol className="mt-6 relative border-l border-slate-200">
          {STATUS_ORDER.map((statusKey, idx) => {
            const meta = STATUS_META[statusKey] || { label: statusKey };
            const event = events.find((ev) => ev.status === statusKey);
            const stepState =
              idx <= currentIndex
                ? "completed"
                : idx === currentIndex + 1
                ? "next"
                : "pending";
            const Icon = meta.icon || Clock;

            return (
              <li key={statusKey} className="mb-8 ml-4">
                <span
                  className={`-left-3 absolute flex items-center justify-center w-6 h-6 rounded-full border ${
                    stepState === "completed"
                      ? "bg-emerald-500 border-emerald-600 text-white"
                      : stepState === "next"
                      ? "bg-indigo-50 border-indigo-400 text-indigo-600"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                  style={{ transform: "translateX(-50%)" }}
                >
                  <Icon size={14} />
                </span>

                <div className="pl-8">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-sm font-medium ${
                        stepState === "completed"
                          ? "text-emerald-700"
                          : "text-slate-700"
                      }`}
                    >
                      {meta.label}
                    </h3>
                    <div className="text-xs text-slate-500">
                      {event ? formatDate(event.createdAt) : "—"}
                    </div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`mt-1 text-sm ${
                      stepState === "completed"
                        ? "text-slate-600"
                        : "text-slate-500"
                    }`}
                  >
                    {event?.details ?? "No update yet"}
                  </motion.p>

                  {event?._id && (
                    <div className="mt-2 text-xs text-slate-400">
                      Event id: <span className="font-mono">{event._id}</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
