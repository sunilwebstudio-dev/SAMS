import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import WelcomeCard from "../../components/dashboard/WelcomeCard";
import QuickStats from "../../components/dashboard/QuickStats";
import RecentAgreements from "../../components/dashboard/RecentAgreements";
import RecentNotifications from "../../components/dashboard/RecentNotifications";
import SecurityCard from "../../components/dashboard/SecurityCard";
import SyncStatus from "../../components/dashboard/SyncStatus";

import "./Dashboard.css";

function Dashboard() {
  return (
    <DashboardLayout>

      <div className="dashboard-grid">

        <WelcomeCard />

        <QuickStats />

        <div className="dashboard-two-column">

          <RecentAgreements />

          <RecentNotifications />

        </div>

        <div className="dashboard-two-column">

          <SecurityCard />

          <SyncStatus />

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;