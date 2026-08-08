import "./SyncStatus.css";

function SyncStatus() {

  return (

    <div className="sync-card">

      <div className="sync-header">

        <h3>Sync Status</h3>

        <span className="online-dot"></span>

      </div>

      <div className="sync-row">

        <span>Cloud</span>

        <strong>Connected</strong>

      </div>

      <div className="sync-row">

        <span>Offline Storage</span>

        <strong>Ready</strong>

      </div>

      <div className="sync-row">

        <span>Last Sync</span>

        <strong>Just now</strong>

      </div>

      <div className="sync-row">

        <span>Pending Sync</span>

        <strong>0</strong>

      </div>

    </div>

  );

}

export default SyncStatus;