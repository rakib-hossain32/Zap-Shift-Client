function StatusPill({ status }) {
  const map = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Transit: "bg-sky-100 text-sky-700",
    Waiting: "bg-amber-100 text-amber-700",
    Pending: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        map[status] || "bg-slate-100"
      }`}
    >
      {status}
    </span>
  );
}
export default StatusPill;
