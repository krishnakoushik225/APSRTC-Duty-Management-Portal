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
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto mt-6 card p-6 sm:p-8 animate-fade-in">
      <div className="text-center mb-8">
        <p className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
          Leave Management
        </p>
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Apply for Leave
        </h2>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {/* NAME FIELD */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            Name
          </label>

          <div className="field-wrap">
            <User className="text-blue-600 w-5 h-5" />

            <input
              type="text"
              value={form.name}
              disabled
              className="w-full bg-transparent outline-none text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* USER ID FIELD */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            User ID
          </label>

          <div className="field-wrap">
            <ClipboardList className="text-blue-600 w-5 h-5" />

            <input
              type="text"
              value={form.userId}
              disabled
              className="w-full bg-transparent outline-none text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* EMAIL FIELD */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            Email
          </label>

          <div className="field-wrap">
            <Mail className="text-blue-600 w-5 h-5" />

            <input
              type="email"
              value={form.email}
              disabled
              className="w-full bg-transparent outline-none text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* REASON FIELD */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            Reason
          </label>

          <div className="field-wrap items-start">
            <FileText className="text-blue-600 w-5 h-5 mt-1" />

            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Explain your reason for the leave..."
              rows="3"
              required
              className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* DATE FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1 block">
              From Date
            </label>

            <div className="field-wrap">
              <Calendar className="text-blue-600 w-5 h-5" />
              <input
                type="date"
                name="fromDate"
                min={tomorrowDate}
                value={form.fromDate}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1 block">
              To Date
            </label>

            <div className="field-wrap">
              <Calendar className="text-blue-600 w-5 h-5" />
              <input
                type="date"
                name="toDate"
                min={form.fromDate}
                value={form.toDate}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full btn-primary py-3"
        >
          {isLoading ? "Submitting Leave..." : "Submit Leave"}
        </button>
      </form>
      </div>
    </div>
  );
}
