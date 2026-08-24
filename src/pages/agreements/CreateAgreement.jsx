import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import AgreementForm from "../../components/agreements/AgreementForm/AgreementForm";

import AgreementPreview from "../../components/agreements/AgreementPreview/AgreementPreview";

import AgreementSuccess from "../../components/agreements/AgreementSuccess/AgreementSuccess";

import AgreementDetails from "./AgreementDetails";

import VideoConsent from "../../components/agreements/VideoConsent/VideoConsent";

import "./CreateAgreement.css";


function CreateAgreement() {

  /* =========================================
     AGREEMENT STATE
  ========================================= */

  const [agreementType, setAgreementType] =
    useState("");

  const [previewData, setPreviewData] =
    useState(null);

  const [finalAgreement, setFinalAgreement] =
    useState(null);

  const [viewingAgreement, setViewingAgreement] =
    useState(null);

  const [isSelecting, setIsSelecting] =
    useState(false);


  /* =========================================
     CURRENT FLOW STEP

     form
     preview
     video
     success
  ========================================= */

  const [currentStep, setCurrentStep] =
    useState("form");


  /* =========================================
     AGREEMENT TYPES
  ========================================= */

  const agreementTypes = [
    {
      code: "SUP",
      title: "Supari Agreement",
      description:
        "Supari Bagan sale agreement",
      icon: "🌿",
    },

    {
      code: "MON",
      title: "Money Agreement",
      description:
        "Money lending agreement",
      icon: "💰",
    },

    {
      code: "LND",
      title: "Land Agreement",
      description:
        "Land related agreement",
      icon: "🏞️",
    },

    {
      code: "FRM",
      title: "Farm Agreement",
      description:
        "Farm related agreement",
      icon: "🌾",
    },

    {
      code: "OTHER",
      title: "Other Agreement",
      description:
        "Create another type of agreement",
      icon: "📄",
    },
  ];


  /* =========================================
     AGREEMENT TYPE SELECTION
  ========================================= */

  const handleAgreementTypeSelect = (
    code
  ) => {

    if (isSelecting) {
      return;
    }

    setIsSelecting(true);

    setTimeout(() => {

      setAgreementType(code);

      setPreviewData(null);

      setFinalAgreement(null);

      setCurrentStep("form");

      setIsSelecting(false);

    }, 180);

  };


  /* =========================================
     SCROLL TO FORM
  ========================================= */

  useEffect(() => {

    if (
      !agreementType ||
      currentStep !== "form"
    ) {
      return;
    }

    const timer = setTimeout(() => {

      document
        .getElementById(
          "agreement-information"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

    }, 220);

    return () =>
      clearTimeout(timer);

  }, [
    agreementType,
    currentStep,
  ]);


  /* =========================================
     SELECTED AGREEMENT
  ========================================= */

  const selectedAgreement =
    agreementTypes.find(
      (type) =>
        type.code === agreementType
    );


  /* =========================================
     PREVIEW
  ========================================= */

  const handlePreview = (
    payload
  ) => {

    console.log(
      "SAMS Agreement Preview:",
      payload
    );

    setPreviewData(payload);

    setCurrentStep("preview");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
     EDIT FROM PREVIEW
  ========================================= */

  const handleEditPreview = () => {

    setCurrentStep("form");

    setTimeout(() => {

      document
        .getElementById(
          "agreement-information"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

    }, 100);

  };


  /* =========================================
     CONTINUE FROM PREVIEW
     
     Preview does NOT submit.
     It only moves to Video Consent.
  ========================================= */

  const handleContinueToVideo =
    () => {

      if (!previewData) {
        return;
      }

      console.log(
        "Moving to Video Consent:",
        previewData
      );

      setCurrentStep("video");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };


  /* =========================================
     BACK FROM VIDEO
  ========================================= */

  const handleBackFromVideo =
    () => {

      setCurrentStep("preview");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };


  /* =========================================
     VIEW AGREEMENT
  ========================================= */

  const handleViewAgreement = (
    agreement
  ) => {

    setViewingAgreement(
      agreement
    );

  };


  /* =========================================
     FINAL SUBMISSION
     
     Called ONLY from VideoConsent.
     
     IMPORTANT:
     Do NOT reset the form here.
     
     First show AgreementSuccess.
  ========================================= */

  const handleSubmitAgreement = (
    submissionData = null
  ) => {

    console.log(
      "Agreement successfully submitted:",
      {
        agreement:
          previewData,

        consent:
          submissionData,
      }
    );


    /* =====================================
       CREATE FINAL AGREEMENT OBJECT
    ===================================== */

    const completedAgreement = {

      ...(previewData || {}),

      agreement_id:
        previewData?.agreement_id ||
        `SAMS-${Date.now()}`,

      status:
        "Active",

      submitted_at:
        new Date().toISOString(),

      consent:
        submissionData,

    };


    setFinalAgreement(
      completedAgreement
    );


    /* =====================================
       REMOVE DRAFT
    ===================================== */

    try {

      const type =
        previewData?.agreement_type ||
        agreementType ||
        "new";

      sessionStorage.removeItem(
        `sams_agreement_draft_${type}`
      );

    } catch (error) {

      console.warn(
        "Unable to clear agreement draft:",
        error
      );

    }


    /* =====================================
       SHOW SUCCESS SCREEN
    ===================================== */

    setCurrentStep(
      "success"
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
     DOWNLOAD PDF
     
     FRONTEND TEST ONLY.
     
     Actual PDF generation will be connected
     later.
  ========================================= */

  const handleDownloadPDF = () => {

    console.log(
      "Download PDF clicked:",
      finalAgreement
    );

    /*
     * Actual PDF generator will be connected
     * in the next step.
     */

  };


  /* =========================================
     PREVIEW FINAL AGREEMENT
  ========================================= */

  const handlePreviewFinalAgreement =
    () => {

      console.log(
        "Preview final agreement:",
        finalAgreement
      );

      /*
       * For now open the existing agreement
       * preview using the final agreement data.
       */

      if (finalAgreement) {

        setPreviewData(
          finalAgreement
        );

        setCurrentStep(
          "preview"
        );

      }

    };


  /* =========================================
     DONE
     
     Only here the agreement creation flow
     resets to a fresh form.
  ========================================= */

  const handleAgreementDone = () => {

    setAgreementType("");

    setPreviewData(null);

    setFinalAgreement(null);

    setViewingAgreement(null);

    setCurrentStep("form");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
     RENDER
  ========================================= */

  return (

    <DashboardLayout>

      {/* =====================================
          EXISTING AGREEMENT DETAILS
      ===================================== */}

      {viewingAgreement ? (

        <AgreementDetails
          agreement={
            viewingAgreement
          }

          onBack={() =>
            setViewingAgreement(
              null
            )
          }
        />

      ) : currentStep === "preview" &&
        previewData ? (

        /* ===================================
           STEP 2
           
           AGREEMENT PREVIEW / SELLER REVIEW
           
           SAME DOCUMENT
           
           ONLY:
           EDIT + CONTINUE
        =================================== */

        <AgreementPreview

          agreement={
            previewData
          }

          buyerName={
            previewData.buyer_name
          }

          onEdit={
            handleEditPreview
          }

          onContinue={
            handleContinueToVideo
          }

          onSubmit={
            handleSubmitAgreement
          }

          onViewAgreement={
            handleViewAgreement
          }

        />

      ) : currentStep === "video" &&
        previewData ? (

        /* ===================================
           STEP 3
           
           VIDEO CONSENT
        =================================== */

        <VideoConsent

          agreement={
            previewData
          }

          buyerName={
            previewData.buyer_name
          }

          onBack={
            handleBackFromVideo
          }

          onSubmit={
            handleSubmitAgreement
          }

        />

      ) : currentStep === "success" &&
        finalAgreement ? (

        /* ===================================
           STEP 4
           
           AGREEMENT SUCCESS
           
           Download
           Preview
           Done
        =================================== */

        <AgreementSuccess

          agreement={
            finalAgreement
          }

          onDownload={
            handleDownloadPDF
          }

          onPreview={
            handlePreviewFinalAgreement
          }

          onDone={
            handleAgreementDone
          }

        />

      ) : (

        /* ===================================
           STEP 1
           
           CREATE AGREEMENT FORM
        =================================== */

        <div className="create-agreement-page">

          {/* PAGE HEADER */}

          <div className="create-agreement-header">

            <div>

              <span className="create-agreement-eyebrow">
                SAMS • Agreement Management
              </span>

              <h1>
                Create Agreement
              </h1>

              <p>
                Choose an agreement format and
                enter only the information required
                for your agreement.
              </p>

            </div>

          </div>


          {/* =================================
              STEP 1
          ================================= */}

          <div className="create-agreement-card agreement-type-card">

            <div className="agreement-step-header">

              <span className="step-number">
                1
              </span>

              <div>

                <h2>
                  Choose Agreement Type
                </h2>

                <p>
                  Select the agreement you want to
                  create.
                </p>

              </div>

            </div>


            <div className="agreement-type-grid">

              {agreementTypes.map(
                (
                  type,
                  index
                ) => {

                  const isSelected =
                    agreementType ===
                    type.code;

                  return (

                    <button
                      type="button"
                      key={type.code}

                      className={`
                        agreement-type-option
                        ${
                          isSelected
                            ? "selected"
                            : ""
                        }
                        ${
                          isSelecting
                            ? "selecting"
                            : ""
                        }
                      `}

                      style={{
                        "--agreement-index":
                          index,
                      }}

                      onClick={() =>
                        handleAgreementTypeSelect(
                          type.code
                        )
                      }

                      disabled={
                        isSelecting
                      }
                    >

                      <div className="agreement-type-icon">
                        {type.icon}
                      </div>


                      <div className="agreement-type-content">

                        <h3>
                          {type.title}
                        </h3>

                        <p>
                          {type.description}
                        </p>

                      </div>


                      <div className="agreement-type-check">

                        {isSelected && (

                          <span>
                            ✓
                          </span>

                        )}

                      </div>

                    </button>

                  );

                }
              )}

            </div>


            {selectedAgreement && (

              <div className="selected-agreement-type">

                <div className="selected-agreement-icon">
                  {
                    selectedAgreement.icon
                  }
                </div>


                <div className="selected-agreement-content">

                  <span>
                    Selected Agreement
                  </span>

                  <strong>
                    {
                      selectedAgreement.title
                    }
                  </strong>

                </div>


                <div className="selected-agreement-status">
                  Ready
                </div>

              </div>

            )}

          </div>


          {/* =================================
              STEP 2
          ================================= */}

          {agreementType && (

            <div
              id="agreement-information"
              className="
                create-agreement-card
                agreement-information-card
                agreement-form-card-enter
              "
            >

              <div className="agreement-step-header">

                <span className="step-number">
                  2
                </span>


                <div>

                  <h2>
                    Agreement Information
                  </h2>

                  <p>
                    Fill in the required information.
                    The master agreement format will
                    remain protected.
                  </p>

                </div>

              </div>


              <div className="agreement-form-selected-header">

                <div className="agreement-form-selected-icon">
                  {
                    selectedAgreement?.icon
                  }
                </div>


                <div>

                  <span>
                    Creating
                  </span>

                  <strong>
                    {
                      selectedAgreement?.title
                    }
                  </strong>

                </div>

              </div>


              <AgreementForm

                key={
                  agreementType
                }

                agreementType={
                  agreementType
                }

                submitLabel="Preview Agreement"

                onPreview={
                  handlePreview
                }

              />

            </div>

          )}

        </div>

      )}

    </DashboardLayout>

  );

}


export default CreateAgreement;