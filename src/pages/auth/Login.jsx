import { Link } from "react-router-dom";
import { Mail, ShieldCheck, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import samsLogo from "../../assets/images/sams-logo.png";
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

    {/* Header */}

    <div className="login-header">

      <div className="login-logo">
  <img
    src={samsLogo}
    alt="SAMS"
  />
</div>

      <h2>{t("login")}</h2>

      <p>
        Login to your SAMS account using
        Email, Mobile Number or SAMS ID.
      </p>

    </div>

    {/* Tabs */}

    <div className="auth-tabs">

      <button
        className="active"
        type="button"
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => navigate("/signup")}
      >
        Create Account
      </button>

    </div>

    <form
      className="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="full-width">

        <Input
          label="Email / Mobile / SAMS ID"
          placeholder="Enter Email, Mobile or SAMS ID"
          icon={<Mail size={18} />}
          error={errors.identifier?.message}
          required
          {...register("identifier")}
        />

      </div>

      <div className="full-width">

        <PasswordInput
          label={t("password")}
          placeholder="Enter Password"
          error={errors.password?.message}
          required
          {...register("password")}
        />

      </div>

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
        variant="primary"
        icon={<LogIn size={18} />}
        loading={isSubmitting}
        fullWidth
      >
        {t("login")}
      </Button>

    </form>

    <div className="login-divider">
      <span>OR CONTINUE WITH</span>
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
        Continue with Passkey
      </Button>

    </div>

  </>
);
}

export default Login;