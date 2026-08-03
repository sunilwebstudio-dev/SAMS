import { Mail, KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function ForgotPassword() {
  const { t } = useTranslation();

  return (
    <>
      <div className="login-header">

        <span className="login-badge">
          <KeyRound size={16} />
          {t("forgotPassword")}
        </span>

        <h2>{t("forgotPassword")}</h2>

        <p>{t("forgotPasswordDescription")}</p>

      </div>

      <form className="login-form">

        <Input
          label={t("emailAddress")}
          placeholder={t("enterEmail")}
          icon={<Mail size={18} />}
          required
        />

        <Button fullWidth>
          {t("sendOtp")}
        </Button>

      </form>

    </>
  );
}

export default ForgotPassword;