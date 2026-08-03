import "../../styles/ui/select.css";

function Select({
  label,
  value,
  onChange,
  options = [],
  required = false,
}) {
  return (
    <div className="sams-select-group">

      {label && (
        <label className="sams-select-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className="sams-select-wrapper">

        <select
          value={value}
          onChange={onChange}
          className="sams-select"
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

    </div>
  );
}

export default Select;