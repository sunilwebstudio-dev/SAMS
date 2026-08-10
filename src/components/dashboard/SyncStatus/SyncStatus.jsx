import "./SyncStatus.css";

function SyncStatus() {
  /*
    API-ready structure.
    Future backend response can directly replace this object.
  */

  const syncData = {
    status: "online",
    cloud: {
      status: "connected",
      label: "Connected",
    },
    offlineStorage: {
      status: "ready",
      label: "Ready",
    },
    lastSync: {
      value: "Just now",
    },
    pendingSync: {
      value: 0,
    },
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "connected":
      case "ready":
        return "sync-status success";

      case "warning":
      case "syncing":
        return "sync-status warning";

      case "disconnected":
      case "error":
        return "sync-status danger";

      default:
        return "sync-status neutral";
    }
  };

  const isOnline = syncData.status === "online";

  return (
    <div className="sync-card">

      {/* HEADER */}

      <div className="sync-header">

        <div>
          <h3>
            Sync Status
          </h3>

          <p>
            Data synchronization status
          </p>
        </div>

        <span
          className={`online-indicator ${
            isOnline ? "online" : "offline"
          }`}
          title={isOnline ? "Online" : "Offline"}
        />

      </div>

      {/* SYNC DETAILS */}

      <div className="sync-list">

        <div className="sync-row">

          <span>
            Cloud
          </span>

          <strong
            className={getStatusClass(
              syncData.cloud.status
            )}
          >
            {syncData.cloud.label}
          </strong>

        </div>

        <div className="sync-row">

          <span>
            Offline Storage
          </span>

          <strong
            className={getStatusClass(
              syncData.offlineStorage.status
            )}
          >
            {syncData.offlineStorage.label}
          </strong>

        </div>

        <div className="sync-row">

          <span>
            Last Sync
          </span>

          <strong className="sync-status neutral">
            {syncData.lastSync.value}
          </strong>

        </div>

        <div className="sync-row">

          <span>
            Pending Sync
          </span>

          <strong
            className={
              syncData.pendingSync.value > 0
                ? "sync-status warning"
                : "sync-status success"
            }
          >
            {syncData.pendingSync.value}
          </strong>

        </div>

      </div>

    </div>
  );
}

export default SyncStatus;