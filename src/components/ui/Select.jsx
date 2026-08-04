import "../../styles/ui/select.css";

function Select({
  label,
  options = [],
  required = false,
  error,
  ...props
}) {
  return (
    <div className="sams-select-group">

      {label && (
        <label className="sams-select-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div
        className={`sams-select-wrapper ${
          error ? "input-error" : ""
        }`}
      >

        <select
          className="sams-select"
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

      </div>

      {error && (
        <p className="input-error-text">
          {error}
        </p>
      )}

    </div>
  );
}

export default Select;