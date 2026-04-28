// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext/AuthContext";
// import { Link, NavLink } from "react-router";
// import { CartContext } from "../context/CartContext/CartContext";

// const Navbar = () => {
//   const { user, signOutUser, dbUser } = useContext(AuthContext);
//   console.log("Firebase user:", user);
//   console.log("Mongo user:", dbUser);

//   const { cartItems } = useContext(CartContext);

//   const handleSignOut = () => {
//     signOutUser()
//       .then(() => {
//         console.log("Signed Out the user");
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const menuItems = (
//     <>
//       {/* <li><a href='/products'>View All Products</a></li>
//       <li><a href='/cart'>View Cart ({cartItems.length})</a></li>
//       <NavLink to="/orders">My Orders</NavLink>
//       <li><a href='/chat'>Chat</a></li> */}
//       <li>
//         <NavLink className="font-bold text-md" to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink className="font-bold text-md" to="/products">View All Products</NavLink>
//       </li>
//       {user && (
//         <li>
//           <NavLink className="font-bold text-md" to="/cart">View Cart ({cartItems?.length || 0})</NavLink>
//         </li>
//       )}
//       {user && (
//         <li>
//           <NavLink className="font-bold text-md" to="/orders">My Orders</NavLink>
//         </li>
//       )}
//       {(dbUser?.role === "manager" || dbUser?.role === "developer") && (
//         <li>
//           <NavLink className="font-bold text-md" to="/manage-orders">Manage Orders</NavLink>
//         </li>
//       )}
//       <li>
//         <NavLink to="/chat">Chat</NavLink>
//       </li>

//       {user && (
//         <NavLink className="font-bold text-md" to="/profile">
//           <img
//             className="ml-4 rounded-full w-10 h-10 object-cover border border-gray-300"
//             // src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
//             src={
//               dbUser?.avatarUrl ||
//               user?.photoURL ||
//               "https://i.ibb.co/4pDNDk1/avatar.png"
//             }
//             alt="profile"
//           />
//         </NavLink>
//       )}
//     </>
//   );

//   return (
//     <div>
//       <div className="navbar bg-base-100 shadow-sm">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {" "}
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />{" "}
//               </svg>
//             </div>
//             <ul
//               tabIndex={-1}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               {menuItems}
//             </ul>
//           </div>
//           {/* <a className="btn btn-ghost text-xl">GreenMart</a> */}
//           {/* <NavLink to="/" className="btn btn-ghost text-2xl font-bold">
//             GreenMart
//           </NavLink> */}
//           <NavLink to="/" className="text-2xl font-extrabold tracking-tight">
//             <span className="text-white">Shopi</span>
//             <span className="text-indigo-400">Mart</span>
//           </NavLink>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">{menuItems}</ul>
//         </div>
//         {/* <div className="navbar-end">
//     <a className="btn">Button</a>
//   </div> */}
//         <div className="navbar-end font-bold">
//           {/* {user ? <p>User: {user.email}</p> : <p>No user logged in!</p>} */}
//           {user ? <p>User: {dbUser?.fullName || user.email}</p> : <p>No user logged in!</p>}
//           {/* <Link to="/profile">
//             <img
//               className="ml-8 rounded-full max-w-1/3"
//               // src={user ? user.photoURL : <></>}
//               src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
//               alt=""
//             />
//           </Link> */}
//           {user ? (
//             <button onClick={handleSignOut} className="btn bg-red-500 ml-2">
//               Sign Out
//             </button>
//           ) : (
//             <>
//               <NavLink to="/register" className="btn btn-primary ml-2">
//                 Register
//               </NavLink>
//               <NavLink to="/signIn" className="btn bg-green-500 ml-2">
//                 Sign In
//               </NavLink>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// navbar v2
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Link, NavLink } from "react-router";
import { CartContext } from "../context/CartContext/CartContext";

const Navbar = () => {
  const { user, signOutUser, dbUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!user?.email) {
      setOrderCount(0);
      return;
    }

    fetch(`http://localhost:1272/orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrderCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setOrderCount(0));
  }, [user]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Signed Out the user"))
      .catch((error) => console.log(error.message));
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-300 font-semibold border-b-2 border-indigo-400 pb-1"
      : "text-gray-200 hover:text-indigo-300 transition";

  const menuItems = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/cart" className={linkClass}>
              Cart ({cartItems?.length || 0})
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={linkClass}>
              My Orders ({orderCount})
            </NavLink>
          </li>
        </>
      )}

      {(dbUser?.role === "manager" || dbUser?.role === "developer") && (
        <li>
          <NavLink to="/manage-orders" className={linkClass}>
            Manage Orders
          </NavLink>
        </li>
      )}
      {/* chat */}
      {/* <li>
        <NavLink to="/chat" className={linkClass}>Chat</NavLink>
      </li> */}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
            >
              ☰
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow-xl bg-slate-900 rounded-2xl w-56 border border-slate-700 space-y-2"
            >
              {menuItems}
            </ul>
          </div>

          <NavLink to="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-white">Shopi</span>
            <span className="text-indigo-400">Mart</span>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-7 text-sm">{menuItems}</ul>
        </div>

        <div className="navbar-end gap-3">
          {user ? (
            <>
              <div className="hidden md:block text-right leading-tight">
                <p className="text-xs text-gray-400">Signed in as</p>
                <p className="text-sm text-white font-medium max-w-[180px] truncate">
                  {dbUser?.fullName || user.email}
                </p>
              </div>

              <Link to="/profile" className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-indigo-400 ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      dbUser?.avatarUrl ||
                      user?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="profile"
                  />
                </div>
              </Link>

              <button
                onClick={handleSignOut}
                className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 border-0 text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <NavLink to="/signIn" className="btn btn-sm btn-primary">
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-sm btn-outline text-white"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
