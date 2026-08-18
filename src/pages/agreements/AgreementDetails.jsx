import "./AgreementDetails.css";

function AgreementDetails({
  agreement,
  onBack,
}) {
  if (!agreement) {
    return null;
  }

  /* =========================================
     BASIC INFORMATION
  ========================================= */

  const sellerName =
    agreement.seller_name || "—";

  const buyerName =
    agreement.buyer_name || "—";

  const agreementDate =
    agreement.agreement_date || "—";

  const purchaseYear =
    agreement.purchase_year || "—";

  const validity =
    agreement.validity_years || "—";

  const endingYear =
    agreement.ending_year ||
    (
      agreement.purchase_year &&
      agreement.validity_years
        ? Number(agreement.purchase_year) +
          Number(agreement.validity_years)
        : "—"
    );

  const cuttingYear =
    agreement.cutting_period || "—";


  /* =========================================
     PRICE
  ========================================= */

  const totalPrice =
    agreement.total_bagan_price !== undefined &&
    agreement.total_bagan_price !== null &&
    agreement.total_bagan_price !== ""
      ? Number(
          agreement.total_bagan_price
        ).toLocaleString("en-IN")
      : "—";


  /* =========================================
     TYPE
  ========================================= */

  const agreementType =
    agreement.agreement_type === "SUP"
      ? "Supari Agreement"
      : agreement.agreement_type === "MON"
      ? "Money Agreement"
      : agreement.agreement_type === "LND"
      ? "Land Agreement"
      : agreement.agreement_type === "FRM"
      ? "Farm Agreement"
      : "Other Agreement";


  /* =========================================
     AGREEMENT ID
  ========================================= */

  const agreementCode =
    agreement.agreement_type === "SUP"
      ? "SUP"
      : agreement.agreement_type === "MON"
      ? "MON"
      : agreement.agreement_type === "LND"
      ? "LND"
      : agreement.agreement_type === "FRM"
      ? "FRM"
      : "OTH";

  const agreementId =
    agreement.agreement_id ||
    `${agreementCode}-${purchaseYear}-XXXXXX`;


  /* =========================================
     STATUS
  ========================================= */

  const status =
    agreement.status || "Active";


  /* =========================================
     MODE
  ========================================= */

  const agreementMode =
    agreement.agreement_mode ||
    "New Agreement";


  /* =========================================
     SYSTEM INFORMATION
  ========================================= */

  const createdBy =
    agreement.created_by ||
    buyerName;

  const samsId =
    agreement.sams_id ||
    "SAMS-XXXXXXXX";

  const mobile =
    agreement.mobile ||
    "Will be available after submission";

  const address =
    agreement.address ||
    "Will be available from buyer profile";


  /* =========================================
     WITNESSES
  ========================================= */

  const witness1 =
    agreement.witnesses?.witness_1 || "—";

  const witness2 =
    agreement.witnesses?.witness_2 || "—";

  const witness3 =
    agreement.witnesses?.witness_3 || "—";


  return (
    <div className="agreement-details-page">

      {/* =====================================
          TOP NAVIGATION
      ===================================== */}

      <div className="agreement-details-topbar">

        <button
          type="button"
          className="agreement-details-back"
          onClick={onBack}
        >
          <span>←</span>
          Back
        </button>


        <div className="agreement-details-breadcrumb">
          SAMS
          <span>/</span>
          Agreements
          <span>/</span>
          Details
        </div>

      </div>


      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <header className="agreement-details-header">

        <div className="agreement-details-title-area">

          <div className="agreement-details-document-icon">
            <span>▤</span>
          </div>


          <div>

            <span className="agreement-details-eyebrow">
              AGREEMENT DETAILS
            </span>

            <h1>
              {agreementType}
            </h1>

            <p>
              Review the complete information
              associated with this agreement.
            </p>

          </div>

        </div>


        <div className="agreement-details-header-status">

          <span className="status-dot" />

          {status}

        </div>

      </header>


      {/* =====================================
          AGREEMENT ID HERO
      ===================================== */}

      <section className="agreement-details-identity">

        <div className="identity-main">

          <span>
            AGREEMENT ID
          </span>

          <strong>
            {agreementId}
          </strong>

          <small>
            This identifier is associated with
            this agreement.
          </small>

        </div>


        <div className="identity-side">

          <div>
            <span>
              Agreement Type
            </span>

            <strong>
              {agreementType}
            </strong>
          </div>


          <div>
            <span>
              Status
            </span>

            <strong className="identity-active">
              ● {status}
            </strong>
          </div>

        </div>

      </section>


      {/* =====================================
          INFORMATION GRID
      ===================================== */}

      <div className="agreement-details-content">


        {/* ===================================
            AGREEMENT INFORMATION
        =================================== */}

        <section className="agreement-details-card">

          <div className="agreement-card-heading">

            <div className="agreement-card-icon">
              ◫
            </div>

            <div>

              <span>
                AGREEMENT
              </span>

              <h2>
                Agreement Information
              </h2>

            </div>

          </div>


          <div className="agreement-info-grid">

            <InfoItem
              label="Agreement Date"
              value={agreementDate}
            />

            <InfoItem
              label="Agreement Mode"
              value={agreementMode}
            />

            <InfoItem
              label="Purchase Year"
              value={purchaseYear}
            />

            <InfoItem
              label="Validity"
              value={`${validity} Years`}
            />

            <InfoItem
              label="Ending Year"
              value={endingYear}
              highlight
            />

            <InfoItem
              label="Cutting Year"
              value={cuttingYear}
            />

          </div>

        </section>


        {/* ===================================
            PARTIES
        =================================== */}

        <section className="agreement-details-card">

          <div className="agreement-card-heading">

            <div className="agreement-card-icon">
              ◉
            </div>

            <div>

              <span>
                PARTIES
              </span>

              <h2>
                Seller & Buyer
              </h2>

            </div>

          </div>


          <div className="agreement-party-grid">


            <div className="agreement-party-card">

              <div className="party-avatar seller">
                S
              </div>

              <div className="party-information">

                <span>
                  SELLER
                </span>

                <strong>
                  {sellerName}
                </strong>

              </div>

            </div>


            <div className="agreement-party-card">

              <div className="party-avatar buyer">
                B
              </div>

              <div className="party-information">

                <span>
                  BUYER
                </span>

                <strong>
                  {buyerName}
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================
            AGREEMENT PERIOD
        =================================== */}

        <section className="agreement-details-card">

          <div className="agreement-card-heading">

            <div className="agreement-card-icon">
              ◷
            </div>

            <div>

              <span>
                VALIDITY
              </span>

              <h2>
                Agreement Period
              </h2>

            </div>

          </div>


          <div className="agreement-timeline">

            <TimelineItem
              label="Purchase Year"
              value={purchaseYear}
              first
            />

            <div className="timeline-line">
              <span />
            </div>

            <TimelineItem
              label="Ending Year"
              value={endingYear}
            />

            <div className="timeline-line">
              <span />
            </div>

            <TimelineItem
              label="Cutting Year"
              value={cuttingYear}
              last
            />

          </div>


          <div className="cutting-period-note">

            <strong>
              कटाई की अवधि
            </strong>

            <span>
              वर्ष {purchaseYear} से वर्ष{" "}
              {endingYear} तक
            </span>

            <p>
              इस अवधि के दौरान बागान की कटाई
              एवं फल लेने का अधिकार क्रेता के
              पास रहेगा।
            </p>

          </div>

        </section>


        {/* ===================================
            FINANCIAL
        =================================== */}

        <section className="agreement-details-card">

          <div className="agreement-card-heading">

            <div className="agreement-card-icon">
              ₹
            </div>

            <div>

              <span>
                FINANCIAL
              </span>

              <h2>
                Agreement Value
              </h2>

            </div>

          </div>


          <div className="agreement-price-card">

            <div>

              <span>
                Total Bagan Price
              </span>

              <p>
                Agreed agreement value
              </p>

            </div>

            <strong>
              ₹ {totalPrice}
            </strong>

          </div>

        </section>


        {/* ===================================
            WITNESSES
        =================================== */}

        <section className="agreement-details-card">

          <div className="agreement-card-heading">

            <div className="agreement-card-icon">
              ✓
            </div>

            <div>

              <span>
                WITNESSES
              </span>

              <h2>
                Agreement Witnesses
              </h2>

            </div>

          </div>


          <div className="agreement-witness-grid">

            <Witness
              number="01"
              name={witness1}
            />

            <Witness
              number="02"
              name={witness2}
            />

            <Witness
              number="03"
              name={witness3}
            />

          </div>

        </section>


        {/* ===================================
            SYSTEM INFORMATION
        =================================== */}

        <section className="agreement-details-card">

          <div className="agreement-card-heading">

            <div className="agreement-card-icon">
              ◈
            </div>

            <div>

              <span>
                SAMS SYSTEM
              </span>

              <h2>
                System Information
              </h2>

            </div>

          </div>


          <div className="agreement-system-grid">

            <InfoItem
              label="Created By"
              value={createdBy}
            />

            <InfoItem
              label="SAMS ID"
              value={samsId}
            />

            <InfoItem
              label="Mobile"
              value={mobile}
            />

            <InfoItem
              label="Address"
              value={address}
            />

          </div>

        </section>


        {/* ===================================
            ACTION AREA
        =================================== */}

        <section className="agreement-details-actions">

          <div className="agreement-action-intro">

            <span>
              AGREEMENT ACTIONS
            </span>

            <h2>
              Manage this agreement
            </h2>

            <p>
              Additional agreement tools will
              be available here.
            </p>

          </div>


          <div className="agreement-action-buttons">

            <button
              type="button"
              className="agreement-action-button secondary"
              onClick={() => {
                console.log(
                  "Download PDF:",
                  agreement
                );
              }}
            >
              <span>
                ↓
              </span>

              Download PDF
            </button>


            <button
              type="button"
              className="agreement-action-button secondary"
              onClick={() => {
                console.log(
                  "Show QR:",
                  agreement
                );
              }}
            >
              <span>
                ◫
              </span>

              Show QR
            </button>


            <button
              type="button"
              className="agreement-action-button primary"
              onClick={() => {
                console.log(
                  "Verify Agreement:",
                  agreement
                );
              }}
            >
              <span>
                ✓
              </span>

              Verify Agreement
            </button>

          </div>

        </section>

      </div>

    </div>
  );
}


/* =========================================
   INFO ITEM
========================================= */

function InfoItem({
  label,
  value,
  highlight = false,
}) {
  return (
    <div
      className={`
        agreement-info-item
        ${highlight ? "highlight" : ""}
      `}
    >

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


/* =========================================
   TIMELINE ITEM
========================================= */

function TimelineItem({
  label,
  value,
  first = false,
  last = false,
}) {
  return (
    <div
      className={`
        agreement-timeline-item
        ${first ? "first" : ""}
        ${last ? "last" : ""}
      `}
    >

      <div className="timeline-dot">
        <span />
      </div>

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


/* =========================================
   WITNESS
========================================= */

function Witness({
  number,
  name,
}) {
  return (
    <div className="agreement-witness-card">

      <div className="witness-number">
        {number}
      </div>

      <div>

        <span>
          Witness
        </span>

        <strong>
          {name}
        </strong>

      </div>

    </div>
  );
}


export default AgreementDetails;