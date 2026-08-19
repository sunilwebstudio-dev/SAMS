import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import "./VerifyAgreement.css";

function VerifyAgreement({
  agreement = null,
  onBack,
}) {

  const [agreementId, setAgreementId] =
    useState("");

  const [isVerifying, setIsVerifying] =
    useState(false);

  const [verificationResult, setVerificationResult] =
    useState(null);

  const [scannerOpen, setScannerOpen] =
    useState(false);

  const [scannerError, setScannerError] =
    useState("");

  const scannerRef =
    useRef(null);

  const scannerStartedRef =
    useRef(false);

    const navigate = useNavigate();

const handleBack = () => {
  if (typeof onBack === "function") {
    onBack();
  } else {
    navigate("/dashboard");
  }
};


  /* =========================================
     AGREEMENT VALUES
  ========================================= */

  const sellerName =
    agreement?.seller_name || "—";

  const buyerName =
    agreement?.buyer_name || "—";

  const purchaseYear =
    agreement?.purchase_year || "—";

  const validity =
    agreement?.validity_years || "—";

  const endingYear =
    agreement?.ending_year ||
    (
      agreement?.purchase_year &&
      agreement?.validity_years
        ? Number(agreement.purchase_year) +
          Number(agreement.validity_years)
        : "—"
    );

  const cuttingPeriod =
    agreement?.cutting_period || "—";

  const totalPrice =
    agreement?.total_bagan_price !==
      undefined &&
    agreement?.total_bagan_price !== null &&
    agreement?.total_bagan_price !== ""
      ? Number(
          agreement.total_bagan_price
        ).toLocaleString("en-IN")
      : "—";

  const agreementType =
    agreement?.agreement_type === "SUP"
      ? "Supari Agreement"
      : agreement?.agreement_type === "MON"
      ? "Money Agreement"
      : agreement?.agreement_type === "LND"
      ? "Land Agreement"
      : agreement?.agreement_type === "FRM"
      ? "Farm Agreement"
      : "Agreement";

  const status =
    agreement?.status || "Active";

  const actualAgreementId =
    agreement?.agreement_id || "—";


  /* =========================================
     VERIFY AGREEMENT
  ========================================= */

  const handleVerify = () => {
    const enteredId =
      agreementId.trim().toLowerCase();

    if (!enteredId) {
      setVerificationResult({
        valid: false,
        message:
          "Please enter an Agreement ID.",
      });

      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);


    setTimeout(() => {

      const actualId =
        agreement?.agreement_id
          ?.toString()
          .trim()
          .toLowerCase();


      /*
       * Prototype verification.
       *
       * Later this will check the
       * SAMS backend/database.
       */

      if (
        actualId &&
        enteredId === actualId
      ) {

        setVerificationResult({
          valid: true,
          message:
            "This agreement is verified and belongs to SAMS.",
        });

      } else {

        setVerificationResult({
          valid: false,
          message:
            "No matching agreement was found.",
        });

      }

      setIsVerifying(false);

    }, 900);
  };


  /* =========================================
     EXTRACT AGREEMENT ID FROM QR
  ========================================= */

  const extractAgreementId = (decodedText) => {

    const text =
      String(decodedText || "").trim();

    if (!text) {
      return "";
    }


    /*
     * If QR contains a URL such as:
     *
     * https://your-domain.com/verify-agreement?id=SUP-2026-001
     *
     * extract the id automatically.
     */

    try {

      const url =
        new URL(text);

      const queryId =
        url.searchParams.get(
          "id"
        ) ||
        url.searchParams.get(
          "agreementId"
        );

      if (queryId) {
        return queryId.trim();
      }

    } catch {
      /*
       * Not a URL.
       * Continue below.
       */
    }


    /*
     * Support simple QR text:
     *
     * SUP-2026-001
     */

    return text;
  };


  /* =========================================
     STOP SCANNER
  ========================================= */

  const stopScanner = async () => {

    if (!scannerRef.current) {
      return;
    }

    try {

      if (
        scannerStartedRef.current
      ) {
        await scannerRef.current.stop();
      }

    } catch (error) {

      console.warn(
        "QR scanner stop warning:",
        error
      );

    }

    try {

      await scannerRef.current.clear();

    } catch (error) {

      console.warn(
        "QR scanner clear warning:",
        error
      );

    }

    scannerStartedRef.current =
      false;

    scannerRef.current = null;
  };


  /* =========================================
     CLOSE SCANNER
  ========================================= */

  const closeScanner = async () => {

    await stopScanner();

    setScannerOpen(false);

    setScannerError("");
  };


  /* =========================================
     START QR SCANNER
  ========================================= */

  const startScanner = async () => {

    setScannerError("");

    setScannerOpen(true);

    /*
     * Wait for modal DOM element.
     */

    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });


    try {

      const scanner =
        new Html5Qrcode(
          "sams-qr-reader"
        );

      scannerRef.current =
        scanner;


      await scanner.start(

        {
          facingMode: {
            ideal: "environment",
          },
        },

        {
          fps: 10,

          qrbox: {
            width: 240,
            height: 240,
          },

          aspectRatio: 1,

        },

        async (decodedText) => {

          const detectedId =
            extractAgreementId(
              decodedText
            );


          if (!detectedId) {
            setScannerError(
              "This QR code does not contain a valid Agreement ID."
            );

            return;
          }


          /*
           * Put scanned ID into input.
           */

          setAgreementId(
            detectedId
          );

          setVerificationResult(null);


          /*
           * Stop scanner immediately
           * after successful scan.
           */

          await stopScanner();

          setScannerOpen(false);


          /*
           * Automatically verify.
           */

          setTimeout(() => {

            handleVerify();

          }, 100);

        },

        () => {
          /*
           * QR scan frame errors are normal.
           * We intentionally don't show them.
           */
        }

      );

      scannerStartedRef.current =
        true;

    } catch (error) {

      console.error(
        "QR scanner error:",
        error
      );

      scannerStartedRef.current =
        false;

      setScannerError(
        "Camera could not be started. Please allow camera permission and try again."
      );

    }
  };


  /* =========================================
     SCANNER CLEANUP
  ========================================= */

  useEffect(() => {

    return () => {

      stopScanner();

    };

  }, []);


  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="verify-agreement-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="verify-header">

        <button
          type="button"
          className="verify-back-button"
          onClick={handleBack}
        >
          ← Back
        </button>


        <div className="verify-brand">

          <div className="verify-brand-icon">
            ✓
          </div>

          <div>

            <span>
              SAMS
            </span>

            <strong>
              Agreement Verification
            </strong>

          </div>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="verify-main">


        {/* ===================================
            HERO
        =================================== */}

        <section className="verify-hero">

          <div className="verify-hero-badge">
            SECURE VERIFICATION
          </div>

          <h1>
            Verify an Agreement
          </h1>

          <p>
            Enter the Agreement ID or scan the
            official SAMS QR code to verify an
            agreement.
          </p>

        </section>


        {/* ===================================
            SEARCH CARD
        =================================== */}

        <section className="verify-search-card">

          <label>
            Agreement ID
          </label>


          <div className="verify-input-wrapper">

            <span>
              #
            </span>

            <input
              type="text"
              value={agreementId}
              onChange={(event) => {

                setAgreementId(
                  event.target.value
                );

                setVerificationResult(
                  null
                );

              }}
              placeholder="e.g. SUP-2026-XXXXXX"
              autoComplete="off"
            />

          </div>


          {/* =================================
              VERIFY BUTTON
          ================================= */}

          <button
            type="button"
            className={`
              verify-search-button
              ${
                isVerifying
                  ? "loading"
                  : ""
              }
            `}
            onClick={handleVerify}
            disabled={isVerifying}
          >

            {isVerifying ? (

              <>
                <span className="verify-spinner" />

                Verifying Agreement...
              </>

            ) : (

              <>
                <span>
                  ✓
                </span>

                Verify Agreement
              </>

            )}

          </button>


          {/* =================================
              DIVIDER
          ================================= */}

          <div className="verify-or-divider">

            <span />

            <strong>
              OR
            </strong>

            <span />

          </div>


          {/* =================================
              QR BUTTON
          ================================= */}

          <button
            type="button"
            className="verify-qr-button"
            onClick={startScanner}
            disabled={isVerifying}
          >

            <span className="verify-qr-icon">
              ▣
            </span>

            <span className="verify-qr-text">

              <strong>
                Scan QR Code
              </strong>

              <small>
                Use your camera to verify
              </small>

            </span>

            <span className="verify-qr-arrow">
              →
            </span>

          </button>


          <div className="verify-search-hint">

            <span>
              🔒
            </span>

            Agreement information is verified
            through SAMS.

          </div>

        </section>


        {/* ===================================
            VERIFICATION RESULT
        =================================== */}

        {verificationResult && (

          <section
            className={`
              verification-result
              ${
                verificationResult.valid
                  ? "verified"
                  : "invalid"
              }
            `}
          >

            <div className="verification-result-icon">

              {verificationResult.valid
                ? "✓"
                : "!"}

            </div>


            <div className="verification-result-content">

              <span>

                {verificationResult.valid
                  ? "VERIFIED AGREEMENT"
                  : "VERIFICATION FAILED"}

              </span>


              <h2>

                {verificationResult.valid
                  ? "Agreement Verified Successfully"
                  : "Agreement Could Not Be Verified"}

              </h2>


              <p>
                {verificationResult.message}
              </p>

            </div>

          </section>

        )}


        {/* ===================================
            AGREEMENT DETAILS
        =================================== */}

        {verificationResult?.valid &&
          agreement && (

          <section className="verified-agreement-card">


            <div className="verified-card-header">

              <div>

                <span>
                  VERIFIED RECORD
                </span>

                <h2>
                  Agreement Details
                </h2>

              </div>


              <div className="verified-status">

                <span>
                  ✓
                </span>

                Verified

              </div>

            </div>


            <div className="verified-agreement-id">

              <span>
                Agreement ID
              </span>

              <strong>
                {actualAgreementId}
              </strong>

            </div>


            <div className="verified-details-grid">

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

                <strong className="verified-green">
                  ● {status}
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
                  {buyerName}
                </strong>

              </div>


              <div>

                <span>
                  Purchase Year
                </span>

                <strong>
                  {purchaseYear}
                </strong>

              </div>


              <div>

                <span>
                  Ending Year
                </span>

                <strong>
                  {endingYear}
                </strong>

              </div>


              <div>

                <span>
                  Validity
                </span>

                <strong>
                  {validity} Years
                </strong>

              </div>


              <div>

                <span>
                  Cutting Period
                </span>

                <strong>
                  {cuttingPeriod}
                </strong>

              </div>


              <div>

                <span>
                  Total Bagan Price
                </span>

                <strong>
                  ₹ {totalPrice}
                </strong>

              </div>

            </div>


            <div className="verification-trust-footer">

              <div className="trust-check">
                ✓
              </div>

              <div>

                <strong>
                  Verified by SAMS
                </strong>

                <span>
                  This agreement ID matches
                  the current SAMS record.
                </span>

              </div>

            </div>


          </section>

        )}


        {/* ===================================
            NO AGREEMENT CONTEXT
        =================================== */}

        {!agreement && (

          <div className="verify-no-context">

            <div>
              i
            </div>

            <p>
              You can enter an Agreement ID or
              scan a SAMS QR code. Agreement
              details will appear after successful
              verification.
            </p>

          </div>

        )}

      </main>


      {/* =====================================
          QR SCANNER MODAL
      ===================================== */}

      {scannerOpen && (

        <div
          className="qr-scanner-overlay"
          onClick={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {
              closeScanner();
            }

          }}
        >

          <section className="qr-scanner-modal">


            {/* MODAL HEADER */}

            <div className="qr-scanner-header">

              <div>

                <span>
                  SAMS SECURE SCAN
                </span>

                <h2>
                  Scan Agreement QR
                </h2>

              </div>


              <button
                type="button"
                className="qr-scanner-close"
                onClick={closeScanner}
              >
                ×
              </button>

            </div>


            {/* SCANNER */}

            <div className="qr-scanner-container">

              <div
                id="sams-qr-reader"
                className="sams-qr-reader"
              />

              <div className="qr-scan-frame">

                <span className="corner top-left" />
                <span className="corner top-right" />
                <span className="corner bottom-left" />
                <span className="corner bottom-right" />

                <div className="qr-scan-line" />

              </div>

            </div>


            {/* ERROR */}

            {scannerError && (

              <div className="qr-scanner-error">

                <span>
                  !
                </span>

                {scannerError}

              </div>

            )}


            <div className="qr-scanner-instruction">

              <div className="qr-instruction-icon">
                ▣
              </div>

              <div>

                <strong>
                  Position the QR code inside
                  the frame
                </strong>

                <p>
                  Keep your camera steady and
                  make sure the QR code is clearly
                  visible.
                </p>

              </div>

            </div>


            <button
              type="button"
              className="qr-scanner-cancel"
              onClick={closeScanner}
            >
              Cancel
            </button>


          </section>

        </div>

      )}

    </div>
  );
}

export default VerifyAgreement;