import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

function About({ scrollToSection }) {
  const { t } = useTranslation();

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* LEFT CONTENT */}
        <div className="about-content">
          <p className="about-label">{t("aboutSamsLabel")}</p>

          <h2>
            {t("aboutTitle")}
            <span> {t("aboutHighlight")}</span>
          </h2>

          <div className="about-gold-line"></div>

          <p className="about-description">
            {t("aboutDescription1")}
          </p>

          <p className="about-description secondary">
            {t("aboutDescription2")}
          </p>

          <div className="about-points">
            <div>
              <span>01</span>
              <p>{t("structuredRecords")}</p>
            </div>

            <div>
              <span>02</span>
              <p>{t("organizedManagement")}</p>
            </div>

            <div>
              <span>03</span>
              <p>{t("secureAccess")}</p>
            </div>
          </div>

          <button
            className="about-cta"
            onClick={() => scrollToSection("agreements")}
          >
            {t("exploreSams")}
            <span>→</span>
          </button>
        </div>

        {/* RIGHT VISUAL */}
        <div className="about-visual">
          <div className="about-ambient-light"></div>

          <div className="system-window">
            <div className="window-top">
              <div className="window-dots">
                <i></i>
                <i></i>
                <i></i>
              </div>

              <span>{t("systemLabel")}</span>

              <div className="window-status">
                <i></i>
                {t("secure")}
              </div>
            </div>

            <div className="window-body">
              <div className="window-brand">
                <div className="window-logo">S</div>

                <div>
                  <strong>SAMS</strong>
                  <span>{t("agreementManagement")}</span>
                </div>
              </div>

              <div className="window-divider"></div>

              <div className="window-record">
                <div className="record-icon">SA</div>

                <div className="record-info">
                  <span>{t("agreementType")}</span>
                  <strong>{t("supariAgreement")}</strong>
                </div>

                <div className="record-status">
                  {t("active")}
                </div>
              </div>

              <div className="window-record">
                <div className="record-icon">₹</div>

                <div className="record-info">
                  <span>{t("agreementType")}</span>
                  <strong>{t("moneyAgreement")}</strong>
                </div>

                <div className="record-status">
                  {t("active")}
                </div>
              </div>

              <div className="system-security">
                <div className="security-circle">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <span>{t("systemStatus")}</span>
                  <strong>{t("recordsProtected")}</strong>
                </div>
              </div>
            </div>

            <div className="window-shine"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;