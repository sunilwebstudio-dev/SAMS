import "./../../styles/ui/input.css";

function Input({

  label,

  type = "text",

  placeholder,

  icon,

  required = false,

  error,

  ...props

}) {

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

        {icon && (

          <div className="sams-input-icon">

            {icon}

          </div>

        )}

        <input

          type={type}

          placeholder={placeholder}

          className={`sams-input ${icon ? "has-icon" : ""}`}

          {...props}

        />

      </div>

      {error && (

        <p className="input-error-text">

          {error}

        </p>

      )}

    </div>

  );

}

export default Input;