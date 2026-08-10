import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Preloader from "./components/layout/Preloader.jsx";
import Home from "./pages/Home.jsx";
import AgreementList from "./pages/agreements/AgreementList";
import { AuthProvider } from "./contexts/AuthContext";
import AgreementDetails from "./pages/agreements/AgreementDetails"; 
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/dashboard/Dashboard";
import CreateAgreement from "./pages/agreements/CreateAgreement";

import AuthLayout from "./components/auth/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Preloader
        onComplete={() => setLoading(false)}
      />
    );
  }

  return (
    <AuthProvider>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* AUTH */}
        <Route element={<AuthLayout />}>

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/verify-otp"
            element={<VerifyOTP />}
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />

        </Route>

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/agreements"
  element={
    <ProtectedRoute>
      <AgreementList />
    </ProtectedRoute>
  }
/>

        {/* CREATE AGREEMENT */}
        <Route
          path="/agreements/create"
          element={
            <ProtectedRoute>
              <CreateAgreement />
            </ProtectedRoute>
          }
        />

        <Route
  path="/agreements/:agreementId"
  element={
    <ProtectedRoute>
      <AgreementDetails />
    </ProtectedRoute>
  }
/>

      </Routes>

    </AuthProvider>
  );
}

export default App;