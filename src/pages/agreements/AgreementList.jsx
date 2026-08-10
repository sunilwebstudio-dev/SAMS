import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AgreementList.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";



function AgreementList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  /*
    API-ready structure.

    Later this data will come from:
    Backend API → Supabase/PostgreSQL

    Do not connect database directly from this component.
  */

  const agreements = [];

  const filteredAgreements = agreements.filter((agreement) => {
    const keyword = search.trim().toLowerCase();

    const matchesSearch =
      !keyword ||
      agreement.agreement_no
        ?.toLowerCase()
        .includes(keyword) ||
      agreement.seller_name
        ?.toLowerCase()
        .includes(keyword) ||
      agreement.title
        ?.toLowerCase()
        .includes(keyword);

    const matchesStatus =
      statusFilter === "all" ||
      agreement.status === statusFilter;

    const matchesType =
      typeFilter === "all" ||
      agreement.agreement_type === typeFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesType
    );
  });

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
  };

  const handleAgreementClick = (agreementId) => {
    navigate(`/agreements/${agreementId}`);
  };

  return (
     <DashboardLayout>

         <div className="agreement-list-page">

         
    <div className="agreement-list-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="agreement-list-header">

        <div>
          <h1>Agreements</h1>

          <p>
            Manage and review all your agreements.
          </p>
        </div>

        <NavLink
          to="/agreements/create"
          className="create-agreement-btn"
        >
          <span>+</span>
          Create Agreement
        </NavLink>

      </div>

      {/* =====================================
          FILTER CARD
      ===================================== */}

      <div className="agreement-filter-card">

        <div className="agreement-search">

          <span className="agreement-search-icon">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by agreement no., seller or title..."
            autoComplete="off"
          />

        </div>

        <div className="agreement-filter">

          <label htmlFor="agreement-status">
            Status
          </label>

          <select
            id="agreement-status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="all">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="expired">
              Expired
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>

        </div>

        <div className="agreement-filter">

          <label htmlFor="agreement-type">
            Agreement Type
          </label>

          <select
            id="agreement-type"
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
          >
            <option value="all">
              All Types
            </option>

            <option value="money">
              Money
            </option>

            <option value="supari">
              Supari
            </option>

            <option value="land">
              Land
            </option>

            <option value="other">
              Other
            </option>
          </select>

        </div>

        {(search ||
          statusFilter !== "all" ||
          typeFilter !== "all") && (
          <button
            type="button"
            className="clear-filter-btn"
            onClick={handleClearFilters}
          >
            Clear
          </button>
        )}

      </div>

      {/* =====================================
          RESULTS
      ===================================== */}

      <div className="agreement-results-card">

        <div className="agreement-results-header">

          <div>
            <h2>
              All Agreements
            </h2>

            <p>
              {filteredAgreements.length} agreements found
            </p>
          </div>

        </div>

        {filteredAgreements.length > 0 ? (

          <div className="agreement-list-table-wrapper">

            <div className="agreement-list-table">

              {/* TABLE HEADER */}

              <div className="agreement-list-table-header">

                <span>
                  Agreement No.
                </span>

                <span>
                  Seller
                </span>

                <span>
                  Type
                </span>

                <span>
                  Amount
                </span>

                <span>
                  Start Date
                </span>

                <span>
                  End Date
                </span>

                <span>
                  Status
                </span>

              </div>

              {/* TABLE ROWS */}

              {filteredAgreements.map(
                (agreement) => (

                  <div
                    className="agreement-list-table-row"
                    key={agreement.id}
                  >

                    <button
                      type="button"
                      className="agreement-number-link"
                      onClick={() =>
                        handleAgreementClick(
                          agreement.id
                        )
                      }
                    >
                      {agreement.agreement_no}
                    </button>

                    <button
                      type="button"
                      className="agreement-seller-link"
                      onClick={() =>
                        handleAgreementClick(
                          agreement.id
                        )
                      }
                    >
                      {agreement.seller_name}
                    </button>

                    <span>
                      {agreement.agreement_type}
                    </span>

                    <span>
                      ₹
                      {Number(
                        agreement.total_value
                      ).toLocaleString("en-IN")}
                    </span>

                    <span>
                      {agreement.start_date}
                    </span>

                    <span>
                      {agreement.end_date}
                    </span>

                    <span>
                      <strong
                        className={`agreement-status ${agreement.status}`}
                      >
                        {agreement.status}
                      </strong>
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        ) : (

          /* =================================
             EMPTY STATE
          ================================= */

          <div className="agreement-empty-state">

            <div className="agreement-empty-icon">
              📄
            </div>

            <h3>
              No agreements found
            </h3>

            <p>
              {search ||
              statusFilter !== "all" ||
              typeFilter !== "all"
                ? "Try changing your search or filters."
                : "Your agreements will appear here once they are created."}
            </p>

            {!search &&
              statusFilter === "all" &&
              typeFilter === "all" && (
                <NavLink
                  to="/agreements/create"
                  className="empty-create-btn"
                >
                  Create Your First Agreement
                </NavLink>
              )}

              

          </div>

        )}

      </div>

    </div>

    </div>
    
     </DashboardLayout>
  );
}

export default AgreementList;