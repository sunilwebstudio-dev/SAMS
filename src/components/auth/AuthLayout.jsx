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
      <div className="auth-left">

        <div className="auth-background"></div>

        <div className="auth-overlay"></div>

        <div className="floating-circle one"></div>
        <div className="floating-circle two"></div>
        <div className="floating-circle three"></div>

        <div className="auth-brand">

          <div className="auth-logo">
            S
          </div>

          <div>

            <h1>SAMS</h1>

            <span>
              {t("agreementSystem")}
            </span>

          </div>

        </div>

        <div className="auth-left-content">

          <div className="security-badge">

            <ShieldCheck size={18} />

            <span>
              {t("heroBadge")}
            </span>

          </div>

          <h2>
            {t("heroTitle")}
            <span> {t("heroHighlight")}</span>
          </h2>

          <p>
            {t("heroDescription")}
          </p>

          <div className="auth-feature-list">

            <div>
              ✓ {t("secureAuthentication")}
            </div>

            <div>
              ✓ {t("protectedRecords")}
            </div>

            <div>
              ✓ {t("roleBased")}
            </div>

            <div>
              ✓ {t("privateData")}
            </div>

          </div>

        </div>

      </div>

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