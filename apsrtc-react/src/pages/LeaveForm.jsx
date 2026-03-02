import { useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Calendar, FileText, ClipboardList } from "lucide-react";

export default function LeaveForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    userId: user?.id || "",
    email: user?.email || "",
    reason: "",
    fromDate: "",
    toDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await apiClient.applyLeave(form);
      navigate("/user/dashboard");
      toast.success(res?.message || "Leave applied successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err?.response?.data);
    } finally {
      setIsLoading(false);
      setForm({
        fromDate: "",
        toDate: "",
        reason: "",
        type: "",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 sm:p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Apply for Leave
      </h2>

      <form onSubmit={submit} className="space-y-6">
        {/* NAME FIELD */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 block">
            Name
          </label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type="text"
              value={form.name}
              disabled
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 
                       focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* USER ID FIELD */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 block">
            User ID
          </label>

          <div className="relative">
            <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type="text"
              value={form.userId}
              disabled
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 
                       focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* EMAIL FIELD */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 block">
            Email
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type="email"
              value={form.email}
              disabled
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 
                       focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* REASON FIELD */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 block">
            Reason
          </label>

          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />

            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Explain your reason for the leave..."
              rows="3"
              required
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* DATE FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-800 mb-1 block">
              From Date
            </label>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="fromDate"
                min={tomorrowDate}
                value={form.fromDate}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800 mb-1 block">
              To Date
            </label>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="toDate"
                min={form.fromDate}
                value={form.toDate}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          {isLoading ? "Submitting Leave..." : "Submit Leave"}
        </button>
      </form>
    </div>
  );
}
