import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import FloatingAI from "../../components/ai/FloatingAI";

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

      <FloatingAI />

    </div>
  );
}

export default DashboardLayout;