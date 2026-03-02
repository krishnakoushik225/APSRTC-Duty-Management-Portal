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
      <div className="px-6 lg:px-8 py-10">
        <h2 className="text-center tracking-tight text-2xl font-semibold text-blue-600 my-10">
          Pending Leave Details
        </h2>

        <div className="bg-white shadow-xl rounded-xl p-6">
          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-gray-700">
              <thead className="text-base text-gray-700 bg-gray-100">
                <tr className="text-center">
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">To</th>
                  <th className="px-6 py-4">Leave Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <>
                    <SkeletonRow cols={8} />
                    <SkeletonRow cols={8} />
                    <SkeletonRow cols={8} />
                  </>
                ) : (
                  pendingLeaves.map((leave) => (
                    <tr
                      key={leave.leaveId}
                      className="text-center border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {leave.name}
                      </td>
                      <td className="px-6 py-4">{leave.userId}</td>
                      <td className="px-6 py-4">{leave.email}</td>
                      <td className="px-6 py-4">{leave.reason}</td>
                      <td className="px-6 py-4">{leave.fromDate}</td>
                      <td className="px-6 py-4">{leave.toDate}</td>
                      <td className="px-6 py-4">{leave.status}</td>

                      <td className="px-6 py-4 flex justify-center gap-3">
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
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 hover:cursor-pointer transition"
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
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 hover:cursor-pointer transition"
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
          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            {pendingLeaves.length > 1 ? (
              <span>Showing {pendingLeaves.length} leaves</span>
            ) : (
              <span>Showing {pendingLeaves.length} leave</span>
            )}
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md border hover:bg-gray-100">
                Prev
              </button>
              <button className="px-3 py-1 rounded-md border hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
