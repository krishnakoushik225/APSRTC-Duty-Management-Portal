import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const loginToken = sessionStorage.getItem("token");
  const resetToken = sessionStorage.getItem("resetToken");
  const verifiedToken = sessionStorage.getItem("verifiedToken");

  const url = config.url || "";

  // 1. forgot-password → no token
  if (url.includes("/auth/forgot-password")) {
    return config;
  }

  // 2. verify-otp → send resetToken
  if (url.includes("/auth/verify-otp")) {
    if (resetToken) {
      config.headers.Authorization = `Bearer ${resetToken}`;
    }
    return config;
  }

  // 3. change-password → send verifiedToken
  if (url.includes("/auth/change-password")) {
    if (verifiedToken) {
      config.headers.Authorization = `Bearer ${verifiedToken}`;
    }
    return config;
  }

  // 4. normal login-based auth
  if (loginToken) {
    config.headers.Authorization = `Bearer ${loginToken}`;
  }

  return config;
});

const apiClient = {
  login: (creds) => api.post("/auth/login", creds).then((res) => res.data),

  register: (creds) => api.post("auth/register", creds).then((res) => res.data),

  logout: () => api.post("/auth/logout").then((res) => res.data),

  forgotPassword: (email) =>
    api.post("auth/forgot-password", { email }).then((res) => res.data),

  validateOtp: (otp, email) =>
    api.post("/auth/verify-otp", { otp, email }).then((res) => res.data),

  changePassword: (creds) =>
    api.post("/auth/change-password", creds).then((res) => res.data),

  updatePassword: (creds) =>
    api.put("/user/change-password", creds).then((res) => res.data),

  getAllUsers: () => api.get("/admin/dashboard").then((res) => res.data),

  addUser: (userData) =>
    api.post("/admin/users/add", userData).then((res) => res.data),

  getUserDetails: (id) => api.get(`/admin/users/${id}`).then((res) => res.data),

  updateUser: (id, userDetails) =>
    api.put(`/admin/users/update/${id}`, userDetails).then((res) => res.data),

  deleteUser: (id) => api.delete(`/admin/users/delete/${id}`),

  searchUsers: (keyword) =>
    api
      .get(`/admin/dashboard/search?keyword=${keyword}`)
      .then((res) => res.data),

  AddDuty: (duty) =>
    api.post("/admin/duties/add", duty).then((res) => res.data),

  getPendingLeaves: () =>
    api.get("/admin/leaves/pending").then((res) => res.data),

  applyLeave: (payload) =>
    api.post(`/user/leave-request`, payload).then((res) => res.length),

  approveLeave: (id) =>
    api.put(`/admin/leaves/${id}/approve`).then((res) => res.data),

  rejectLeave: (id) =>
    api.put(`/admin/leaves/${id}/reject`).then((res) => res.data),

  fetchCurrentDuty: (id) =>
    api.get(`/user/${id}/current-duty`).then((res) => res.data),

  fetchPrevDuty: (id) =>
    api.get(`/user/${id}/previous-duty`).then((res) => res.data),
};

export default apiClient;
