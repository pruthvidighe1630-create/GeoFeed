import { Check } from "lucide-react";
import { DonationStatus } from "@/lib/mock-data";

const steps: DonationStatus[] = ["Pending", "Accepted", "Collected", "Fed"];

const StatusStepper = ({ currentStatus }: { currentStatus: DonationStatus }) => {
  const currentIdx = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => {
        const done = i <= currentIdx;
        return (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium transition-colors ${
                done
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-3 w-3" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-4 ${i < currentIdx ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatusStepper;
