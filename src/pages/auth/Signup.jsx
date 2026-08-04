import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  User,
  Mail,
  Phone,
  UserPlus,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Checkbox from "../../components/ui/Checkbox";
import Select from "../../components/ui/Select";

import PasswordStrength from "../../components/auth/PasswordStrength";

import { signupSchema } from "../../schemas/authSchemas";
import { signUpUser } from "../../services/auth/authService";

function Signup() {

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = watch("password");

  const businessTypes = [
    {
      value: "",
      label: t("selectBusinessType"),
    },
    {
      value: "individual",
      label: t("individual"),
    },
    {
      value: "farmer",
      label: t("farmer"),
    },
    {
      value: "trader",
      label: t("trader"),
    },
    {
      value: "supplier",
      label: t("supplier"),
    },
    {
      value: "company",
      label: t("company"),
    },
    {
      value: "other",
      label: t("other"),
    },
  ];



  const onSubmit = async (data) => {
     console.log("Form Submitted", data);

    try {

      toast.loading(
        t("creatingAccount"),
        {
          id: "signup",
        }
      );

      await signUpUser(data);

      toast.success(
        t("verificationOtpSent"),
        {
          id: "signup",
        }
      );

    } catch (error) {

      toast.error(
        error.message,
        {
          id: "signup",
        }
      );

    }

  };

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
        onSubmit={handleSubmit(onSubmit)}
      >

        <Input
          label={t("fullName")}
          placeholder={t("enterFullName")}
          icon={<User size={18} />}
          error={errors.fullName?.message}
          required
          {...register("fullName")}
        />

        <Input
          label={t("mobileNumber")}
          placeholder={t("enterMobile")}
          icon={<Phone size={18} />}
          error={errors.mobile?.message}
          required
          {...register("mobile")}
        />

        <Input
          label={t("emailAddress")}
          placeholder={t("enterEmail")}
          icon={<Mail size={18} />}
          error={errors.email?.message}
          required
          {...register("email")}
        />

        <Select
          label={t("businessType")}
          options={businessTypes}
          error={errors.businessType?.message}
          required
          {...register("businessType")}
        />

        <PasswordInput
          label={t("password")}
          placeholder={t("password")}
          error={errors.password?.message}
          required
          {...register("password")}
        />

        {password && (
      <PasswordStrength
        password={password}
      />
)}

        <PasswordInput
          label={t("confirmPassword")}
          placeholder={t("confirmPassword")}
          error={errors.confirmPassword?.message}
          required
          {...register("confirmPassword")}
        />

        <Checkbox
  label={t("acceptTerms")}
  error={errors.acceptTerms?.message}
  {...register("acceptTerms")}
/>

        <Button
  type="submit"
  icon={<UserPlus size={18} />}
  fullWidth
  disabled={isSubmitting}
>
  {isSubmitting
    ? t("creatingAccount")
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