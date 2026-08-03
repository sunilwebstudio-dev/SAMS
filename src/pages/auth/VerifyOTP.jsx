import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";

function VerifyOTP() {

  const { t } = useTranslation();

  return (

    <>

      <div className="login-header">

        <span className="login-badge">
          <ShieldCheck size={16}/>
          {t("emailVerification")}
        </span>

        <h2>
          {t("verifyOtp")}
        </h2>

        <p>
          {t("otpDescription")}
        </p>

      </div>

      <div className="otp-container">

        <input maxLength="1" />
        <input maxLength="1" />
        <input maxLength="1" />
        <input maxLength="1" />
        <input maxLength="1" />
        <input maxLength="1" />

      </div>

      <div className="otp-timer">

        <span>

          {t("resendOtp")} :

        </span>

        <strong>

          00:30

        </strong>

      </div>

      <Button fullWidth>

        {t("verifyOtp")}

      </Button>

      <p className="signup-link">

        {t("didntReceiveOtp")}

        <button className="otp-link">

          {t("resendOtp")}

        </button>

      </p>

    </>

  );

}

export default VerifyOTP;