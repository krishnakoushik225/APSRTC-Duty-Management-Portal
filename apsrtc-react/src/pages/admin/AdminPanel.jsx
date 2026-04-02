import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const { user } = useAuth();
  const [keyword, setKeyword] = useState("");

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users", user?.id],
    queryFn: () => apiClient.getAllUsers(),
    enabled: !!user?.id,
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: filteredUsers = [] } = useQuery({
    queryKey: ["search-users", keyword],
    queryFn: () => apiClient.searchUsers(keyword),
    enabled: keyword.trim().length > 0,
  });

  const onDelete = async (id) => {
    try {
      await apiClient.deleteUser(id);
      toast.success("User deleted successfully!");
      await refetch();
    } catch (err) {
      console.error("Error deleting user:", err);
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "Could not delete user.";
      toast.error(msg);
    }
  };

  const usersToShow = keyword.trim().length > 0 ? filteredUsers : users;
  const showingCount =
    keyword.trim().length > 0 ? filteredUsers.length : users.length;

  return (
    <div className="px-6 lg:px-8 py-10 min-h-screen">
      <div className="card p-0 max-w-7xl mx-auto overflow-hidden shadow-soft">
        <header className="border-b border-slate-300/50 bg-surface-elevated px-6 py-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="min-w-0">
              <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Admin · Workforce
              </p>
              <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Employee directory
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-xl">
                Search by name, employee ID, or mobile. Edit profiles or remove
                records—changes apply as soon as you confirm.
              </p>
            </div>
            <div className="w-full shrink-0 lg:max-w-sm">
              <label htmlFor="admin-user-search" className="sr-only">
                Search employees
              </label>
              <input
                id="admin-user-search"
                type="text"
                placeholder="Search name, ID, or mobile…"
                className="field w-full"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 pt-6">
          <div className="overflow-x-auto rounded-xl border border-slate-300/50 bg-surface-elevated shadow-sm max-h-[min(70vh,720px)] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-[1] border-b border-slate-300/50 bg-surface-inset/95 backdrop-blur-sm">
                <tr>
                  <th className="px-5 py-3.5 text-left text-2xs font-semibold uppercase tracking-wider text-slate-500">
                    Employee name
                  </th>
                  <th className="px-5 py-3.5 text-left text-2xs font-semibold uppercase tracking-wider text-slate-500">
                    User ID
                  </th>
                  <th className="px-5 py-3.5 text-left text-2xs font-semibold uppercase tracking-wider text-slate-500">
                    Role
                  </th>
                  <th className="px-5 py-3.5 text-left text-2xs font-semibold uppercase tracking-wider text-slate-500">
                    Mobile
                  </th>
                  <th className="px-5 py-3.5 text-left text-2xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="px-5 py-3.5 text-right text-2xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-300/35">
                {isLoading ? (
                  <>
                    <SkeletonRow cols={6} />
                    <SkeletonRow cols={6} />
                    <SkeletonRow cols={6} />
                    <SkeletonRow cols={6} />
                    <SkeletonRow cols={6} />
                  </>
                ) : usersToShow.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      <div className="inline-flex flex-col items-center gap-2">
                        <p className="text-base font-semibold text-slate-800">
                          No users found
                        </p>
                        <p className="text-sm text-slate-500">
                          Try another keyword or clear search.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  usersToShow.map((row) => (
                    <tr
                      key={row.id}
                      className="bg-surface-elevated transition-colors duration-150 hover:bg-surface-inset/45"
                    >
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {row.name}
                      </td>
                      <td className="px-5 py-4 tabular-nums text-slate-700">
                        {row.id}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {row.category}
                      </td>
                      <td className="px-5 py-4 tabular-nums text-slate-700">
                        {row.contactNumber}
                      </td>
                      <td className="px-5 py-4 text-slate-600 break-all">
                        {row.email}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex flex-wrap justify-end gap-2">
                          <Link
                            to={`/admin/users/update/${row.id}`}
                            state={{ user: row }}
                            className="btn-ghost btn-sm"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this user?"
                                )
                              ) {
                                onDelete(row.id);
                              }
                            }}
                            className="btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
            <span className="font-medium tabular-nums text-slate-700">
              Showing{" "}
              <span className="text-slate-900">{showingCount}</span>{" "}
              {showingCount === 1 ? "user" : "users"}
              {keyword.trim().length > 0 ? " (filtered)" : ""}
            </span>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost btn-sm" disabled>
                Prev
              </button>
              <button type="button" className="btn-ghost btn-sm" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow({ cols }) {
  return (
    <tr className="animate-pulse border-b border-slate-300/35">
      {Array(cols)
        .fill(0)
        .map((_, i) => (
          <td key={i} className="px-5 py-4">
            <div className="h-4 w-full rounded bg-slate-200/90" />
          </td>
        ))}
    </tr>
  );
}
