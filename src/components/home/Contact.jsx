import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* LEFT */}
        <div className="contact-content">
          <p className="contact-label">
            {t("contactLabel")}
          </p>

          <h2>
            {t("contactTitle")}
            <span> {t("contactHighlight")}</span>
          </h2>

          <p className="contact-description">
            {t("contactDescription")}
          </p>

          <div className="contact-info">
            <div className="contact-info-item">
              <span>01</span>

              <div>
                <small>{t("support")}</small>
                <strong>{t("supportText")}</strong>
              </div>
            </div>

            <div className="contact-info-item">
              <span>02</span>

              <div>
                <small>{t("platform")}</small>
                <strong>{t("platformText")}</strong>
              </div>
            </div>

            <div className="contact-info-item">
              <span>03</span>

              <div>
                <small>{t("accessLabel")}</small>
                <strong>{t("accessText")}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form-wrapper">
          <div className="contact-form-light"></div>

          <form
            className="contact-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-top">
              <div>
                <span>{t("contactSams")}</span>
                <h3>{t("sendMessageTitle")}</h3>
              </div>

              <div className="form-status">
                <i></i>
                {t("online")}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t("yourName")}</label>

                <input
                  placeholder={t("enterName")}
                />
              </div>

              <div className="form-group">
                <label>{t("emailAddress")}</label>

                <input
                  placeholder={t("enterEmail")}
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t("subject")}</label>

              <input
                placeholder={t("subjectPlaceholder")}
              />
            </div>

            <div className="form-group">
              <label>{t("message")}</label>

              <textarea
                placeholder={t("messagePlaceholder")}
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
            >
              {t("sendMessage")}
              <span>→</span>
            </button>

            <p className="form-note">
              {t("contactNote")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;