import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Html5Qrcode,
} from "html5-qrcode";

import "./VerifyAgreement.css";


function VerifyAgreement({
  agreement = null,
  onBack,
}) {

  const navigate = useNavigate();

  /* =========================================
     STATE
  ========================================= */

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

    const [searchParams] =
  useSearchParams();


  /* =========================================
     BACK
  ========================================= */

  const handleBack = () => {

    if (typeof onBack === "function") {
      onBack();
      return;
    }

    navigate("/dashboard");
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

  const handleVerify = (
    idToVerify = agreementId
  ) => {

    const enteredId =
      String(idToVerify || "")
        .trim()
        .toLowerCase();


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
       * Later this will be replaced with
       * SAMS backend/database verification.
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

  const extractAgreementId = (
    decodedText
  ) => {

    const text =
      String(decodedText || "").trim();


    if (!text) {
      return "";
    }


    /*
     * QR can contain:
     *
     * SUP-2026-000001
     *
     * OR
     *
     * https://domain.com/verify-agreement?id=SUP-2026-000001
     */

    try {

      const url =
        new URL(text);

      const queryId =
        url.searchParams.get("id") ||
        url.searchParams.get(
          "agreementId"
        );

      if (queryId) {
        return queryId.trim();
      }

    } catch {
      /*
       * QR is plain text.
       */
    }


    return text;
  };


  /* =========================================
     STOP SCANNER
  ========================================= */

  const stopScanner = async () => {

    const scanner =
      scannerRef.current;


    if (!scanner) {
      return;
    }


    try {

      if (
        scannerStartedRef.current
      ) {

        await scanner.stop();

      }

    } catch (error) {

      console.warn(
        "QR scanner stop warning:",
        error
      );

    }


    try {

      await scanner.clear();

    } catch (error) {

      console.warn(
        "QR scanner clear warning:",
        error
      );

    }


    scannerStartedRef.current =
      false;

    scannerRef.current =
      null;
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
     START SCANNER
  ========================================= */

const startScanner = async () => {
  if (scannerRef.current) {
    return;
  }

  setScannerError("");
  setScannerOpen(true);

  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });

  try {
    // First ask browser for camera access.
    await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    // Get cameras available on this device.
    const cameras =
      await Html5Qrcode.getCameras();

    if (!cameras || cameras.length === 0) {
      throw new Error(
        "No camera device found."
      );
    }

    /*
     * Prefer a rear/environment camera
     * when available.
     *
     * Otherwise use the first available
     * camera, which is usually the laptop
     * webcam.
     */
    let selectedCamera =
      cameras.find((camera) => {
        const label =
          camera.label.toLowerCase();

        return (
          label.includes("back") ||
          label.includes("rear") ||
          label.includes("environment")
        );
      });

    if (!selectedCamera) {
      selectedCamera = cameras[0];
    }

    const scanner =
      new Html5Qrcode(
        "sams-qr-reader"
      );

    scannerRef.current = scanner;

    await scanner.start(
      selectedCamera.id,
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

        setAgreementId(
          detectedId
        );

        setVerificationResult(
          null
        );

        await stopScanner();

        setScannerOpen(false);

        setTimeout(() => {
          handleVerify(
            detectedId
          );
        }, 150);
      },

      () => {
        // Normal scanning frame errors.
        // We intentionally ignore them.
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

    scannerRef.current =
      null;

    setScannerError(
      "No usable camera was found on this device. Please connect or enable a webcam and try again."
    );
  }
};


  /* =========================================
     CLEANUP
  ========================================= */

  useEffect(() => {

    return () => {

      const cleanupScanner =
        async () => {

          const scanner =
            scannerRef.current;


          if (!scanner) {
            return;
          }


          try {

            if (
              scannerStartedRef.current
            ) {
              await scanner.stop();
            }

          } catch {
            // Ignore cleanup errors.
          }


          try {

            await scanner.clear();

          } catch {
            // Ignore cleanup errors.
          }

        };


      cleanupScanner();

    };

  }, []);

  useEffect(() => {

  const qrAgreementId =
    searchParams.get("id");

  if (qrAgreementId) {

    setAgreementId(
      qrAgreementId
    );

    setTimeout(() => {

      handleVerify(
        qrAgreementId
      );

    }, 300);

  }

}, [searchParams]);


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
            className="verify-search-button"
            onClick={() => {
              handleVerify();
            }}
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
              OR
          ================================= */}

          <div className="verify-or-divider">

            <span />

            <strong>
              OR
            </strong>

            <span />

          </div>


          {/* =================================
              SCAN QR
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
                Use your camera to verify an
                agreement
              </small>

            </span>


            <span className="verify-qr-arrow">
              →
            </span>

          </button>


          {/* =================================
              SECURITY HINT
          ================================= */}

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


            {/* AGREEMENT ID */}

            <div className="verified-agreement-id">

              <span>
                Agreement ID
              </span>


              <strong>
                {actualAgreementId}
              </strong>

            </div>


            {/* DETAILS */}

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


            {/* TRUST FOOTER */}

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
            NO AGREEMENT
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


            {/* CAMERA */}

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


            {/* INSTRUCTION */}

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
                  Keep the QR code clearly visible
                  and hold your camera steady.
                </p>

              </div>

            </div>


            {/* CANCEL */}

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