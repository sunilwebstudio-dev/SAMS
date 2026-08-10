import "./SecurityCard.css";

function SecurityCard() {
  /*
    API-ready structure.

    Future:
    This data will come from the backend/security API.
  */

  const securityData = {
    score: 98,

    checks: [
      {
        id: "contact-verification",
        label: "Email / Phone Verified",
        status: "verified",
        value: "Verified",
      },
      {
        id: "profile-verification",
        label: "Profile Verified",
        status: "verified",
        value: "Verified",
      },
      {
        id: "offline-login",
        label: "Offline Login",
        status: "enabled",
        value: "Enabled",
      },
      {
        id: "trusted-device",
        label: "Trusted Device",
        status: "yes",
        value: "Yes",
      },
    ],
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "verified":
      case "enabled":
      case "yes":
        return "security-status success";

      case "warning":
        return "security-status warning";

      case "failed":
      case "disabled":
        return "security-status danger";

      default:
        return "security-status neutral";
    }
  };

  return (
    <div className="security-card">

      {/* HEADER */}

      <div className="security-header">

        <div>
          <h3>
            Account Security
          </h3>

          <p>
            Security status of your account
          </p>
        </div>

        <span className="security-score">
          {securityData.score}%
        </span>

      </div>

      {/* SECURITY CHECKS */}

      <div className="security-list">

        {securityData.checks.length > 0 ? (

          securityData.checks.map((item) => (

            <div
              className="security-item"
              key={item.id}
            >

              <span className="security-label">
                {item.label}
              </span>

              <strong
                className={getStatusClass(item.status)}
              >
                {item.status === "verified" && "✔ "}
                {item.status === "enabled" && "● "}
                {item.status === "yes" && "✔ "}

                {item.value}
              </strong>

            </div>

          ))

        ) : (

          <div className="security-empty">
            Security information unavailable.
          </div>

        )}

      </div>

    </div>
  );
}

export default SecurityCard;