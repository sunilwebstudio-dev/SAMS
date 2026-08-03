import { useTranslation } from "react-i18next";

function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="how-section" id="how-it-works">
      <div className="section-heading how-heading">
        <p>{t("simpleProcess")}</p>

        <h2>
          {t("howSams")} <span>{t("works")}</span>
        </h2>

        <div className="heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>

        <p className="section-description">
          {t("howDescription")}
        </p>
      </div>

      <div className="process-wrapper">
        <div className="process-line">
          <div className="process-line-glow"></div>
        </div>

        {/* STEP 01 */}
        <div className="process-step">
          <div className="step-dot">
            <span>01</span>
          </div>

          <div className="step-content">
            <span className="step-label">
              {t("getStarted")}
            </span>

            <h3>{t("createAccount")}</h3>

            <p>{t("createAccountDesc")}</p>
          </div>
        </div>

        {/* STEP 02 */}
        <div className="process-step">
          <div className="step-dot">
            <span>02</span>
          </div>

          <div className="step-content">
            <span className="step-label">
              {t("selectService")}
            </span>

            <h3>{t("chooseAgreement")}</h3>

            <p>{t("chooseAgreementDesc")}</p>
          </div>
        </div>

        {/* STEP 03 */}
        <div className="process-step">
          <div className="step-dot">
            <span>03</span>
          </div>

          <div className="step-content">
            <span className="step-label">
              {t("addDetails")}
            </span>

            <h3>{t("fillSubmit")}</h3>

            <p>{t("fillSubmitDesc")}</p>
          </div>
        </div>

        {/* STEP 04 */}
        <div className="process-step">
          <div className="step-dot">
            <span>04</span>
          </div>

          <div className="step-content">
            <span className="step-label">
              {t("manageSecurely")}
            </span>

            <h3>{t("accessRecords")}</h3>

            <p>{t("accessRecordsDesc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;