import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Preloader from "./components/layout/Preloader.jsx";

import Home from "./pages/Home.jsx";

import AgreementList from "./pages/agreements/AgreementList";
import AgreementDetails from "./pages/agreements/AgreementDetails";
import VerifyAgreement from "./pages/agreements/VerifyAgreement";
import CreateAgreement from "./pages/agreements/CreateAgreement";

import Dashboard from "./pages/dashboard/Dashboard";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import AuthLayout from "./components/auth/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

import {
  AuthProvider,
  useAuth,
} from "./contexts/AuthContext";


/* =========================================================
   APP CONTENT

   AuthProvider ke andar rahega.
   Isse authentication immediately start hota hai.
========================================================= */

function AppContent() {

  const {
    loading: authLoading,
  } = useAuth();

  const [
    preloaderComplete,
    setPreloaderComplete,
  ] = useState(false);


  /* =======================================================
     PRELOADER

     Auth checking aur Preloader parallel me chal rahe hain.
   ======================================================= */

  if (!preloaderComplete) {

    return (
      <Preloader
        onComplete={() =>
          setPreloaderComplete(true)
        }
      />
    );

  }


  /* =======================================================
     AUTH LOADING

     Preloader complete ho gaya lekin Supabase session
     check abhi chal raha ho to short loader dikhao.
   ======================================================= */

  if (authLoading) {

    return (
      <div className="page-loader">
        Loading...
      </div>
    );

  }


  /* =======================================================
     ROUTES
   ======================================================= */

  return (

    <Routes>

      {/* =================================================
          HOME
      ================================================= */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* =================================================
          AUTH
      ================================================= */}

      <Route
        element={<AuthLayout />}
      >

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


      {/* =================================================
          DASHBOARD
      ================================================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      {/* =================================================
          AGREEMENTS
      ================================================= */}

      <Route
        path="/agreements"
        element={
          <ProtectedRoute>
            <AgreementList />
          </ProtectedRoute>
        }
      />


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


      {/* =================================================
          VERIFY AGREEMENT
      ================================================= */}

      <Route
        path="/verify-agreement"
        element={
          <ProtectedRoute>
            <VerifyAgreement />
          </ProtectedRoute>
        }
      />

    </Routes>

  );

}


/* =========================================================
   APP ROOT

   AuthProvider ab Preloader ke bahar nahi,
   balki uske upar rahega.
========================================================= */

function App() {

  return (

    <AuthProvider>

      <AppContent />

    </AuthProvider>

  );

}


export default App;