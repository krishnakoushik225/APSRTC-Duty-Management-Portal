import { Link } from "react-router-dom";
import { ShieldCheck, Zap, Bus, Mail, KeyRound, Lock } from "lucide-react";

/**
 * Login / register / recovery use the same global night scene as the app (body background).
 * Optional vignette keeps focus on the form without duplicating the photo.
 */
export default function AuthPortalLayout({ variant = "login", children }) {
  return (
    <div className="auth-portal-root text-slate-900 min-h-screen relative">
      <div
        className="auth-portal-auth-vignette fixed inset-0 pointer-events-none z-0"
        aria-hidden
      />

      <div className="auth-portal-content relative z-10 min-h-screen flex flex-col lg:flex-row">
        <aside className="hidden lg:flex lg:w-[min(420px,36vw)] xl:w-[min(460px,34vw)] shrink-0 flex-col justify-between border-r border-white/10 bg-slate-950/45 backdrop-blur-md px-10 py-12 xl:px-12 xl:py-14">
          <AuthAside variant={variant} />
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 min-h-[100dvh] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function AuthAside({ variant }) {
  const isRegister = variant === "register";
  const isRecovery = variant === "recovery";

  const headline = isRecovery
    ? "Reset access without compromising security."
    : isRegister
      ? "Onboard to the digital operations cockpit."
      : "Sign in to your operations workspace.";

  const sub = isRecovery
    ? "We verify you by email, then let you choose a new password. Short-lived codes reduce risk if credentials are exposed."
    : isRegister
      ? "One account for duty visibility, leave workflows, and secure workforce tools—aligned with how modern transit teams work."
      : "Duty assignments, leave requests, and depot tools in one secure portal—built for clarity under pressure.";

  const bullets = isRecovery
    ? [
        {
          icon: Mail,
          text: "OTP sent only to your registered work email",
          className: "text-cyan-300",
        },
        {
          icon: KeyRound,
          text: "One-time codes expire quickly for safer recovery",
          className: "text-amber-300",
        },
        {
          icon: Lock,
          text: "Set a strong new password before signing in again",
          className: "text-sky-300",
        },
      ]
    : [
        {
          icon: ShieldCheck,
          text: "Role-based access and audited sessions",
          className: "text-cyan-300",
        },
        {
          icon: Zap,
          text: "Fast paths for daily duty and leave actions",
          className: "text-amber-300",
        },
        {
          icon: Bus,
          text: "Designed for depots, crews, and control workflows",
          className: "text-sky-300",
        },
      ];

  return (
    <>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-2 transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
        >
          <img
            src="/images/logo.png"
            alt="APSRTC"
            className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/20"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200/90">
              Andhra Pradesh
            </p>
            <p className="text-sm font-bold text-white leading-tight">
              State Road Transport
            </p>
          </div>
        </Link>

        <h1 className="mt-10 text-3xl xl:text-4xl font-bold tracking-tight text-white leading-[1.15]">
          {headline}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-300 max-w-sm">
          {sub}
        </p>
      </div>

      <ul className="space-y-4 text-sm text-slate-300 mt-12">
        {bullets.map(({ icon: Icon, text, className }) => (
          <li key={text} className="flex gap-3">
            <Icon className={`h-5 w-5 shrink-0 ${className}`} strokeWidth={2} />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function AuthPortalMobileBrand({ variant }) {
  const isRegister = variant === "register";
  const isRecovery = variant === "recovery";

  const title = isRecovery
    ? "Account recovery"
    : isRegister
      ? "Create your account"
      : "Welcome back";

  const subtitle = isRecovery
    ? "Email → verify code → new password."
    : isRegister
      ? "Join your depot on the secure workforce platform."
      : "Employee ID or email, then your password.";

  return (
    <div className="lg:hidden text-center mb-8 max-w-md mx-auto">
      <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
        {isRecovery ? (
          <KeyRound className="h-4 w-4 text-cyan-200" />
        ) : (
          <Bus className="h-4 w-4 text-cyan-200" />
        )}
        <span className="text-xs font-semibold tracking-wide text-white">
          APSRTC Digital Portal
        </span>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-white drop-shadow-sm">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-200/90">{subtitle}</p>
    </div>
  );
}

export function AuthPortalPanel({ children, className = "" }) {
  return (
    <div className={`auth-portal-panel w-full ${className}`.trim()}>
      {children}
    </div>
  );
}
