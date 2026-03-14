import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { mockDonations } from "@/lib/mock-data";
import StatusBadge from "@/components/StatusBadge";
import StatusStepper from "@/components/StatusStepper";
import { MapPin } from "lucide-react";

const DonationsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="All Donations" showBack />
      <div className="animate-fade-in p-4 space-y-3">
        {mockDonations.map((d) => (
          <div key={d.id} className="rounded-xl border bg-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm">{d.foodType}</p>
                <p className="text-xs text-muted-foreground">{d.donorName} · {d.quantity}</p>
              </div>
              <StatusBadge status={d.status} />
            </div>
            <StatusStepper currentStatus={d.status} />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {d.pickupLocation} · {d.time}
            </p>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default DonationsPage;
