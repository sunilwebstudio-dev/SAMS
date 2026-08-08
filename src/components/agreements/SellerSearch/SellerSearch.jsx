import "./SellerSearch.css";

function SellerSearch() {
  return (
    <div className="seller-search-card">

      <h2 className="seller-search-title">
        Seller Information
      </h2>

      <div className="seller-search-group">

        <label>Seller Name</label>

        <input
          type="text"
          placeholder="Enter seller name..."
        />

      </div>

    </div>
  );
}

export default SellerSearch;