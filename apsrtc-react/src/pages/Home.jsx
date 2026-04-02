import React from "react";
import Footer from "../components/Footer";
import {
  ShieldCheck,
  Users,
  Building2,
  HeartPulse,
  MonitorSmartphone,
  ArrowRight,
  Zap,
  MapPin,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-slate-900 flex flex-col">
      {/* HERO - Transport Themed */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-surface-elevated to-surface-inset/80 py-20 lg:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6 border border-blue-200">
              <Zap size={16} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Modernizing Public Transportation</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
              Connecting People<br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Empowering Transport
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mb-6 leading-relaxed font-medium">
              APSRTC is revolutionizing public transportation in Andhra Pradesh with intelligent workforce management and real-time operations tracking.
            </p>

            <p className="text-lg text-slate-700 max-w-2xl mb-10 leading-relaxed">
              Empower our workforce with cutting-edge digital tools that enhance productivity, streamline operations, and deliver exceptional service to millions of daily passengers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/user/dashboard"
                className="btn-primary px-8 py-4 text-lg"
              >
                <MonitorSmartphone size={24} />
                <span>Open User Portal</span>
              </a>
              <a
                href="/register"
                className="btn-secondary px-8 py-4 text-lg"
              >
                <ArrowRight size={24} />
                <span>Join Our Team</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-200">
              <div>
                <div className="text-3xl font-black text-blue-600">500K+</div>
                <div className="text-sm text-slate-600 mt-1">Daily Passengers</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-600">8K+</div>
                <div className="text-sm text-slate-600 mt-1">Employees</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-600">99%</div>
                <div className="text-sm text-slate-600 mt-1">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right side - Hero Image with gradient overlay */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-300/20 rounded-3xl blur-2xl"></div>
              <img
                src="/images/main.jpeg"
                alt="APSRTC Bus"
                className="relative rounded-3xl shadow-2xl w-full max-w-md lg:max-w-lg object-cover hover:shadow-xl transition-shadow duration-300 border-4 border-blue-100"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-surface-elevated/95 backdrop-blur-md rounded-xl shadow-lg p-4 border border-slate-300/45">
                <div className="flex items-center gap-3">
                  <MapPin className="text-blue-600" size={20} />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Serving Andhra Pradesh</p>
                    <p className="text-xs text-slate-600">Real-time tracking & updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6 border border-blue-200">
            <TrendingUp size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Why Choose APSRTC Digital</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Modern Operations
            </span>
          </h2>

          <p className="text-xl text-slate-600 mt-4 max-w-3xl mx-auto leading-relaxed mb-16">
            Streamline workforce management, reduce operational costs, and improve service quality with our integrated digital platform.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Smart Dashboard",
                desc: "Real-time duty tracking, schedules, and instant notifications with intuitive controls.",
                icon: <MonitorSmartphone size={32} />,
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Emergency Leave",
                desc: "Instant leave requests with approval workflows and instant status notifications.",
                icon: <HeartPulse size={32} />,
                color: "from-red-500 to-red-600",
              },
              {
                title: "Lightning Fast",
                desc: "Optimized performance with sub-second response times and minimal downtime.",
                icon: <Zap size={32} />,
                color: "from-amber-500 to-amber-600",
              },
              {
                title: "Bank-Grade Security",
                desc: "Enterprise-level encryption and role-based access control for complete protection.",
                icon: <ShieldCheck size={32} />,
                color: "from-green-500 to-green-600",
              },
            ].map((s, index) => (
              <div
                key={s.title}
                className="group bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-r ${s.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="py-24 bg-gradient-to-b from-surface-elevated to-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6 border border-blue-200">
              <BarChart3 size={16} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Organizational Structure</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              Meet Our
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Key Departments
              </span>
            </h2>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Coordinated teams working in harmony to deliver exceptional public transportation services.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Management Department",
                img: "/images/management.webp",
                icon: <Users size={32} />,
                color: "from-blue-600 to-blue-700",
                desc: "Strategic planning and operational oversight",
              },
              {
                title: "Employee Department",
                img: "/images/employee.webp",
                icon: <Building2 size={32} />,
                color: "from-green-600 to-green-700",
                desc: "Staff management and workforce development",
              },
              {
                title: "Medical Department",
                img: "/images/medical.avif",
                icon: <HeartPulse size={32} />,
                color: "from-red-600 to-red-700",
                desc: "Employee health and wellness programs",
              },
            ].map((d, index) => (
              <article
                key={d.title}
                className="group bg-surface-elevated rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-slate-300/50 hover:border-blue-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative overflow-hidden h-56 bg-gradient-to-br from-slate-200 to-slate-300">
                  <img
                    src={d.img}
                    alt={d.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className={`absolute top-4 left-4 h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-r ${d.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {d.icon}
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="font-bold text-slate-900 text-xl mb-1 group-hover:text-blue-600 transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 font-medium">
                    {d.desc}
                  </p>
                  <p className="text-slate-700 text-base leading-relaxed">
                    Supporting staff and operations to ensure smooth functioning across all departments.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
