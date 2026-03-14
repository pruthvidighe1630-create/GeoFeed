import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera } from "lucide-react";
import { toast } from "sonner";

const ReportPage = () => {
  const navigate = useNavigate();
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Report submitted! Shelters have been notified.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Report Animal Issue" showBack />
      <form onSubmit={handleSubmit} className="animate-fade-in space-y-4 p-4">
        {/* Photo Upload Mock */}
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted p-8">
          <Camera className="h-10 w-10 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Tap to upload photo</p>
        </div>

        <div>
          <Label>Issue Type</Label>
          <Select value={issue} onValueChange={setIssue}>
            <SelectTrigger><SelectValue placeholder="Select issue" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="injured">🤕 Injured Animal</SelectItem>
              <SelectItem value="aggressive">⚠️ Aggressive Dog</SelectItem>
              <SelectItem value="cattle">🐄 Stray Cattle</SelectItem>
              <SelectItem value="other">📋 Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="rloc">Location</Label>
          <Input id="rloc" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where is the animal?" required />
        </div>

        <div>
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the situation..." rows={4} required />
        </div>

        <Button type="submit" className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-display font-semibold py-5 rounded-xl">
          Submit Report
        </Button>
      </form>
      <BottomNav />
    </div>
  );
};

export default ReportPage;
