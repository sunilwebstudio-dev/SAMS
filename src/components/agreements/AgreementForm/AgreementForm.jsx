import { useEffect, useMemo, useState } from "react";
import "./AgreementForm.css";

const DEFAULT_FORM = {
  agreementType: "",
  sellerName: "",
  purchaseYear: "",
  validityYears: "",
  endingYear: "",
  totalBaganPrice: "",
  cuttingPeriod: "",
  witness1: "",
  witness2: "",
  witness3: "",
};

const getDraftKey = (agreementType) =>
  `sams_agreement_draft_${agreementType || "new"}`;

const AGREEMENT_TYPES = [
  {
    code: "SUP",
    title: "Supari Agreement",
    icon: "🌿",
  },
  {
    code: "MON",
    title: "Money Agreement",
    icon: "💰",
  },
  {
    code: "LND",
    title: "Land Agreement",
    icon: "🏞️",
  },
  {
    code: "FRM",
    title: "Farm Agreement",
    icon: "🌾",
  },
  {
    code: "OTHER",
    title: "Other Agreement",
    icon: "📄",
  },
];

function AgreementForm({
  agreementType = "",
  initialData = null,
  buyerName = "",
  onSubmit,
  onPreview,
  submitLabel = "Preview Agreement",
  loading = false,
}) {
  const [form, setForm] = useState(() => {
  try {
    const key = getDraftKey(agreementType);

    const savedDraft =
      sessionStorage.getItem(key);

    if (savedDraft) {
      return JSON.parse(savedDraft);
    }
  } catch (error) {
    console.warn(
      "Unable to restore agreement draft:",
      error
    );
  }

  return {
    ...DEFAULT_FORM,
    agreementType: agreementType || "",
  };
});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [visibleFields, setVisibleFields] = useState(0);

  const selectedType = useMemo(
    () =>
      AGREEMENT_TYPES.find(
        (type) => type.code === form.agreementType
      ),
    [form.agreementType]
  );

  /*
   * =========================================
   * INITIAL DATA
   * =========================================
   */

  useEffect(() => {
  const type =
    agreementType ||
    initialData?.agreementType ||
    "";

  if (initialData) {
    setForm({
      ...DEFAULT_FORM,

      agreementType: type,

      sellerName:
        initialData.sellerName || "",

      purchaseYear:
        initialData.purchaseYear || "",

      validityYears:
        initialData.validityYears || "",

      endingYear:
        initialData.endingYear || "",

      totalBaganPrice:
        initialData.totalBaganPrice || "",

      cuttingPeriod:
        initialData.cuttingPeriod || "",

      witness1:
        initialData.witness1 || "",

      witness2:
        initialData.witness2 || "",

      witness3:
        initialData.witness3 || "",
    });

    return;
  }

  try {
    const savedDraft =
      sessionStorage.getItem(
        getDraftKey(type)
      );

    if (savedDraft) {
      setForm(JSON.parse(savedDraft));
      return;
    }
  } catch (error) {
    console.warn(
      "Unable to restore agreement draft:",
      error
    );
  }

  setForm({
    ...DEFAULT_FORM,
    agreementType: type,
  });

  setErrors({});
  setTouched({});
  setVisibleFields(0);
}, [agreementType, initialData]);


  /*
   * =========================================
   * AUTO CALCULATE ENDING YEAR
   * =========================================
   */

  useEffect(() => {
    if (
      !form.purchaseYear ||
      !form.validityYears
    ) {
      setForm((previous) => ({
        ...previous,
        endingYear: "",
      }));

      return;
    }

    const purchaseYear =
      Number(form.purchaseYear);

    const validityYears =
      Number(form.validityYears);

    if (
      !Number.isFinite(purchaseYear) ||
      !Number.isFinite(validityYears) ||
      purchaseYear <= 0 ||
      validityYears <= 0
    ) {
      setForm((previous) => ({
        ...previous,
        endingYear: "",
      }));

      return;
    }

    const endingYear =
      purchaseYear + validityYears;

    setForm((previous) => ({
      ...previous,
      endingYear: String(endingYear),
    }));
  }, [
    form.purchaseYear,
    form.validityYears,
  ]);

  /*
   * =========================================
   * PREMIUM FIELD REVEAL
   * =========================================
   */

  useEffect(() => {
    if (!form.agreementType) {
      setVisibleFields(0);
      return;
    }

    const timer = setInterval(() => {
      setVisibleFields((previous) => {
        if (previous >= 7) {
          clearInterval(timer);
          return previous;
        }

        return previous + 1;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [form.agreementType]);

  /*
   * =========================================
   * CHANGE
   * =========================================
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };
  
  /*
 * =========================================
 * SAVE DRAFT
 * =========================================
 */

useEffect(() => {
  if (!form.agreementType) {
    return;
  }

  try {
    const key =
      getDraftKey(form.agreementType);

    sessionStorage.setItem(
      key,
      JSON.stringify(form)
    );
  } catch (error) {
    console.warn(
      "Unable to save agreement draft:",
      error
    );
  }
}, [form]);


  /*
   * =========================================
   * BLUR
   * =========================================
   */

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    validateField(name, form[name]);
  };

  /*
   * =========================================
   * FIELD VALIDATION
   * =========================================
   */

  const validateField = (name, value) => {
    let message = "";

    if (
      name === "sellerName" &&
      !value.trim()
    ) {
      message =
        "Seller name is required.";
    }

    if (name === "purchaseYear") {
      if (!value) {
        message =
          "Purchase year is required.";
      } else if (
        Number(value) < 1900 ||
        Number(value) > 2100
      ) {
        message =
          "Enter a valid purchase year.";
      }
    }

    if (name === "validityYears") {
      if (!value) {
        message =
          "Validity is required.";
      } else if (
        Number(value) <= 0
      ) {
        message =
          "Validity must be greater than 0.";
      }
    }

    if (name === "totalBaganPrice") {
      if (!value) {
        message =
          "Total Bagan Price is required.";
      } else if (
        Number(value) < 0
      ) {
        message =
          "Amount cannot be negative.";
      }
    }

   if (name === "cuttingPeriod") {
  if (!value) {
    message =
      "Cutting year is required.";
  } else if (
    !Number.isInteger(Number(value)) ||
    Number(value) < 1900 ||
    Number(value) > 2100
  ) {
    message =
      "Enter a valid cutting year.";
  }
}
    setErrors((previous) => ({
      ...previous,
      [name]: message,
    }));

    return message;
  };

  /*
   * =========================================
   * FULL VALIDATION
   * =========================================
   */

  const validateForm = () => {
    const fields = [
      "sellerName",
      "purchaseYear",
      "validityYears",
      "totalBaganPrice",
      "cuttingPeriod",
    ];

    const newErrors = {};

    fields.forEach((field) => {
      const value = form[field];

      if (
        field === "sellerName" &&
        !value.trim()
      ) {
        newErrors[field] =
          "Seller name is required.";
      }

      if (field === "purchaseYear") {
        if (!value) {
          newErrors[field] =
            "Purchase year is required.";
        } else if (
          Number(value) < 1900 ||
          Number(value) > 2100
        ) {
          newErrors[field] =
            "Enter a valid purchase year.";
        }
      }

      if (field === "validityYears") {
        if (!value) {
          newErrors[field] =
            "Validity is required.";
        } else if (
          Number(value) <= 0
        ) {
          newErrors[field] =
            "Validity must be greater than 0.";
        }
      }

      if (field === "totalBaganPrice") {
        if (!value) {
          newErrors[field] =
            "Total Bagan Price is required.";
        } else if (
          Number(value) < 0
        ) {
          newErrors[field] =
            "Amount cannot be negative.";
        }
      }

      if (field === "cuttingPeriod") {
  if (!value) {
    newErrors[field] =
      "Cutting year is required.";
  } else if (
    !Number.isInteger(Number(value)) ||
    Number(value) < 1900 ||
    Number(value) > 2100
  ) {
    newErrors[field] =
      "Enter a valid cutting year.";
  }
}
    });

    setErrors(newErrors);

    setTouched({
      sellerName: true,
      purchaseYear: true,
      validityYears: true,
      totalBaganPrice: true,
      cuttingPeriod: true,
    });

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /*
   * =========================================
   * BUILD PAYLOAD
   * =========================================
   */

  const buildPayload = () => {
    const today = new Date();

    const agreementDate =
      today.toISOString().split("T")[0];

    return {
      agreement_type:
        form.agreementType,

      seller_name:
        form.sellerName.trim(),

      buyer_name:
        buyerName || "",

      agreement_date:
        agreementDate,

      purchase_year:
        Number(form.purchaseYear),

      validity_years:
        Number(form.validityYears),

      ending_year:
        Number(form.endingYear),

      total_bagan_price:
        Number(form.totalBaganPrice),

      cutting_period:
        form.cuttingPeriod.trim(),

      witnesses: {
        witness_1:
          form.witness1.trim(),

        witness_2:
          form.witness2.trim(),

        witness_3:
          form.witness3.trim(),
      },

      /*
       * Generated later by backend.
       */

      agreement_id: null,

      customer_id: null,

      template_id: null,

      template_version: null,

      pdf_url: null,
    };
  };

  /*
   * =========================================
   * PREVIEW
   * =========================================
   */

  const handlePreview = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload =
      buildPayload();

    if (onPreview) {
      onPreview(payload);
      return;
    }

    if (onSubmit) {
      onSubmit(payload);
      return;
    }

    console.log(
      "Agreement Preview Payload:",
      payload
    );
  };

  /*
   * =========================================
   * CLEAR
   * =========================================
   */

  const handleClear = () => {
    setForm({
      ...DEFAULT_FORM,

      agreementType:
        agreementType || "",
    });

    setErrors({});
    setTouched({});
  };

  /*
   * =========================================
   * RENDER
   * =========================================
   */

  return (
    <form
      className="agreement-form"
      onSubmit={handlePreview}
      noValidate
    >

      {/* =====================================
          SELECTED AGREEMENT
      ===================================== */}

      <div className="agreement-form-type-banner">

        <div className="agreement-form-type-icon">
          {selectedType?.icon || "📄"}
        </div>

        <div>
          <span>
            Selected Agreement
          </span>

          <strong>
            {selectedType?.title ||
              "Agreement"}
          </strong>
        </div>

        <div className="agreement-form-type-status">
          ✓ Ready
        </div>

      </div>


      {/* =====================================
          SUPARI FORM
      ===================================== */}

      {form.agreementType === "SUP" && (
        <>

          {/* BASIC INFORMATION */}

          <div
            className={`agreement-form-section form-section-animate ${
              visibleFields >= 1
                ? "visible"
                : ""
            }`}
          >

            <div className="agreement-form-section-header">

              <div>
                <h3>
                  Supari Agreement Details
                </h3>

                <p>
                  Fill only the information
                  required for the Supari Master
                  Agreement.
                </p>
              </div>

              <span className="section-badge">
                Step 1
              </span>

            </div>


            <div className="agreement-form-grid">

              {/* SELLER */}

              <div className="agreement-form-field">

                <label htmlFor="sellerName">
                  Seller Name
                  <span>*</span>
                </label>

                <input
                  id="sellerName"
                  name="sellerName"
                  type="text"
                  value={form.sellerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter seller name"
                  autoComplete="off"
                  disabled={loading}
                  className={
                    touched.sellerName &&
                    errors.sellerName
                      ? "has-error"
                      : ""
                  }
                />

                {errors.sellerName && (
                  <small className="form-error">
                    {errors.sellerName}
                  </small>
                )}

                <small className="form-helper">
                  You can enter the seller
                  details manually. SAMS AI will
                  also support this field later.
                </small>

              </div>


              {/* BUYER */}

              <div className="agreement-form-field">

                <label htmlFor="buyerName">
                  Buyer Name
                </label>

                <div className="automatic-field">

                  <input
                    id="buyerName"
                    type="text"
                    value={
                      buyerName ||
                      "Will be filled from your profile"
                    }
                    readOnly
                    disabled
                  />

                  <span className="automatic-badge">
                    Automatic
                  </span>

                </div>

                <small className="form-helper">
                  Buyer information will come
                  from the logged-in buyer profile.
                </small>

              </div>


              {/* AGREEMENT DATE */}

              <div className="agreement-form-field">

                <label>
                  Agreement Date
                </label>

                <div className="automatic-field">

                  <input
                    type="text"
                    value={new Date().toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                    readOnly
                    disabled
                  />

                  <span className="automatic-badge">
                    Automatic
                  </span>

                </div>

              </div>


              {/* PURCHASE YEAR */}

              <div className="agreement-form-field">

                <label htmlFor="purchaseYear">
                  Purchase Year
                  <span>*</span>
                </label>

                <input
                  id="purchaseYear"
                  name="purchaseYear"
                  type="number"
                  min="1900"
                  max="2100"
                  step="1"
                  value={form.purchaseYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 2026"
                  disabled={loading}
                  className={
                    touched.purchaseYear &&
                    errors.purchaseYear
                      ? "has-error"
                      : ""
                  }
                />

                {errors.purchaseYear && (
                  <small className="form-error">
                    {errors.purchaseYear}
                  </small>
                )}

                <small className="form-helper">
                  The year from which the buyer
                  purchased the agreement.
                </small>

              </div>


              {/* VALIDITY */}

              <div className="agreement-form-field">

                <label htmlFor="validityYears">
                  Agreement अवधि
                  <span>*</span>
                </label>

                <div className="input-with-suffix">

                  <input
                    id="validityYears"
                    name="validityYears"
                    type="number"
                    min="1"
                    step="1"
                    value={form.validityYears}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. 5"
                    disabled={loading}
                    className={
                      touched.validityYears &&
                      errors.validityYears
                        ? "has-error"
                        : ""
                    }
                  />

                  <span>
                    Years
                  </span>

                </div>

                {errors.validityYears && (
                  <small className="form-error">
                    {errors.validityYears}
                  </small>
                )}

                <small className="form-helper">
                  How many years the agreement
                  remains valid.
                </small>

              </div>


              {/* ENDING YEAR */}

              <div className="agreement-form-field">

                <label htmlFor="endingYear">
                  Ending Year
                </label>

                <div className="automatic-field">

                  <input
                    id="endingYear"
                    name="endingYear"
                    type="text"
                    value={
                      form.endingYear ||
                      "Will be calculated automatically"
                    }
                    readOnly
                    disabled
                  />

                  <span className="automatic-badge">
                    Automatic
                  </span>

                </div>

                <small className="form-helper">
                  Purchase Year + Agreement अवधि.
                </small>

              </div>

            </div>
          

          </div>


          {/* BAGAN INFORMATION */}

          <div
            className={`agreement-form-section form-section-animate ${
              visibleFields >= 2
                ? "visible"
                : ""
            }`}
          >

            <div className="agreement-form-section-header">

              <div>
                <h3>
                  Bagan Information
                </h3>

                <p>
                  Enter the financial and cutting
                  information required by the master.
                </p>
              </div>

              <span className="section-badge">
                Step 2
              </span>

            </div>


            <div className="agreement-form-grid">

              {/* TOTAL PRICE */}

              <div className="agreement-form-field">

                <label htmlFor="totalBaganPrice">
                  Total Bagan Price
                  <span>*</span>
                </label>

                <div className="amount-input-wrapper">

                  <span>
                    ₹
                  </span>

                  <input
                    id="totalBaganPrice"
                    name="totalBaganPrice"
                    type="number"
                    min="0"
                    step="1"
                    value={
                      form.totalBaganPrice
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter total amount"
                    disabled={loading}
                    className={
                      touched.totalBaganPrice &&
                      errors.totalBaganPrice
                        ? "has-error"
                        : ""
                    }
                  />

                </div>

                {errors.totalBaganPrice && (
                  <small className="form-error">
                    {errors.totalBaganPrice}
                  </small>
                )}

              </div>


              {/* CUTTING PERIOD */}

              <div className="agreement-form-field">

                <label htmlFor="cuttingPeriod">
                  Cutting Period
                  <span>*</span>
                </label>

                <input
                  id="cuttingPeriod"
                  name="cuttingPeriod"
                  type="number"
                  min="1900"
                  max="2100"
                  step="1"
                  value={form.cuttingPeriod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 2031"
                  disabled={loading}
                  className={
                    touched.cuttingPeriod &&
                    errors.cuttingPeriod
                      ? "has-error"
                      : ""
                  }
                />

            

                {errors.cuttingPeriod && (
                  <small className="form-error">
                    {errors.cuttingPeriod}
                  </small>
                )}

                <small className="form-helper">
                  Example: April 2031
                </small>

              </div>

            </div>

          </div>


          {/* WITNESSES */}

          <div
            className={`agreement-form-section form-section-animate ${
              visibleFields >= 3
                ? "visible"
                : ""
            }`}
          >

            <div className="agreement-form-section-header">

              <div>
                <h3>
                  Witness Information
                </h3>

                <p>
                  Enter the witness names required
                  for the agreement.
                </p>
              </div>

              <span className="section-badge">
                Step 3
              </span>

            </div>


            <div className="agreement-form-grid">

              <div className="agreement-form-field">

                <label htmlFor="witness1">
                  Witness 1
                </label>

                <input
                  id="witness1"
                  name="witness1"
                  type="text"
                  value={form.witness1}
                  onChange={handleChange}
                  placeholder="Enter witness name"
                  autoComplete="off"
                  disabled={loading}
                />

              </div>


              <div className="agreement-form-field">

                <label htmlFor="witness2">
                  Witness 2
                </label>

                <input
                  id="witness2"
                  name="witness2"
                  type="text"
                  value={form.witness2}
                  onChange={handleChange}
                  placeholder="Enter witness name"
                  autoComplete="off"
                  disabled={loading}
                />

              </div>


              <div className="agreement-form-field">

                <label htmlFor="witness3">
                  Witness 3
                </label>

                <input
                  id="witness3"
                  name="witness3"
                  type="text"
                  value={form.witness3}
                  onChange={handleChange}
                  placeholder="Enter witness name"
                  autoComplete="off"
                  disabled={loading}
                />

              </div>

            </div>

          </div>


          {/* AUTOMATIC INFORMATION */}

          <div
            className={`agreement-form-section automatic-info-section form-section-animate ${
              visibleFields >= 4
                ? "visible"
                : ""
            }`}
          >

            <div className="agreement-form-section-header">

              <div>
                <h3>
                  Automatically Generated
                </h3>

                <p>
                  These values will be handled by
                  SAMS automatically.
                </p>
              </div>

              <span className="section-badge success">
                Automatic
              </span>

            </div>


            <div className="automatic-info-grid">

              <div className="automatic-info-item">

                <span>
                  Agreement Number
                </span>

                <strong>
                  Generated after submission
                </strong>

              </div>


              <div className="automatic-info-item">

                <span>
                  Seller Signature Name
                </span>

                <strong>
                  Seller Name
                </strong>

              </div>


              <div className="automatic-info-item">

                <span>
                  Buyer Signature Name
                </span>

                <strong>
                  Buyer Profile Name
                </strong>

              </div>


              <div className="automatic-info-item">

                <span>
                  PDF
                </span>

                <strong>
                  Generated after submission
                </strong>

              </div>

            </div>

          </div>


          {/* MASTER NOTE */}

          <div
            className={`agreement-master-note form-section-animate ${
              visibleFields >= 5
                ? "visible"
                : ""
            }`}
          >

            <div className="master-note-icon">
              ✓
            </div>

            <div>

              <strong>
                Master Agreement Protected
              </strong>

              <p>
                The legal wording of the master
                agreement will remain unchanged.
                Only the designated fields will be
                filled with your information.
              </p>

            </div>

          </div>

        </>
      )}


      {/* =====================================
          OTHER AGREEMENT — TEMPORARY UI
      ===================================== */}

      {form.agreementType === "OTHER" && (
        <div className="agreement-form-section form-section-animate visible">

          <div className="agreement-form-section-header">

            <div>

              <h3>
                Other Agreement
              </h3>

              <p>
                Tell SAMS what type of agreement
                you want to create.
              </p>

            </div>

          </div>


          <div className="agreement-form-field">

            <label htmlFor="otherAgreementName">
              Agreement Name
              <span>*</span>
            </label>

            <input
              id="otherAgreementName"
              type="text"
              placeholder="e.g. Shop Rent Agreement"
              disabled={loading}
            />

            <small className="form-helper">
              The required fields and suitable
              format will be prepared according to
              the selected agreement type.
            </small>

          </div>

        </div>
      )}


      {/* =====================================
          ACTIONS
      ===================================== */}

      {form.agreementType && (
        <div className="agreement-form-actions">

          <button
            type="button"
            className="agreement-form-cancel"
            disabled={loading}
            onClick={handleClear}
          >
            Clear
          </button>


          <button
            type="submit"
            className="agreement-form-submit"
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="button-spinner" />

                Preparing...
              </>
            ) : (
              <>
                <span>
                  {submitLabel}
                </span>

                <span className="button-arrow">
                  →
                </span>
              </>
            )}

          </button>

        </div>
      )}

    </form>
  );
}

export default AgreementForm;