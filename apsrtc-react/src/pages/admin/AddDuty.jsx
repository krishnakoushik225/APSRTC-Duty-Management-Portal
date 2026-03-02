import { useState } from "react";
import { toast } from "react-toastify";
import { MapPin, Landmark, Home, CalendarDays, Clock, Bus } from "lucide-react";
import apiClient from "../../api/apiClient";
import { depoVillages, timeSlots } from "../../utils";
import Spinner from "../../components/Spinner";

export default function AddDuty({ admin }) {
  const [duty, setDuty] = useState({
    district: admin.district,
    depo: admin.depo,
    village: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    busType: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await apiClient.AddDuty(duty);
      toast.success("Duty saved successfully!");
      setDuty({
        district: "",
        depo: "",
        village: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        busType: "",
      });
      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data.message || err.response?.data);
    }
  };

  const handleChange = (field, value) => {
    setDuty((prev) => ({ ...prev, [field]: value }));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center -mt-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-center text-2xl font-semibold mb-8">Add Duty</h2>

        <form onSubmit={submit} className="grid grid-cols-2 gap-6">
          {/* District */}
          <SelectRow
            icon={MapPin}
            label="District"
            value={admin.district}
            readOnly
          />

          {/* Depot */}
          <SelectRow
            icon={Landmark}
            label="Depot"
            value={admin.depo}
            readOnly={true}
          />

          {/* Village */}
          <SelectRow
            icon={Home}
            label="Village"
            type="select"
            value={duty.village}
            options={depoVillages[duty.depo] || []}
            onChange={(v) => handleChange("village", v)}
          />

          {/* Start Date */}
          <InputRow
            icon={CalendarDays}
            label="Start Date"
            type="date"
            min={today}
            value={duty.startDate}
            onChange={(v) => handleChange("startDate", v)}
          />

          {/* End Date */}
          <InputRow
            icon={CalendarDays}
            label="End Date"
            type="date"
            min={duty.startDate || today}
            value={duty.endDate}
            onChange={(v) => handleChange("endDate", v)}
          />

          {/* Start Time */}
          <SelectRow
            icon={Clock}
            label="Start Time"
            type="select"
            value={duty.startTime}
            onChange={(v) => handleChange("startTime", v)}
            options={timeSlots}
          />

          {/* End Time */}
          <SelectRow
            icon={Clock}
            label="End Time"
            type="select"
            value={duty.endTime}
            onChange={(v) => handleChange("endTime", v)}
            options={timeSlots}
          />

          {/* Bus Type */}
          <SelectRow
            icon={Bus}
            label="Bus Type"
            type="select"
            value={duty.busType}
            onChange={(v) => handleChange("busType", v)}
            options={[
              "Express Bus",
              "Deluxe Bus",
              "Mini Bus",
              "Regular Bus",
              "Indra",
              "Super Luxury",
            ]}
          />

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Saving Duty...</span>
                <Spinner />
              </div>
            ) : (
              "Save Duty"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputRow({ icon: Icon, label, value, onChange, type = "text", min }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2">
        <Icon className="h-5 w-5 text-gray-500" />
        <input
          type={type}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="flex-1 bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

function SelectRow({
  icon: Icon,
  label,
  value,
  onChange,
  options = [],
  type = "text",
  readOnly,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2">
        <Icon className="h-5 w-5 text-gray-500" />

        {readOnly ? (
          <input
            value={value}
            readOnly
            className="flex-1 bg-transparent outline-none text-gray-900"
          />
        ) : (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
            required
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
