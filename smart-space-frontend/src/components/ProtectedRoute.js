import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getStoredUser, getToken } from "../utils/auth";

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const token = getToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to={user.role === "owner" ? "/owner-dashboard" : "/home"} replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
