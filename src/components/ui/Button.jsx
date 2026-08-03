import "./../../styles/ui/button.css";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        "sams-btn",
        `sams-btn-${variant}`,
        `sams-btn-${size}`,
        fullWidth ? "sams-btn-full" : "",
        loading ? "sams-btn-loading" : "",
      ].join(" ")}
    >
      {loading ? (
        <>
          <span className="sams-spinner"></span>
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {icon && <span className="sams-btn-icon">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}

export default Button;