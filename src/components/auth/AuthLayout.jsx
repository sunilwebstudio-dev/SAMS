import { Outlet } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import AuthBackground from "./AuthBackground";
import AuthCard from "./AuthCard";

function AuthLayout() {
  const { t } = useTranslation();

  return (
    <AuthBackground>
    <div className="auth-layout">

      {/* LEFT PANEL */}
      {/* RIGHT PANEL */}

      <div className="auth-right">

       <AuthCard>

  <Outlet/>

</AuthCard>

      </div>

    </div>

    </AuthBackground>
  );
}

export default AuthLayout;