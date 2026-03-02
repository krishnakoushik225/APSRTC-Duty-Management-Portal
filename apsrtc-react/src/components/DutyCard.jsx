import {
  MapPin,
  Building2,
  Calendar,
  Clock,
  Bus,
  AlertCircle,
} from "lucide-react";
import DutyInfo from "./DutyInfo";
import DutySkeleton from "./DutySkeleton";

export default function DutyCard({
  title,
  icon: Icon,
  duty,
  loading,
  error,
  statusLabel,
  emptyMessage,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-700" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>

        {!loading && !error && (
          <span
            className={`px-3 py-1 rounded text-sm ${
              duty ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
            }`}
          >
            {duty ? statusLabel : "—"}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && <DutySkeleton />}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 py-6">
          <AlertCircle className="h-5 w-5" />
          <p>Failed to load duty data.</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && !duty && (
        <p className="text-center text-gray-500 py-6">{emptyMessage}</p>
      )}

      {/* Data */}
      {!loading && !error && duty && (
        <div className="space-y-3">
          <DutyInfo icon={MapPin} label="District" value={duty.district} />
          <DutyInfo icon={Building2} label="Depo" value={duty.depo} />
          <DutyInfo icon={MapPin} label="Village" value={duty.village} />
          <DutyInfo icon={Bus} label="Bus Type" value={duty.busType} />

          <div className="pt-4 border-t space-y-2">
            <DutyInfo
              icon={Calendar}
              label="Start"
              value={`${duty.startDate} ${duty.startTime}`}
            />
            <DutyInfo
              icon={Clock}
              label="End"
              value={`${duty.endDate} ${duty.endTime}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
