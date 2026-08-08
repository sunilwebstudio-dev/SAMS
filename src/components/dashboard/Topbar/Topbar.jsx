import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">

      <div className="topbar-left">

        <div className="search-box">

          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search agreements, users, reports..."
          />

          <kbd>Ctrl + K</kbd>

        </div>

      </div>

      <div className="topbar-right">

        <button className="icon-btn">
          🔔
        </button>

        <button className="icon-btn">
          🌐
        </button>

        <button className="icon-btn">
          📶
        </button>

        <div className="profile-box">

          <div className="profile-avatar">
            S
          </div>

          <div>

            <h4>Sunil Sahu</h4>

            <small>Buyer</small>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;