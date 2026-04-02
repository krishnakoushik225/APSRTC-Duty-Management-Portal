import {
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";
import DutyCard from "../components/DutyCard";
import UserProfile from "../components/UserProfile";

import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export default function Dashboard() {
  const { user } = useAuth();

  const {
    data: current,
    isLoading: loadingCurrent,
    isError: errorCurrent,
  } = useQuery({
    queryKey: ["current-duty", user.id],
    queryFn: () => apiClient.fetchCurrentDuty(user.id),
    staleTime: 30 * 60 * 1000
  });

  const {
    data: history,
    isLoading: loadingHistory,
    isError: errorHistory,
  } = useQuery({
    queryKey: ["previous-duty", user.id],
    queryFn: () => apiClient.fetchPrevDuty(user.id),
    staleTime: 30 * 60 * 1000,
  });

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="mx-2 md:mx-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <header className="space-y-2">
            <p className="text-slate-600 text-xl font-semibold">
              Welcome back, {" "}
              <span className="font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-2xl">{user?.name}</span>
            </p>
            <p className="text-slate-500 font-medium">Here's your duty overview and recent activities</p>
          </header>

          <a
            href="/user/leave-request"
            className="btn-primary px-6 py-4 text-sm"
          >
            Apply for Leave
            <ChevronRight className="h-5 w-5" />
          </a>
        </div>

        {/* USER PROFILE CARD */}
        <UserProfile user={user} initials={initials} />

        {/* DUTY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current DUTY */}
          <DutyCard
            title="Current Duty Details"
            icon={Calendar}
            duty={current}
            loading={loadingCurrent}
            error={errorCurrent}
            statusLabel="Active"
            emptyMessage="No active duty assigned."
          />

          {/* Previous Duty */}
          <DutyCard
            title="Previous Duty Details"
            icon={Clock}
            duty={history}
            loading={loadingHistory}
            error={errorHistory}
            statusLabel="Completed"
            emptyMessage="No previous duty found."
          />
        </div>
      </div>
    </div>
  );
}
