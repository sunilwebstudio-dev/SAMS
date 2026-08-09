import { agreements } from "../../../data/agreements";
import "./RecentAgreements.css";

function RecentAgreements() {
  return (
    <div className="recent-agreements-card">

      <div className="recent-agreements-header">
        <h2>Recent Agreements</h2>

        <button type="button">
          View All
        </button>
      </div>

      <div className="agreement-table">

        <div className="agreement-table-header">
          <span>ID</span>
          <span>Seller</span>
          <span>Amount</span>
          <span>Till Year</span>
          <span>Status</span>
        </div>

        {agreements.map((agreement) => (
          <div
            className="agreement-table-row"
            key={agreement.id}
          >

            <span>
              {agreement.id}
            </span>

            <span>
              {agreement.sellerName}
            </span>

            <span>
              ₹{agreement.amount.toLocaleString("en-IN")}
            </span>

            <span>
              {agreement.tillYear}
            </span>

            <span>
              <strong
                className={`status-badge ${agreement.status.toLowerCase()}`}
              >
                {agreement.status}
              </strong>
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentAgreements;