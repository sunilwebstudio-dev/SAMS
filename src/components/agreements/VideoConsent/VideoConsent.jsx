import { useEffect, useRef, useState } from "react";
import "./VideoConsent.css";

function VideoConsent({
  agreement,
  buyerName = "",
  onBack,
  onSubmit,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const [cameraStatus, setCameraStatus] =
    useState("starting");

  const [cameraError, setCameraError] =
    useState("");

  const [testMode, setTestMode] =
    useState(false);

  const [isRecording, setIsRecording] =
    useState(false);

  const [recordedVideo, setRecordedVideo] =
    useState(null);

  const [recordedBlob, setRecordedBlob] =
    useState(null);

  const [recordingTime, setRecordingTime] =
    useState(0);

  const [consentChecked, setConsentChecked] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showConsentScript, setShowConsentScript] =
    useState(false);

  const sellerName =
    agreement?.seller_name ||
    "________________";

  const buyer =
    buyerName ||
    agreement?.buyer_name ||
    "________________";

  const agreementId =
    agreement?.agreement_id ||
    "Agreement ID will be generated";

    const [processingStage, setProcessingStage] =
  useState(0);

const [showProcessing, setShowProcessing] =
  useState(false);

  /* =========================================
     CONSENT SCRIPT
  ========================================= */

  const consentScript = `
मैं, श्री ${sellerName}, इस एग्रीमेंट को पढ़कर
और समझकर अपनी इच्छा से इस एग्रीमेंट के लिए
अपनी सहमति दे रहा/रही हूँ। मेरे द्वारा दी गई
जानकारी मेरी जानकारी के अनुसार सही है और मैं
इस एग्रीमेंट की शर्तों को स्वीकार करता/करती हूँ।
  `;

  /* =========================================
     START CAMERA
  ========================================= */

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        setCameraStatus("starting");
        setCameraError("");

        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          throw new Error(
            "Camera access is not supported."
          );
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

        if (!mounted) {
          stream
            .getTracks()
            .forEach((track) =>
              track.stop()
            );

          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;
        }

        setCameraStatus("ready");

        /*
         * Camera ready hote hi
         * script automatically show hoga.
         */
        setTimeout(() => {
          if (mounted) {
            setShowConsentScript(true);
          }
        }, 400);

      } catch (error) {
        console.warn(
          "Camera unavailable:",
          error
        );

        if (!mounted) return;

        setCameraStatus("unavailable");

        setCameraError(
          "Camera या microphone उपलब्ध नहीं है."
        );

        /*
         * Webcam nahi hai to test mode.
         */
        setTestMode(true);

        setShowConsentScript(true);
      }
    };

    startCamera();

    return () => {
      mounted = false;

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };
  }, []);

  /* =========================================
     TIMER
  ========================================= */

  useEffect(() => {
    if (!isRecording) return;

    timerRef.current =
      setInterval(() => {
        setRecordingTime(
          (previous) =>
            previous + 1
        );
      }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(
          timerRef.current
        );

        timerRef.current = null;
      }
    };
  }, [isRecording]);

  /* =========================================
     FORMAT TIME
  ========================================= */

  const formatTime = (seconds) => {
    const minutes =
      Math.floor(seconds / 60);

    const remaining =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remaining
    ).padStart(2, "0")}`;
  };

  /* =========================================
     MIME TYPE
  ========================================= */

  const getMimeType = () => {
    if (!window.MediaRecorder) {
      return "";
    }

    const types = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ];

    return (
      types.find((type) =>
        MediaRecorder.isTypeSupported(
          type
        )
      ) || ""
    );
  };

  /* =========================================
     REAL RECORDING
  ========================================= */

  const startRealRecording = () => {
    if (
      !streamRef.current ||
      cameraStatus !== "ready"
    ) {
      return;
    }

    if (!window.MediaRecorder) {
      setCameraError(
        "Video recording supported नहीं है."
      );

      return;
    }

    try {
      chunksRef.current = [];

      const mimeType =
        getMimeType();

      const recorder =
        mimeType
          ? new MediaRecorder(
              streamRef.current,
              {
                mimeType,
              }
            )
          : new MediaRecorder(
              streamRef.current
            );

      recorderRef.current =
        recorder;

      recorder.ondataavailable =
        (event) => {
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
              type:
                mimeType ||
                "video/webm",
            }
          );

        const url =
          URL.createObjectURL(
            blob
          );

        setRecordedBlob(blob);
        setRecordedVideo(url);

        setIsRecording(false);

        setShowConsentScript(
          false
        );
      };

      recorder.onerror = (
        event
      ) => {
        console.error(
          "Recorder error:",
          event
        );

        setIsRecording(false);

        setCameraError(
          "Recording में समस्या हुई. फिर से कोशिश करें."
        );
      };

      recorder.start(250);

      setRecordingTime(0);

      setRecordedBlob(null);
      setRecordedVideo(null);

      setConsentChecked(false);

      /*
       * Recording ke waqt script
       * visible rahega.
       */
      setShowConsentScript(true);

      setIsRecording(true);

    } catch (error) {
      console.error(
        "Recording start failed:",
        error
      );

      setCameraError(
        "Recording start नहीं हो सकी."
      );
    }
  };

  /* =========================================
     TEST RECORDING
  ========================================= */

  const startTestRecording = () => {
    /*
     * Webcam ke bina development testing.
     */

    setRecordingTime(0);

    setRecordedBlob(null);
    setRecordedVideo(null);

    setConsentChecked(false);

    setShowConsentScript(true);

    setIsRecording(true);

    let elapsed = 0;

    const testTimer =
      setInterval(() => {
        elapsed += 1;

        setRecordingTime(
          elapsed
        );

        /*
         * 5 seconds ka dummy recording.
         */
        if (elapsed >= 5) {
          clearInterval(
            testTimer
          );

          createTestRecording();
        }
      }, 1000);
  };

  /* =========================================
     CREATE TEST RECORDING
  ========================================= */

  const createTestRecording = () => {
    /*
     * Dummy Blob only for frontend testing.
     * Production me ye use nahi hoga.
     */

    const testBlob =
      new Blob(
        [
          "SAMS DEVELOPMENT TEST CONSENT",
        ],
        {
          type: "video/webm",
        }
      );

    const url =
      URL.createObjectURL(
        testBlob
      );

    setRecordedBlob(
      testBlob
    );

    setRecordedVideo(
      url
    );

    setIsRecording(
      false
    );

    setShowConsentScript(
      false
    );
  };

  /* =========================================
     START RECORDING
  ========================================= */

  const startRecording = () => {
    setCameraError("");

    if (testMode) {
      startTestRecording();
      return;
    }

    startRealRecording();
  };

  /* =========================================
     STOP REAL RECORDING
  ========================================= */

  const stopRecording = () => {
    if (
      recorderRef.current &&
      recorderRef.current.state !==
        "inactive"
    ) {
      recorderRef.current.stop();
    }

    if (timerRef.current) {
      clearInterval(
        timerRef.current
      );

      timerRef.current = null;
    }
  };

  /* =========================================
     RETAKE
  ========================================= */

  const handleRetake = () => {
    if (recordedVideo) {
      URL.revokeObjectURL(
        recordedVideo
      );
    }

    setRecordedVideo(null);
    setRecordedBlob(null);

    setRecordingTime(0);

    setConsentChecked(false);

    setCameraError("");

    setShowConsentScript(
      true
    );
  };

  /* =========================================
     FINAL SUBMIT
  ========================================= */

const handleSubmit = async () => {
  if (
    !recordedBlob ||
    !consentChecked ||
    isSubmitting
  ) {
    return;
  }

  setIsSubmitting(true);
  setShowProcessing(true);
  setProcessingStage(1);

  /*
   * Stage 1
   * Verifying Consent
   */
  await new Promise((resolve) =>
    setTimeout(resolve, 900)
  );

  setProcessingStage(2);

  /*
   * Stage 2
   * Consent Verified
   */
  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  );

  setProcessingStage(3);

  /*
   * Stage 3
   * Agreement Secured
   */
  await new Promise((resolve) =>
    setTimeout(resolve, 900)
  );

  const submissionData = {
    agreement,

    sellerName,

    buyerName: buyer,

    agreementId,

    consentGiven: true,

    videoBlob: recordedBlob,

    recordingDuration:
      recordingTime,

    recordedAt:
      new Date().toISOString(),

    testRecording:
      testMode,
  };

  console.log(
    "SAMS FINAL VIDEO CONSENT:",
    submissionData
  );

  /*
   * Processing animation complete.
   * Now send final submission to parent.
   */
  onSubmit?.(submissionData);
};

  const canSubmit =
    Boolean(
      recordedBlob &&
      consentChecked &&
      !isSubmitting
    );

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="video-consent-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="video-consent-header">

        <div>

          <span className="video-consent-eyebrow">
            SAMS • Seller Verification
          </span>

          <h1>
            Video Consent
          </h1>

          <p>
            Record your consent before submitting
            this agreement.
          </p>

        </div>

        <div className="video-consent-agreement-badge">

          <span>
            Agreement
          </span>

          <strong>
            {agreementId}
          </strong>

        </div>

        {showProcessing && (
  <div className="sams-processing-overlay">

    <div className="sams-processing-card">

      <div className="sams-orbit-system">

        <div className="sams-orbit orbit-one" />

        <div className="sams-orbit orbit-two" />

        <div className="sams-orbit orbit-three" />

        <div className="sams-orbit-dot dot-one" />

        <div className="sams-orbit-dot dot-two" />

        <div className="sams-orbit-dot dot-three" />

        <div className="sams-core">

          {processingStage >= 2 ? (
            <span className="sams-core-check">
              ✓
            </span>
          ) : (
            <span className="sams-core-logo">
              SAMS
            </span>
          )}

        </div>

      </div>


      <div className="sams-processing-text">

        <span className="sams-processing-eyebrow">
          SAMS • SECURE AGREEMENT
        </span>


        {processingStage === 1 && (
          <>
            <h2>
              Verifying Consent
            </h2>

            <p>
              आपकी consent recording verify की जा रही है
            </p>
          </>
        )}


        {processingStage === 2 && (
          <>
            <h2 className="processing-success">
              Consent Verified
            </h2>

            <p>
              Consent successfully verified
            </p>
          </>
        )}


        {processingStage === 3 && (
          <>
            <h2 className="processing-success">
              Agreement Secured
            </h2>

            <p>
              आपका agreement securely prepare किया जा रहा है
            </p>
          </>
        )}

      </div>


      <div className="sams-processing-steps">

        <div
          className={
            processingStage >= 1
              ? "processing-step active"
              : "processing-step"
          }
        >
          <span>
            {processingStage >= 2
              ? "✓"
              : "01"}
          </span>

          Consent
        </div>


        <div className="processing-step-line" />


        <div
          className={
            processingStage >= 2
              ? "processing-step active"
              : "processing-step"
          }
        >
          <span>
            {processingStage >= 3
              ? "✓"
              : "02"}
          </span>

          Verify
        </div>


        <div className="processing-step-line" />


        <div
          className={
            processingStage >= 3
              ? "processing-step active"
              : "processing-step"
          }
        >
          <span>
            {processingStage >= 3
              ? "✓"
              : "03"}
          </span>

          Secure
        </div>

      </div>

    </div>

  </div>
)}

      </div>


      {/* =====================================
          TEST MODE NOTICE
      ===================================== */}

      {testMode && (

        <div className="video-test-mode-banner">

          <span>
            🧪
          </span>

          <div>

            <strong>
              Development Test Mode
            </strong>

            <p>
              Webcam उपलब्ध नहीं है. Simulate
              Recording से पूरा frontend flow
              test किया जा सकता है.
            </p>

          </div>

        </div>

      )}


      {/* =====================================
          CAMERA CARD
      ===================================== */}

      <section className="video-consent-record-card">

        <div className="video-consent-card-header">

          <div>

            <span className="video-consent-section-label">
              Seller Consent Recording
            </span>

            <h2>
              Record Your Consent
            </h2>

            <p>
              Video और voice एक साथ record होंगे.
            </p>

          </div>

          {isRecording && (

            <div className="recording-status">

              <span className="recording-dot" />

              <strong>
                Recording
              </strong>

              <span>
                {formatTime(
                  recordingTime
                )}
              </span>

            </div>

          )}

        </div>


        {/* ===================================
            CAMERA
        =================================== */}

        <div className="video-consent-camera-wrapper">

          {!recordedVideo ? (

            <video
              ref={videoRef}
              className="video-consent-camera"
              autoPlay
              muted
              playsInline
            />

          ) : (

            <video
              className="video-consent-camera"
              src={recordedVideo}
              controls
              playsInline
            />

          )}


          {/* CAMERA LOADING */}

          {cameraStatus ===
            "starting" && (

            <div className="camera-loading">

              <div className="camera-spinner" />

              <span>
                Camera starting...
              </span>

            </div>

          )}


          {/* CAMERA UNAVAILABLE */}

          {cameraStatus ===
            "unavailable" && (

            <div className="camera-unavailable">

              <div className="camera-unavailable-icon">
                🎥
              </div>

              <h3>
                Development Test Mode
              </h3>

              <p>
                Webcam नहीं मिला. नीचे दिए
                Simulate Recording option से
                flow test करें.
              </p>

            </div>

          )}


          {/* =================================
              WRITTEN SCRIPT POPUP
          ================================= */}

          {!recordedVideo &&
            showConsentScript &&
            cameraStatus !==
              "starting" && (

            <div className="consent-script-overlay">

              <div className="consent-script-popup">

                <div className="consent-script-header">

                  <div className="consent-script-icon">
                    ✓
                  </div>

                  <div>

                    <span>
                      कृपया इस वक्तव्य को पढ़ें
                    </span>

                    <h3>
                      सहमति वक्तव्य
                    </h3>

                  </div>

                </div>


                <div className="consent-script-body">

                  मैं, श्री{" "}

                  <strong>
                    {sellerName}
                  </strong>

                  , इस एग्रीमेंट को पढ़कर और
                  समझकर अपनी इच्छा से इस
                  एग्रीमेंट के लिए अपनी सहमति
                  दे रहा/रही हूँ। मेरे द्वारा
                  दी गई जानकारी मेरी जानकारी
                  के अनुसार सही है और मैं इस
                  एग्रीमेंट की शर्तों को स्वीकार
                  करता/करती हूँ।

                </div>


                <div className="consent-script-note">

                  <span>
                    ℹ
                  </span>

                  <p>
                    इसे देखकर बोलें। अगर पढ़ना
                    संभव न हो, तो अपने शब्दों में
                    भी स्पष्ट रूप से अपनी सहमति
                    दे सकते हैं।
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* =================================
              RECORDING SCRIPT
          ================================= */}

          {isRecording && (

            <div className="recording-script-mini">

              <span>
                सहमति वक्तव्य
              </span>

              <p>
                मैं, श्री{" "}
                <strong>
                  {sellerName}
                </strong>
                , अपनी इच्छा से इस agreement
                के लिए सहमति दे रहा/रही हूँ।
              </p>

            </div>

          )}


          {/* =================================
              RECORDING INDICATOR
          ================================= */}

          {isRecording && (

            <div className="recording-overlay">

              <div className="recording-pulse" />

              <span>
                अपनी सहमति बोलें
              </span>

            </div>

          )}

        </div>


        {/* ERROR */}

        {cameraError && (

          <div className="video-consent-error">

            <span>
              !
            </span>

            {cameraError}

          </div>

        )}


        {/* =================================
            RECORDING BUTTON
        ================================= */}

        <div className="video-consent-record-actions">

          {!recordedVideo &&
            !isRecording && (

            <button
              type="button"
              className="video-start-button"
              onClick={
                startRecording
              }
              disabled={
                cameraStatus ===
                  "starting" ||
                isSubmitting
              }
            >

              <span>
                ●
              </span>

              {testMode
                ? "Simulate Recording"
                : "Start Recording"}

            </button>

          )}


          {isRecording &&
            !testMode && (

            <button
              type="button"
              className="video-stop-button"
              onClick={
                stopRecording
              }
            >

              <span>
                ■
              </span>

              Stop Recording

            </button>

          )}


          {isRecording &&
            testMode && (

            <div className="test-recording-status">

              <span className="recording-dot" />

              Test recording...

              <strong>
                {formatTime(
                  recordingTime
                )}
              </strong>

            </div>

          )}


          {recordedVideo && (

            <button
              type="button"
              className="video-retake-button"
              onClick={
                handleRetake
              }
              disabled={
                isSubmitting
              }
            >
              ↻ Retake
            </button>

          )}

        </div>

      </section>


      {/* =====================================
          CHECKBOX
      ===================================== */}

      <section
        className={`video-consent-confirm-card ${
          consentChecked
            ? "checked"
            : ""
        }`}
      >

        <label className="video-consent-checkbox">

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
            disabled={
              !recordedBlob ||
              isSubmitting
            }
          />

          <span className="custom-checkbox">

            {consentChecked && (

              <span className="checkbox-tick">
                ✓
              </span>

            )}

          </span>


          <span className="checkbox-text">

            <strong>
              मैं सहमत हूँ
            </strong>

            <small>
              मैंने consent statement पढ़ लिया
              है और अपनी इच्छा से video consent
              दिया है।
            </small>

          </span>

        </label>

      </section>


      {/* =====================================
          FINAL BUTTONS
      ===================================== */}

      <div className="video-consent-footer">

        <button
          type="button"
          className="video-back-button"
          onClick={
            onBack
          }
          disabled={
            isSubmitting
          }
        >
          ← Back
        </button>


        <button
          type="button"
          className={`video-final-submit ${
            canSubmit
              ? "ready"
              : ""
          }`}
          onClick={
            handleSubmit
          }
          disabled={
            !canSubmit
          }
        >

          {isSubmitting ? (

            <>
              <span className="submit-spinner" />
              Submitting...
            </>

          ) : (

            <>
              ✓ Submit Agreement
              <span>
                →
              </span>
            </>

          )}

        </button>

      </div>


      {/* SECURITY */}

      <div className="video-consent-security-note">

        <span>
          🔒
        </span>

        <p>
          Video और microphone audio एक ही
          consent recording में capture होंगे।
        </p>

      </div>

    </div>
  );
}

export default VideoConsent;