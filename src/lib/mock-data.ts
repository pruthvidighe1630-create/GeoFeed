export type UserRole = "donor" | "feeder" | "shelter" | "other";
export type DonationStatus = "Pending" | "Accepted" | "Collected" | "Fed";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  location: string;
}

export interface FoodDonation {
  id: string;
  donorName: string;
  foodType: string;
  quantity: string;
  pickupLocation: string;
  time: string;
  status: DonationStatus;
  notes?: string;
}

export interface FeedingZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  municipalityApproved: boolean;
  maxAnimals: number;
}

export interface Animal {
  id: string;
  photo: string;
  location: string;
  sterilized: boolean;
  vaccinated: boolean;
  behaviour: string;
  lastChecked: string;
}

export interface Report {
  id: string;
  userId: string;
  animalType: string;
  issue: string;
  photo: string;
  location: string;
  status: "Open" | "In Progress" | "Resolved";
  description: string;
  createdAt: string;
}

export const mockDonations: FoodDonation[] = [
  { id: "D001", donorName: "Sharma's Kitchen", foodType: "Rice & Dal", quantity: "5 kg", pickupLocation: "MG Road, Pune", time: "Today 2:00 PM", status: "Pending", notes: "Fresh, cooked today" },
  { id: "D002", donorName: "Green Leaf Café", foodType: "Bread & Vegetables", quantity: "3 kg", pickupLocation: "FC Road, Pune", time: "Today 4:00 PM", status: "Accepted", notes: "Vegetarian only" },
  { id: "D003", donorName: "Annapurna Hotel", foodType: "Chapati & Sabzi", quantity: "8 kg", pickupLocation: "JM Road, Pune", time: "Yesterday 6:00 PM", status: "Collected" },
  { id: "D004", donorName: "Sai Tiffins", foodType: "Idli & Sambar", quantity: "4 kg", pickupLocation: "Kothrud, Pune", time: "Yesterday 1:00 PM", status: "Fed" },
  { id: "D005", donorName: "Royal Biryani", foodType: "Rice & Curry", quantity: "6 kg", pickupLocation: "Camp, Pune", time: "Today 5:00 PM", status: "Pending" },
];

export const mockFeedingZones: FeedingZone[] = [
  { id: "FZ-001", name: "Aga Khan Palace Park", lat: 18.5526, lng: 73.9012, municipalityApproved: true, maxAnimals: 25 },
  { id: "FZ-002", name: "Saras Baug Garden", lat: 18.5010, lng: 73.8515, municipalityApproved: true, maxAnimals: 15 },
  { id: "FZ-003", name: "Katraj Lake Area", lat: 18.4575, lng: 73.8678, municipalityApproved: true, maxAnimals: 30 },
  { id: "FZ-004", name: "Pashan Lake", lat: 18.5322, lng: 73.7890, municipalityApproved: false, maxAnimals: 10 },
];

export const mockAnimals: Animal[] = [
  { id: "A001", photo: "🐕", location: "MG Road, Pune", sterilized: true, vaccinated: true, behaviour: "Friendly", lastChecked: "2026-03-10" },
  { id: "A002", photo: "🐕", location: "FC Road, Pune", sterilized: false, vaccinated: true, behaviour: "Shy", lastChecked: "2026-03-08" },
  { id: "A003", photo: "🐕", location: "Kothrud, Pune", sterilized: true, vaccinated: false, behaviour: "Aggressive", lastChecked: "2026-03-05" },
  { id: "A004", photo: "🐶", location: "Camp, Pune", sterilized: true, vaccinated: true, behaviour: "Playful", lastChecked: "2026-03-12" },
  { id: "A005", photo: "🐕", location: "Katraj, Pune", sterilized: false, vaccinated: false, behaviour: "Nervous", lastChecked: "2026-02-28" },
];

export const mockReports: Report[] = [
  { id: "R001", userId: "U001", animalType: "Dog", issue: "Injured animal", photo: "🐕‍🦺", location: "MG Road, Pune", status: "Open", description: "Dog with injured leg near bus stop", createdAt: "2026-03-13" },
  { id: "R002", userId: "U002", animalType: "Dog", issue: "Aggressive dog", photo: "🐕", location: "JM Road, Pune", status: "In Progress", description: "Aggressive stray near school entrance", createdAt: "2026-03-12" },
  { id: "R003", userId: "U003", animalType: "Cattle", issue: "Stray cattle", photo: "🐄", location: "Hadapsar, Pune", status: "Resolved", description: "Stray cow blocking traffic", createdAt: "2026-03-10" },
];
