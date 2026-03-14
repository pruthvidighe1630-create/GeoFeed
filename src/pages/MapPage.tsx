import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { mockFeedingZones } from "@/lib/mock-data";
import { MapPin, CheckCircle2, XCircle, PawPrint } from "lucide-react";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Feeding Zones" showBack />
      <div className="animate-fade-in">
        {/* Mock Map */}
        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl border bg-secondary" style={{ height: 240 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-10 w-10 text-primary animate-pulse-marker" />
              <p className="mt-2 text-sm font-medium text-muted-foreground">Interactive Map</p>
              <p className="text-xs text-muted-foreground">Google Maps integration</p>
            </div>
          </div>
          {/* Mock markers */}
          {[
            { top: "25%", left: "30%" },
            { top: "45%", left: "60%" },
            { top: "65%", left: "40%" },
            { top: "35%", left: "75%" },
          ].map((pos, i) => (
            <div key={i} className="absolute animate-pulse-marker" style={{ top: pos.top, left: pos.left }}>
              <div className="h-4 w-4 rounded-full bg-primary shadow-lg" />
            </div>
          ))}
        </div>

        {/* Zone List */}
        <div className="mt-4 space-y-3 px-4">
          <h2 className="font-display text-lg font-semibold">Approved Zones</h2>
          {mockFeedingZones.map((zone) => (
            <div key={zone.id} className="rounded-xl border bg-card p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{zone.name}</p>
                  <p className="text-xs text-muted-foreground">{zone.id}</p>
                </div>
                {zone.municipalityApproved ? (
                  <span className="inline-flex items-center gap-1 rounded-full status-fed px-2 py-0.5 text-xs font-medium">
                    <CheckCircle2 className="h-3 w-3" /> Approved
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full status-pending px-2 py-0.5 text-xs font-medium">
                    <XCircle className="h-3 w-3" /> Pending
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {zone.lat.toFixed(2)}°N, {zone.lng.toFixed(2)}°E
                </span>
                <span className="flex items-center gap-1">
                  <PawPrint className="h-3 w-3" /> Max {zone.maxAnimals} animals
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default MapPage;
