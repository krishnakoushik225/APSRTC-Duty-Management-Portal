import { useState } from "react";
import { toast } from "react-toastify";
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
import apiClient from "../../api/apiClient";
import Spinner from "../../components/Spinner";

export default function AddUser({ admin }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    id: "",
    contactNumber: "",
    category: "",
    district: admin.district,
    depo: admin.depo,
    password: "",
    createdDate: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiClient.addUser(userData);
      toast.success("User added successfully!");
      setUserData({
        name: "",
        email: "",
        id: "",
        contactNumber: "",
        category: "",
        district: admin.district,
        depo: admin.depo,
        password: "",
        createdDate: "",
      });
    } catch (err) {
      const payload = err?.response?.data;
      const message =
        payload?.message ||
        payload?.error ||
        (typeof payload === "string" ? payload : Object.values(payload || {})[0]) ||
        "Failed to add user";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="w-full max-w-xl mx-auto">
        <div className="card p-10">
        {/* TITLE */}
        <div className="text-center mb-8">
          <p className="text-slate-900 font-extrabold tracking-tight text-3xl mt-1">
            Create new APSRTC account
          </p>
          <p className="text-slate-500 font-medium mt-2">Add an employee under your depot.</p>
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
            options={["ADMIN", "CONDUCTOR", "DRIVER"]}
            onChange={(v) => setUserData({ ...userData, category: v })}
          />

          <InputRow
            icon={MapPin}
            label="District"
            placeholder="Enter district"
            readonly={true}
            value={userData.district}
          />

          <InputRow
            icon={Landmark}
            label="Depo"
            placeholder="Enter depo"
            readonly={true}
            value={userData.depo}
          />

          <InputRow
            icon={Lock}
            label="Password"
            type="password"
            placeholder="Enter a strong password"
            value={userData.password}
            onChange={(v) => setUserData({ ...userData, password: v })}
          />

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full btn-primary py-3 text-base"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Adding User...</span>
                <Spinner />
              </div>
            ) : (
              "Add User"
            )}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export function InputRow({
  icon: Icon,
  label,
  value,
  placeholder,
  onChange,
  options = [],
  readonly,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-slate-700">{label}</label>

      <div className="field-wrap">
        <Icon className="h-5 w-5 text-slate-500" />
        {type === "select" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-900"
            required
          >
            <option value="">Select Role</option>
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
            readOnly={readonly}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
            required
          />
        )}
      </div>
    </div>
  );
}
