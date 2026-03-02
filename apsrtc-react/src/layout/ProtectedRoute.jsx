import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ role: requiredRole }) {
  const { user, role } = useAuth();
  if (!user || (requiredRole && role !== requiredRole)) return <Navigate to="/" replace />;
  return <Outlet />;
}
