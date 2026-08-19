import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      title: "Agreements",
      path: "/agreements",
      icon: "📄",
    },

    {
  title: "Verify Agreement",
  path: "/verify-agreement",
  icon: "✓",
},

    {
      title: "Create Agreement",
      path: "/agreements/create",
      icon: "➕",
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: "🔔",
    },
    {
      title: "Reports",
      path: "/reports",
      icon: "📊",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: "👤",
    },
    {
      title: "Security",
      path: "/security",
      icon: "🛡️",
    },
    {
      title: "Settings",
      path: "/settings",
      icon: "⚙️",
    },
    {
      title: "Help",
      path: "/help",
      icon: "❓",
    },

    
  ];

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}

      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* MOBILE OVERLAY */}

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`sidebar ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >

        {/* MOBILE CLOSE BUTTON */}

        <button
          type="button"
          className="mobile-close-button"
          onClick={closeMobileSidebar}
          aria-label="Close menu"
        >
          ×
        </button>

        {/* LOGO */}

        <div className="sidebar-logo">

          <div className="logo-circle">
            S
          </div>

          <div>
            <h2>SAMS</h2>
            <p>
              Smart Agreement Management System
            </p>
          </div>

        </div>

        {/* USER */}

        <div className="sidebar-user">

          <div className="user-avatar">
            S
          </div>

          <div>

            <h4>Sunil Sahu</h4>

            <span>
              Buyer
            </span>

            <small>
              SAMS-000001
            </small>

          </div>

        </div>

        {/* MENU */}

        <nav className="sidebar-menu">

          {menuItems.map((item) => (

             <NavLink
  key={item.path}
  to={item.path}
  end={item.path === "/agreements"}
  className={({ isActive }) =>
    `menu-item ${isActive ? "active" : ""}`
  }

            >

              <span className="menu-icon">
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>

            </NavLink>

          ))}

        </nav>

        {/* FOOTER */}

        <div className="sidebar-footer">

          <button
            type="button"
            className="logout-btn"
          >
            🚪 Logout
          </button>

          <small>
            Version 1.0.1
          </small>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;