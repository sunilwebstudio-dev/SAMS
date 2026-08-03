import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import "../../styles/ui/input.css";

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  required = false,
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

      <div className="sams-input-wrapper">

        <div className="sams-input-icon">
          <Lock size={18} />
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="sams-input has-icon has-password"
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

    </div>
  );
}

export default PasswordInput;