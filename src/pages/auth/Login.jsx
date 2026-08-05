import { Link } from "react-router-dom";
import { Mail, ShieldCheck, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Checkbox from "../../components/ui/Checkbox";

import { loginSchema } from "../../schemas/authSchemas";
import { loginUser } from "../../services/auth/authService";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { t } = useTranslation();

const {
  register,
  handleSubmit,
  formState: {
    errors,
    isSubmitting,
  },
} = useForm({
  resolver: zodResolver(loginSchema),
  mode: "onChange",
});

const onSubmit = async (data) => {
  try {
    toast.loading("Logging in...", {
      id: "login",
    });

    await loginUser(
      data.identifier,
      data.password
    );

    toast.success(
      "Login Successful",
      {
        id: "login",
      }
    );
    navigate("/dashboard");

  } catch (error) {

    toast.error(
      error.message,
      {
        id: "login",
      }
    );

    

  }
};
  

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

      <form
  className="login-form"
  onSubmit={handleSubmit(onSubmit)}
> 

<Input
  label="Email / Mobile / SAMS ID"
  placeholder="Enter Email, Mobile or SAMS ID"
  icon={<Mail size={18} />}
  error={errors.identifier?.message}
  required
  {...register("identifier")}
/>

        <PasswordInput
  label={t("password")}
  placeholder={t("password")}
  error={errors.password?.message}
  required
  {...register("password")}
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
  type="submit"
  icon={<LogIn size={18} />}
  fullWidth
  loading={isSubmitting}
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