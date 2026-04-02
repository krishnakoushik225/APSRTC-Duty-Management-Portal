import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { User, Lock, ArrowRight, Zap } from "lucide-react";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import { getErrorMessage } from "../api/errorHandler";
import AuthPortalLayout, {
  AuthPortalMobileBrand,
  AuthPortalPanel,
} from "../components/AuthPortalLayout";

export default function Login() {
  const [creds, setCreds] = useState({ id: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!creds.id || !creds.password) {
      toast.warning("Please enter both employee ID/email and password");
      return;
    }

    setLoading(true);

    try {
      await login(creds);
      const role = sessionStorage.getItem("role");
      navigate(role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://apsrtc-service.onrender.com/health").catch(() => {
      console.log("Something went wrong while requesting the health check!");
    });
  }, []);

  return (
    <AuthPortalLayout variant="login">
      <div className="w-full max-w-md">
        <AuthPortalMobileBrand variant="login" />

        <AuthPortalPanel className="p-8 sm:p-10 space-y-8">
          <div className="hidden lg:block space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Sign in
            </p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Access your dashboard
            </h2>
            <p className="text-sm text-slate-600">
              Use your employee ID or work email.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="relative group">
              <label className="text-xs font-bold text-slate-700 mb-2.5 block uppercase tracking-wider">
                Employee ID / Email
              </label>
              <div className="field-wrap relative group">
                <User
                  className="h-5 w-5 text-blue-600 flex-shrink-0"
                  strokeWidth={2}
                />
                <input
                  required
                  value={creds.id}
                  placeholder="2021BCS01 or your@email.com"
                  onChange={(e) => setCreds({ ...creds, id: e.target.value })}
                  autoComplete="username"
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-base font-medium"
                />
              </div>
            </div>

            <div className="relative group">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="field-wrap relative group">
                <Lock
                  className="h-5 w-5 text-blue-600 flex-shrink-0"
                  strokeWidth={2}
                />
                <input
                  required
                  type="password"
                  value={creds.password}
                  placeholder="••••••••••"
                  onChange={(e) =>
                    setCreds({ ...creds, password: e.target.value })
                  }
                  autoComplete="current-password"
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-base font-medium tracking-wide"
                />
              </div>
            </div>

            <Button
              disabled={loading}
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Zap size={20} strokeWidth={2} />}
            >
              {loading ? "Signing in..." : "Sign in"}
              {loading && <Spinner />}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-surface-elevated/95 text-slate-500 font-semibold">
                or
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-center text-sm text-slate-600 font-medium">
              New to the portal?
            </p>
            <Link
              to="/register"
              className="w-full btn-success py-3.5 text-base inline-flex items-center justify-center gap-2"
            >
              Create an account
              <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
            </Link>
          </div>
        </AuthPortalPanel>

        <p className="text-center text-xs text-slate-300/95 mt-8 max-w-sm mx-auto leading-relaxed">
          Protected access. Sessions may be audited for security compliance.
        </p>
      </div>
    </AuthPortalLayout>
  );
}
