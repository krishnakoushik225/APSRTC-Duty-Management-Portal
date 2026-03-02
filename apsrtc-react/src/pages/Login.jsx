import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Lock } from "lucide-react";
import Spinner from "../components/Spinner";

export default function Login() {
  const [creds, setCreds] = useState({ id: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(creds);
      const role = sessionStorage.getItem("role");
      navigate(role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.response?.data || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://apsrtc-service.onrender.com/health")
    .catch(() => {
      console.log("Something went wrong while requesting the health check!");
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 -my-10">
      <div className="w-full max-w-md space-y-8">
        {/* Logo + Heading */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 text-base">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow rounded-2xl p-8 space-y-6">
          <form onSubmit={submit} className="space-y-6">
            {/* Employee ID */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <div className="mt-2 flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <User className="h-5 w-5 text-gray-500" />
                <input
                  required
                  value={creds.id}
                  placeholder="Enter your employee ID"
                  onChange={(e) => setCreds({ ...creds, id: e.target.value })}
                  className="w-full bg-transparent outline-none text-gray-800"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-700 hover:text-blue-500 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <Lock className="h-5 w-5 text-gray-500" />
                <input
                  required
                  type="password"
                  value={creds.password}
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setCreds({ ...creds, password: e.target.value })
                  }
                  className="w-full bg-transparent outline-none text-gray-800"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Signing in...</span>
                  <Spinner />
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-700 hover:underline font-medium"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
