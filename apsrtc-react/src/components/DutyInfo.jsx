export default function DutyInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors duration-200">
      <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center shadow-sm">
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
