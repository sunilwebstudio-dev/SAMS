import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShieldCheck, ChevronDown, LogIn } from "lucide-react";
import heroVideo from "../../assets/videos/sams-hero.mp4";

function Hero({ scrollToSection }) {
  const { t } = useTranslation();

  return (
    <section className="hero" id="home">
      <video
        className="hero-background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="hero-video-overlay"></div>
      <div className="hero-video-gold-light"></div>

      <div className="hero-orb hero-orb-one"></div>
      <div className="hero-orb hero-orb-two"></div>

      <div className="hero-grid"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <ShieldCheck size={15} />
          {t("heroBadge")}
        </div>

        <p className="hero-eyebrow">
          {t("heroEyebrow")}
        </p>

        <h1>
          {t("heroTitle")}
          <span> {t("heroHighlight")}</span>
        </h1>

        <p className="hero-description">
          {t("heroDescription")}
        </p>

        <div className="hero-buttons">
          <button
            className="primary-cta"
            onClick={() => scrollToSection("agreements")}
          >
            {t("exploreAgreements")}
            <span>→</span>
          </button>

          <Link to="/login" className="secondary-cta">
            <LogIn size={18} />
            {t("loginSams")}
          </Link>
        </div>

        <div className="trust-row">
          <div>
            <strong>{t("secure")}</strong>
            <span>{t("authentication")}</span>
          </div>

          <i></i>

          <div>
            <strong>{t("digital")}</strong>
            <span>{t("agreementRecords")}</span>
          </div>

          <i></i>

          <div>
            <strong>24×7</strong>
            <span>{t("access")}</span>
          </div>
        </div>
      </div>

      <button
        className="scroll-indicator"
        onClick={() => scrollToSection("agreements")}
        aria-label="Scroll to agreements"
      >
        <span>{t("scrollToExplore")}</span>
        <ChevronDown size={19} />
      </button>
    </section>
  );
}

export default Hero;