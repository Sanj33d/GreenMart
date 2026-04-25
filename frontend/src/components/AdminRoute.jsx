import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, dbUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  const allowedRoles = ["manager", "developer"];

  if (!dbUser || !allowedRoles.includes(dbUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;