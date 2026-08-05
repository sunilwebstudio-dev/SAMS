import { Mail, KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "../../schemas/authSchemas";
import { supabase } from "../../config/supabase";

function ForgotPassword() {

  const navigate = useNavigate();

const {
  register,
  handleSubmit,
  formState: {
    errors,
    isSubmitting,
  },
} = useForm({
  resolver: zodResolver(loginSchema),
});


const onSubmit = async (data) => {

  try {

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        data.identifier,
        {
          redirectTo:
            window.location.origin +
            "/reset-password",
        }
      );

    if (error) {

      throw error;

    }

    sessionStorage.setItem(
      "resetEmail",
      data.identifier
    );

    toast.success(
      "Password reset OTP sent successfully"
    );

    navigate("/verify-otp");

  } catch (error) {

    toast.error(error.message);

  }

};
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
<form
  className="login-form"
  onSubmit={handleSubmit(onSubmit)}
>
        <Input
  label="Email"
  placeholder="Enter Email"
  icon={<Mail size={18} />}
  error={errors.identifier?.message}
  required
  {...register("identifier")}
/>

        <Button
  fullWidth
  disabled={isSubmitting}
>
  {isSubmitting
    ? "Sending..."
    : t("sendOtp")}
</Button>

      </form>

    </>
  );
}

export default ForgotPassword;