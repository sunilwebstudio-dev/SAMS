import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LogIn,
  Download,
  Languages,
  Menu,
  X,
} from "lucide-react";

function Navbar({ scrollToSection }) {
  const { t, i18n } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("sams-language", language);
  };

  const mobileNavigate = (id) => {
    setMobileMenuOpen(false);

    setTimeout(() => {
      scrollToSection(id);
    }, 100);
  };

    return (
    <>
      
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-inner">

          <button
            className="brand"
            onClick={() => scrollToSection("home")}
          >
            <div className="brand-logo">S</div>

            <div className="brand-text">
              <strong>SAMS</strong>
              <span>{t("agreementSystem")}</span>
            </div>
          </button>


            <nav className="nav-links">

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

              <button onClick={() => scrollToSection("security")}>
                {t("security")}
              </button>

              <button onClick={() => scrollToSection("contact")}>
                {t("contact")}
              </button>

            </nav>


            <div className="language-selector">

  <Languages size={17} />

  <select
    value={i18n.language}
    onChange={(e) => changeLanguage(e.target.value)}
    aria-label="Select language"
  >
    <option value="en">EN</option>
    <option value="hi">हिन्दी</option>
    <option value="bn">বাংলা</option>
    <option value="ne">नेपाली</option>
  </select>

</div>

<button
  className="mobile-menu-button"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Open navigation menu"
  aria-expanded={mobileMenuOpen}
>
  {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
</button>
            


          <div className="nav-actions">

            <button
  className="install-button"
  onClick={() => scrollToSection("install")}
>
  <Download size={17} />
  {t("installApp")}
</button>

<Link to="/login" className="login-button">
  <LogIn size={17} />
  {t("login")}
</Link>

          </div>

        </div>
        <div
  className={`mobile-menu ${mobileMenuOpen ? "mobile-menu-open" : ""}`}
>
  <div className="mobile-menu-inner">

    <button onClick={() => mobileNavigate("home")}>
      <span>01</span>
      {t("home")}
    </button>

    <button onClick={() => mobileNavigate("agreements")}>
      <span>02</span>
      {t("agreements")}
    </button>

    <button onClick={() => mobileNavigate("how-it-works")}>
      <span>03</span>
      {t("howItWorks")}
    </button>

    <button onClick={() => mobileNavigate("about")}>
      <span>04</span>
      {t("about")}
    </button>

    <button onClick={() => mobileNavigate("security")}>
      <span>05</span>
      {t("security")}
    </button>

    <button onClick={() => mobileNavigate("contact")}>
      <span>06</span>
      {t("contact")}
    </button>

    <div className="mobile-menu-divider"></div>

    <button
      className="mobile-install"
      onClick={() => mobileNavigate("install")}
    >
      <Download size={17} />
      {t("installApp")}
    </button>

    <Link
      to="/login"
      className="mobile-login"
      onClick={() => setMobileMenuOpen(false)}
    >
      <LogIn size={17} />
      {t("login")}
      <b>→</b>
    </Link>

  </div>
</div>
      </header>
      
    </>
  );
}

export default Navbar;
