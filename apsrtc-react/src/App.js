import { useAuth } from "./context/AuthContext";
import apiClient from "./api/apiClient";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoute from "./layout/ProtectedRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LeaveForm from "./pages/LeaveForm";
import AdminPanel from "./pages/admin/AdminPanel";
import ForgotPassword from "./pages/ForgotPassword";
import ResetGuard from "./pages/ResetGuard";
import Departments from "./pages/Departments";
import Settings from "./pages/Settings";
import DisplayLeaveDetails from "./pages/admin/DisplayLeaveDetails";
import AddUser from "./pages/admin/AddUser";
import AddDuty from "./pages/admin/AddDuty";
import AdminProfile from "./pages/admin/AdminProfile";
import FaqPage from "./pages/FaqPage";
import EditUser from "./pages/admin/EditUser";

export default function App() {
  const { user, role } = useAuth();

  const { data: pendingLeaves = [] } = useQuery({
    queryKey: ["pendingLeaves"],
    queryFn: apiClient.getPendingLeaves,
    enabled: role === "ADMIN",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar notificationCount={pendingLeaves.length} />
      <ToastContainer
        position="top-right"
        style={{ marginTop: "64px" }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/user/index" element={<Home />} />
          <Route path="/user/departments" element={<Departments />} />
          <Route path="/user/freq-asked-questions" element={<FaqPage />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route path="/user/leave-request" element={<LeaveForm />} />
        </Route>

        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/admin/add-user" element={<AddUser admin={user} />} />
          <Route path="/admin/add-duty" element={<AddDuty admin={user} />} />
          <Route
            path="/admin/profile"
            element={<AdminProfile admin={user} />}
          />
          <Route path="/admin/users/update/:userId" element={<EditUser />} />

          <Route
            path="/admin/leaves/pending"
            element={<DisplayLeaveDetails leaveDetails={pendingLeaves} />}
          />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/verify-otp"
          element={
            <ResetGuard>
              <ForgotPassword />
            </ResetGuard>
          }
        />

        <Route
          path="/change-password"
          element={
            <ResetGuard>
              <ForgotPassword />
            </ResetGuard>
          }
        />
      </Routes>
    </div>
  );
}
