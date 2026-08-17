import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import AgreementForm from "../../components/agreements/AgreementForm/AgreementForm";
import AgreementPreview from "../../components/agreements/AgreementPreview/AgreementPreview";
import "./CreateAgreement.css";

function CreateAgreement() {
  const [agreementType, setAgreementType] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const agreementTypes = [
    {
      code: "SUP",
      title: "Supari Agreement",
      description: "Supari Bagan sale agreement",
      icon: "🌿",
    },
    {
      code: "MON",
      title: "Money Agreement",
      description: "Money lending agreement",
      icon: "💰",
    },
    {
      code: "LND",
      title: "Land Agreement",
      description: "Land related agreement",
      icon: "🏞️",
    },
    {
      code: "FRM",
      title: "Farm Agreement",
      description: "Farm related agreement",
      icon: "🌾",
    },
    {
      code: "OTHER",
      title: "Other Agreement",
      description: "Create another type of agreement",
      icon: "📄",
    },
  ];

  /* =========================================
     AGREEMENT TYPE SELECTION
  ========================================= */

  const handleAgreementTypeSelect = (code) => {
    if (isSelecting) {
      return;
    }

    setIsSelecting(true);

    setTimeout(() => {
      setAgreementType(code);
      setPreviewData(null);
      setIsSelecting(false);
    }, 180);
  };


  /* =========================================
     SCROLL TO FORM
  ========================================= */

  useEffect(() => {
    if (!agreementType || previewData) {
      return;
    }

    const timer = setTimeout(() => {
      document
        .getElementById("agreement-information")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 220);

    return () => clearTimeout(timer);
  }, [agreementType, previewData]);


  /* =========================================
     SELECTED AGREEMENT
  ========================================= */

  const selectedAgreement = agreementTypes.find(
    (type) => type.code === agreementType
  );


  /* =========================================
     PREVIEW
  ========================================= */

  const handlePreview = (payload) => {
    console.log(
      "SAMS Agreement Preview:",
      payload
    );

    setPreviewData(payload);
  };


  /* =========================================
     EDIT FROM PREVIEW
  ========================================= */

  const handleEditPreview = () => {
    setPreviewData(null);

    setTimeout(() => {
      document
        .getElementById("agreement-information")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };


  /* =========================================
     FINAL SUBMISSION
  ========================================= */

  const handleSubmitAgreement = () => {
    console.log(
      "Agreement successfully submitted:",
      previewData
    );

    /*
      IMPORTANT:

      Successful submission ke baad old draft ko
      sessionStorage se remove kar rahe hain.

      Isliye next time form completely blank
      open hoga.
    */

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

    /*
      Preview ko close karo
      aur agreement type reset karo.
    */

    setPreviewData(null);

    setTimeout(() => {
      setAgreementType("");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 80);
  };


  return (
    <DashboardLayout>

      {!previewData ? (

        <div className="create-agreement-page">

          {/* ===================================
              PAGE HEADER
          =================================== */}

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


          {/* ===================================
              STEP 1
          =================================== */}

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
                (type, index) => {

                  const isSelected =
                    agreementType === type.code;

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
                      disabled={isSelecting}
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
                  {selectedAgreement.icon}
                </div>

                <div className="selected-agreement-content">

                  <span>
                    Selected Agreement
                  </span>

                  <strong>
                    {selectedAgreement.title}
                  </strong>

                </div>

                <div className="selected-agreement-status">
                  Ready
                </div>

              </div>

            )}

          </div>


          {/* ===================================
              STEP 2
          =================================== */}

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
                  {selectedAgreement?.icon}
                </div>

                <div>

                  <span>
                    Creating
                  </span>

                  <strong>
                    {selectedAgreement?.title}
                  </strong>

                </div>

              </div>


              <AgreementForm
                agreementType={agreementType}
                submitLabel="Preview Agreement"
                onPreview={handlePreview}
              />

            </div>

          )}

        </div>

      ) : (

        <AgreementPreview
          agreement={previewData}
          buyerName={previewData.buyer_name}
          onEdit={handleEditPreview}
          onSubmit={handleSubmitAgreement}
        />

      )}

    </DashboardLayout>
  );
}

export default CreateAgreement;