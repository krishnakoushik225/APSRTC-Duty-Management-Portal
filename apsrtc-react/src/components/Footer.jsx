import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <footer id="footer" className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl py-20">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 justify-items-center">
          {/* Office */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Our Office
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#footer" className="hover:underline">
                  Vijayawada, A.P
                </a>
              </li>
              <li className="mb-4">
                <a href="#footer" className="hover:underline">
                  +012-345-6789
                </a>
              </li>
              <li className="mb-4">
                <a href="#footer" className="hover:underline">
                  abcde@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Quick Links
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="/user/index" className="hover:underline">
                  Home
                </a>
              </li>
              <li className="mb-4">
                <a href="/user/departments" className="hover:underline">
                  Departments
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/user/freq-asked-questions"
                  className="hover:underline"
                >
                  FAQ's
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Services
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href={location.pathname} className="hover:underline">
                  24/7 Available
                </a>
              </li>
              <li className="mb-4">
                <a href={location.pathname} className="hover:underline">
                  Adorable Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a href={location.pathname} className="hover:underline">
                  Dedicated Team
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-lg font-bold tracking-tight dark:text-white sm:text-xl">
                Get Daily Duty Details
              </h2>
              <p className="sm:text-slate-100 mt-5">Get in Touch</p>

              <div className="mt-6 flex md:flex-row flex-col gap-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>

                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 
               text-white shadow-sm ring-1 ring-inset ring-white/10 
               focus:ring-2 focus:ring-inset focus:ring-indigo-500 
               sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />

                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold 
               text-white shadow-sm hover:bg-indigo-400 focus-visible:outline 
               focus-visible:outline-2 focus-visible:outline-offset-2 
               focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-4 py-6 bg-gray-400 dark:bg-gray-800 text-center">
          <p className="text-lg text-gray-500 dark:text-gray-300 font-semibold">
            © {new Date().getFullYear()} APSRTC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
