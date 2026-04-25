// import { useContext } from "react";
// import { Navigate, useLocation } from "react-router";
// import { AuthContext } from "../context/AuthContext/AuthContext";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;