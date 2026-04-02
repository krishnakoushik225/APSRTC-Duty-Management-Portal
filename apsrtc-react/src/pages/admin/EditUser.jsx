import { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  IdCard,
  Building2,
  MapPin,
  Landmark,
} from "lucide-react";
import Spinner from "../../components/Spinner";
import apiClient from "../../api/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function EditUser() {
  const { state } = useLocation();
  const { user } = state || {};
  const { userId } = useParams();

  useQuery({
    queryKey: ["get-user-by-id", userId],
    queryFn: () => apiClient.getUserDetails(userId),
    enabled: !!userId,
  });

  const [userData, setUserData] = useState({
    id: user?.id ?? "",
    name: user?.name ?? "",
    email: user?.email ?? "",
    category: user?.category ?? "",
    contactNumber: user?.contactNumber ?? "",
    district: user?.district ?? "",
    depo: user?.depo ?? "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await apiClient.updateUser(userId, userData);
      setIsLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.response?.data);
    }
  };


  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-xl card p-10 my-10 animate-fade-in">
        {/* TITLE */}
        <div className="text-center mb-8">
          <p className="text-slate-900 font-bold text-3xl bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Edit User Details
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-6">
          {/* FULL NAME */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <div className="field-wrap">
              <User className="h-5 w-5 text-blue-600" />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                placeholder="Enter your name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <div className="field-wrap">
              <Mail className="h-5 w-5 text-blue-600" />
              <input
                type="email"
                className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* EMPLOYEE ID (READONLY) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Employee ID
            </label>
            <div className="field-wrap bg-slate-100">
              <IdCard className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                readOnly
                value={user?.id}
                className="flex-1 bg-transparent outline-none text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* CONTACT NUMBER */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Contact Number
            </label>
            <div className="field-wrap">
              <Phone className="h-5 w-5 text-blue-600" />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                value={userData.contactNumber}
                onChange={(e) =>
                  setUserData({ ...userData, contactNumber: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* CATEGORY (READONLY) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Category
            </label>
            <div className="field-wrap bg-slate-100">
              <Building2 className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                readOnly
                value={user?.category}
                className="flex-1 bg-transparent outline-none text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* DISTRICT (READONLY) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              District
            </label>
            <div className="field-wrap bg-slate-100">
              <MapPin className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                readOnly
                value={user?.district}
                className="flex-1 bg-transparent outline-none text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* DEPO (READONLY) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Depo</label>
            <div className="field-wrap bg-slate-100">
              <Landmark className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                readOnly
                value={user?.depo}
                className="flex-1 bg-transparent outline-none text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full btn-primary py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Updating User Details...</span>
                <Spinner />
              </div>
            ) : (
              "Save Details"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
