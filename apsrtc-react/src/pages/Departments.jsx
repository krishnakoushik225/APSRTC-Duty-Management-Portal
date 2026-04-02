import Footer from "../components/Footer";

export default function Departments() {
  return (
    <>
      <div className="relative px-6 lg:px-5">
        <div className="mx-auto my-20 space-y-24">
          {/* MANAGEMENT */}
          <section className="bg-surface-elevated py-12 rounded-xl shadow-sm border border-slate-300/35">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-blue-600 sm:text-4xl">
                  Alone we can do so little, together we can do so much.
                </h2>
                <p className="mt-4 text-gray-600 text-base leading-7">
                  Our departments work together with a unified goal: ensuring
                  smooth operations, supporting our workforce, and improving the
                  overall efficiency of APSRTC.
                </p>
              </div>

              <div className="mx-auto mt-6 max-w-2xl lg:mx-0 lg:flex lg:max-w-none gap-10">
                <div className="p-8 bg-surface rounded-3xl ring-1 ring-slate-300/50 shadow-sm flex-1">
                  <h3 className="text-2xl font-bold tracking-tight text-blue-700">
                    Management Department
                  </h3>
                  <p className="mt-6 text-gray-600 leading-7">
                    The Management Department oversees the entire system
                    including personnel, planning, evaluation, and policy
                    implementation. They coordinate across departments and
                    ensure smooth functioning of schedules, staff deployment,
                    and service quality.
                  </p>
                  <ul className="mt-6 list-disc list-inside text-gray-600 space-y-2">
                    <li>Organizes employee schedules and shifts</li>
                    <li>Ensures policy compliance across departments</li>
                    <li>Handles planning and strategic development</li>
                    <li>Monitors performance and service standards</li>
                  </ul>
                </div>

                <div className="p-6 bg-surface-inset/50 rounded-3xl ring-1 ring-slate-300/50 w-full lg:max-w-md flex-shrink-0 shadow-sm">
                  <div className="mx-auto max-w-xs text-center">
                    <img
                      src="/images/management.webp"
                      alt="Management"
                      className="rounded-lg"
                    />
                    <a
                      href="/user/departments"
                      className="mt-5 inline-block w-32 rounded-md bg-indigo-600 px-3 py-2 
                                 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Know More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EMPLOYEE */}
          <section className="bg-surface-elevated py-12 rounded-xl shadow-sm border border-slate-300/35">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mt-5 max-w-2xl lg:mx-0 lg:flex lg:max-w-none gap-10">
                <div className="p-6 bg-surface-inset/50 rounded-3xl ring-1 ring-slate-300/50 w-full lg:max-w-md flex-shrink-0 shadow-sm">
                  <div className="mx-auto max-w-xs text-center">
                    <img
                      src="/images/employee.webp"
                      alt="Employee"
                      className="rounded-lg"
                    />
                    <a
                      href="/user/departments"
                      className="mt-5 inline-block w-32 rounded-md bg-indigo-600 px-3 py-2 
                                 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Know More
                    </a>
                  </div>
                </div>

                <div className="p-8 flex-1 bg-surface rounded-3xl ring-1 ring-slate-300/50 shadow-sm">
                  <h3 className="text-2xl font-bold tracking-tight text-blue-700">
                    Employee Department
                  </h3>
                  <p className="mt-6 text-gray-600 leading-7">
                    The Employee Department ensures that every staff member
                    receives support, guidance, and necessary resources to
                    perform their duties effectively. They are responsible for
                    maintaining employee welfare and professional development.
                  </p>
                  <ul className="mt-6 list-disc list-inside text-gray-600 space-y-2">
                    <li>Maintains employee records and documentation</li>
                    <li>Handles training and professional development</li>
                    <li>Supports conflict resolution and employee relations</li>
                    <li>Ensures workplace safety and compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* MEDICAL */}
          <section className="bg-surface-elevated py-12 rounded-xl shadow-sm border border-slate-300/35">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mt-12 max-w-2xl lg:mx-0 lg:flex lg:max-w-none gap-10">
                <div className="p-8 flex-1 bg-surface rounded-3xl ring-1 ring-slate-300/50 shadow-sm">
                  <h3 className="text-2xl font-bold tracking-tight text-blue-700">
                    Medical Department
                  </h3>
                  <p className="mt-6 text-gray-600 leading-7">
                    The Medical Department is dedicated to the health and
                    well-being of our employees. They provide regular health
                    check-ups, emergency care, and support during occupational
                    hazards.
                  </p>
                  <ul className="mt-6 list-disc list-inside text-gray-600 space-y-2">
                    <li>Free medical consultations and check-ups</li>
                    <li>Health awareness and wellness programs</li>
                    <li>Emergency medical response support</li>
                    <li>Occupational health and safety management</li>
                  </ul>
                </div>

                <div className="p-6 bg-surface-inset/50 rounded-3xl ring-1 ring-slate-300/50 w-full lg:max-w-md flex-shrink-0 shadow-sm">
                  <div className="mx-auto max-w-xs text-center">
                    <img
                      src="/images/medical.avif"
                      alt="Medical"
                      className="rounded-lg"
                    />
                    <a
                      href="/user/departments"
                      className="mt-5 inline-block w-32 rounded-md bg-indigo-600 px-3 py-2 
                                 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Know More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
