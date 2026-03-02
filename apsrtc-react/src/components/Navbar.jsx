import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { BellIcon, ChevronDown } from 'lucide-react'

export default function Navbar({notificationCount}) {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Left Section - Logo + Title */}
        <div className="flex items-center gap-4">
          <img
            src="/images/logo.png"
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
            alt="Brand Logo"
          />

          <Link
            to={location.pathname}
            className="font-semibold text-blue-700 whitespace-nowrap"
          >
            {/* Short title for small screens */}
            <span className="text-xl sm:hidden">APSRTC</span>

            {/* Full title for medium+ screens */}
            <span className="hidden sm:inline text-xl sm:text-2xl">
              Andhra Pradesh State Road Transport Corporation
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {!user && (
            <>
              <Link
                to="/register"
                className="text-blue-700 font-semibold hover:text-black transition text-xl"
              >
                Register
              </Link>
              <Link
                to="/"
                className="text-blue-700 font-semibold hover:text-black transition text-xl"
              >
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
              <NavLink to="/admin/add-user" label="Add User" />
              <NavLink to="/admin/add-duty" label="Add Duty" />

              <div className="relative">
                <Link to="/admin/leaves/pending" className="text-xl">
                  <BellIcon className="h-7 w-10 text-blue-500" />
                </Link>
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </div>

              <UserMenu label={user.name} logout={logout} role={role} />
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-md animate-slide-down">
          <nav className="flex flex-col p-4 gap-4 font-medium text-gray-700">
            {!user && (
              <>
                <Link
                  to="/register"
                  className="hover:text-blue-700"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/"
                  className="hover:text-blue-700"
                  onClick={() => setMobileOpen(false)}
                >
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
                <MobileNavLink
                  to="/admin/add-user"
                  label="Add User"
                  close={setMobileOpen}
                />
                <MobileNavLink
                  to="/admin/add-duty"
                  label="Add Duty"
                  close={setMobileOpen}
                />
                <MobileNavLink
                  to="/admin/leaves/pending"
                  label="Leaves"
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

/* Desktop Link */
function NavLink({ to, label }) {
  return (
    <Link to={to} className="hover:text-blue-700 text-xl transition p-1">
      {label}
    </Link>
  );
}

/* Desktop User Menu */
function UserMenu({ label, logout, role }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hover:cursor-pointer">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-blue-700 text-xl"
      >
        {label}
        <ChevronDown size={16} /> 
      </button>

      {open && (
        <div className="absolute mt-2 w-32 bg-white border rounded shadow animate-fade-in">
          <Link
            to={role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
            className="block px-3 py-2 hover:bg-gray-100 text-xl"
            onClick={() => setOpen(!open)}
          >
            Dashboard
          </Link>
          <Link
            to={role === "ADMIN" ? "/admin/profile" : "/user/settings"}
            className="block px-3 py-2 hover:bg-gray-100 text-xl"
            onClick={() => setOpen(!open)}
          >
            {role === "ADMIN" ? "Profile" : "Settings"}
          </Link>
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xl"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

/* Mobile Nav Link */
function MobileNavLink({ to, label, close }) {
  return (
    <Link
      to={to}
      className="hover:text-blue-700"
      onClick={() => close(false)}
    >
      {label}
    </Link>
  );
}

/* Mobile User Menu */
function UserMenuMobile({ label, logout, role, close }) {
  return (
    <div className="border-t pt-3">
      <p className="font-semibold mb-2">{label}</p>

      <Link
        to={role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
        className="block py-1 hover:text-blue-700"
        onClick={() => close(false)}
      >
        Dashboard
      </Link>

      <Link
        to={role === "ADMIN" ? "/admin/settings" : "/user/settings"}
        className="block py-1 hover:text-blue-700"
        onClick={() => close(false)}
      >
        Settings
      </Link>

      <button
        onClick={() => {
          logout();
          close(false);
        }}
        className="block text-left py-1 hover:text-blue-700 w-full"
      >
        Logout
      </button>
    </div>
  );
}
