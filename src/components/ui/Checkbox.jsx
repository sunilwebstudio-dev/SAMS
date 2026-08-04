import "../../styles/ui/checkbox.css";

function Checkbox({
  label,
  required = false,
  error,
  ...props
}) {
  return (
    <div className="sams-checkbox-group">

      <label className="sams-checkbox">

        <input
          type="checkbox"
          {...props}
        />

        <span className="sams-checkmark"></span>

        <span className="sams-checkbox-label">
          {label}
          {required && (
            <span className="required">*</span>
          )}
        </span>

      </label>

      {error && (
        <p className="input-error-text">
          {error}
        </p>
      )}

    </div>
  );
}

export default Checkbox;