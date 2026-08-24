import { useEffect, useRef, useState } from "react";
import "./SellerVerification.css";

function SellerVerification({
  agreement,
  buyerName = "",
  onVerified,
  onBack,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [cameraStarted, setCameraStarted] =
    useState(false);

  const [isRecording, setIsRecording] =
    useState(false);

  const [recordedUrl, setRecordedUrl] =
    useState("");

  const [recordedVideo, setRecordedVideo] =
    useState(null);

  const [cameraUnavailable, setCameraUnavailable] =
    useState(false);

  const [locationStatus, setLocationStatus] =
    useState("not-requested");

  const [location, setLocation] =
    useState(null);

  const [locationRequested, setLocationRequested] =
    useState(false);

  const [consentChecked, setConsentChecked] =
    useState(false);

  const [error, setError] =
    useState("");

  const [processing, setProcessing] =
    useState(false);

  /* =========================================
     AGREEMENT DATA
  ========================================= */

  const sellerName =
    agreement?.seller_name ||
    "Seller";

  const buyer =
    buyerName ||
    agreement?.buyer_name ||
    "Buyer";

  const agreementId =
    agreement?.agreement_id ||
    `SUP-${new Date().getFullYear()}-XXXXXX`;

  const totalPrice =
    agreement?.total_bagan_price !== undefined &&
    agreement?.total_bagan_price !== null &&
    agreement?.total_bagan_price !== ""
      ? Number(
          agreement.total_bagan_price
        ).toLocaleString("en-IN")
      : "—";

  const purchaseYear =
    agreement?.purchase_year ||
    "—";

  const endingYear =
    agreement?.ending_year ||
    (
      agreement?.purchase_year &&
      agreement?.validity_years
        ? Number(agreement.purchase_year) +
          Number(agreement.validity_years)
        : "—"
    );

  const validity =
    agreement?.validity_years ||
    "—";


  /* =========================================
     CONSENT STATEMENT

     Language system later plug-in hoga.
  ========================================= */

  const consentStatement =
    `मैं अपनी इच्छा से यह एग्रीमेंट कर रहा/रही हूँ। मैंने इस एग्रीमेंट की सभी जानकारी और शर्तों को समझ लिया है और बिना किसी दबाव के अपनी सहमति दे रहा/रही हूँ।`;


  /* =========================================
     START CAMERA
  ========================================= */

  const startCamera = async () => {
    setError("");
    setCameraUnavailable(false);

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setCameraUnavailable(true);

        setError(
          "इस device में camera उपलब्ध नहीं है।"
        );

        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: true,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject =
          stream;
      }

      setCameraStarted(true);

    } catch (err) {
      console.error(
        "Camera error:",
        err
      );

      setCameraUnavailable(true);

      setError(
        "Camera या microphone उपलब्ध नहीं है।"
      );
    }
  };


  /* =========================================
     STOP CAMERA
  ========================================= */

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }

    setCameraStarted(false);
  };


  /* =========================================
     START RECORDING
  ========================================= */

  const startRecording = () => {
    setError("");

    if (!streamRef.current) {
      setError(
        "पहले camera और microphone शुरू करें।"
      );

      return;
    }

    try {
      chunksRef.current = [];

      let mimeType =
        "video/webm;codecs=vp9,opus";

      if (
        !MediaRecorder.isTypeSupported(
          mimeType
        )
      ) {
        mimeType =
          "video/webm;codecs=vp8,opus";
      }

      if (
        !MediaRecorder.isTypeSupported(
          mimeType
        )
      ) {
        mimeType = "video/webm";
      }

      const recorder =
        new MediaRecorder(
          streamRef.current,
          {
            mimeType,
          }
        );

      recorderRef.current =
        recorder;

      recorder.ondataavailable = (
        event
      ) => {
        if (
          event.data &&
          event.data.size > 0
        ) {
          chunksRef.current.push(
            event.data
          );
        }
      };

      recorder.onstop = () => {
        const blob =
          new Blob(
            chunksRef.current,
            {
              type: mimeType,
            }
          );

        const url =
          URL.createObjectURL(blob);

        setRecordedVideo(blob);
        setRecordedUrl(url);

        setIsRecording(false);

        stopCamera();
      };

      recorder.start();

      setIsRecording(true);

    } catch (err) {
      console.error(
        "Recording error:",
        err
      );

      setError(
        "Recording start नहीं हो सकी।"
      );
    }
  };


  /* =========================================
     STOP RECORDING
  ========================================= */

  const stopRecording = () => {
    if (
      recorderRef.current &&
      recorderRef.current.state !==
        "inactive"
    ) {
      recorderRef.current.stop();
    }
  };


  /* =========================================
     RECORD AGAIN
  ========================================= */

  const recordAgain = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(
        recordedUrl
      );
    }

    setRecordedUrl("");
    setRecordedVideo(null);
    setConsentChecked(false);

    startCamera();
  };


  /* =========================================
     LOCATION
     
     One request per verification session.
  ========================================= */

  const requestLocation = () => {
    if (locationRequested) {
      return;
    }

    setLocationRequested(true);
    setError("");

    if (!navigator.geolocation) {
      setLocationStatus(
        "unsupported"
      );

      setError(
        "इस browser में location उपलब्ध नहीं है।"
      );

      return;
    }

    setLocationStatus(
      "requesting"
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

          accuracy:
            position.coords.accuracy,

          capturedAt:
            new Date().toISOString(),
        };

        setLocation(
          locationData
        );

        setLocationStatus(
          "captured"
        );
      },

      (err) => {
        console.error(
          "Location error:",
          err
        );

        setLocationStatus(
          "denied"
        );

        setError(
          "Location permission नहीं मिली। Browser में location allow करें।"
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };


  /* =========================================
     FINAL VERIFY + DIRECT SUBMIT
  ========================================= */

  const handleVerifyAndSubmit = () => {
    setError("");

    if (!recordedVideo) {
      setError(
        "पहले seller consent video record करें।"
      );

      return;
    }

    if (!consentChecked) {
      setError(
        "Seller consent confirmation tick करें।"
      );

      return;
    }

    if (
      locationStatus !==
      "captured"
    ) {
      setError(
        "पहले seller location capture करें।"
      );

      return;
    }

    setProcessing(true);

    const verificationData = {
      verificationId:
        `SV-${Date.now()}`,

      agreementId,

      sellerName,

      buyerName: buyer,

      recordedVideo,

      location,

      verifiedAt:
        new Date().toISOString(),

      consentStatement,

      verificationStatus:
        "verified",
    };

    /*
      Small animation delay so seller sees
      verification completion before submit.
    */

    setTimeout(() => {
      onVerified?.(
        verificationData
      );
    }, 1200);
  };


  /* =========================================
     CLEANUP
  ========================================= */

  useEffect(() => {
    return () => {
      stopCamera();

      if (recordedUrl) {
        URL.revokeObjectURL(
          recordedUrl
        );
      }
    };
  }, [recordedUrl]);


  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="seller-verification-page">

      <div className="seller-verification-shell">


        {/* =================================
            HEADER
        ================================= */}

        <header className="seller-verification-header">

          <button
            type="button"
            className="seller-verification-back"
            onClick={onBack}
            disabled={
              isRecording ||
              processing
            }
          >
            ← Back
          </button>


          <div className="seller-verification-title">

            <span>
              SAMS • Secure Verification
            </span>

            <h1>
              Seller Consent
            </h1>

            <p>
              Agreement submit करने से पहले
              seller की consent verify करें।
            </p>

          </div>


          <div className="seller-secure-badge">
            🔐 Secure
          </div>

        </header>


        {/* =================================
            PROGRESS
        ================================= */}

        <div className="seller-verification-progress">

          <div className="progress-item active">
            <span>1</span>
            Review
          </div>

          <div className="progress-line" />

          <div
            className={`progress-item ${
              recordedVideo
                ? "active"
                : ""
            }`}
          >
            <span>2</span>
            Record
          </div>

          <div className="progress-line" />

          <div
            className={`progress-item ${
              locationStatus ===
              "captured"
                ? "active"
                : ""
            }`}
          >
            <span>3</span>
            Location
          </div>

          <div className="progress-line" />

          <div
            className={`progress-item ${
              consentChecked
                ? "active"
                : ""
            }`}
          >
            <span>4</span>
            Consent
          </div>

        </div>


        {/* =================================
            AGREEMENT SUMMARY
        ================================= */}

        <section className="verification-main-card">

          <div className="verification-card-top">

            <div>

              <small>
                AGREEMENT
              </small>

              <h2>
                Review Agreement
              </h2>

            </div>

            <strong>
              {agreementId}
            </strong>

          </div>


          <div className="verification-summary">

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
                Total Amount
              </span>

              <strong>
                ₹ {totalPrice}
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
                Validity
              </span>

              <strong>
                {validity} Years
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

          </div>


          <div className="verification-cutting">

            <strong>
              कटाई की अवधि
            </strong>

            <span>
              वर्ष {purchaseYear} से वर्ष{" "}
              {endingYear} तक
            </span>

          </div>

        </section>


        {/* =================================
            CONSENT STATEMENT
        ================================= */}

        <section className="verification-main-card consent-card">

          <div className="section-heading">

            <div className="section-number">
              1
            </div>

            <div>

              <small>
                SELLER CONSENT
              </small>

              <h2>
                इस statement को पढ़कर record करें
              </h2>

            </div>

          </div>


          <div className="consent-statement">

            <span className="quote-mark">
              “
            </span>

            <p>
              {consentStatement}
            </p>

          </div>


          <div className="consent-tip">

            <span>
              💡
            </span>

            <p>
              Seller को camera में देखकर
              ऊपर दिया गया statement पढ़ना है।
              Recording के दौरान यह statement
              screen पर दिखाई देता रहेगा।
            </p>

          </div>

        </section>


        {/* =================================
            CAMERA / RECORDING
        ================================= */}

        <section className="verification-main-card">

          <div className="section-heading">

            <div className="section-number">
              2
            </div>

            <div>

              <small>
                VIDEO CONSENT
              </small>

              <h2>
                Short Video Recording
              </h2>

            </div>

          </div>


          <div className="camera-container">

            {cameraStarted ? (

              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="seller-live-video"
                />

                {isRecording && (
                  <div className="recording-indicator">

                    <span />

                    RECORDING

                  </div>
                )}

              </>

            ) : recordedUrl ? (

              <video
                src={recordedUrl}
                controls
                playsInline
                className="seller-recorded-video"
              />

            ) : (

              <div className="camera-empty">

                <div className="camera-icon">
                  🎥
                </div>

                <h3>
                  Seller Video Consent
                </h3>

                <p>
                  Camera और microphone से
                  एक short video record होगा।
                </p>

                {cameraUnavailable && (
                  <div className="camera-warning">

                    <strong>
                      Webcam available नहीं है
                    </strong>

                    <span>
                      इस computer में webcam नहीं
                      मिला। Actual verification के
                      लिए camera वाले device से
                      test करें।
                    </span>

                  </div>
                )}

              </div>

            )}

          </div>


          {/* CAMERA ACTIONS */}

          <div className="camera-actions">

            {!cameraStarted &&
              !recordedUrl && (

              <button
                type="button"
                className="camera-start-button"
                onClick={startCamera}
              >
                🎥 Start Camera
              </button>

            )}


            {cameraStarted &&
              !isRecording && (

              <button
                type="button"
                className="record-button"
                onClick={startRecording}
              >
                <span className="record-dot" />
                Start Recording
              </button>

            )}


            {isRecording && (

              <button
                type="button"
                className="stop-record-button"
                onClick={stopRecording}
              >
                ■ Stop Recording
              </button>

            )}


            {recordedUrl && (
              <button
                type="button"
                className="record-again-button"
                onClick={recordAgain}
              >
                🔄 Record Again
              </button>
            )}

          </div>


          {recordedUrl && (

            <div className="record-ready">

              <span>
                ✓
              </span>

              <div>

                <strong>
                  Video ready
                </strong>

                <small>
                  Please review the recording before
                  continuing.
                </small>

              </div>

            </div>

          )}

        </section>


        {/* =================================
            LOCATION
        ================================= */}

        <section className="verification-main-card">

          <div className="section-heading">

            <div className="section-number">
              3
            </div>

            <div>

              <small>
                VERIFICATION LOCATION
              </small>

              <h2>
                Seller Location
              </h2>

            </div>

          </div>


          <div className="location-box">

            <div className="location-icon">
              📍
            </div>

            <div className="location-text">

              <strong>
                Location verification
              </strong>

              {locationStatus ===
              "captured" ? (

                <span className="location-success">
                  ✓ Location captured successfully
                </span>

              ) : locationStatus ===
              "requesting" ? (

                <span>
                  Getting location...
                </span>

              ) : (

                <span>
                  Location will be requested once
                  for this verification session.
                </span>

              )}

            </div>


            {locationStatus !==
              "captured" && (

              <button
                type="button"
                className="location-button"
                onClick={
                  requestLocation
                }
                disabled={
                  locationStatus ===
                  "requesting" ||
                  locationRequested
                }
              >
                {locationStatus ===
                "requesting"
                  ? "Getting..."
                  : locationRequested
                  ? "Requested"
                  : "Allow Location"}
              </button>

            )}

          </div>

        </section>


        {/* =================================
            FINAL CONSENT
        ================================= */}

        <section className="verification-main-card">

          <div className="section-heading">

            <div className="section-number">
              4
            </div>

            <div>

              <small>
                FINAL CONSENT
              </small>

              <h2>
                Seller Confirmation
              </h2>

            </div>

          </div>


          <label className="final-consent">

            <input
              type="checkbox"
              checked={
                consentChecked
              }
              onChange={(event) =>
                setConsentChecked(
                  event.target.checked
                )
              }
            />

            <span className="check-box" />

            <p>
              मैं पुष्टि करता/करती हूँ कि मैंने
              agreement की जानकारी और शर्तों को
              समझ लिया है और अपनी इच्छा से इस
              agreement के लिए सहमति दे रहा/रही हूँ।
            </p>

          </label>

        </section>


        {/* =================================
            ERROR
        ================================= */}

        {error && (

          <div className="verification-error">

            <span>
              !
            </span>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* =================================
            FINAL ACTION
        ================================= */}

        <div className="verification-bottom">

          <button
            type="button"
            className="bottom-back-button"
            onClick={onBack}
            disabled={
              isRecording ||
              processing
            }
          >
            ← Back
          </button>


          <button
            type="button"
            className="verify-submit-button"
            onClick={
              handleVerifyAndSubmit
            }
            disabled={
              !recordedVideo ||
              !consentChecked ||
              locationStatus !==
                "captured" ||
              processing
            }
          >

            {processing ? (

              <>
                <span className="submit-spinner" />
                Verifying & Submitting...
              </>

            ) : (

              <>
                ✓ Verify & Submit Agreement
              </>

            )}

          </button>

        </div>

      </div>

    </div>
  );
}

export default SellerVerification;