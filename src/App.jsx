import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Preloader from "./components/layout/Preloader.jsx";

import Home from "./pages/Home.jsx";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthLayout from "./components/auth/AuthLayout";
import "./styles/auth-premium.css";

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

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Route>

    </Routes>

  );

}

export default App;