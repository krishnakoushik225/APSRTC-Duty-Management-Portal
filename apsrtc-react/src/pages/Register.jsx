import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { districtDepos } from "../utils";
import { getErrorMessage, validateEmail, validatePassword, validatePhoneNumber } from "../api/errorHandler";

import {
  User,
  Mail,
  Phone,
  IdCard,
  Lock,
  Building2,
  MapPin,
  Landmark,
  ArrowLeft,
  Zap,
} from "lucide-react";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import AuthPortalLayout, {
  AuthPortalMobileBrand,
  AuthPortalPanel,
} from "../components/AuthPortalLayout";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    id: "",
    contactNumber: "",
    category: "",
    district: "",
    depo: "",
    password: "",
    createdDate: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userData.name.trim()) {
      toast.warning("Please enter your full name");
      return;
    }
    if (!validateEmail(userData.email)) {
      toast.warning("Please enter a valid email address");
      return;
    }
    if (!userData.id.trim()) {
      toast.warning("Please enter your employee ID");
      return;
    }
    if (!validatePhoneNumber(userData.contactNumber)) {
      toast.warning("Please enter a valid 10-digit phone number");
      return;
    }
    if (!userData.category) {
      toast.warning("Please select your category");
      return;
    }
    if (!userData.district) {
      toast.warning("Please select your district");
      return;
    }
    if (!userData.depo) {
      toast.warning("Please select your depo");
      return;
    }
    
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.valid) {
      toast.warning(passwordValidation.message);
      return;
    }

    setLoading(true);
    try {
      const res = await register(userData);
      toast.success(res?.message || "User registered successfully! Please login.");
      navigate("/");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
      // Don't clear form on error - let user fix issues
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPortalLayout variant="register">
      <div className="w-full max-w-3xl animate-fade-in pb-4">
        <AuthPortalMobileBrand variant="register" />

        <div className="mb-5 flex justify-between items-center gap-4 flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform shrink-0" />
            Back to sign in
          </Link>
          <span className="hidden sm:inline text-xs font-medium text-slate-300/90">
            All fields required
          </span>
        </div>

        <AuthPortalPanel className="p-8 sm:p-10">
          <div className="mb-8 hidden lg:block space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Registration
            </p>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Join APSRTC Digital
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Create your workforce account with depot-aligned details.
            </p>
          </div>

          <div className="lg:hidden text-center mb-8 space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Join APSRTC</h1>
            <p className="text-slate-600 text-sm">
              Complete the form below to register.
            </p>
          </div>

        <form onSubmit={submit} className="space-y-5">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputRow
              icon={User}
              label="Full Name"
              value={userData.name}
              placeholder="John Doe"
              onChange={(v) => setUserData({ ...userData, name: v })}
            />
            <InputRow
              icon={Mail}
              label="Email"
              type="email"
              value={userData.email}
              placeholder="john@example.com"
              onChange={(v) => setUserData({ ...userData, email: v })}
            />
          </div>

          {/* Row 2: ID & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputRow
              icon={IdCard}
              label="Employee ID"
              value={userData.id}
              placeholder="2021BCS01"
              onChange={(v) => setUserData({ ...userData, id: v })}
            />
            <InputRow
              icon={Phone}
              label="Contact Number"
              placeholder="9876543210"
              value={userData.contactNumber}
              onChange={(v) => setUserData({ ...userData, contactNumber: v })}
            />
          </div>

          {/* Row 3: Category & District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputRow
              icon={Building2}
              label="Category"
              placeholder="Select role"
              type="select"
              value={userData.category}
              options={["ADMIN", "DRIVER", "CONDUCTOR"]}
              onChange={(v) => setUserData({ ...userData, category: v })}
            />
            <InputRow
              icon={MapPin}
              label="District"
              type="select"
              value={userData.district}
              options={Object.keys(districtDepos)}
              onChange={(v) => {
                setUserData({
                  ...userData,
                  district: v,
                  depo: "",
                });
              }}
            />
          </div>

          {/* Row 4: Depo & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputRow
              icon={Landmark}
              label="Depo"
              type="select"
              value={userData.depo}
              options={userData.district ? districtDepos[userData.district] : []}
              disabled={!userData.district}
              onChange={(v) => setUserData({ ...userData, depo: v })}
            />
            <InputRow
              icon={Lock}
              label="Password"
              type="password"
              placeholder="••••••••••"
              value={userData.password}
              onChange={(v) => setUserData({ ...userData, password: v })}
            />
          </div>

          {/* Password Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-2">Password must contain:</p>
            <ul className="space-y-1 text-xs opacity-90">
              <li>✓ Minimum 6 characters</li>
              <li>✓ At least one uppercase letter</li>
              <li>✓ At least one number</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            disabled={loading}
            type="submit"
            variant="success"
            size="lg"
            className="w-full"
            icon={<Zap size={20} strokeWidth={2} />}
          >
            {loading ? "Creating Account..." : "Create Account"}
            {loading && <Spinner />}
          </Button>

          {/* Terms of Service */}
          <p className="text-center text-xs text-slate-600 mt-6">
            By creating an account, you agree to our{" "}
            <button type="button" className="text-blue-600 hover:underline font-semibold">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-blue-600 hover:underline font-semibold">
              Privacy Policy
            </button>
          </p>
        </form>
        </AuthPortalPanel>

        <p className="text-center text-xs text-slate-300/95 mt-6">
          Need help? Contact your depot administrator.
        </p>
      </div>
    </AuthPortalLayout>
  );
}

function InputRow({
  icon: Icon,
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  options = [],
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
        {label}
      </label>

      <div
        className={`field-wrap relative group ${
          disabled ? "opacity-60 cursor-not-allowed bg-slate-100" : ""
        }`}
      >
        <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" strokeWidth={2} />

        {type === "select" ? (
          <select
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-900 font-medium text-base"
            required
          >
            <option value="">{placeholder || "Select"}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 font-medium text-base"
            required
          />
        )}
      </div>
    </div>
  );
}
