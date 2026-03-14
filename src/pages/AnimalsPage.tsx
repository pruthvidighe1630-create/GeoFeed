import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { mockAnimals } from "@/lib/mock-data";
import { CheckCircle2, XCircle } from "lucide-react";

const AnimalsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Animal Health" showBack />
      <div className="animate-fade-in p-4 space-y-3">
        {mockAnimals.map((a) => (
          <div key={a.id} className="rounded-xl border bg-card p-4 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{a.photo}</span>
              <div className="flex-1">
                <p className="font-medium text-sm">{a.id}</p>
                <p className="text-xs text-muted-foreground">{a.location}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                a.behaviour === "Aggressive" ? "status-pending" :
                a.behaviour === "Nervous" ? "status-accepted" : "status-fed"
              }`}>
                {a.behaviour}
              </span>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                {a.vaccinated ? <CheckCircle2 className="h-3 w-3 text-status-fed" /> : <XCircle className="h-3 w-3 text-destructive" />}
                Vaccinated
              </span>
              <span className="flex items-center gap-1">
                {a.sterilized ? <CheckCircle2 className="h-3 w-3 text-status-fed" /> : <XCircle className="h-3 w-3 text-destructive" />}
                Sterilized
              </span>
              <span className="text-muted-foreground">Last: {a.lastChecked}</span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default AnimalsPage;
