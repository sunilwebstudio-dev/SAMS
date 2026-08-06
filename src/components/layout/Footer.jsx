import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";
import samsLogo from "../../assets/images/sams-logo.png";


function Footer({ scrollToSection }) {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-glow"></div>

      <div className="footer-container">
        <div className="footer-main">
          {/* BRAND */}
          <div className="footer-brand">
            <div className="footer-logo-row">
               <img
    src={samsLogo}
    alt="SAMS"
  />

              <div>
                <strong>SAMS</strong>
                <span>{t("agreementSystem")}</span>
              </div>
            </div>

            <p>{t("footerDescription")}</p>

            <div className="footer-secure">
              <ShieldCheck size={15} />
              {t("secureAgreementManagement")}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="footer-column">
            <h4>{t("navigation")}</h4>

            <button onClick={() => scrollToSection("home")}>
              {t("home")}
            </button>

            <button onClick={() => scrollToSection("agreements")}>
              {t("agreements")}
            </button>

            <button onClick={() => scrollToSection("how-it-works")}>
              {t("howItWorks")}
            </button>

            <button onClick={() => scrollToSection("about")}>
              {t("about")}
            </button>
          </div>

          {/* PLATFORM */}
          <div className="footer-column">
            <h4>{t("platformTitle")}</h4>

            <button onClick={() => scrollToSection("security")}>
              {t("security")}
            </button>

            <button onClick={() => scrollToSection("install")}>
              {t("installApp")}
            </button>

            <Link to="/login">
              {t("login")}
            </Link>

            <button onClick={() => scrollToSection("contact")}>
              {t("contact")}
            </button>
          </div>

          {/* AGREEMENTS */}
          <div className="footer-column">
            <h4>{t("agreementsTitle")}</h4>

            <Link to="/login">
              {t("supariAgreement")}
            </Link>

            <Link to="/login">
              {t("moneyAgreement")}
            </Link>

            <Link to="/login">
              {t("myDashboard")}
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {t("copyright").replace(
              "2026",
              new Date().getFullYear()
            )}
          </p>

          <div className="developer-credit">
            <span>{t("designedDevelopedBy")}</span>

            <a
              href="https://sa-web-studio.pages.dev/"
              className="sa-web-studio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sa-mini-logo">SA</span>
              <strong>SA Web Studio</strong>
            </a>
          </div>

          <div className="footer-bottom-links">
            <button>{t("privacyPolicy")}</button>
            <button>{t("termsOfUse")}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;