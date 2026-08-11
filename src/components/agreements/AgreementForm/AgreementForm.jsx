import { useEffect, useState } from "react";
import "./AgreementForm.css";



const DEFAULT_FORM = {
  agreementType: "",
  title: "",
  totalValue: "",
  startDate: "",
  endDate: "",
  description: "",
  terms: "",
};

const AGREEMENT_TYPES = [
  {
    code: "SUP",
    title: "Supari Agreement",
  },
  {
    code: "MON",
    title: "Money Agreement",
  },
  {
    code: "LND",
    title: "Land Agreement",
  },
  {
    code: "FRM",
    title: "Farm Agreement",
  },
];

function AgreementForm({
  agreementType = "",
  initialData = null,
  onSubmit,
  submitLabel = "Save Agreement",
  loading = false,
}) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setForm({
        ...DEFAULT_FORM,
        agreementType: agreementType || "",
      });

      return;
    }

    setForm({
      agreementType:
        initialData.agreementType ||
        agreementType ||
        "",
      title: initialData.title || "",
      totalValue: initialData.totalValue || "",
      startDate: initialData.startDate || "",
      endDate: initialData.endDate || "",
      description: initialData.description || "",
      terms: initialData.terms || "",
    });
  }, [initialData, agreementType]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!form.agreementType) {
      newErrors.agreementType =
        "Please select an agreement type.";
    }

    if (!form.title.trim()) {
      newErrors.title =
        "Please enter an agreement title.";
    }

    if (!form.totalValue) {
      newErrors.totalValue =
        "Please enter the total amount.";
    } else if (Number(form.totalValue) < 0) {
      newErrors.totalValue =
        "Amount cannot be negative.";
    }

    if (!form.startDate) {
      newErrors.startDate =
        "Please select the start date.";
    }

    if (!form.endDate) {
      newErrors.endDate =
        "Please select the end date.";
    }

    if (
      form.startDate &&
      form.endDate &&
      form.endDate < form.startDate
    ) {
      newErrors.endDate =
        "End date cannot be before start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      agreement_type: form.agreementType,
      title: form.title.trim(),
      total_value: Number(form.totalValue),
      start_date: form.startDate,
      end_date: form.endDate,
      description: form.description.trim(),
      terms: form.terms.trim(),
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      console.log("Agreement form payload:", payload);
    }
  };

  return (
    <form
      className="agreement-form"
      onSubmit={handleSubmit}
      noValidate
    >

      {/* =====================================
          BASIC INFORMATION
      ===================================== */}

      <div className="agreement-form-section">

        <div className="agreement-form-section-header">
          <div>
            <h3>Agreement Information</h3>

            <p>
              Enter the basic information for this agreement.
            </p>
          </div>
        </div>

        <div className="agreement-form-grid">

          {/* AGREEMENT TYPE */}

          <div className="agreement-form-field">

            <label htmlFor="agreementType">
              Agreement Type
              <span>*</span>
            </label>

            <select
              id="agreementType"
              name="agreementType"
              value={form.agreementType}
              onChange={handleChange}
              disabled={loading || Boolean(agreementType)}
            >
              <option value="">
                Select agreement type
              </option>

              {AGREEMENT_TYPES.map((type) => (
                <option
                  key={type.code}
                  value={type.code}
                >
                  {type.title}
                </option>
              ))}
            </select>

            {agreementType && (
              <small className="form-helper">
                Agreement type selected in Step 2.
              </small>
            )}

            {errors.agreementType && (
              <small className="form-error">
                {errors.agreementType}
              </small>
            )}

          </div>


          {/* TITLE */}

          <div className="agreement-form-field">

            <label htmlFor="title">
              Agreement Title
              <span>*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter agreement title..."
              autoComplete="off"
              disabled={loading}
            />

            {errors.title && (
              <small className="form-error">
                {errors.title}
              </small>
            )}

          </div>


          {/* TOTAL VALUE */}

          <div className="agreement-form-field">

            <label htmlFor="totalValue">
              Total Amount
              <span>*</span>
            </label>

            <div className="amount-input-wrapper">

              <span>₹</span>

              <input
                id="totalValue"
                name="totalValue"
                type="number"
                min="0"
                step="0.01"
                value={form.totalValue}
                onChange={handleChange}
                placeholder="Enter amount"
                disabled={loading}
              />

            </div>

            {errors.totalValue && (
              <small className="form-error">
                {errors.totalValue}
              </small>
            )}

          </div>

        </div>

      </div>


      {/* =====================================
          AGREEMENT PERIOD
      ===================================== */}

      <div className="agreement-form-section">

        <div className="agreement-form-section-header">

          <div>
            <h3>Agreement Period</h3>

            <p>
              Set the period during which the agreement
              will remain valid.
            </p>
          </div>

        </div>

        <div className="agreement-form-grid">

          <div className="agreement-form-field">

            <label htmlFor="startDate">
              Start Date
              <span>*</span>
            </label>

            <input
              id="startDate"
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              disabled={loading}
            />

            {errors.startDate && (
              <small className="form-error">
                {errors.startDate}
              </small>
            )}

          </div>


          <div className="agreement-form-field">

            <label htmlFor="endDate">
              End Date
              <span>*</span>
            </label>

            <input
              id="endDate"
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              disabled={loading}
            />

            {errors.endDate && (
              <small className="form-error">
                {errors.endDate}
              </small>
            )}

          </div>

        </div>

      </div>


      {/* =====================================
          DESCRIPTION & TERMS
      ===================================== */}

      <div className="agreement-form-section">

        <div className="agreement-form-section-header">

          <div>
            <h3>Description & Terms</h3>

            <p>
              Add additional information and agreement
              terms if required.
            </p>
          </div>

        </div>


        <div className="agreement-form-field">

          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter agreement description..."
            rows="4"
            disabled={loading}
          />

        </div>


        <div className="agreement-form-field">

          <label htmlFor="terms">
            Terms & Conditions
          </label>

          <textarea
            id="terms"
            name="terms"
            value={form.terms}
            onChange={handleChange}
            placeholder="Enter agreement terms and conditions..."
            rows="6"
            disabled={loading}
          />

        </div>

      </div>


      {/* =====================================
          ACTIONS
      ===================================== */}

      <div className="agreement-form-actions">

        <button
          type="button"
          className="agreement-form-cancel"
          disabled={loading}
          onClick={() => {
            setForm({
              ...DEFAULT_FORM,
              agreementType: agreementType || "",
            });

            setErrors({});
          }}
        >
          Clear
        </button>

        <button
          type="submit"
          className="agreement-form-submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : submitLabel}
        </button>

      </div>

    </form>
  );
}

export default AgreementForm;