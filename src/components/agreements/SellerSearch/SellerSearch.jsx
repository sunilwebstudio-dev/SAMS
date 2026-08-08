import { useState } from "react";
import "./SellerSearch.css";

const sampleSellers = [
  {
    id: "SEL-000001",
    name: "Ram Rai",
    fatherName: "Shyam Rai",
    village: "Ambari Bagan",
    address: "Upper Line, Ambari Bagan",
    activeAgreement: true,
    agreementNo: "SUP-2027-000001",
    agreementEnd: "2028",
  },
  {
    id: "SEL-000002",
    name: "Ramesh Oraon",
    fatherName: "Mohan Oraon",
    village: "Banarhat",
    address: "Main Road, Banarhat",
    activeAgreement: false,
    agreementNo: null,
    agreementEnd: null,
  },
  {
    id: "SEL-000003",
    name: "Bimal Sahu",
    fatherName: "Dilip Sahu",
    village: "Ambari Bagan",
    address: "Lower Line, Ambari Bagan",
    activeAgreement: false,
    agreementNo: null,
    agreementEnd: null,
  },
];

function SellerSearch() {
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const handleSearch = () => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      setResults([]);
      setSearched(false);
      setSelectedSeller(null);
      return;
    }

    const matchedSellers = sampleSellers.filter((seller) =>
      seller.name.toLowerCase().includes(keyword)
    );

    setResults(matchedSellers);
    setSearched(true);
    setSelectedSeller(null);
  };

  const handleSelectSeller = (seller) => {
    setSelectedSeller(seller);
  };

  const handleClear = () => {
    setSearch("");
    setResults([]);
    setSearched(false);
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

        <form
          className="seller-search-row"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >

          <input
            id="seller-search-input"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Enter seller name..."
            autoComplete="off"
          />

          <button
            type="submit"
            className="seller-search-button"
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

        </form>

      </div>

      {searched && (
        <div className="seller-results">

          <div className="seller-results-header">

            <h3>Search Results</h3>

            <span>
              {results.length} seller
              {results.length !== 1 ? "s" : ""} found
            </span>

          </div>

          {results.length > 0 ? (

            results.map((seller) => (
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
            ))

          ) : (

            <div className="no-seller">

              <strong>
                No seller found
              </strong>

              <p>
                No seller matched your search.
              </p>

            </div>

          )}

        </div>
      )}

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