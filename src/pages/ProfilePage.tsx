import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { LogOut, User, MapPin, Phone } from "lucide-react";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Profile" />
      <div className="animate-fade-in p-4 space-y-4">
        <div className="flex flex-col items-center rounded-xl border bg-card p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <h2 className="mt-3 font-display text-xl font-semibold">{user?.name}</h2>
          <span className="mt-1 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium capitalize text-primary">
            {user?.role}
          </span>
        </div>

        <div className="space-y-2">
          {[
            { icon: Phone, label: "Phone", value: user?.phone },
            { icon: MapPin, label: "Location", value: user?.location },
            { icon: User, label: "Role", value: user?.role },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border bg-card p-4">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium capitalize">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleLogout} variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/5">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
