import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import FloatingAIAssistant from "../../components/dashboard/FloatingAIAssistant";

import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Topbar />

        <main className="dashboard-content">

          {children}

        </main>

      </div>

      <FloatingAIAssistant />

    </div>
  );
}

export default DashboardLayout;