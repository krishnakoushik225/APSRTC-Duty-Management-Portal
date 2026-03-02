import { useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { KeyRound, Lock } from "lucide-react";

export default function Settings() {
  const [creds, setCreds] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await apiClient.updatePassword(creds);
      setIsLoading(false);
      toast.success("Password changed successfully!");
      navigate("/user/dashboard");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/images/logo.png"
          className="mx-auto h-16 w-16 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Change the password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submit} method="POST" className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Lock className="h-5 w-5 text-gray-500" />
              <input
                required
                type="password"
                value={creds.currentPassword}
                placeholder="Enter your password"
                onChange={(e) =>
                  setCreds({ ...creds, currentPassword: e.target.value })
                }
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <KeyRound className="h-5 w-5 text-gray-500" />
              <input
                required
                type="password"
                value={creds.newPassword}
                placeholder="Enter your new password"
                onChange={(e) =>
                  setCreds({ ...creds, newPassword: e.target.value })
                }
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <KeyRound className="h-5 w-5 text-gray-500" />
              <input
                required
                type="password"
                value={creds.confirmPassword}
                placeholder="Re-enter to confirm password"
                onChange={(e) =>
                  setCreds({ ...creds, confirmPassword: e.target.value })
                }
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isLoading ? "Changing Password ..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
