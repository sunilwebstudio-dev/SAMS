import { useState } from "react";
import "./AgreementSuccess.css";

function AgreementSuccess({
  agreement,
  onDownload,
  onPreview,
  onDone,
}) {
  const [action, setAction] = useState(null);

  const agreementId =
    agreement?.agreement_id ||
    "Agreement ID";

  const runAction = async (type, callback) => {
    if (action) return;

    setAction(type);

    await new Promise((resolve) =>
      setTimeout(resolve, 1100)
    );

    callback?.();

    setAction(null);
  };

  return (
    <div className="agreement-success-page">

      <div className="success-glow glow-one" />
      <div className="success-glow glow-two" />

      <div className="agreement-success-card">

        {/* SUCCESS ORBIT */}

        <div className="success-orbit-system">

          <div className="success-orbit orbit-a" />
          <div className="success-orbit orbit-b" />

          <div className="success-orbit-dot dot-a" />
          <div className="success-orbit-dot dot-b" />

          <div className="success-core">
            <span>✓</span>
          </div>

        </div>


        {/* SUCCESS TEXT */}

        <span className="success-eyebrow">
          SAMS • AGREEMENT SECURED
        </span>

        <h1>
          Agreement Created Successfully
        </h1>

        <p className="success-description">
          आपका agreement successfully create
          और securely saved हो गया है।
        </p>


        {/* AGREEMENT ID */}

        <div className="success-agreement-id">

          <span>
            Agreement ID
          </span>

          <strong>
            {agreementId}
          </strong>

        </div>


        {/* ACTIONS */}

        <div className="success-actions">

          {/* DOWNLOAD */}

          <button
            type="button"
            className="success-action download-action"
            disabled={Boolean(action)}
            onClick={() =>
              runAction(
                "download",
                onDownload
              )
            }
          >

            <span className="success-action-icon">
              {action === "download"
                ? "◌"
                : "↓"}
            </span>

            <span className="success-action-content">

              <strong>
                {action === "download"
                  ? "Preparing PDF..."
                  : "Download PDF"}
              </strong>

              <small>
                {action === "download"
                  ? "Securing document"
                  : "Save agreement as PDF"}
              </small>

            </span>

            {action === "download" && (
              <span className="action-loader" />
            )}

          </button>


          {/* PREVIEW */}

          <button
            type="button"
            className="success-action"
            disabled={Boolean(action)}
            onClick={() =>
              runAction(
                "preview",
                onPreview
              )
            }
          >

            <span className="success-action-icon">
              {action === "preview"
                ? "◌"
                : "◉"}
            </span>

            <span className="success-action-content">

              <strong>
                {action === "preview"
                  ? "Opening Agreement..."
                  : "Preview Agreement"}
              </strong>

              <small>
                {action === "preview"
                  ? "Preparing document view"
                  : "View final agreement"}
              </small>

            </span>

            {action === "preview" && (
              <span className="action-loader" />
            )}

          </button>


          {/* DONE */}

          <button
            type="button"
            className="success-action done-action"
            disabled={Boolean(action)}
            onClick={() =>
              runAction(
                "done",
                onDone
              )
            }
          >

            <span className="success-action-icon">
              {action === "done"
                ? "◌"
                : "✓"}
            </span>

            <span className="success-action-content">

              <strong>
                {action === "done"
                  ? "Saving..."
                  : "Done"}
              </strong>

              <small>
                {action === "done"
                  ? "Finishing agreement"
                  : "Create another agreement"}
              </small>

            </span>

            {action === "done" && (
              <span className="action-loader" />
            )}

          </button>

        </div>


        {/* SECURITY */}

        <div className="success-security">

          <span>
            🔒
          </span>

          <p>
            Your agreement has been securely
            processed by SAMS.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AgreementSuccess;