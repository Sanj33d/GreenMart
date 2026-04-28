// import { NavLink } from "react-router";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-base-200 text-white">
//       <section className="hero min-h-[70vh] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
//         <div className="hero-content text-center">
//           <div className="max-w-3xl">
//             <p className="mb-3 text-sm uppercase tracking-[4px] text-indigo-300">
//               Welcome to GreenMart
//             </p>

//             <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
//               Shop Smart. Pay Fast. Track Easily.
//             </h1>

//             <p className="py-6 text-lg text-gray-300">
//               Discover electronics, home essentials, fitness gear, accessories,
//               and more; all in one modern shopping experience.
//             </p>

//             <div className="flex justify-center gap-4">
//               <NavLink to="/products" className="btn btn-primary">
//                 Explore Products
//               </NavLink>

//               <NavLink to="/cart" className="btn btn-outline text-white">
//                 View Cart
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="px-6 py-14 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-10">
//           Why Shop With Us?
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Fast Checkout</h3>
//               <p className="text-gray-300">
//                 Smooth Stripe-powered payment experience.
//               </p>
//             </div>
//           </div>

//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Order Tracking</h3>
//               <p className="text-gray-300">
//                 View your orders and track their latest status anytime.
//               </p>
//             </div>
//           </div>

//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Secure Accounts</h3>
//               <p className="text-gray-300">
//                 Firebase authentication with role-based access control.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="px-6 pb-16 max-w-7xl mx-auto">
//         <div className="bg-base-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
//           <div>
//             <h2 className="text-3xl font-bold mb-2">Ready to start shopping?</h2>
//             <p className="text-gray-300">
//               Browse products, add to cart, checkout, and manage orders easily.
//             </p>
//           </div>

//           <NavLink to="/products" className="btn btn-secondary">
//             Shop Now
//           </NavLink>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

// v2
import { NavLink } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] right-[5%] w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="mb-5 text-xs uppercase tracking-[5px] text-indigo-400 font-semibold">
            Welcome to ShopiMart
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Shop Smart.{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Pay Fast.
            </span>{" "}
            Track Easily.
          </h1>

          <p className="text-lg text-slate-400 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Discover electronics, home essentials, fitness gear, accessories,
            and more — all in one modern shopping experience.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            <NavLink
              to="/products"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
            >
              Explore Products <span>→</span>
            </NavLink>

            <NavLink
              to="/cart"
              className="px-7 py-3 rounded-xl bg-transparent border border-white/15 hover:border-indigo-500/40 hover:bg-indigo-500/5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
            >
              View Cart
            </NavLink>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* Features */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <p className="text-center text-xs uppercase tracking-[4px] text-indigo-400 font-semibold mb-3">Why us</p>
        <h2 className="text-3xl font-bold text-center text-white tracking-tight mb-12">
          Why Shop With Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: "⚡",
              title: "Fast Checkout",
              desc: "Smooth Stripe-powered payment experience.",
            },
            {
              icon: "📦",
              title: "Order Tracking",
              desc: "View your orders and track their latest status anytime.",
            },
            {
              icon: "🔒",
              title: "Secure Accounts",
              desc: "Firebase authentication with role-based access control.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white/[0.03] hover:bg-indigo-500/[0.05] border border-white/[0.07] hover:border-indigo-500/20 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xl mb-4">
                {icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600/15 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              Ready to start shopping?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Browse products, add to cart, checkout, and manage orders easily.
            </p>
          </div>

          <NavLink
            to="/products"
            className="relative z-10 flex-shrink-0 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            Shop Now →
          </NavLink>
        </div>
      </section>

    </div>
  );
};

export default Home;