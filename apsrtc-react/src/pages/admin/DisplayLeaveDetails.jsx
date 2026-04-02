import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { SkeletonRow } from "./AdminPanel";

export default function DisplayLeaveDetails() {
  const { user } = useAuth();

  const {
    data: pendingLeaves = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-leaves", user?.id],
    queryFn: apiClient.getPendingLeaves,
    enabled: !!user?.id,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const onApprove = async (leaveId) => {
    try {
      await apiClient.approveLeave(leaveId);
      toast.success("Leave approved successfully!");
      await refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data);
    }
  };

  const onReject = async (leaveId) => {
    try {
      await apiClient.rejectLeave(leaveId);
      toast.success("Leave rejected successfully!");
      await refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data);
    }
  };

  return (
    <>
      <div className="min-h-screen px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center tracking-tight text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-8">
            Pending Leave Details
          </h2>

          <div className="card p-6 animate-fade-in">
            {/* Table Container */}
            <div className="overflow-x-auto rounded-xl border border-slate-300/50 bg-surface-elevated">
              <table className="w-full text-sm text-slate-700">
                <thead className="text-sm font-semibold text-slate-800 bg-gradient-to-r from-surface-inset to-slate-200/60">
                  <tr className="text-left">
                    <th className="px-6 py-4 border-b-2 border-slate-300/60">Employee Name</th>
                    <th className="px-6 py-4 border-b-2 border-slate-300/60">Employee ID</th>
                    <th className="px-6 py-4 border-b-2 border-slate-300/60">Email</th>
                    <th className="px-6 py-4 border-b-2 border-slate-300/60">Reason</th>
                    <th className="px-6 py-4 border-b-2 border-slate-300/60">From</th>
                    <th className="px-6 py-4 border-b-2 border-slate-300/60">To</th>
                    <th className="px-6 py-4 border-b-2 border-slate-300/60">Status</th>
                    <th className="px-6 py-4 border-b-2 border-slate-300/60">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <>
                      <SkeletonRow cols={8} />
                      <SkeletonRow cols={8} />
                      <SkeletonRow cols={8} />
                    </>
                  ) : pendingLeaves.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="inline-flex flex-col items-center gap-2">
                          <p className="text-base font-semibold text-slate-700">
                            No pending leave requests
                          </p>
                          <p className="text-sm text-slate-500">
                            New requests will appear here automatically.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    pendingLeaves.map((leave) => (
                      <tr
                        key={leave.leaveId}
                        className="border-b border-slate-300/35 bg-surface-elevated hover:bg-surface-inset/45 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {leave.name}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{leave.userId}</td>
                        <td className="px-6 py-4 text-slate-600">{leave.email}</td>
                        <td className="px-6 py-4 text-slate-600">{leave.reason}</td>
                        <td className="px-6 py-4 text-slate-600">{leave.fromDate}</td>
                        <td className="px-6 py-4 text-slate-600">{leave.toDate}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                            {leave.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 flex justify-center gap-2">
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Do you want to approve the leave?"
                                )
                              ) {
                                onApprove(leave.leaveId);
                              }
                            }}
                            className="btn-success btn-sm"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure rejecting this leave?"
                                )
                              ) {
                                onReject(leave.leaveId);
                              }
                            }}
                            className="btn-danger btn-sm"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination (improved design but optional) */}
            <div className="flex justify-between items-center mt-6 text-sm text-slate-600">
              {pendingLeaves.length > 1 ? (
                <span className="font-medium">Showing {pendingLeaves.length} leaves</span>
              ) : (
                <span className="font-medium">Showing {pendingLeaves.length} leave</span>
              )}
              <div className="flex gap-2">
                <button className="btn-ghost btn-sm">
                  Prev
                </button>
                <button className="btn-ghost btn-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
