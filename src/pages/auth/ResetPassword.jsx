import { useTranslation } from "react-i18next";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";

function ResetPassword() {

  const { t } = useTranslation();

  return (
    <>
      <div className="login-header">

        <h2>{t("resetPassword")}</h2>

        <p>{t("resetPasswordDescription")}</p>

      </div>

      <form className="login-form">

        <PasswordInput
          label={t("password")}
          placeholder={t("password")}
          required
        />

        <PasswordInput
          label={t("confirmPassword")}
          placeholder={t("confirmPassword")}
          required
        />

        <Button fullWidth>
          {t("resetPassword")}
        </Button>

      </form>
    </>
  );
}

export default ResetPassword;