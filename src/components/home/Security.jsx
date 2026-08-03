import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";

function Security() {
  const { t } = useTranslation();

  return (
    <section className="security-section" id="security">
      <div className="security-container">
        <div className="section-heading security-heading">
          <p>{t("securityLabel")}</p>

          <h2>
            {t("securityTitle")}
            <span> {t("securityHighlight")}</span>
          </h2>

          <p className="section-description">
            {t("securityDescription")}
          </p>
        </div>

        <div className="security-layout">
          {/* LEFT SECURITY CORE */}
          <div className="security-core">
            <div className="security-core-glow"></div>

            <div className="security-rings">
              <div className="security-ring ring-one"></div>
              <div className="security-ring ring-two"></div>
              <div className="security-ring ring-three"></div>

              <div className="security-shield">
                <ShieldCheck size={42} strokeWidth={1.4} />
              </div>
            </div>

            <p>{t("securityCore")}</p>

            <h3>{t("protectedSystem")}</h3>

            <span className="security-status">
              <i></i>
              {t("securityActive")}
            </span>

            <div className="security-core-info">
              <div>
                <span>{t("access")}</span>
                <strong>{t("authorized")}</strong>
              </div>

              <i></i>

              <div>
                <span>{t("records")}</span>
                <strong>{t("protected")}</strong>
              </div>

              <i></i>

              <div>
                <span>{t("status")}</span>
                <strong>{t("secureStatus")}</strong>
              </div>
            </div>
          </div>

          {/* RIGHT SECURITY FEATURES */}
          <div className="security-features">
            <div className="security-feature">
              <div className="security-feature-number">
                01
              </div>

              <div>
                <span>{t("accountSecurity")}</span>

                <h3>{t("secureAuthentication")}</h3>

                <p>
                  {t("authenticationDescription")}
                </p>
              </div>
            </div>

            <div className="security-feature">
              <div className="security-feature-number">
                02
              </div>

              <div>
                <span>{t("dataProtection")}</span>

                <h3>{t("protectedRecords")}</h3>

                <p>
                  {t("recordDescription")}
                </p>
              </div>
            </div>

            <div className="security-feature">
              <div className="security-feature-number">
                03
              </div>

              <div>
                <span>{t("controlledAccess")}</span>

                <h3>{t("roleBased")}</h3>

                <p>
                  {t("roleDescription")}
                </p>
              </div>
            </div>

            <div className="security-feature">
              <div className="security-feature-number">
                04
              </div>

              <div>
                <span>{t("userPrivacy")}</span>

                <h3>{t("privateData")}</h3>

                <p>
                  {t("privacyDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Security;