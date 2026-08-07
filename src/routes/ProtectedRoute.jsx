import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const {
    user,
    profile,
    loading,
  } = useAuth();

  const location = useLocation();

  // Wait until authentication finishes
  if (loading) {
    return (
      <div className="page-loader">
        Loading...
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }
    /* -------------------------------------------------------------------------- */
  /*                          Account Status Validation                          */
  /* -------------------------------------------------------------------------- */

  if (profile) {

    // Suspended Account
    if (profile.account_status === "suspended") {
      return (
        <Navigate
          to="/account-suspended"
          replace
        />
      );
    }

    // Locked Account
    if (profile.account_status === "locked") {
      return (
        <Navigate
          to="/account-locked"
          replace
        />
      );
    }

    // Deleted Account
    if (profile.account_status === "deleted") {
      return (
        <Navigate
          to="/account-deleted"
          replace
        />
      );
    }

  }

  /* -------------------------------------------------------------------------- */
  /*                             Role Based Access                              */
  /* -------------------------------------------------------------------------- */

  // Future:
  // roles = buyer | admin | super_admin

  // Example:
  // if (requiredRole === "admin" && role !== "admin") {
  //     return <Navigate to="/403" replace />;
  // }

  /* -------------------------------------------------------------------------- */
  /*                          Future Security Hooks                             */
  /* -------------------------------------------------------------------------- */

  // Desktop Auto Logout
  // Trusted Device Check
  // Offline Session Validation
  // Multi Device Detection
  // AI Security Monitoring

  return children;
}