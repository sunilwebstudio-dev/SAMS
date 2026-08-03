import { User, Mail, Phone, Building2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Checkbox from "../../components/ui/Checkbox";
import Select from "../../components/ui/Select";

function Signup() {

  const { t } = useTranslation();

  const businessTypes = [
    { value: "", label: t("selectBusinessType") },
    { value: "individual", label: t("individual") },
    { value: "farmer", label: t("farmer") },
    { value: "trader", label: t("trader") },
    { value: "supplier", label: t("supplier") },
    { value: "company", label: t("company") },
    { value: "other", label: t("other") },
  ];

  return (

    <>

      <div className="login-header">

        <span className="login-badge">
          <UserPlus size={16} />
          {t("createAccount")}
        </span>

        <h2>{t("signup")}</h2>

        <p>{t("signupDescription")}</p>

      </div>

      <form className="login-form">

        <Input
          label={t("fullName")}
          placeholder={t("enterFullName")}
          icon={<User size={18} />}
          required
        />

        <Input
          label={t("mobileNumber")}
          placeholder={t("enterMobile")}
          icon={<Phone size={18} />}
          required
        />

        <Input
          label={t("emailAddress")}
          placeholder={t("enterEmail")}
          icon={<Mail size={18} />}
          required
        />

        <Select
          label={t("businessType")}
          options={businessTypes}
          required
        />

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

        <Checkbox
          label={t("acceptTerms")}
        />

        <Button
          icon={<UserPlus size={18} />}
          fullWidth
        >
          {t("createAccount")}
        </Button>

      </form>

      <p className="signup-link">

        {t("alreadyAccount")}{" "}

        <Link to="/login">

          {t("login")}

        </Link>

      </p>

    </>

  );
}

export default Signup;