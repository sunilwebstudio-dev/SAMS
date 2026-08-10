import { NavLink } from "react-router-dom";
import { notifications } from "../../../data/notifications";
import "./RecentNotifications.css";

function RecentNotifications() {
  return (
    <div className="recent-notifications-card">

      {/* HEADER */}

      <div className="recent-notifications-header">

        <div>
          <h2>Recent Notifications</h2>

          <p>
            Latest updates and reminders
          </p>
        </div>

        <NavLink
          to="/notifications"
          className="recent-notifications-view-all"
        >
          View All
        </NavLink>

      </div>

      {/* NOTIFICATION LIST */}

      <div className="notification-list">

        {notifications.length > 0 ? (

          notifications.map((notification) => (

            <div
              className={`notification-item ${
                notification.unread ? "unread" : ""
              }`}
              key={notification.id}
            >

              <div className="notification-icon">
                {notification.type === "agreement"
                  ? "📄"
                  : "🔔"}
              </div>

              <div className="notification-content">

                <strong>
                  {notification.title}
                </strong>

                <p>
                  {notification.message}
                </p>

                <small>
                  {notification.time}
                </small>

              </div>

              {notification.unread && (
                <span
                  className="unread-dot"
                  aria-label="Unread notification"
                />
              )}

            </div>

          ))

        ) : (

          <div className="notifications-empty-state">

            <div className="notification-empty-icon">
              🔔
            </div>

            <strong>
              No notifications
            </strong>

            <p>
              You're all caught up.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default RecentNotifications;