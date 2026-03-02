export default function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm hover:shadow transition">
      <Icon className="h-5 w-5 text-blue-600" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}</span>
      </div>
    </div>
  );
}
