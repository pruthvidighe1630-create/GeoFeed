import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Leaf } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState<UserRole>("donor");
  const [otp, setOtp] = useState("");

  const handleDetectLocation = () => {
    setLocation("Pune, Maharashtra");
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && location && role) setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login({ name, phone, role, location });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2 animate-fade-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Leaf className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">GeoFeed</h1>
          <p className="text-sm text-muted-foreground">Feed strays. Build community.</p>
        </div>

        <div className="w-full max-w-sm animate-fade-in">
          {step === "form" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>

              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Your city" required className="flex-1" />
                  <Button type="button" variant="outline" size="icon" onClick={handleDetectLocation}>
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Login As</Label>
                <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donor">🍽️ Donor</SelectItem>
                    <SelectItem value="feeder">🚴 Feeder</SelectItem>
                    <SelectItem value="shelter">🏠 Shelter</SelectItem>
                    <SelectItem value="other">👤 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold text-base py-5">
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                OTP sent to <span className="font-medium text-foreground">{phone}</span>
              </p>
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" maxLength={6} className="text-center text-lg tracking-[0.5em]" required />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold text-base py-5">
                Verify & Login
              </Button>
              <button type="button" className="w-full text-center text-sm text-primary underline" onClick={() => setStep("form")}>
                Change number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
