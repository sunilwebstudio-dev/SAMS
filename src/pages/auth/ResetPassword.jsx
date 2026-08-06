import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import samsLogo from "../../assets/images/sams-logo.png";
import PasswordInput from "../../components/ui/PasswordInput";
import PasswordStrength from "../../components/auth/PasswordStrength";
import Button from "../../components/ui/Button";
import { resetPasswordSchema } from "../../schemas/authSchemas";
import { supabase } from "../../config/supabase";

function ResetPassword() {

  const navigate = useNavigate();

const {
  register,
  handleSubmit,
  watch,
  formState: {
    errors,
    isSubmitting,
  },
} = useForm({

  resolver: zodResolver(resetPasswordSchema),

});

const password = watch("password");

const onSubmit = async (data) => {

  try {

    const { error } =

      await supabase.auth.updateUser({

        password: data.password,

      });

    if (error) throw error;

    toast.success(

      "Password updated successfully"

    );
    await supabase.auth.signOut();

    navigate("/login", {
  replace: true,
});

  } catch (error) {

    toast.error(error.message);

  }

};
  const { t } = useTranslation();

  return (
    <>
      <div className="login-header">

  <div className="login-logo">
    <img
      src={samsLogo}
      alt="SAMS Logo"
    />
  </div>

  <span className="login-badge">
    Reset Password
  </span>

  <h2>{t("resetPassword")}</h2>

  <p>{t("resetPasswordDescription")}</p>

</div>

      <form
  className="login-form"
  onSubmit={handleSubmit(onSubmit)}
>

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

        <Button
  fullWidth
  disabled={isSubmitting}
>

  {isSubmitting

    ? "Updating..."

    : t("resetPassword")}

</Button>
      </form>
    </>
  );
}

export default ResetPassword;