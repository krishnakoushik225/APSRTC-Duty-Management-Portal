import React from "react";
import Footer from "../components/Footer";
import {
  ShieldCheck,
  Clock,
  Users,
  Building2,
  HeartPulse,
  MonitorSmartphone,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-indigo-600 leading-snug">
              Connecting People
              <br /> Empowering Transport
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              APSRTC is dedicated to delivering reliable, accessible, and safe
              public transportation solutions across Andhra Pradesh. Our mission
              is to enhance mobility and support the daily needs of millions of
              passengers.
            </p>

            <p className="mt-4 text-base text-gray-700 max-w-xl">
              Our goal is to empower our workforce with modern tools that
              simplify operations and enhance productivity. Through
              transparency, reliability, and a strong commitment to service, we
              aim to set new benchmarks in the public transportation sector.
            </p>

            <div className="mt-8 flex flex-row gap-4">
              <a
                href="/user/dashboard"
                className="flex items-center bg-indigo-700 text-white px-5 py-3 rounded-lg hover:bg-indigo-600 transition shadow-sm"
              >
                <MonitorSmartphone className="mr-3" size={22} />
                <span className="font-medium">Open User Portal</span>
              </a>
              <a
                href="/register"
                className="flex items-center border border-indigo-600 text-indigo-600 px-5 py-3 rounded-lg hover:bg-indigo-500 hover:text-white transition"
              >
                <ArrowRight className="mr-3" size={22} />
                <span className="font-medium">Join Our Team</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src="/images/main.jpeg"
              alt="APSRTC Bus"
              className="rounded-xl shadow-lg w-full max-w-md lg:max-w-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700">Our Services</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Explore essential tools and digital solutions designed for APSRTC
            staff and passengers.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {[
              {
                title: "Intuitive Dashboard",
                desc: "Track duties, schedules, and notifications with a clean and interactive interface.",
                icon: <MonitorSmartphone size={26} />,
              },
              {
                title: "Emergency Leave",
                desc: "Submit and manage emergency leave requests instantly with real‑time status tracking.",
                icon: <HeartPulse size={26} />,
              },
              {
                title: "Optimized Performance",
                desc: "Smooth system operations with fast response and reduced waiting times.",
                icon: <Clock size={26} />,
              },
              {
                title: "Secure Access",
                desc: "Role‑based authentication with encrypted communication for safe usage.",
                icon: <ShieldCheck size={26} />,
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl p-6 shadow-sm text-left"
              >
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-indigo-600 text-white mb-4">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-indigo-700 text-center">
            Departments
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {[
              {
                title: "Management Department",
                img: "/images/management.webp",
                icon: <Users size={28} />,
              },
              {
                title: "Employee Department",
                img: "/images/employee.webp",
                icon: <Building2 size={28} />,
              },
              {
                title: "Medical Department",
                img: "/images/medical.avif",
                icon: <HeartPulse size={28} />,
              },
            ].map((d) => (
              <article
                key={d.title}
                className="bg-gray-50 rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-indigo-700 mb-1 font-semibold text-xl">
                    {d.icon}
                    {d.title}
                  </div>
                  <p className="text-md text-gray-600">
                    Supporting staff and operations to ensure smooth functioning
                    across departments.
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
