import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { Mail, KeyRound, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import AuthPortalLayout, {
  AuthPortalMobileBrand,
  AuthPortalPanel,
} from "../components/AuthPortalLayout";

const STEPS = ["email", "otp", "password"];

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

  const stepIndex = STEPS.indexOf(step);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [creds, setCreds] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiClient.forgotPassword(email);
      if (res?.resetToken) {
        sessionStorage.setItem("resetToken", res.resetToken);
        navigate("/verify-otp");
      }
      toast.success(res?.message || "OTP sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiClient.validateOtp(otp, email);
      sessionStorage.setItem("verifiedToken", res.verifiedToken);
      navigate("/change-password");
      toast.success(res?.message || "OTP verified successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiClient.changePassword(creds);
      sessionStorage.removeItem("resetToken");
      sessionStorage.removeItem("verifiedToken");
      navigate("/");
      toast.success(res?.message || "Password changed successfully!");
    } catch (err) {
      console.error("Change password error:", err);
      toast.error(err?.response?.data?.message || err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPortalLayout variant="recovery">
      <div className="w-full max-w-md animate-fade-in pb-4">
        <AuthPortalMobileBrand variant="recovery" />

        <div className="mb-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform shrink-0" />
            Back to sign in
          </Link>
        </div>

        <AuthPortalPanel className="p-8 sm:p-10 space-y-6">
          <div className="hidden lg:block space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Password recovery
            </p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Secure reset
            </h2>
            <p className="text-sm text-slate-600">
              Complete all steps to regain access to your account.
            </p>
          </div>

          <StepIndicator stepIndex={stepIndex} />

          <Header step={step} />

          {step === "email" && (
            <form onSubmit={onSubmitEmail} className="space-y-5">
              <InputField
                label="Email"
                placeholder="Enter your email"
                type="email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <PrimaryButton
                disabled={isLoading}
                text={isLoading ? "Sending OTP…" : "Send OTP"}
              />
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={onSubmitOtp} className="space-y-5">
              <InputField
                label="Enter OTP"
                placeholder="Enter the OTP sent to your email"
                type="text"
                icon={KeyRound}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoComplete="one-time-code"
                inputMode="numeric"
                required
              />
              <PrimaryButton
                disabled={isLoading}
                text={isLoading ? "Verifying OTP…" : "Verify OTP"}
              />
            </form>
          )}

          {step === "password" && (
            <form onSubmit={onSubmitPassword} className="space-y-5">
              <InputField
                label="New Password"
                placeholder="Enter new password"
                type="password"
                icon={ShieldCheck}
                value={creds.newPassword}
                onChange={(e) =>
                  setCreds({ ...creds, newPassword: e.target.value })
                }
                autoComplete="new-password"
                required
              />
              <InputField
                label="Confirm Password"
                placeholder="Re-enter new password"
                type="password"
                icon={ShieldCheck}
                value={creds.confirmPassword}
                onChange={(e) =>
                  setCreds({ ...creds, confirmPassword: e.target.value })
                }
                autoComplete="new-password"
                required
              />
              <PrimaryButton
                disabled={isLoading}
                text={isLoading ? "Updating password…" : "Update password"}
              />
            </form>
          )}
        </AuthPortalPanel>

        <p className="text-center text-xs text-slate-300/95 mt-6 max-w-sm mx-auto leading-relaxed">
          Never share OTPs or passwords. APSRTC will never ask for them by
          phone.
        </p>
      </div>
    </AuthPortalLayout>
  );
}

function StepIndicator({ stepIndex }) {
  const labels = ["Email", "Verify", "Password"];
  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-3"
      role="list"
      aria-label="Recovery progress"
    >
      {labels.map((label, i) => {
        const done = i < stepIndex;
        const active = i === stepIndex;
        return (
          <div
            key={label}
            role="listitem"
            className="flex flex-1 flex-col items-center gap-1.5 min-w-0"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                done
                  ? "bg-blue-600 text-white"
                  : active
                    ? "bg-blue-100 text-blue-800 ring-2 ring-blue-500 ring-offset-2"
                    : "bg-slate-100 text-slate-400"
              }`}
              aria-current={active ? "step" : undefined}
            >
              {done ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wide truncate max-w-full ${
                active ? "text-blue-700" : "text-slate-400"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Header({ step }) {
  const titles = {
    email: "Forgot password",
    otp: "Enter OTP",
    password: "Set new password",
  };

  const descriptions = {
    email: "Enter your registered email to receive an OTP.",
    otp: "We emailed you a code. Enter it below to continue.",
    password: "Choose a strong new password for your account.",
  };

  return (
    <div className="text-center space-y-2 lg:text-left">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        {titles[step]}
      </h1>
      <p className="text-slate-600 text-sm leading-relaxed">
        {descriptions[step]}
      </p>
    </div>
  );
}

function InputField({ label, icon: Icon, value, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-slate-700 text-sm font-semibold">{label}</label>
      <div className="field-wrap mt-2">
        <Icon className="h-5 w-5 text-blue-600 shrink-0" />
        <input
          {...props}
          value={value}
          className="flex-1 min-w-0 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

function PrimaryButton({ text, disabled }) {
  return (
    <button type="submit" disabled={disabled} className="w-full btn-primary py-3">
      {text}
    </button>
  );
}
