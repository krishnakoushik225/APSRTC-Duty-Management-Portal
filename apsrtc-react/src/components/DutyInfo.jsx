export default function DutyInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-blue-600" />
      <p className="text-sm text-gray-700">
        <span className="text-gray-500">{label}:</span> <span>{value}</span>
      </p>
    </div>
  );
}
