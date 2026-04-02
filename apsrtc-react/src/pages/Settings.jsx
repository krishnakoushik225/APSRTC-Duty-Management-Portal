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
    <div className="min-h-screen px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md card p-8 animate-fade-in">
        <img
          alt="Your Company"
          src="/images/logo.png"
          className="mx-auto h-16 w-16"
        />
        <h2 className="mt-8 text-center text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Change the password
        </h2>
        <form onSubmit={submit} method="POST" className="space-y-6 mt-8">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 mb-2">
                Current Password
              </label>
            </div>

            <div className="field-wrap">
              <Lock className="h-5 w-5 text-blue-600" />
              <input
                required
                type="password"
                value={creds.currentPassword}
                placeholder="Enter your password"
                onChange={(e) =>
                  setCreds({ ...creds, currentPassword: e.target.value })
                }
                className="w-full bg-transparent outline-none text-slate-900"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 mb-2">
                New Password
              </label>
            </div>

            <div className="field-wrap">
              <KeyRound className="h-5 w-5 text-blue-600" />
              <input
                required
                type="password"
                value={creds.newPassword}
                placeholder="Enter your new password"
                onChange={(e) =>
                  setCreds({ ...creds, newPassword: e.target.value })
                }
                className="w-full bg-transparent outline-none text-slate-900"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
            </div>

            <div className="field-wrap">
              <KeyRound className="h-5 w-5 text-blue-600" />
              <input
                required
                type="password"
                value={creds.confirmPassword}
                placeholder="Re-enter to confirm password"
                onChange={(e) =>
                  setCreds({ ...creds, confirmPassword: e.target.value })
                }
                className="w-full bg-transparent outline-none text-slate-900"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full btn-primary py-3"
            >
              {isLoading ? "Changing Password ..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
