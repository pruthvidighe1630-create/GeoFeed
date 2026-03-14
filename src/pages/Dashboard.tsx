import { useAuth } from "@/context/AuthContext";
import DonorDashboard from "@/components/dashboards/DonorDashboard";
import FeederDashboard from "@/components/dashboards/FeederDashboard";
import ShelterDashboard from "@/components/dashboards/ShelterDashboard";
import GeneralDashboard from "@/components/dashboards/GeneralDashboard";
import BottomNav from "@/components/BottomNav";

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case "donor": return <DonorDashboard />;
      case "feeder": return <FeederDashboard />;
      case "shelter": return <ShelterDashboard />;
      default: return <GeneralDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {renderDashboard()}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
