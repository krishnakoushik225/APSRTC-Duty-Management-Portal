import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ResetGuard({ children }) {
  const location = useLocation();
  const [valid, setValid] = useState(null);
  const resetToken = sessionStorage.getItem("resetToken");
  const verifiedToken = sessionStorage.getItem("verifiedToken");

  useEffect(() => {
    const path = location.pathname;

    try {
      // Always allow forgot-password
      if (path === "/forgot-password") {
        setValid(true);
        return;
      }

      if (path === "/verify-otp") {
        if (!resetToken) throw new Error("No reset token");
        const parts = resetToken.split(".");
        if (parts.length !== 3) throw new Error("Malformed reset token");
        const payload = JSON.parse(
          atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
        );
        if (payload.purpose === "password_reset") {
          setValid(true);
          return;
        }
        throw new Error("Invalid purpose for verify-otp");
      }

      if (path === "/change-password") {
        if (!verifiedToken) throw new Error("No verified token");
        const parts = verifiedToken.split(".");
        if (parts.length !== 3) throw new Error("Malformed verified token");
        const payload = JSON.parse(
          atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
        );
        if (payload.purpose === "password_reset_verified") {
          setValid(true);
          return;
        }
        throw new Error("Invalid purpose for change-password");
      }

      setValid(false);
    } catch (err) {
      console.error("Token validation failed:", err);
      setValid(false);
    }
  }, [resetToken, verifiedToken, location.pathname]);

  if (valid === null) return null;

  if (!valid) {
    return <Navigate to="/forgot-password" replace />;
  }

  return children;
}
