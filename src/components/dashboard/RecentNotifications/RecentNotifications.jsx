import { notifications } from "../../../data/notifications";
import "./RecentNotifications.css";

function RecentNotifications() {
  return (
    <div className="recent-notifications-card">

      <div className="recent-notifications-header">

        <div>
          <h2>Recent Notifications</h2>

          <p>
            Latest updates and reminders
          </p>
        </div>

        <button type="button">
          View All
        </button>

      </div>

      <div className="notification-list">

        {notifications.map((notification) => (
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
              <span className="unread-dot"></span>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentNotifications;