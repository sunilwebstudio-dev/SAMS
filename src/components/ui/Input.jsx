import "./../../styles/ui/input.css";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  required = false,
}) {
  return (
    <div className="sams-input-group">

      {label && (
        <label className="sams-input-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className="sams-input-wrapper">

        {icon && (
          <div className="sams-input-icon">
            {icon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`sams-input ${icon ? "has-icon" : ""}`}
        />

      </div>

    </div>
  );
}

export default Input;