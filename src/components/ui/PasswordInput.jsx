import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import "../../styles/ui/input.css";

function PasswordInput({
  label,
  placeholder,
  required = false,
  error,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="sams-input-group">

      {label && (
        <label className="sams-input-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div
        className={`sams-input-wrapper ${
          error ? "input-error" : ""
        }`}
      >

        <div className="sams-input-icon">
          <Lock size={18} />
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="sams-input has-icon has-password"
          {...props}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

      {error && (
        <p className="input-error-text">
          {error}
        </p>
      )}

    </div>
  );
}

export default PasswordInput;