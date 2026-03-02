import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { districtDepos } from "../utils";

import {
  User,
  Mail,
  Phone,
  IdCard,
  Lock,
  Building2,
  MapPin,
  Landmark,
} from "lucide-react";
import Spinner from "../components/Spinner";

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
    setLoading(true);
    try {
      const res = await register(userData);
      toast.success(res?.message || "User registered successfully!");
      navigate("/");
    } catch (err) {
      setUserData({
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
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200 my-10">
        {/* TITLE */}
        <div className="text-center mb-8">
          <p className="text-gray-800 font-semibold text-2xl mt-1">
            Create new APSRTC account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-6">
          <InputRow
            icon={User}
            label="Full Name"
            value={userData.name}
            placeholder="Enter your name"
            onChange={(v) => setUserData({ ...userData, name: v })}
          />

          <InputRow
            icon={Mail}
            label="Email"
            value={userData.email}
            placeholder="example@email.com"
            onChange={(v) => setUserData({ ...userData, email: v })}
          />

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
            placeholder="+91 XXXXX XXXXX"
            value={userData.contactNumber}
            onChange={(v) => setUserData({ ...userData, contactNumber: v })}
          />

          <InputRow
            icon={Building2}
            label="Category"
            placeholder="DRIVER / CONDUCTOR"
            type="select"
            value={userData.category}
            options={["ADMIN", "DRIVER", "CONDUCTOR"]}
            onChange={(v) => setUserData({ ...userData, category: v })}
          />

          {/* District Dropdown */}
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
                depo: "", // reset depo when district changes
              });
            }}
          />

          {/* Depo Dropdown */}
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
            placeholder="Enter a strong password"
            value={userData.password}
            onChange={(v) => setUserData({ ...userData, password: v })}
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Creating Account...</span>
                <Spinner />
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
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
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div
        className={`flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <Icon className="h-5 w-5 text-gray-500" />

        {type === "select" ? (
          <select
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
            required
          >
            <option value="">Select</option>
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
            className="flex-1 bg-transparent outline-none text-gray-900"
            required
          />
        )}
      </div>
    </div>
  );
}
