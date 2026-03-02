import { useState } from "react";
import apiClient from "../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, KeyRound, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const step =
    location.pathname === "/forgot-password"
      ? "email"
      : location.pathname === "/verify-otp"
      ? "otp"
      : location.pathname === "/change-password"
      ? "password"
      : "email";

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [creds, setCreds] = useState({ newPassword: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiClient.forgotPassword(email);
      sessionStorage.setItem("resetToken", res.resetToken);
      setIsLoading(false);
      navigate("/verify-otp");
      toast.success(res?.message || "OTP sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err?.response?.data);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiClient.validateOtp(otp, email);
      sessionStorage.setItem("verifiedToken", res.verifiedToken);
      setIsLoading(false);
      navigate("/change-password");
      toast.success(res?.message || "OTP verified successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err?.response?.data);
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiClient.changePassword(creds);
      sessionStorage.removeItem("resetToken");
      sessionStorage.removeItem("verifiedToken");
      setIsLoading(false);
      navigate("/");
      toast.success(res?.message || "Password changed successfully!");
    } catch (err) {
      console.error("Change password error:", err);
      toast.error(err?.response?.data?.message || err?.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-md my-20">
        {/* Card */}
        <div className="bg-white rounded-xl shadow p-8 space-y-6">
          {/* Header */}
          <Header step={step} />

          {/* EMAIL STEP */}
          {step === "email" && (
            <form onSubmit={onSubmitEmail} className="space-y-5">
              <InputField
                label="Email"
                placeholder="Enter your email"
                type="email"
                icon={Mail}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PrimaryButton text={isLoading ? "Sending OTP..." : "Send OTP"} />
            </form>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <form onSubmit={onSubmitOtp} className="space-y-5">
              <InputField
                label="Enter OTP"
                placeholder="Enter the OTP sent to your email"
                type="text"
                icon={KeyRound}
                onChange={(e) => setOtp(e.target.value)}
              />

              <PrimaryButton
                text={isLoading ? "Verifying OTP..." : "Verify OTP"}
              />
            </form>
          )}

          {/* PASSWORD STEP */}
          {step === "password" && (
            <form onSubmit={onSubmitPassword} className="space-y-5">
              <InputField
                label="New Password"
                placeholder="Enter new password"
                type="password"
                icon={ShieldCheck}
                onChange={(e) =>
                  setCreds({ ...creds, newPassword: e.target.value })
                }
              />

              <InputField
                label="Confirm Password"
                placeholder="Re-enter new password"
                type="password"
                icon={ShieldCheck}
                onChange={(e) =>
                  setCreds({ ...creds, confirmPassword: e.target.value })
                }
              />

              <PrimaryButton
                text={isLoading ? "Updating Password..." : "Update Password"}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ step }) {
  const titles = {
    email: "Forgot Password",
    otp: "Enter OTP",
    password: "Set New Password",
  };

  const descriptions = {
    email: "Enter your registered email to receive an OTP.",
    otp: "We have emailed you an OTP. Enter it below to continue.",
    password: "Create a new password to secure your account.",
  };

  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-semibold text-gray-900">{titles[step]}</h1>
      <p className="text-gray-600 text-sm">{descriptions[step]}</p>
    </div>
  );
}

function InputField({ label, icon: Icon, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <div className="flex items-center gap-3 bg-gray-50 border rounded-lg px-3 py-2 focus-within:border-blue-500 mt-2">
        <Icon className="h-5 w-5 text-blue-600" />
        <input
          {...props}
          className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
        />
      </div>
    </div>
  );
}

function PrimaryButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {text}
    </button>
  );
}
