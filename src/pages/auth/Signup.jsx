import { User, Mail, Phone, Building2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Checkbox from "../../components/ui/Checkbox";
import Select from "../../components/ui/Select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../services/authService";

function Signup() {

  const { t } = useTranslation();
  const navigate = useNavigate();

const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
  fullName: "",
  mobile: "",
  email: "",
  businessType: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const handleChange = (field, value) => {
  setForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const handleSignup = async (e) => {

  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!form.acceptTerms) {
    alert("Please accept Terms & Privacy Policy.");
    return;
  }

  try {

    setLoading(true);

    await signUpUser(form);

    alert(
      "Account created successfully. Please verify your email."
    );

    navigate("/verify-otp");

  } catch (error) {

    alert(error.message);

  } finally {

    setLoading(false);

  }

};

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

      <form
  className="login-form"
  onSubmit={handleSignup}
>

        <Input
  label={t("fullName")}
  placeholder={t("enterFullName")}
  icon={<User size={18} />}
  value={form.fullName}
  onChange={(e) =>
    handleChange("fullName", e.target.value)
  }
  required
/>

        <Input
          label={t("mobileNumber")}
          placeholder={t("enterMobile")}
          icon={<Phone size={18} />}
          value={form.mobile}
          onChange={(e)=>handleChange("mobile",e.target.value)}
          required
        />

        <Input
          label={t("emailAddress")}
          placeholder={t("enterEmail")}
          icon={<Mail size={18} />}
          value={form.email}
          onChange={(e)=>handleChange("email",e.target.value)}
          required
        />

        <Select
          label={t("businessType")}
          options={businessTypes}
          value={form.businessType}
          onChange={(e)=>handleChange("businessType",e.target.value)}
          required
        />

        <PasswordInput
          label={t("password")}
          placeholder={t("password")}
          value={form.password}
onChange={(e)=>handleChange("password",e.target.value)}
          required
        />

        <PasswordInput
          label={t("confirmPassword")}
          placeholder={t("confirmPassword")}
          value={form.confirmPassword}
onChange={(e)=>handleChange("confirmPassword",e.target.value)}
          required
        />

        checked={form.acceptTerms}
onChange={(e)=>
handleChange("acceptTerms",e.target.checked)
}

        <Button
  icon={<UserPlus size={18} />}
  fullWidth
  disabled={loading}
>
  {loading
    ? "Creating Account..."
    : t("createAccount")}
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