import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Heart, AlertTriangle, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";

const GeneralDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <AppHeader subtitle="Welcome," title={user?.name || "User"} />

      <div className="px-4 -mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: "Feeding Zones", desc: "Find nearby zones", path: "/map", color: "bg-primary/10 text-primary" },
            { icon: UtensilsCrossed, label: "Donate Food", desc: "Share leftover food", path: "/donate", color: "bg-accent/10 text-accent" },
            { icon: AlertTriangle, label: "Report Animal", desc: "Report an issue", path: "/report", color: "bg-destructive/10 text-destructive" },
            { icon: Heart, label: "Animal Health", desc: "Track health records", path: "/animals", color: "bg-status-fed/10 text-status-fed" },
          ].map(({ icon: Icon, label, desc, path, color }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-start gap-2 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-secondary"
            >
              <div className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={() => navigate("/report")}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold py-5 rounded-xl"
        >
          <AlertTriangle className="mr-2 h-4 w-4" /> Report Emergency
        </Button>
      </div>
    </div>
  );
};

export default GeneralDashboard;
