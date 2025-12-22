import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "business" | "admin";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, isBusiness, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === "business" && !isBusiness) {
    return <Navigate to="/" />;
  }

  if (requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
