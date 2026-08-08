import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import SellerSearch from "../../components/agreements/SellerSearch";
import "./CreateAgreement.css";

function CreateAgreement() {
  return (
    <DashboardLayout>
      <div className="agreement-page">
        <h1 className="page-title">Create Agreement</h1>

        <SellerSearch />
      </div>
    </DashboardLayout>
  );
}

export default CreateAgreement;