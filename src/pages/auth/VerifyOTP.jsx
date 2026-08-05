import { useState, useRef, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import { supabase } from "../../config/supabase";

function VerifyOTP() {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] =
    useState(false);

  const [timer, setTimer] =
    useState(30);

  const inputRefs = useRef([]);

  useEffect(() => {

    if (timer <= 0) return;

    const interval = setInterval(() => {

      setTimer((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const handleChange = (
    value,
    index
  ) => {

    if (!/^\d?$/.test(value))
      return;

    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);

    if (
      value &&
      index < 5
    ) {

      inputRefs.current[
        index + 1
      ]?.focus();

    }

  };

  const handleKeyDown = (
    e,
    index
  ) => {

    if (

      e.key === "Backspace" &&

      !otp[index] &&

      index > 0

    ) {

      inputRefs.current[
        index - 1
      ]?.focus();

    }

  };

  const handlePaste = (e) => {

    e.preventDefault();

    const pastedData =
      e.clipboardData
        .getData("text")
        .trim();

    if (
      !/^\d{6}$/.test(
        pastedData
      )
    ) return;

    setOtp(
      pastedData.split("")
    );

    inputRefs.current[5]?.focus();

  };
    const handleVerifyOTP = async () => {

    const code = otp.join("");

    if (code.length !== 6) {

      toast.error("Please enter complete OTP");

      return;

    }

    const signupData = JSON.parse(

      sessionStorage.getItem("signupData")

    );

    if (!signupData) {

      toast.error("Signup session expired");

      navigate("/signup");

      return;

    }

    try {

      setLoading(true);

      const { error } =

        await supabase.auth.verifyOtp({

          email: signupData.email,

          token: code,

          type: "signup",

        });

      if (error) throw error;

      const {

        data: userData,

      } = await supabase.auth.getUser();

      const user = userData.user;

      if (!user) {

        throw new Error("User not found");

      }

      const {

        data: existingProfile,

      } = await supabase

        .from("profiles")

        .select("id")

        .eq("auth_id", user.id)

        .maybeSingle();

      if (!existingProfile) {

        const {

          error: profileError,

        } = await supabase

          .from("profiles")

          .insert({

            auth_id: user.id,

            application_id:

              signupData.applicationId,

            full_name:

              signupData.fullName,

            mobile:

              signupData.mobile,

            email:

              signupData.email,

            business_type:

              signupData.businessType,

          });

        if (profileError)

          throw profileError;

      }

      sessionStorage.removeItem(

        "signupData"

      );

      toast.success(

        "Account verified successfully"

      );

      navigate("/login");

    } catch (error) {

      toast.error(error.message);

    } finally {

      setLoading(false);

    }

  };
    return (
    <>
      <div className="login-header">
        <span className="login-badge">
          <ShieldCheck size={16} />
          {t("emailVerification")}
        </span>

        <h2>{t("verifyOtp")}</h2>

        <p>{t("otpDescription")}</p>
      </div>

      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete={
              index === 0
                ? "one-time-code"
                : "off"
            }
            maxLength={1}
            value={digit}
            onChange={(e) =>
              handleChange(
                e.target.value,
                index
              )
            }
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                index
              )
            }
            onPaste={handlePaste}
          />
        ))}
      </div>

      <div className="otp-timer">
        <span>
          {t("resendOtp")} :
        </span>

        <strong>
          {timer > 9
            ? `00:${timer}`
            : `00:0${timer}`}
        </strong>
      </div>

      <Button
        fullWidth
        loading={loading}
        disabled={loading}
        onClick={handleVerifyOTP}
      >
        {loading
          ? "Verifying..."
          : t("verifyOtp")}
      </Button>

      <p className="signup-link">
        {t("didntReceiveOtp")}

        <button
          type="button"
          className="otp-link"
          disabled={timer > 0}
          onClick={() => {
            setTimer(30);

            toast.success(
              "OTP resend feature coming next"
            );
          }}
        >
          {t("resendOtp")}
        </button>
      </p>
    </>
  );

}

export default VerifyOTP;