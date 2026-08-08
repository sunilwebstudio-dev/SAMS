import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
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
      icon: "🛡",
    },
    {
      title: "Settings",
      path: "/settings",
      icon: "⚙",
    },
    {
      title: "Help",
      path: "/help",
      icon: "❓",
    },


  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-circle">
          S
        </div>

        <div>
          <h2>SAMS</h2>
          <p>Smart Agreement Management System</p>
        </div>

      </div>

      <div className="sidebar-user">

        <div className="user-avatar">
          S
        </div>

        <div>

          <h4>Sunil Sahu</h4>

          <span>Buyer</span>

          <small>SAMS-000001</small>

        </div>

      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            className="menu-item"
          >
            <span>{item.icon}</span>

            <span>{item.title}</span>

          </NavLink>

        ))}

      </nav>

      <div className="sidebar-footer">

        <button className="logout-btn">
          🚪 Logout
        </button>

        <small>
          Version 1.0.1
        </small>

      </div>

    </aside>
  );
}

export default Sidebar;