import { useTranslation } from "react-i18next";
import { Download, ShieldCheck } from "lucide-react";

function Install() {
  const { t } = useTranslation();

  return (
    <section className="install-section" id="install">
      <div className="install-container">
        <div className="install-content">
          <p className="install-label">
            {t("installLabel")}
          </p>

          <h2>
            {t("installTitle")}
            <span> {t("installHighlight")}</span>
          </h2>

          <p className="install-description">
            {t("installDescription")}
          </p>

          <div className="install-benefits">
            <div>
              <span>✓</span>
              <p>
                <strong>{t("quickAccess")}</strong>
                <br />
                {t("quickAccessDesc")}
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>{t("appExperience")}</strong>
                <br />
                {t("appExperienceDesc")}
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>{t("alwaysUpdated")}</strong>
                <br />
                {t("alwaysUpdatedDesc")}
              </p>
            </div>
          </div>

          <div className="install-actions">
            <button className="install-main-button">
              <Download size={18} />

              <div>
                <small>{t("installWebApp")}</small>
                <strong>{t("installNow")}</strong>
              </div>
            </button>

            <span className="install-note">
              {t("noPlayStore")}
            </span>
          </div>
        </div>

        {/* PHONE MOCKUP */}
        <div className="install-visual">
          <div className="phone-light"></div>

          <div className="phone-frame">
            <div className="phone-speaker"></div>

            <div className="phone-screen">
              <div className="phone-topbar">
                <div className="mini-brand">
                  <span>S</span>
                  <strong>SAMS</strong>
                </div>

                <div className="mini-status">
                  {t("secure")}
                </div>
              </div>

              <div className="phone-hero">
                <span>{t("welcomeTo")}</span>

                <h3>SAMS</h3>

                <p>
                  {t("agreementManagementText")}
                </p>
              </div>

              <div className="phone-dashboard">
                <div className="phone-card">
                  <span>SA</span>

                  <div>
                    <small>{t("agreement")}</small>
                    <strong>{t("supariAgreement")}</strong>
                  </div>

                  <b>→</b>
                </div>

                <div className="phone-card">
                  <span>₹</span>

                  <div>
                    <small>{t("agreement")}</small>
                    <strong>{t("moneyAgreement")}</strong>
                  </div>

                  <b>→</b>
                </div>
              </div>

              <div className="phone-security">
                <ShieldCheck size={16} />
                {t("protectedAccess")}
              </div>
            </div>
          </div>

          <div className="floating-install-badge">
            <Download size={16} />

            <div>
              <span>{t("webApp")}</span>
              <strong>{t("readyInstall")}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Install;