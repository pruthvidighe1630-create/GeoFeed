import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockDonations, mockReports, mockAnimals, FoodDonation, DonationStatus } from "@/lib/mock-data";
import { ClipboardList, Heart, AlertTriangle, FileText, Check, X } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ShelterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<FoodDonation[]>(mockDonations);

  const updateStatus = (id: string, newStatus: DonationStatus) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    toast.success(`Donation ${id} marked as ${newStatus}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-primary px-4 pb-6 pt-8">
        <p className="text-sm text-primary-foreground/70">Shelter Dashboard</p>
        <h1 className="font-display text-2xl font-bold text-primary-foreground">{user?.name || "Shelter"}</h1>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: ClipboardList, label: "Donations", value: donations.length, path: "/donations" },
            { icon: AlertTriangle, label: "Reports", value: mockReports.length, path: "/report" },
            { icon: Heart, label: "Animals", value: mockAnimals.length, path: "/animals" },
            { icon: FileText, label: "Zones", value: 4, path: "/map" },
          ].map(({ icon: Icon, label, value, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-secondary"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold font-display">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Incoming Donations - Accept/Reject */}
        <div>
          <h2 className="font-display text-lg font-semibold mb-3">Incoming Donations</h2>
          <div className="space-y-3">
            {donations.map((d) => (
              <div key={d.id} className="rounded-xl border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{d.donorName}</p>
                    <p className="text-xs text-muted-foreground">{d.foodType} · {d.quantity}</p>
                    <p className="text-xs text-muted-foreground">{d.pickupLocation} · {d.time}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                {d.notes && <p className="text-xs text-muted-foreground italic">{d.notes}</p>}

                {d.status === "Pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1" onClick={() => updateStatus(d.id, "Accepted")}>
                      <Check className="h-3.5 w-3.5" /> Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => {
                      setDonations((prev) => prev.filter((don) => don.id !== d.id));
                      toast.info(`Donation ${d.id} declined`);
                    }}>
                      <X className="h-3.5 w-3.5" /> Decline
                    </Button>
                  </div>
                )}

                {d.status === "Accepted" && (
                  <Button size="sm" variant="secondary" className="w-full gap-1" onClick={() => updateStatus(d.id, "Collected")}>
                    Mark as Collected
                  </Button>
                )}

                {d.status === "Collected" && (
                  <Button size="sm" variant="secondary" className="w-full gap-1" onClick={() => updateStatus(d.id, "Fed")}>
                    Mark as Fed
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <h2 className="font-display text-lg font-semibold mb-3">Recent Reports</h2>
          <div className="space-y-3">
            {mockReports.map((r) => (
              <div key={r.id} className="rounded-xl border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{r.issue}</p>
                    <p className="text-xs text-muted-foreground">{r.location} · {r.createdAt}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.status === "Open" ? "status-pending" : r.status === "In Progress" ? "status-accepted" : "status-fed"
                  }`}>
                    {r.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboard;
