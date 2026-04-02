import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { BellIcon, ChevronDown, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'

/** One height (40px) for every rail control—do not mix `.btn` / `.btn-sm` here. */
const NAV_RAIL =
  "h-10 min-h-[2.5rem] shrink-0 inline-flex items-center justify-center gap-2 rounded-lg px-3.5 text-sm transition-colors duration-200 box-border";

/** Dark “instrument rail” — matches night shell / theme-color */
function navRailGhost(isActive) {
  return `${NAV_RAIL} border-2 font-semibold shadow-sm shadow-black/20 ${
    isActive
      ? "border-slate-500 bg-slate-800 text-slate-50"
      : "border-slate-600 bg-slate-800/70 text-slate-200 hover:border-slate-500 hover:bg-slate-800"
  }`;
}

function navRailPrimary(isActive) {
  return `${NAV_RAIL} border border-blue-500 bg-gradient-to-b from-blue-600 to-blue-700 font-bold text-white shadow-md shadow-black/25 hover:from-blue-500 hover:to-blue-600 ${
    isActive ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0f172a]" : ""
  }`;
}

function navRailSecondary(isActive) {
  return `${NAV_RAIL} border-2 border-slate-500 bg-slate-800/90 font-semibold text-slate-100 hover:border-blue-400 hover:bg-slate-800 ${
    isActive
      ? "border-blue-400 bg-slate-800 ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0f172a]"
      : ""
  }`;
}

export default function Navbar({notificationCount}) {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0f172a] shadow-md shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="/images/logo.png"
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-slate-600 shadow-md shadow-black/40 transition-all hover:ring-blue-400/80 sm:h-10 sm:w-10"
            alt="Brand Logo"
          />

          <Link
            to={
              !user
                ? "/"
                : role === "ADMIN"
                  ? "/admin/dashboard"
                  : "/user/index"
            }
            className="min-w-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
          >
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-2xs">
              APSRTC
            </span>
            <span className="mt-0.5 block truncate text-base font-semibold leading-snug tracking-tight text-slate-100 sm:max-w-[min(100%,28rem)] sm:whitespace-normal sm:text-[1.0625rem] sm:leading-tight">
              <span className="sm:hidden">APSRTC</span>
              <span className="hidden sm:inline">
                Andhra Pradesh State Road Transport Corporation
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex shrink-0 items-center gap-2 text-sm">
          {!user && (
            <>
              <Link
                to="/register"
                className="btn-success"
              >
                <User size={20} strokeWidth={2.5} />
                Register Now
              </Link>
              <Link
                to="/"
                className="btn-primary"
              >
                <LogOut size={20} strokeWidth={2} />
                Sign In
              </Link>
            </>
          )}

          {user && role !== "ADMIN" && (
            <>
              <NavLink to="/user/index" label="Home" />
              <NavLink to="/user/departments" label="Departments" />
              <UserMenu label={user.name} logout={logout} role={role} />
            </>
          )}

          {user && role === "ADMIN" && (
            <>
              <div className="flex items-center gap-2 pr-0.5">
                <NavLink to="/admin/dashboard" label="Directory" />
              </div>
              <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
                <NavLink to="/admin/add-user" label="Add User" variant="primary" />
                <NavLink
                  to="/admin/add-duty"
                  label="Add Duty"
                  variant="secondary"
                />
              </div>
              <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
                <div className="relative">
                  <LeavesBellLink
                    active={
                      location.pathname === "/admin/leaves/pending" ||
                      location.pathname.startsWith("/admin/leaves/")
                    }
                  />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-red-600 px-1 text-[0.65rem] font-bold text-white tabular-nums shadow-sm">
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </span>
                  )}
                </div>
                <UserMenu label={user.name} logout={logout} role={role} />
              </div>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`md:hidden ${navRailGhost(false)} !px-0 w-10 text-base font-semibold text-slate-200`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0f172a] shadow-lg shadow-black/40 animate-slide-down">
          <nav className="flex flex-col p-4 gap-3">
            {!user && (
              <>
                <Link
                  to="/register"
                  className="btn-success py-4 text-base"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={20} strokeWidth={2.5} />
                  Register Now
                </Link>
                <Link
                  to="/"
                  className="btn-primary py-4 text-base"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogOut size={20} />
                  Sign In
                </Link>
              </>
            )}

            {user && role !== "ADMIN" && (
              <>
                <MobileNavLink
                  to="/user/index"
                  label="Home"
                  close={setMobileOpen}
                />
                <MobileNavLink
                  to="/user/departments"
                  label="Departments"
                  close={setMobileOpen}
                />
                <UserMenuMobile
                  label={user.name}
                  logout={logout}
                  role={role}
                  close={setMobileOpen}
                />
              </>
            )}

            {user && role === "ADMIN" && (
              <>
                <p className="px-1 text-2xs font-semibold uppercase tracking-wider text-slate-400">
                  Workspace
                </p>
                <MobileNavLink
                  to="/admin/dashboard"
                  label="Directory"
                  close={setMobileOpen}
                />
                <div className="flex flex-col gap-2 border-l-2 border-slate-600 pl-3 ml-1">
                  <MobileNavLink
                    to="/admin/add-user"
                    label="Add User"
                    close={setMobileOpen}
                    variant="primary"
                  />
                  <MobileNavLink
                    to="/admin/add-duty"
                    label="Add Duty"
                    close={setMobileOpen}
                    variant="secondary"
                  />
                </div>
                <MobileNavLink
                  to="/admin/leaves/pending"
                  label="Pending leaves"
                  close={setMobileOpen}
                />
                <UserMenuMobile
                  label={user.name}
                  logout={logout}
                  role={role}
                  close={setMobileOpen}
                />
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function navMatchAdminDirectory(pathname, to) {
  return (
    pathname === to ||
    (to === "/admin/dashboard" &&
      pathname.startsWith("/admin/users/update"))
  );
}

function NavLink({ to, label, variant = "ghost" }) {
  const { pathname } = useLocation();
  const isActive =
    variant === "ghost" && to === "/admin/dashboard"
      ? navMatchAdminDirectory(pathname, to)
      : pathname === to;

  if (variant === "primary") {
    return (
      <Link
        to={to}
        className={navRailPrimary(isActive)}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  }

  if (variant === "secondary") {
    return (
      <Link
        to={to}
        className={navRailSecondary(isActive)}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={navRailGhost(isActive)}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function LeavesBellLink({ active }) {
  return (
    <Link
      to="/admin/leaves/pending"
      className={`${NAV_RAIL} w-10 !px-0 shadow-sm shadow-black/25 ${
        active
          ? "border-2 border-blue-500 bg-slate-800 text-slate-100 ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0f172a]"
          : "border-2 border-slate-600 bg-slate-800/70 hover:border-slate-500 hover:bg-slate-800"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <BellIcon className="h-5 w-5 shrink-0 text-blue-400" aria-hidden />
      <span className="sr-only">Pending leaves</span>
    </Link>
  );
}

/* Desktop User Menu */
function UserMenu({ label, logout, role }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hover:cursor-pointer">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${navRailGhost(false)} min-w-0 max-w-[16rem] justify-between gap-2 sm:max-w-[14rem]`}
      >
        <User size={18} className="shrink-0 text-blue-400" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-left font-semibold text-slate-100">
          {label}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-surface-elevated rounded-xl shadow-lg border border-slate-300/60 p-2 animate-fade-in z-50">
          <Link
            to={role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-50 text-sm font-medium text-slate-700 transition-colors duration-150"
            onClick={() => setOpen(!open)}
          >
            <LayoutDashboard size={18} className="text-blue-600" />
            Dashboard
          </Link>
          <Link
            to={role === "ADMIN" ? "/admin/profile" : "/user/settings"}
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-50 text-sm font-medium text-slate-700 transition-colors duration-150"
            onClick={() => setOpen(!open)}
          >
            <Settings size={18} className="text-blue-600" />
            {role === "ADMIN" ? "Profile" : "Settings"}
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 text-left rounded-lg px-4 py-3 hover:bg-red-50 text-sm font-medium text-red-600 transition-colors duration-150"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function MobileNavLink({ to, label, close, variant }) {
  const { pathname } = useLocation();
  const isActive =
    to === "/admin/dashboard"
      ? navMatchAdminDirectory(pathname, to)
      : pathname === to;

  if (variant === "primary") {
    return (
      <Link
        to={to}
        className={
          "btn-primary py-3.5 text-base justify-center " +
          (isActive
            ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0f172a] "
            : "")
        }
        onClick={() => close(false)}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  }

  if (variant === "secondary") {
    return (
      <Link
        to={to}
        className={
          "py-3.5 text-base justify-center border-2 border-slate-500 bg-slate-800 font-semibold text-slate-100 shadow-sm rounded-lg inline-flex items-center hover:border-blue-400 " +
          (isActive
            ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0f172a] border-blue-400"
            : "")
        }
        onClick={() => close(false)}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={
        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold border-2 transition-all duration-150 " +
        (isActive
          ? "border-slate-500 bg-slate-800 text-slate-50"
          : "border-slate-600 bg-slate-800/60 text-slate-200 hover:border-slate-500 hover:bg-slate-800")
      }
      onClick={() => close(false)}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

/* Mobile User Menu */
function UserMenuMobile({ label, logout, role, close }) {
  return (
    <div className="border-t border-slate-700 pt-4 mt-4">
      <div className="flex items-center gap-3 px-4 py-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
          <User size={18} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-slate-100 text-sm">{label}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>

      <Link
        to={role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-300 hover:bg-slate-800 text-sm font-semibold transition-colors duration-150"
        onClick={() => close(false)}
      >
        <LayoutDashboard size={18} className="text-blue-400" />
        Dashboard
      </Link>

      <Link
        to={role === "ADMIN" ? "/admin/profile" : "/user/settings"}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-300 hover:bg-slate-800 text-sm font-semibold transition-colors duration-150"
        onClick={() => close(false)}
      >
        <Settings size={18} className="text-blue-400" />
        Settings
      </Link>

      <button
        onClick={() => {
          logout();
          close(false);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/40 text-sm font-semibold transition-colors duration-150"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
