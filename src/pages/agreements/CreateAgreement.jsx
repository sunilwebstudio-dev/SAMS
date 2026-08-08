import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import SellerSearch from "../../components/agreements/SellerSearch";
import "./CreateAgreement.css";

function CreateAgreement() {
  const [agreementType, setAgreementType] = useState("");

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
  ];

  return (
    <DashboardLayout>

      <div className="create-agreement-page">

        {/* PAGE HEADER */}
        <div className="create-agreement-header">

          <div>
            <h1>Create Agreement</h1>

            <p>
              Create a new agreement or continue with an existing seller.
            </p>
          </div>

        </div>

        {/* STEP 1 */}
        <div className="create-agreement-card">

          <div className="agreement-step-header">

            <span className="step-number">
              1
            </span>

            <div>
              <h2>Find Seller</h2>

              <p>
                Search for the seller before creating the agreement.
              </p>
            </div>

          </div>

          <SellerSearch />

        </div>

        {/* STEP 2 */}
        <div className="create-agreement-card agreement-type-card">

          <div className="agreement-step-header">

            <span className="step-number">
              2
            </span>

            <div>
              <h2>Agreement Type</h2>

              <p>
                Select the type of agreement you want to create.
              </p>
            </div>

          </div>

          <div className="agreement-type-grid">

            {agreementTypes.map((type) => (

              <button
                type="button"
                key={type.code}
                className={`agreement-type-option ${
                  agreementType === type.code
                    ? "selected"
                    : ""
                }`}
                onClick={() => setAgreementType(type.code)}
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
                  {agreementType === type.code ? "✓" : ""}
                </div>

              </button>

            ))}

          </div>

          {agreementType && (
            <div className="selected-agreement-type">

              <span>
                Selected Agreement Type
              </span>

              <strong>
                {
                  agreementTypes.find(
                    (type) => type.code === agreementType
                  )?.title
                }
              </strong>

            </div>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default CreateAgreement;