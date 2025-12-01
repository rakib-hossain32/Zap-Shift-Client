import { NavLink } from "react-router";

function NavItem({ icon, label, collapsed, to }) {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-emerald-50 text-emerald-600"
            : "hover:bg-slate-50 text-slate-600"
        }`
      }
    >
      <span>{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
}
export default NavItem;
