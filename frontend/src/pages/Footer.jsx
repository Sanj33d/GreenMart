// import React from "react";

// const Footer = () => {
//   return (
//     <div>
//       <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
//         <nav className="grid grid-flow-col gap-4">
//           <a className="link link-hover">About us</a>
//           <a className="link link-hover">Contact</a>
//           <a className="link link-hover">Jobs</a>
//           <a className="link link-hover">Press kit</a>
//         </nav>
//         <nav>
//           <div className="grid grid-flow-col gap-4">
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//               </svg>
//             </a>
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//               </svg>
//             </a>
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
//               </svg>
//             </a>
//           </div>
//         </nav>
//         <aside>
//           <p>
//             Copyright © {new Date().getFullYear()} - All right reserved by ACME
//             Industries Ltd
//           </p>
//         </aside>
//       </footer>
//     </div>
//   );
// };

// export default Footer;

// v2
import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Shopi<span className="text-indigo-400">Mart</span>
            </h2>
            <p className="text-sm text-gray-400">
              Your one-stop shop for electronics, accessories, and daily
              essentials. Fast checkout, secure payments, and easy order
              tracking.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="hover:text-indigo-400 transition">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className="hover:text-indigo-400 transition"
                >
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/cart"
                  className="hover:text-indigo-400 transition"
                >
                  Cart
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/orders"
                  className="hover:text-indigo-400 transition"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p className="text-sm text-gray-400">
              Email: sanjeedshowkat@gmail.com
            </p>
            <p className="text-sm text-gray-400">Phone: 01954207977</p>

            {/* Social */}
            <div className="flex gap-4 mt-4">
              <span className="hover:text-indigo-400 cursor-pointer transition">
                🌐
              </span>
              <span className="hover:text-indigo-400 cursor-pointer transition">
                📘
              </span>
              <span className="hover:text-indigo-400 cursor-pointer transition">
                🐦
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopiMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
