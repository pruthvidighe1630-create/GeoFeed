import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const DonatePage = () => {
  const navigate = useNavigate();
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("🎉 Donation submitted! Feeders will be notified.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Donate Food" showBack />
      <form onSubmit={handleSubmit} className="animate-fade-in space-y-4 p-4">
        <div>
          <Label>Food Type</Label>
          <Select value={foodType} onValueChange={setFoodType}>
            <SelectTrigger><SelectValue placeholder="Select food type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rice">Rice & Dal</SelectItem>
              <SelectItem value="bread">Bread & Vegetables</SelectItem>
              <SelectItem value="chapati">Chapati & Sabzi</SelectItem>
              <SelectItem value="mixed">Mixed Leftovers</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="qty">Quantity (kg)</Label>
          <Input id="qty" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g. 5" required />
        </div>
        <div>
          <Label htmlFor="loc">Pickup Location</Label>
          <Input id="loc" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} placeholder="Full address" required />
        </div>
        <div>
          <Label htmlFor="time">Available Until</Label>
          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions..." rows={3} />
        </div>
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold py-5 rounded-xl">
          Submit Donation
        </Button>
      </form>
      <BottomNav />
    </div>
  );
};

export default DonatePage;
