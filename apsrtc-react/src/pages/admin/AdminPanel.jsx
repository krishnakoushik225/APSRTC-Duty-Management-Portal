import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const { user } = useAuth();
  const [keyword, setKeyword] = useState("");

  // Fetch users
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users", user?.id],
    queryFn: () => apiClient.getAllUsers(),
    enabled: !!user?.id,
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });


  // Search users
  const { data: filteredUsers = [] } = useQuery({
    queryKey: ["search-users", keyword],
    queryFn: () => apiClient.searchUsers(keyword),
    enabled: keyword.trim().length > 0,
  });

  // Delete user handler
  const onDelete = async (id) => {
    try {
      await apiClient.deleteUser(id);
      toast.success("User deleted successfully!");
      await refetch();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error(err.response.data.message);
    }
  };

  const usersToShow = keyword.trim().length > 0 ? filteredUsers : users;

  return (
    <>
      <div className="px-6 lg:px-8 py-10">
        <h2 className="text-center tracking-tight text-2xl font-semibold text-blue-600 my-10">
          Employee Details
        </h2>

        <div className="bg-white shadow-xl rounded-xl p-6">
          {/* Search Bar */}
          <div className="flex justify-end mb-6">
            <input
              type="text"
              placeholder="Search by Name, ID or Mobile..."
              className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 px-4 py-2 w-64 transition"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-gray-700">
              <thead className="text-base text-gray-700 bg-gray-100">
                <tr className="text-center">
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4">User ID</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Mobilqe</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <>
                    <SkeletonRow cols={6} />
                    <SkeletonRow cols={6} />
                    <SkeletonRow cols={6} />
                    <SkeletonRow cols={6} />
                    <SkeletonRow cols={6} />
                  </>
                ) : (
                  usersToShow.map((user) => (
                    <tr
                      key={user.id}
                      className="text-center border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4">{user.id}</td>
                      <td className="px-6 py-4">{user.category}</td>
                      <td className="px-6 py-4">{user.contactNumber}</td>
                      <td className="px-6 py-4">{user.email}</td>

                      <td className="px-6 py-4 flex justify-center gap-3">
                        <Link
                          to={`/admin/users/update/${user.id}`}
                          state={{ user }} 
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => {
                            if (
                              window.confirm("Are you sure deleting this user?")
                            ) {
                              onDelete(user.id);
                            }
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 hover:cursor-pointer transition"
                        >
                          Delete
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
            {filteredUsers.length >= 0 && keyword.length > 0 ? (
              <span>Showing {filteredUsers.length} users</span>
            ) : (
              <span>Showing {users.length} users</span>
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


export function SkeletonRow({cols}) {
  return (
    <tr className="animate-pulse border-b">
      {Array(cols)
        .fill(0)
        .map((_, i) => (
          <td key={i} className="px-6 py-4">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </td>
        ))}
    </tr>
  );
}
