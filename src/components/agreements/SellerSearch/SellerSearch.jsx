import { useState } from "react";
import "./SellerSearch.css";
import { sellers } from "../../../data/sellers";

function SellerSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const searchSeller = (value) => {
    const keyword = value.trim().toLowerCase();

    if (!keyword) {
      setResults([]);
      setSelectedSeller(null);
      return;
    }

    const matched = sellers.filter((seller) =>
      seller.name.toLowerCase().includes(keyword)
    );

    setResults(matched);
    setSelectedSeller(null);
  };

  const handleChange = (event) => {
    const value = event.target.value;

    setSearch(value);
    searchSeller(value);
  };

  const handleSearch = () => {
    searchSeller(search);
  };

  const handleSelectSeller = (seller) => {
    setSelectedSeller(seller);
    setSearch(seller.name);
    setResults([]);
  };

  const handleClear = () => {
    setSearch("");
    setResults([]);
    setSelectedSeller(null);
  };

  return (
    <div className="seller-search">

      <h2 className="seller-search-title">
        Seller Information
      </h2>

      <p className="seller-search-description">
        Search for an existing seller before creating an agreement.
      </p>

      <div className="seller-search-group">

        <label htmlFor="seller-search-input">
          Seller Name
        </label>

        <div className="seller-search-row">

          <input
            id="seller-search-input"
            type="text"
            value={search}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSearch();
              }
            }}
            placeholder="Enter seller name..."
            autoComplete="off"
          />

          <button
            type="button"
            className="seller-search-button"
            onClick={handleSearch}
          >
            Search
          </button>

          {search && (
            <button
              type="button"
              className="seller-clear-button"
              onClick={handleClear}
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* SEARCH RESULTS */}

      {search.trim() && results.length > 0 && (
        <div className="seller-results">

          <div className="seller-results-header">

            <h3>Search Results</h3>

            <span>
              {results.length} seller
              {results.length !== 1 ? "s" : ""} found
            </span>

          </div>

          {results.map((seller) => (
            <button
              type="button"
              className="seller-result-card"
              key={seller.id}
              onClick={() => handleSelectSeller(seller)}
            >

              <div className="seller-avatar">
                {seller.name.charAt(0)}
              </div>

              <div className="seller-result-info">

                <strong>
                  {seller.name}
                </strong>

                <span>
                  Father / Guardian: {seller.fatherName}
                </span>

                <small>
                  {seller.village}
                </small>

              </div>

              {seller.activeAgreement && (
                <span className="active-badge">
                  Active Agreement
                </span>
              )}

            </button>
          ))}

        </div>
      )}

      {/* NO RESULT */}

      {search.trim() && results.length === 0 && !selectedSeller && (
        <div className="seller-results">

          <div className="no-seller">

            <strong>
              No seller found
            </strong>

            <p>
              No seller matched "{search}".
            </p>

          </div>

        </div>
      )}

      {/* SELECTED SELLER */}

      {selectedSeller && (
        <div className="selected-seller-card">

          <div className="selected-seller-header">

            <div className="selected-seller-avatar">
              {selectedSeller.name.charAt(0)}
            </div>

            <div>

              <h3>
                {selectedSeller.name}
              </h3>

              <p>
                Seller ID: {selectedSeller.id}
              </p>

            </div>

            <span className="selected-badge">
              Selected
            </span>

          </div>

          <div className="seller-details-grid">

            <div>
              <span>Father / Guardian</span>
              <strong>
                {selectedSeller.fatherName}
              </strong>
            </div>

            <div>
              <span>Village</span>
              <strong>
                {selectedSeller.village}
              </strong>
            </div>

            <div>
              <span>Address</span>
              <strong>
                {selectedSeller.address}
              </strong>
            </div>

          </div>

          {selectedSeller.activeAgreement ? (

            <div className="active-agreement-warning">

              <strong>
                Active Agreement Found
              </strong>

              <p>
                Agreement No:{" "}
                <strong>
                  {selectedSeller.agreementNo}
                </strong>
              </p>

              <p>
                This seller already has an active agreement up to{" "}
                <strong>
                  {selectedSeller.agreementEnd}
                </strong>.
              </p>

            </div>

          ) : (

            <div className="new-agreement-message">

              <strong>
                ✓ Seller is available
              </strong>

              <p>
                No active agreement was found for this seller.
              </p>

            </div>

          )}

        </div>
      )}

    </div>
  );
}

export default SellerSearch;