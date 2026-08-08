import "./SecurityCard.css";

function SecurityCard() {

  return (

    <div className="security-card">

      <div className="security-header">

        <h3>Account Security</h3>

        <span className="security-score">
          98%
        </span>

      </div>

      <div className="security-item">

        <span>Email Verified</span>

        <strong className="success">✔ Verified</strong>

      </div>

      <div className="security-item">

        <span>Phone Verified</span>

        <strong className="success">✔ Verified</strong>

      </div>

      <div className="security-item">

        <span>Offline Login</span>

        <strong className="success">Enabled</strong>

      </div>

      <div className="security-item">

        <span>Trusted Device</span>

        <strong className="success">Yes</strong>

      </div>

    </div>

  );

}

export default SecurityCard;