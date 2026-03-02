import InfoItem from "./InfoItem";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";

export default function UserProfile({ user, initials, forAdminProfile }) {
  return (
    <>
      {forAdminProfile ? (
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-xl mx-auto mt-10">
          {/* Avatar + ID */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="h-28 w-28 rounded-2xl bg-blue-100 text-4xl text-blue-700 flex items-center justify-center font-bold shadow-md">
              {initials}
            </div>
          </div>

          {/* All fields stacked */}
          <div className="flex flex-col gap-4">
            <InfoItem icon={User} label="Name" value={user?.name} />
            <InfoItem icon={Mail} label="Email" value={user?.email} />
            <InfoItem icon={Phone} label="Contact" value={user?.contactNumber} />
            <InfoItem icon={Building2} label="Category" value={user?.category} />
            <InfoItem icon={MapPin} label="District" value={user?.district} />
            <InfoItem icon={Building2} label="Depo" value={user?.depo} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Details */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <InfoItem icon={User} label="Name" value={user?.name} />
            <InfoItem icon={Mail} label="Email" value={user?.email} />
            <InfoItem
              icon={Phone}
              label="Contact"
              value={user?.contactNumber}
            />
            <InfoItem
              icon={Building2}
              label="Category"
              value={user?.category}
            />
            <InfoItem icon={MapPin} label="District" value={user?.district} />
            <InfoItem icon={Building2} label="Depo" value={user?.depo} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-20 w-20 rounded-xl bg-gray-400 text-3xl text-blue-900 flex items-center justify-center font-semibold">
              {initials}
            </div>
            <span className="text-gray-500 text-sm border px-3 py-1 rounded-lg">
              ID: {user?.id}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
