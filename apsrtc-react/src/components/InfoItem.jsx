export default function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-slate-150">
      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-base font-semibold text-slate-900">{value}</span>
      </div>
    </div>
  );
}
