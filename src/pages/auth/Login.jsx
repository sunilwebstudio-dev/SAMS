import { Link } from "react-router-dom";
import { Mail, ShieldCheck, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Checkbox from "../../components/ui/Checkbox";

function Login() {
  const { t } = useTranslation();

  return (
    <>

      <div className="login-header">

        <span className="login-badge">
          <ShieldCheck size={16} />
          {t("secure")}
        </span>

        <h2>{t("login")}</h2>

        <p>{t("loginDescription")}</p>

      </div>

      <form className="login-form">

        <Input
          label={t("emailAddress")}
          placeholder={t("enterEmail")}
          icon={<Mail size={18} />}
          required
        />

        <PasswordInput
          label={t("password")}
          placeholder={t("password")}
          required
        />

        <div className="login-options">

          <Checkbox
            label={t("rememberMe")}
          />

          <Link to="/forgot-password">
            {t("forgotPassword")}
          </Link>

        </div>

        <Button
          icon={<LogIn size={18} />}
          fullWidth
        >
          {t("login")}
        </Button>

      </form>

      <div className="login-divider">
        <span>{t("or")}</span>
      </div>

      <div className="social-login">

        <Button
          variant="secondary"
          fullWidth
        >
          Continue with Google
        </Button>

        <Button
          variant="secondary"
          fullWidth
        >
          Continue with Microsoft
        </Button>

        <Button
          variant="secondary"
          fullWidth
        >
          Continue with Apple
        </Button>

      </div>

      <p className="signup-link">

        {t("dontHaveAccount")}{" "}

        <Link to="/signup">

          {t("signup")}

        </Link>

      </p>

    </>
  );
}

export default Login;