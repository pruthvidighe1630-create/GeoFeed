import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockDonations, FoodDonation } from "@/lib/mock-data";
import { MapPin, Navigation, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { toast } from "sonner";
import AppHeader from "@/components/AppHeader";

const FeederDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<FoodDonation[]>(mockDonations);

  const handleAccept = (id: string) => {
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, status: "Accepted" as const } : d)));
    toast.success("Task accepted! Navigate to pickup location.");
  };
  const handleCollect = (id: string) => {
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, status: "Collected" as const } : d)));
    toast.success("Food collected! Head to the feeding zone.");
  };
  const handleFed = (id: string) => {
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, status: "Fed" as const } : d)));
    toast.success("🎉 Animals fed! Thank you for your kindness.");
  };

  const pending = donations.filter((d) => d.status === "Pending");
  const active = donations.filter((d) => d.status === "Accepted" || d.status === "Collected");
  const completed = donations.filter((d) => d.status === "Fed");

  return (
    <div className="animate-fade-in">
      <AppHeader subtitle="Feeder Dashboard" title={user?.name || "Feeder"}>
        <div className="mt-3 flex gap-3">
          {[
            { value: pending.length, label: "Available" },
            { value: active.length, label: "Active" },
            { value: completed.length, label: "Completed" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-primary-foreground/10 px-3 py-1.5 text-center">
              <p className="text-lg font-bold text-primary-foreground">{s.value}</p>
              <p className="text-[10px] text-primary-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </AppHeader>

      <div className="px-4 -mt-4 space-y-4">
        <Button onClick={() => navigate("/map")} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold py-5 rounded-xl">
          <Navigation className="mr-2 h-4 w-4" /> View Feeding Zones Map
        </Button>

        {pending.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold mb-3">Available Pickups</h2>
            <div className="space-y-3">
              {pending.map((d) => (
                <div key={d.id} className="rounded-xl border bg-card p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{d.foodType}</p>
                      <p className="text-xs text-muted-foreground">{d.donorName} · {d.quantity}</p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {d.pickupLocation} · {d.time}
                  </p>
                  <Button size="sm" onClick={() => handleAccept(d.id)} className="w-full bg-primary text-primary-foreground">Accept Pickup</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {active.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold mb-3">Active Tasks</h2>
            <div className="space-y-3">
              {active.map((d) => (
                <div key={d.id} className="rounded-xl border-2 border-primary/30 bg-card p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{d.foodType}</p>
                      <p className="text-xs text-muted-foreground">{d.donorName} · {d.quantity}</p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {d.pickupLocation}
                  </p>
                  {d.status === "Accepted" && (
                    <Button size="sm" onClick={() => handleCollect(d.id)} className="w-full">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Mark Collected
                    </Button>
                  )}
                  {d.status === "Collected" && (
                    <Button size="sm" onClick={() => handleFed(d.id)} className="w-full bg-status-fed text-accent-foreground hover:bg-status-fed/90">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Mark as Fed
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeederDashboard;
