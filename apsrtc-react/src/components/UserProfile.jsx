import InfoItem from "./InfoItem";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";

export default function UserProfile({ user, initials, forAdminProfile }) {
  return (
    <>
      {forAdminProfile ? (
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="w-full max-w-xl bg-surface-elevated rounded-xl shadow-md border border-slate-300/50 p-10">
            {/* Avatar + ID */}
            <div className="flex flex-col items-center gap-6 mb-10">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-4xl text-white flex items-center justify-center font-bold shadow-lg">
                {initials}
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{user?.name}</h3>
                <p className="text-slate-600 text-sm mt-1">Employee ID: <span className="font-semibold text-slate-900">{user?.id}</span></p>
              </div>
            </div>

            {/* All fields stacked */}
            <div className="flex flex-col gap-4 space-y-2">
              <InfoItem icon={User} label="Name" value={user?.name} />
              <InfoItem icon={Mail} label="Email" value={user?.email} />
              <InfoItem icon={Phone} label="Contact" value={user?.contactNumber} />
              <InfoItem icon={Building2} label="Category" value={user?.category} />
              <InfoItem icon={MapPin} label="District" value={user?.district} />
              <InfoItem icon={Building2} label="Depo" value={user?.depo} />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-surface-elevated p-6 rounded-xl shadow-md border border-slate-300/50">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
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

            <div className="flex flex-col items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-3xl text-white flex items-center justify-center font-bold shadow-lg">
                {initials}
              </div>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 font-semibold text-sm rounded-lg border border-blue-200">
                  ID: {user?.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
