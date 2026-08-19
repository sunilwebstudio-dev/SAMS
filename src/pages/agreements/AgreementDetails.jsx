import "./AgreementDetails.css";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import VerifyAgreement from "../../pages/agreements/VerifyAgreement";

function AgreementDetails({
  agreement,
  onBack,
}) {
  /* =========================================
     STATES
  ========================================= */

  const [isGeneratingPdf, setIsGeneratingPdf] =
    useState(false);

  const [pdfSuccess, setPdfSuccess] =
    useState(false);

    const [showVerification, setShowVerification] =
  useState(false);


  /* =========================================
     SAFETY CHECK
  ========================================= */

  if (showVerification) {
  return (
    <VerifyAgreement
      agreement={agreement}
      onBack={() => {
        setShowVerification(false);
      }}
    />
  );
}

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
     AGREEMENT TYPE
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


  /* =========================================
     AGREEMENT ID
  ========================================= */

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


  /* =========================================
     CUTTING PERIOD TEXT
  ========================================= */

  const cuttingPeriodText =
    purchaseYear !== "—" &&
    endingYear !== "—"
      ? `वर्ष ${purchaseYear} से वर्ष ${endingYear} तक`
      : "—";


  /* =========================================
     DOWNLOAD PDF
  ========================================= */

  const handleDownloadPDF = async () => {
    if (isGeneratingPdf) {
      return;
    }

    try {
      setIsGeneratingPdf(true);
      setPdfSuccess(false);

      /*
        Wait one frame so the hidden PDF
        template is completely rendered.
      */
      await new Promise((resolve) => {
        requestAnimationFrame(resolve);
      });

      const pdfElement =
        document.getElementById(
          "sams-agreement-pdf"
        );

      if (!pdfElement) {
        throw new Error(
          "Agreement PDF template not found."
        );
      }

      const canvas =
        await html2canvas(pdfElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

      const imgData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      const margin = 8;

      const usableWidth =
        pageWidth - margin * 2;

      const imageHeight =
        (canvas.height * usableWidth) /
        canvas.width;

      const usablePageHeight =
        pageHeight - margin * 2;

      let heightLeft = imageHeight;

      let position = margin;


      /*
        First page
      */

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        position,
        usableWidth,
        imageHeight
      );

      heightLeft -= usablePageHeight;


      /*
        Additional pages
      */

      while (heightLeft > 0) {

        position =
          margin -
          (imageHeight - heightLeft);

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          position,
          usableWidth,
          imageHeight
        );

        heightLeft -= usablePageHeight;
      }


      /*
        Safe filename
      */

      const safeAgreementId =
        String(agreementId).replace(
          /[^a-zA-Z0-9-_]/g,
          "-"
        );


      /*
        Download
      */

      pdf.save(
        `SAMS-${safeAgreementId}.pdf`
      );


      /*
        Success animation
      */

      setPdfSuccess(true);

      setTimeout(() => {
        setPdfSuccess(false);
      }, 3500);

    } catch (error) {

      console.error(
        "PDF generation failed:",
        error
      );

      setPdfSuccess(false);

    } finally {

      setIsGeneratingPdf(false);

    }
  };


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

          <span>
            /
          </span>

          Agreements

          <span>
            /
          </span>

          Details

        </div>

      </div>


      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <header className="agreement-details-header">

        <div className="agreement-details-title-area">

          <div className="agreement-details-document-icon">

            <span>
              ▤
            </span>

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
          INFORMATION
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
            SELLER & BUYER
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
              {cuttingPeriodText}
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


            {/* ===============================
                DOWNLOAD PDF
            =============================== */}

            <button
              type="button"
              className={`
                agreement-action-button
                secondary
                pdf-download-button
                ${
                  isGeneratingPdf
                    ? "loading"
                    : ""
                }
                ${
                  pdfSuccess
                    ? "success"
                    : ""
                }
              `}
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
            >

              <span className="pdf-action-icon">

                {isGeneratingPdf
                  ? "◌"
                  : pdfSuccess
                  ? "✓"
                  : "↓"}

              </span>


              {isGeneratingPdf
                ? "Generating PDF..."
                : pdfSuccess
                ? "PDF Ready"
                : "Download PDF"}

            </button>


            {/* ===============================
                SHOW QR
            =============================== */}

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


            {/* ===============================
                VERIFY
            =============================== */}

           <button
  type="button"
  className="agreement-action-button primary"
  onClick={() => {
    setShowVerification(true);
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


      {/* =====================================
          HIDDEN PDF DOCUMENT
          
          IMPORTANT:
          This is inside AgreementDetails,
          NOT inside Witness component.
      ===================================== */}

      <div
        id="sams-agreement-pdf"
        className="sams-agreement-pdf"
      >


        {/* ===================================
            PDF HEADER
        =================================== */}

        <div className="pdf-header">

          <h1>
            सुपारी बागान बिक्री एग्रीमेंट
          </h1>

          <div className="pdf-header-line" />


          <div className="pdf-meta-grid">

            <div>

              <strong>
                Agreement ID
              </strong>

              <span>
                {agreementId}
              </span>

            </div>


            <div>

              <strong>
                Agreement Type
              </strong>

              <span>
                {agreementType}
              </span>

            </div>


            <div>

              <strong>
                Agreement Status
              </strong>

              <span>
                {status}
              </span>

            </div>


            <div>

              <strong>
                Agreement Date
              </strong>

              <span>
                {agreementDate}
              </span>

            </div>

          </div>

        </div>


        {/* ===================================
            PDF BODY
        =================================== */}

        <div className="pdf-body">


          <p>
            आज दिनांक:{" "}
            <strong>
              {agreementDate}
            </strong>
          </p>


          <p>
            मैं, श्री{" "}
            <strong>
              {sellerName}
            </strong>,
            अपने पूरे होश-हवास में यह लिखित
            एग्रीमेंट कर रहा हूँ कि मैं सुपारी
            बागान श्री{" "}
            <strong>
              {buyerName}
            </strong>{" "}
            को पूरे परिवार की सहमति से बिक्री
            कर रहा हूँ।
          </p>


          <p>
            इस बागान में मौजूद सभी छोटे-बड़े पेड़,
            फल-फूल का अधिकार वर्ष{" "}
            <strong>
              {purchaseYear}
            </strong>{" "}
            से वर्ष{" "}
            <strong>
              {endingYear}
            </strong>{" "}
            तक, अर्थात कुल{" "}
            <strong>
              {validity}
            </strong>{" "}
            साल तक श्री{" "}
            <strong>
              {buyerName}
            </strong>{" "}
            के पास रहेगा।
          </p>


          <p>
            अगर इस बीच किसी तरह का विवाद,
            परेशानी या बागान को लेकर कोई तीसरा
            व्यक्ति दावा करता है, तो उसकी पूरी
            जिम्मेदारी मेरी होगी।
          </p>


          <p>
            उस स्थिति में हुए किसी भी नुकसान की
            भरपाई मैं स्वयं या मेरा परिवार मिलकर
            करेगा।
          </p>


          <p>
            बागान की कुल कीमत:
            <strong>
              {" "}₹ {totalPrice}
            </strong>
          </p>


          {/* ===============================
              CUTTING PERIOD
          =============================== */}

          <div className="pdf-cutting-box">

            <strong>
              कटाई की अवधि
            </strong>

            <span>
              {cuttingPeriodText}
            </span>

            <p>
              इस अवधि के दौरान बागान की कटाई एवं
              फल लेने का अधिकार क्रेता के पास
              रहेगा।
            </p>

          </div>


          <p>
            जब बागान काटने का समय आएगा, तो उस
            वक्त किसी प्रकार का झगड़ा या विवाद
            नहीं होगा। यदि किसी कारणवश कोई झगड़ा
            होता है, तो उसका समाधान हमारी
            पारिवारिक जिम्मेदारी होगी और नुकसान
            की भरपाई हमें खुद करनी होगी।
          </p>


          <p>
            यह समझौता दोनों पक्षों की पूर्णसहमति
            से, बिना किसी दबाव, जबरदस्ती या लालच
            के किया गया है।
          </p>


          {/* ===============================
              WITNESSES
          =============================== */}

          <h2>
            गवाह
          </h2>


          <div className="pdf-witness-list">

            <div>
              1. {witness1}
            </div>

            <div>
              2. {witness2}
            </div>

            <div>
              3. {witness3}
            </div>

          </div>


          {/* ===============================
              SIGNATURES
          =============================== */}

          <div className="pdf-signatures">


            <div>

              <h3>
                विक्रि करनेवाला
              </h3>

              <div className="pdf-sign-space" />

              <p>
                हस्ताक्षर:
                ____________________
              </p>

              <p>
                नाम: श्री{" "}
                {sellerName}
              </p>

            </div>


            <div>

              <h3>
                क्रेता
              </h3>

              <div className="pdf-sign-space" />

              <p>
                हस्ताक्षर:
                ____________________
              </p>

              <p>
                नाम: श्री{" "}
                {buyerName}
              </p>

            </div>


          </div>


        </div>


        {/* ===================================
            PDF FOOTER
        =================================== */}

        <div className="pdf-footer">

          <strong>
            SAMS
          </strong>

          <span>
            Agreement Management System
          </span>

          <small>
            Agreement ID: {agreementId}
          </small>

        </div>


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
        ${
          highlight
            ? "highlight"
            : ""
        }
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