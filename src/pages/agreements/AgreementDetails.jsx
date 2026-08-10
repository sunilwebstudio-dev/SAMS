import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import "./AgreementDetails.css";

function AgreementDetails() {
  const navigate = useNavigate();
  const { agreementId } = useParams();

  /*
    Backend-ready structure.

    Future flow:

    agreementId
        ↓
    Backend API
        ↓
    Supabase / PostgreSQL
        ↓
    Agreement details
  */

  const agreement = null;

  if (!agreement) {
    return (
      <DashboardLayout>

        <div className="agreement-details-page">

          {/* HEADER */}

          <div className="agreement-details-header">

            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/agreements")}
            >
              ← Back to Agreements
            </button>

          </div>

          {/* EMPTY / LOADING READY STATE */}

          <div className="agreement-details-empty">

            <div className="agreement-details-empty-icon">
              📄
            </div>

            <h2>
              Agreement details unavailable
            </h2>

            <p>
              The agreement could not be loaded.
              Please try again later.
            </p>

            {agreementId && (
              <small>
                Agreement ID: {agreementId}
              </small>
            )}

            <button
              type="button"
              className="back-to-agreements-btn"
              onClick={() => navigate("/agreements")}
            >
              Back to Agreements
            </button>

          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="agreement-details-page">

        {/* PAGE HEADER */}

        <div className="agreement-details-header">

          <div>

            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/agreements")}
            >
              ← Back to Agreements
            </button>

            <div className="agreement-title-row">

              <div>
                <h1>
                  {agreement.agreement_no}
                </h1>

                <p>
                  {agreement.title}
                </p>
              </div>

              <span
                className={`agreement-detail-status ${agreement.status}`}
              >
                {agreement.status}
              </span>

            </div>

          </div>

          <div className="agreement-actions">

            <button
              type="button"
              className="secondary-action-btn"
              onClick={() =>
                navigate(
                  `/agreements/${agreement.id}/edit`
                )
              }
            >
              Edit
            </button>

          </div>

        </div>

        {/* SUMMARY */}

        <section className="agreement-detail-card">

          <div className="agreement-card-heading">

            <div>
              <h2>
                Agreement Summary
              </h2>

              <p>
                Basic information about this agreement.
              </p>
            </div>

          </div>

          <div className="agreement-summary-grid">

            <div className="agreement-detail-item">
              <span>Agreement Type</span>
              <strong>
                {agreement.agreement_type}
              </strong>
            </div>

            <div className="agreement-detail-item">
              <span>Total Amount</span>
              <strong>
                ₹
                {Number(
                  agreement.total_value
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="agreement-detail-item">
              <span>Start Date</span>
              <strong>
                {agreement.start_date}
              </strong>
            </div>

            <div className="agreement-detail-item">
              <span>End Date</span>
              <strong>
                {agreement.end_date}
              </strong>
            </div>

            <div className="agreement-detail-item">
              <span>Created Date</span>
              <strong>
                {agreement.created_at}
              </strong>
            </div>

            <div className="agreement-detail-item">
              <span>Agreement ID</span>
              <strong>
                {agreement.id}
              </strong>
            </div>

          </div>

        </section>

        {/* SELLER */}

        <section className="agreement-detail-card">

          <div className="agreement-card-heading">

            <div>
              <h2>
                Seller Information
              </h2>

              <p>
                Information about the seller associated
                with this agreement.
              </p>
            </div>

          </div>

          <div className="seller-detail-grid">

            <div className="agreement-detail-item">
              <span>Seller Name</span>
              <strong>
                {agreement.seller_name}
              </strong>
            </div>

            <div className="agreement-detail-item">
              <span>Seller ID</span>
              <strong>
                {agreement.seller_id}
              </strong>
            </div>

            <div className="agreement-detail-item">
              <span>Father / Guardian</span>
              <strong>
                {agreement.father_name}
              </strong>
            </div>

            <div className="agreement-detail-item">
              <span>Village</span>
              <strong>
                {agreement.village}
              </strong>
            </div>

            <div className="agreement-detail-item seller-address">
              <span>Address</span>
              <strong>
                {agreement.address}
              </strong>
            </div>

          </div>

        </section>

        {/* TIMELINE */}

        <section className="agreement-detail-card">

          <div className="agreement-card-heading">

            <div>
              <h2>
                Agreement Timeline
              </h2>

              <p>
                Important events related to this agreement.
              </p>
            </div>

          </div>

          <div className="agreement-timeline-placeholder">

            <div className="timeline-placeholder-icon">
              🕒
            </div>

            <strong>
              Timeline will appear here
            </strong>

            <p>
              Agreement activity will be displayed
              after the agreement data is available.
            </p>

          </div>

        </section>

        {/* ATTACHMENTS */}

        <section className="agreement-detail-card">

          <div className="agreement-card-heading">

            <div>
              <h2>
                Attachments
              </h2>

              <p>
                Documents and files associated with
                this agreement.
              </p>
            </div>

          </div>

          <div className="agreement-attachments-placeholder">

            <span>
              📎
            </span>

            <strong>
              No attachments available
            </strong>

            <p>
              Uploaded agreement documents will appear here.
            </p>

          </div>

        </section>

      </div>

    </DashboardLayout>
  );
}

export default AgreementDetails;    