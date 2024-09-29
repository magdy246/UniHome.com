import React from "react";
import { useAuth } from "./AuthContext"; // فرضية أنك تستخدم AuthContext
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth(); // فرضية أنك تستخدم AuthContext للتحقق من حالة المصادقة

  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
