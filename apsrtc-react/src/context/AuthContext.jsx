import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [role, setRole] = useState(() => sessionStorage.getItem("role"));

  const register = async (payload) => {
    return apiClient.register(payload);
  };

  const login = async (creds) => {
    try {
      const data = await apiClient.login(creds);
      const token = data.authResponse ? data.authResponse.token : data.token;
      const user = data.authResponse ? data.authResponse.user : data.user;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", user?.category);
      sessionStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setRole(user.category);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const res = await apiClient.logout();
        toast.success(res?.message || "Logged out successfully!");
      }
    } catch (err) {
      console.error("Logout request failed", err);
      toast.error(err.response.data.message || err.response?.data);
    }

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");

    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
