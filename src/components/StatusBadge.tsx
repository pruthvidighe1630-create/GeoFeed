import { DonationStatus } from "@/lib/mock-data";

const statusConfig: Record<DonationStatus, string> = {
  Pending: "status-pending",
  Accepted: "status-accepted",
  Collected: "status-collected",
  Fed: "status-fed",
};

const StatusBadge = ({ status }: { status: DonationStatus }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[status]}`}>
    {status}
  </span>
);

export default StatusBadge;
