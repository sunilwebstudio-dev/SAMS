import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Agreements() {
  const { t } = useTranslation();

  const handleCardMove = (e) => {
    if (window.innerWidth <= 800) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-7px)
    `;
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;

    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <section className="agreements-section" id="agreements">
      <div className="section-heading">
        <p>{t("agreementServices")}</p>

        <h2>
          {t("chooseYour")}
          <span> {t("agreementWord")}</span>
        </h2>

        <div className="heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>

        <p className="section-description">
          {t("agreementSectionDescription")}
        </p>
      </div>

      <div className="agreement-cards">
        {/* SUPARI AGREEMENT */}
        <Link
          to="/login"
          className="agreement-card supari-card"
          onMouseMove={handleCardMove}
          onMouseLeave={handleCardLeave}
        >
          <div className="card-number">01</div>

          <div className="card-glow"></div>
          <div className="cursor-spotlight"></div>

          <div className="agreement-icon">
            <span>SA</span>
          </div>

          <p className="card-category">
            {t("samsAgreement")}
          </p>

          <h3>{t("supariAgreement")}</h3>

          <p className="card-description">
            {t("supariDescription")}
          </p>

          <div className="card-features">
            <span>✓ {t("buyerSeller")}</span>
            <span>✓ {t("witnessInfo")}</span>
            <span>✓ {t("printablePdf")}</span>
            <span>✓ {t("secureRecord")}</span>
          </div>

          <div className="card-action">
            <span>{t("createAgreement")}</span>
            <b>→</b>
          </div>

          <div className="card-border-light"></div>
        </Link>

        {/* MONEY AGREEMENT */}
        <Link
          to="/login"
          className="agreement-card money-card"
          onMouseMove={handleCardMove}
          onMouseLeave={handleCardLeave}
        >
          <div className="card-number">02</div>

          <div className="card-glow"></div>
          <div className="cursor-spotlight"></div>

          <div className="agreement-icon">
            <span>₹</span>
          </div>

          <p className="card-category">
            {t("samsAgreement")}
          </p>

          <h3>{t("moneyAgreement")}</h3>

          <p className="card-description">
            {t("moneyDescription")}
          </p>

          <div className="card-features">
            <span>✓ {t("lenderBorrower")}</span>
            <span>✓ {t("amountTerms")}</span>
            <span>✓ {t("printablePdf")}</span>
            <span>✓ {t("secureRecord")}</span>
          </div>

          <div className="card-action">
            <span>{t("createAgreement")}</span>
            <b>→</b>
          </div>

          <div className="card-border-light"></div>
        </Link>
      </div>
    </section>
  );
}

export default Agreements;