import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockDonations } from "@/lib/mock-data";
import { Plus, MapPin, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import StatusStepper from "@/components/StatusStepper";
import AppHeader from "@/components/AppHeader";

const DonorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myDonations = mockDonations;

  return (
    <div className="animate-fade-in">
      <AppHeader subtitle="Welcome back," title={user?.name || "Donor"}>
        <p className="mt-1 text-xs text-primary-foreground/60">{user?.location}</p>
      </AppHeader>

      <div className="px-4 -mt-4 space-y-4">
        <Button
          onClick={() => navigate("/donate")}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold text-base py-6 rounded-xl shadow-lg"
        >
          <Plus className="mr-2 h-5 w-5" /> Quick Donate Food
        </Button>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: MapPin, label: "Feeding Zones", path: "/map" },
            { icon: Heart, label: "Animal Health", path: "/animals" },
            { icon: AlertTriangle, label: "Report", path: "/report" },
          ].map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Icon className="h-5 w-5 text-primary" />
              {label}
            </button>
          ))}
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold mb-3">My Donations</h2>
          <div className="space-y-3">
            {myDonations.map((d) => (
              <div key={d.id} className="rounded-xl border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{d.foodType}</p>
                    <p className="text-xs text-muted-foreground">{d.quantity} · {d.time}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                <StatusStepper currentStatus={d.status} />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {d.pickupLocation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
