import { useState } from "react";
import "./AgreementSuccess.css";

function AgreementSuccess({
  agreement,
  onDownload,
  onDone,
}) {
  const [action, setAction] = useState(null);

  const agreementId =
    agreement?.agreement_id ||
    agreement?.sams_agreement_id ||
    "SAMS-XXXXXX";

  const agreementType =
    agreement?.agreement_type === "SUP"
      ? "Supari Agreement"
      : agreement?.agreement_type === "MON"
      ? "Money Agreement"
      : agreement?.agreement_type === "LND"
      ? "Land Agreement"
      : agreement?.agreement_type === "FRM"
      ? "Farm Agreement"
      : "Other Agreement";

  const buyerName =
    agreement?.buyer_name ||
    "Buyer";

  const sellerName =
    agreement?.seller_name ||
    "Seller";


  /* =========================================
     DOWNLOAD PDF
  ========================================= */

  const handleDownload = async () => {
    if (action) return;

    setAction("download");

    /*
     * Premium PDF preparation animation.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    try {
      await onDownload?.(agreement);
    } catch (error) {
      console.error(
        "PDF download failed:",
        error
      );
    }

    setAction(null);
  };


  /* =========================================
     DONE
  ========================================= */

  const handleDone = async () => {
    if (action) return;

    setAction("done");

    /*
     * Short premium completion animation.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 900)
    );

    onDone?.();

    setAction(null);
  };


  return (
    <div className="agreement-success-page">

      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="success-bg-orb success-bg-orb-one" />
      <div className="success-bg-orb success-bg-orb-two" />


      {/* =====================================
          MAIN CARD
      ===================================== */}

      <main className="agreement-success-card">


        {/* ===================================
            SUCCESS ORBIT
        =================================== */}

        <div className="success-orbit-system">

          <div className="success-orbit-ring ring-one" />

          <div className="success-orbit-ring ring-two" />

          <div className="success-orbit-ring ring-three" />

          <span className="success-orbit-particle particle-one" />

          <span className="success-orbit-particle particle-two" />

          <span className="success-orbit-particle particle-three" />

          <div className="success-core">

            <span className="success-check">
              ✓
            </span>

          </div>

        </div>


        {/* ===================================
            SUCCESS TEXT
        =================================== */}

        <div className="success-heading">

          <span className="success-eyebrow">
            SAMS • AGREEMENT SECURED
          </span>

          <h1>
            Agreement Created Successfully
          </h1>

          <p>
            Your agreement has been successfully
            created and securely processed.
          </p>

        </div>


        {/* ===================================
            AGREEMENT INFORMATION
        =================================== */}

        <div className="success-agreement-info">

          <div className="success-info-item">

            <span>
              Agreement ID
            </span>

            <strong>
              {agreementId}
            </strong>

          </div>


          <div className="success-info-divider" />


          <div className="success-info-item">

            <span>
              Agreement Type
            </span>

            <strong>
              {agreementType}
            </strong>

          </div>

        </div>


        {/* ===================================
            PEOPLE
        =================================== */}

        <div className="success-parties">

          <div className="success-party">

            <span>
              Buyer
            </span>

            <strong>
              {buyerName}
            </strong>

          </div>


          <div className="success-party-divider" />


          <div className="success-party">

            <span>
              Seller
            </span>

            <strong>
              {sellerName}
            </strong>

          </div>

        </div>


        {/* ===================================
            ACTIONS
        =================================== */}

        <div className="success-actions">


          {/* =================================
              DOWNLOAD PDF
          ================================= */}

          <button
            type="button"
            className="success-action-button download-button"
            onClick={handleDownload}
            disabled={Boolean(action)}
          >

            <span className="success-action-icon">

              {action === "download" ? (
                <span className="success-small-spinner" />
              ) : (
                "↓"
              )}

            </span>


            <span className="success-action-text">

              <strong>

                {action === "download"
                  ? "Preparing PDF..."
                  : "Download PDF"}

              </strong>

              <small>

                {action === "download"
                  ? "Securing your agreement"
                  : "Download the final agreement"}

              </small>

            </span>


            {action === "download" && (

              <span className="success-action-progress">

                <span />

              </span>

            )}

          </button>


          {/* =================================
              DONE
          ================================= */}

          <button
            type="button"
            className="success-action-button done-button"
            onClick={handleDone}
            disabled={Boolean(action)}
          >

            <span className="success-action-icon">

              {action === "done" ? (
                <span className="success-small-spinner light" />
              ) : (
                "✓"
              )}

            </span>


            <span className="success-action-text">

              <strong>

                {action === "done"
                  ? "Finishing..."
                  : "Done"}

              </strong>

              <small>

                {action === "done"
                  ? "Preparing a fresh agreement"
                  : "Finish and create another agreement"}

              </small>

            </span>

          </button>

        </div>


        {/* ===================================
            SECURITY NOTE
        =================================== */}

        <div className="success-security">

          <span className="security-icon">
            🔒
          </span>

          <p>
            This agreement has been securely
            processed by SAMS.
          </p>

        </div>

      </main>


      {/* =====================================
          DOWNLOAD PROCESSING OVERLAY
      ===================================== */}

      {action === "download" && (

        <div className="success-action-overlay">

          <div className="success-processing-card">

            <div className="processing-document-orbit">

              <div className="processing-orbit orbit-one" />

              <div className="processing-orbit orbit-two" />

              <div className="processing-document">

                <span className="document-line line-one" />
                <span className="document-line line-two" />
                <span className="document-line line-three" />

                <span className="document-download-arrow">
                  ↓
                </span>

              </div>

            </div>


            <span className="processing-eyebrow">
              SAMS • SECURE DOCUMENT
            </span>

            <h2>
              Preparing PDF
            </h2>

            <p>
              Your final agreement is being
              securely prepared for download.
            </p>


            <div className="processing-progress">

              <span />

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          DONE PROCESSING OVERLAY
      ===================================== */}

      {action === "done" && (

        <div className="success-action-overlay">

          <div className="success-processing-card done-processing-card">

            <div className="done-animation">

              <div className="done-circle">

                <span>
                  ✓
                </span>

              </div>

              <div className="done-ripple ripple-one" />

              <div className="done-ripple ripple-two" />

            </div>


            <span className="processing-eyebrow">
              SAMS • COMPLETE
            </span>

            <h2>
              Agreement Saved
            </h2>

            <p>
              The agreement is complete.
              Preparing a fresh agreement form.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default AgreementSuccess;