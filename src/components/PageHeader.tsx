import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  action?: React.ReactNode;
}

const PageHeader = ({ title, showBack = false, action }: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="font-display text-lg font-semibold">{title}</h1>
      </div>
      {action}
    </header>
  );
};

export default PageHeader;
