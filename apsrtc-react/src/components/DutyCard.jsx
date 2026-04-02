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
    <div className="card p-8 hover-lift">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center ring-2 ring-brand-100 shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>

        {!loading && !error && (
          <span
            className={`px-4 py-2 rounded-2xl text-sm font-bold shadow-md ${
              duty ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200" : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 border border-slate-300"
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
        <p className="text-center text-slate-500 py-6">{emptyMessage}</p>
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
