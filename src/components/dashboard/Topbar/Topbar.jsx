import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">

      {/* LEFT */}
      <div className="topbar-left">

        <div className="search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search agreements, users, reports..."
          />

          <kbd>
            Ctrl + K
          </kbd>

        </div>

      </div>

      {/* RIGHT */}
      <div className="topbar-right">

        <button
          type="button"
          className="icon-btn"
          aria-label="Notifications"
        >
          🔔
        </button>

        <button
          type="button"
          className="icon-btn"
          aria-label="Language"
        >
          🌐
        </button>

        <button
          type="button"
          className="icon-btn sync-icon"
          aria-label="Connection status"
        >
          📶
        </button>

        <div className="profile-box">

          <div className="profile-avatar">
            S
          </div>

          <div className="profile-info">

            <h4>
              Sunil Sahu
            </h4>

            <small>
              Buyer
            </small>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;