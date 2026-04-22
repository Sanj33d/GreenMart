import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Link, NavLink } from "react-router";
import { CartContext } from "../context/CartContext/CartContext";

const Navbar = () => {
  const { user, signOutUser, dbUser } = useContext(AuthContext);
  console.log("Firebase user:", user);
  console.log("Mongo user:", dbUser);

  const { cartItems } = useContext(CartContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Signed Out the user");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const menuItems = (
    <>
      {/* <li><a href='/products'>View All Products</a></li>
      <li><a href='/cart'>View Cart ({cartItems.length})</a></li>
      <NavLink to="/orders">My Orders</NavLink>
      <li><a href='/chat'>Chat</a></li> */}
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">View All Products</NavLink>
      </li>
      {
        dbUser && (
          <li>
        <NavLink to="/cart">View Cart ({cartItems.length})</NavLink>
      </li>
        )
      }
      {dbUser && (
        <li>
        <NavLink to="/orders">My Orders</NavLink>
      </li>
      )}
      {dbUser?.role === "manager" && (
        <li>
          <NavLink to="/manage-orders">Manage Orders</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/chat">Chat</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menuItems}
            </ul>
          </div>
          {/* <a className="btn btn-ghost text-xl">GreenMart</a> */}
          <NavLink to="/" className="btn btn-ghost text-xl">
            ShopiMart
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        {/* <div className="navbar-end">
    <a className="btn">Button</a>
  </div> */}
        <div className="navbar-end text-sm">
          {user ? <p>User: {user.email}</p> : <p>No user logged in!</p>}
          <Link to="/profile">
            <img
              className="ml-8 rounded-full max-w-1/3"
              src={user ? user.photoURL : <></>}
              alt=""
            />
          </Link>
          {user ? (
            <button onClick={handleSignOut} className="btn">
              Sign Out
            </button>
          ) : (
            <>
              <NavLink to="/register" className="btn">
                Register
              </NavLink>
              <NavLink to="/signIn" className="btn">
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
