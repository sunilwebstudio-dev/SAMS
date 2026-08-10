import { NavLink } from "react-router-dom";
import { agreements } from "../../../data/agreements";
import "./RecentAgreements.css";

function RecentAgreements() {
  return (
    <div className="recent-agreements-card">

      {/* HEADER */}

      <div className="recent-agreements-header">

        <div>
          <h2>Recent Agreements</h2>

          <p>
            Your latest agreement activity
          </p>
        </div>

        <NavLink
          to="/agreements"
          className="recent-agreements-view-all"
        >
          View All
        </NavLink>

      </div>

      {/* TABLE */}

      <div className="agreement-table-wrapper">

        <div className="agreement-table">

          {/* TABLE HEADER */}

          <div className="agreement-table-header">

            <span>Agreement ID</span>

            <span>Seller Name</span>

            <span>Amount</span>

            <span>Till Year</span>

            <span>Status</span>

          </div>

          {/* TABLE DATA */}

          {agreements.length > 0 ? (

            agreements.map((agreement) => (

              <div
                className="agreement-table-row"
                key={agreement.id}
              >

                <span className="agreement-id">
                  {agreement.id}
                </span>

                <span className="agreement-seller">
                  {agreement.sellerName}
                </span>

                <span className="agreement-amount">
                  ₹{Number(agreement.amount).toLocaleString("en-IN")}
                </span>

                <span className="agreement-year">
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

            ))

          ) : (

            <div className="agreements-empty-state">

              <div className="empty-icon">
                📄
              </div>

              <strong>
                No agreements found
              </strong>

              <p>
                Your recent agreements will appear here.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default RecentAgreements;