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

  const { data: userDetails } = useQuery({
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
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200 my-10">
        {/* TITLE */}
        <div className="text-center mb-8">
          <p className="text-gray-800 font-semibold text-2xl mt-1">
            Edit User Details
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-6">
          {/* FULL NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
              <User className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-gray-900"
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
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
              <Mail className="h-5 w-5 text-gray-500" />
              <input
                type="email"
                className="flex-1 bg-transparent outline-none text-gray-900"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* EMPLOYEE ID (READONLY) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-100 px-3 py-2">
              <IdCard className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                readOnly
                value={user?.id}
                className="flex-1 bg-transparent outline-none text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* CONTACT NUMBER */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
              <Phone className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-gray-900"
                value={userData.contactNumber}
                onChange={(e) =>
                  setUserData({ ...userData, contactNumber: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* CATEGORY (READONLY) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-100 px-3 py-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                readOnly
                value={user?.category}
                className="flex-1 bg-transparent outline-none text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* DISTRICT (READONLY) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              District
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-100 px-3 py-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                readOnly
                value={user?.district}
                className="flex-1 bg-transparent outline-none text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* DEPO (READONLY) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Depo</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-gray-100 px-3 py-2">
              <Landmark className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                readOnly
                value={user?.depo}
                className="flex-1 bg-transparent outline-none text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:cursor-pointer"
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
