import { useEffect, useState } from "react";
import "./AgreementPreview.css";

function AgreementPreview({
  agreement,
  buyerName = "",
  onEdit,
  onSubmit,
  submitting = false,
}) {
  const [showSubmitConfirm, setShowSubmitConfirm] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [isCreating, setIsCreating] =
    useState(false);


  if (!agreement) {
    return null;
  }


  /* =========================================
     BASIC VALUES
  ========================================= */

  const sellerName =
    agreement.seller_name ||
    "____________________";

  const buyer =
    buyerName ||
    agreement.buyer_name ||
    "____________________";

  const agreementDate =
    agreement.agreement_date ||
    "____________________";

  const purchaseYear =
    agreement.purchase_year ||
    "____________________";

  const validity =
    agreement.validity_years ||
    "____________________";

  const endingYear =
    agreement.ending_year ||
    (
      agreement.purchase_year &&
      agreement.validity_years
        ? Number(agreement.purchase_year) +
          Number(agreement.validity_years)
        : "____________________"
    );

  const totalPrice =
    agreement.total_bagan_price !== undefined &&
    agreement.total_bagan_price !== null &&
    agreement.total_bagan_price !== ""
      ? Number(
          agreement.total_bagan_price
        ).toLocaleString("en-IN")
      : "____________________";

  const cuttingPeriod =
    agreement.cutting_period ||
    "____________________";

  const witness1 =
    agreement.witnesses?.witness_1 ||
    "____________________";

  const witness2 =
    agreement.witnesses?.witness_2 ||
    "____________________";

  const witness3 =
    agreement.witnesses?.witness_3 ||
    "____________________";


  /* =========================================
     AGREEMENT CODE
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


  const previewAgreementId =
    agreement.agreement_id ||
    `${agreementCode}-${purchaseYear}-XXXXXX`;


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
     MODE
  ========================================= */

  const agreementMode =
    agreement.agreement_mode ||
    "New Agreement";


  /* =========================================
     STATUS
  ========================================= */

  const agreementStatus =
    agreement.status ||
    "Pending";


  /* =========================================
     BUYER INFORMATION
  ========================================= */

  const createdBy =
    agreement.created_by ||
    buyer;

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
     CONFIRM SUBMISSION
  ========================================= */

  const handleConfirmSubmit = () => {

    if (isCreating || submitting) {
      return;
    }

    setIsCreating(true);

    /*
      Fake processing animation for prototype.
      Later this will be replaced by backend API.
    */

    setTimeout(() => {

      setIsCreating(false);

      setShowSubmitConfirm(false);

      setShowSuccess(true);

    }, 1800);
  };


  /* =========================================
     FINAL DONE
  ========================================= */

  const handleDone = () => {

    setShowSuccess(false);

    /*
      Parent will now clear the old draft
      and open a completely fresh form.
    */

    onSubmit?.();
  };


  return (
    <div className="agreement-preview-page">


      {/* =====================================
          PREVIEW HEADER
      ===================================== */}

      <div className="agreement-preview-topbar">

        <div>

          <span className="agreement-preview-eyebrow">
            SAMS • Agreement Preview
          </span>

          <h2>
            Review Agreement
          </h2>

          <p>
            Check the agreement carefully before
            submitting it.
          </p>

        </div>


        <div className="agreement-preview-actions">

          <button
            type="button"
            className="preview-edit-button"
            onClick={onEdit}
            disabled={
              submitting ||
              isCreating
            }
          >
            ← Edit
          </button>


          <button
            type="button"
            className="preview-submit-button"
            onClick={() =>
              setShowSubmitConfirm(true)
            }
            disabled={
              submitting ||
              isCreating
            }
          >

            Submit Agreement

            <span>
              →
            </span>

          </button>

        </div>

      </div>


      {/* =====================================
          A4 DOCUMENT
      ===================================== */}

      <div className="agreement-preview-wrapper">

        <article className="agreement-a4-page">


          {/* DOCUMENT TITLE */}

          <header className="agreement-document-header">

            <h1>
              सुपारी बागान बिक्री एग्रीमेंट
            </h1>

          </header>


          {/* TWO COLUMN INFORMATION */}

          <section className="agreement-document-meta">

            <div className="agreement-meta-column">

              <div className="agreement-meta-row">

                <span>
                  Agreement ID
                </span>

                <strong>
                  {previewAgreementId}
                </strong>

              </div>


              <div className="agreement-meta-row">

                <span>
                  Agreement Type
                </span>

                <strong>
                  {agreementType}
                </strong>

              </div>


              <div className="agreement-meta-row">

                <span>
                  Agreement Status
                </span>

                <strong
                  className={`agreement-meta-status ${agreementStatus.toLowerCase()}`}
                >
                  {agreementStatus}
                </strong>

              </div>


              <div className="agreement-meta-row">

                <span>
                  Address
                </span>

                <strong>
                  {address}
                </strong>

              </div>

            </div>


            <div className="agreement-meta-column">

              <div className="agreement-meta-row">

                <span>
                  Created By
                </span>

                <strong>
                  {createdBy}
                </strong>

              </div>


              <div className="agreement-meta-row">

                <span>
                  SAMS ID
                </span>

                <strong>
                  {samsId}
                </strong>

              </div>


              <div className="agreement-meta-row">

                <span>
                  Mobile
                </span>

                <strong>
                  {mobile}
                </strong>

              </div>


              <div className="agreement-meta-row">

                <span>
                  Agreement Mode
                </span>

                <strong>
                  {agreementMode}
                </strong>

              </div>

            </div>

          </section>


          {/* DOCUMENT BODY */}

          <div className="agreement-document-body">

            <p>
              आज दिनांक:{" "}
              <span className="agreement-filled-value">
                {agreementDate}
              </span>
            </p>


            <p>
              मैं, श्री{" "}
              <span className="agreement-filled-value">
                {sellerName}
              </span>
              , अपने पूरे होश-हवास में यह लिखित
              एग्रीमेंट कर रहा हूँ कि: मैं सुपारी
              बागान श्री{" "}
              <span className="agreement-filled-value">
                {buyer}
              </span>
              को पूरे परिवार की सहमति से बिक्री कर
              रहा हूँ।
            </p>


            <p>
              इस बागान में मौजूद सभी छोटे-बड़े पेड़,
              फल-फूल का अधिकार वर्ष{" "}
              <span className="agreement-filled-value">
                {purchaseYear}
              </span>
              से लेकर वर्ष{" "}
              <span className="agreement-filled-value">
                {endingYear}
              </span>
              तक, अर्थात कुल{" "}
              <span className="agreement-filled-value">
                {validity}
              </span>
              साल तक श्री{" "}
              <span className="agreement-filled-value">
                {buyer}
              </span>
              के पास रहेगा।
            </p>


            <p>
              अगर इस बीच किसी तरह का विवाद, परेशानी
              या बागान को लेकर कोई तीसरा व्यक्ति दावा
              करता है, तो उसकी पूरी जिम्मेदारी मेरी
              होगी।
            </p>


            <p>
              उस स्थिति में हुए किसी भी नुकसान की
              भरपाई मैं स्वयं या मेरा परिवार मिलकर
              करेगा।
            </p>


            <p>
              बागान की कुल कीमत:{" "}
              <span className="agreement-filled-value">
                ₹ {totalPrice}
              </span>
            </p>


            <p>
              कटाई की अवधि:{" "}
              <span className="agreement-filled-value">
                {cuttingPeriod}
              </span>{" "}
              (साल से लेकर फल काटने तक का समय तय
              हुआ है)
            </p>


            <p>
              जब बागान काटने का समय आएगा, तो उस वक्त
              किसी प्रकार का झगड़ा या विवाद नहीं होगा।
              यदि किसी कारणवश कोई झगड़ा होता है, तो
              उसका समाधान हमारी पारिवारिक जिम्मेदारी
              होगी और नुकसान की भरपाई हमें खुद करनी
              होगी।
            </p>


            <p>
              यह समझौता दोनों पक्षों की पूर्णसहमति
              से, बिना किसी दबाव, जबरदस्ती या लालच के
              किया गया है।
            </p>


            {/* TERMS */}

            <section className="agreement-terms-section">

              <h3>
                नियम एवं शर्तें
              </h3>

              <p>
                इस Master Agreement में निर्धारित
                सभी नियम एवं शर्तें दोनों पक्षों पर
                लागू होंगी।
              </p>

              <p>
                किसी भी बदलाव या अतिरिक्त शर्त के
                लिए दोनों पक्षों की सहमति आवश्यक
                होगी।
              </p>

            </section>


            {/* WITNESSES */}

            <section className="agreement-witness-section">

              <h3>
                गवाह
              </h3>

              <div className="agreement-witness-list">

                <p>
                  1.{" "}
                  <span className="agreement-filled-value">
                    {witness1}
                  </span>
                </p>

                <p>
                  2.{" "}
                  <span className="agreement-filled-value">
                    {witness2}
                  </span>
                </p>

                <p>
                  3.{" "}
                  <span className="agreement-filled-value">
                    {witness3}
                  </span>
                </p>

              </div>

            </section>


            {/* SIGNATURES */}

            <section className="agreement-signature-section">

              <div className="agreement-signature-box">

                <h3>
                  विक्रि करनेवाला
                </h3>

                <div className="signature-space" />

                <p>
                  हस्ताक्षर:{" "}
                  <span className="signature-line">
                    ____________________
                  </span>
                </p>

                <p>
                  नाम: श्री{" "}
                  <strong>
                    {sellerName}
                  </strong>
                </p>

              </div>


              <div className="agreement-signature-box">

                <h3>
                  क्रेता
                </h3>

                <div className="signature-space" />

                <p>
                  हस्ताक्षर:{" "}
                  <span className="signature-line">
                    ____________________
                  </span>
                </p>

                <p>
                  नाम: श्री{" "}
                  <strong>
                    {buyer}
                  </strong>
                </p>

              </div>

            </section>

          </div>


          {/* DOCUMENT FOOTER */}

          <footer className="agreement-document-footer">

            <div className="agreement-footer-info">

              <strong>
                SAMS
              </strong>

              <span>
                Agreement Management System
              </span>

              <small>
                This document will receive its
                official Agreement ID after submission.
              </small>

            </div>


            <div className="agreement-qr-placeholder">

              <div>
                QR
              </div>

              <span>
                Verification
              </span>

            </div>

          </footer>

        </article>

      </div>


      {/* =====================================
          CONFIRMATION MODAL
      ===================================== */}

      {showSubmitConfirm && (

        <div
          className="agreement-submit-overlay"
          onClick={() => {

            if (!isCreating) {
              setShowSubmitConfirm(false);
            }

          }}
        >

          <div
            className="agreement-submit-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {!isCreating ? (

              <>

                <div className="agreement-submit-icon">
                  ?
                </div>


                <h3>
                  Submit Agreement?
                </h3>


                <p>
                  Please review the agreement once
                  before submitting. After submission,
                  this agreement will be processed
                  by SAMS.
                </p>


                <div className="agreement-submit-summary">

                  <div>

                    <span>
                      Agreement
                    </span>

                    <strong>
                      {previewAgreementId}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Type
                    </span>

                    <strong>
                      {agreementType}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Seller
                    </span>

                    <strong>
                      {sellerName}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Buyer
                    </span>

                    <strong>
                      {buyer}
                    </strong>

                  </div>

                </div>


                <div className="agreement-submit-modal-actions">

                  <button
                    type="button"
                    className="agreement-modal-edit"
                    onClick={() =>
                      setShowSubmitConfirm(false)
                    }
                  >
                    ← Go Back & Edit
                  </button>


                  <button
                    type="button"
                    className="agreement-modal-confirm"
                    onClick={handleConfirmSubmit}
                  >
                    Confirm & Submit
                    <span>
                      →
                    </span>
                  </button>

                </div>

              </>

            ) : (

              <div className="agreement-creating-state">

                <div className="creating-spinner">

                  <div className="creating-spinner-ring" />

                  <span>
                    ✓
                  </span>

                </div>


                <span className="creating-label">
                  SAMS
                </span>


                <h3>
                  Creating Agreement
                </h3>


                <p>
                  Please wait while we securely
                  prepare your agreement.
                </p>


                <div className="creating-progress">

                  <span />

                </div>


                <small>
                  Verifying agreement information...
                </small>

              </div>

            )}

          </div>

        </div>

      )}


      {/* =====================================
          SUCCESS SCREEN
      ===================================== */}

      {showSuccess && (

        <div className="agreement-success-overlay">

          <div className="agreement-success-card">

            <div className="agreement-success-icon">
              ✓
            </div>


            <span className="agreement-success-label">
              AGREEMENT CREATED
            </span>


            <h2>
              Agreement Created Successfully
            </h2>


            <p>
              Your agreement has been prepared
              successfully.
            </p>


            <div className="agreement-success-details">

              <div>

                <span>
                  Agreement ID
                </span>

                <strong>
                  {previewAgreementId}
                </strong>

              </div>


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
                  Seller
                </span>

                <strong>
                  {sellerName}
                </strong>

              </div>


              <div>

                <span>
                  Buyer
                </span>

                <strong>
                  {buyer}
                </strong>

              </div>


              <div>

                <span>
                  Status
                </span>

                <strong className="success-status">
                  Active
                </strong>

              </div>

            </div>


            <div className="agreement-success-actions">

              <button
                type="button"
                className="success-secondary-button"
                onClick={() => {
                  console.log(
                    "View Agreement:",
                    agreement
                  );
                }}
              >
                View Agreement
              </button>


              <button
                type="button"
                className="success-primary-button"
                onClick={() => {
                  console.log(
                    "Download PDF:",
                    agreement
                  );
                }}
              >
                Download PDF
              </button>

            </div>


            <button
              type="button"
              className="success-done-button"
              onClick={handleDone}
            >
              Done
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AgreementPreview;