import "../../styles/ui/checkbox.css";

function Checkbox({
  label,
  checked,
  onChange,
  required = false,
}) {
  return (
    <label className="sams-checkbox">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <span className="sams-checkmark"></span>

      <span className="sams-checkbox-label">
        {label}
        {required && <span className="required">*</span>}
      </span>

    </label>
  );
}

export default Checkbox;