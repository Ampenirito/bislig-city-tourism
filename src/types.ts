export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: "Waterfalls" | "Rivers" | "Beaches" | "Caves" | "Parks" | "Culture";
  image: string;
  distance: string; // from Bislig City proper
  travelTime: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  bestTime: string;
  entranceFee: string;
  openingHours: string;
  travelTips: string[];
  nearbyAttractions: string[];
  nearbyRestaurants: string[];
  accessibility: string;
  coordinates: LocationCoordinates;
  mapUrl: string;
  rating: number;
}

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  category: "Beachfront" | "Eco Lodge" | "Luxury" | "Budget" | "Mid-range";
  image: string;
  priceRange: string;
  amenities: string[];
  contact: string;
  socialMedia: string;
  website: string;
  operatingHours: string;
  coordinates: LocationCoordinates;
  mapUrl: string;
  rating: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: "Local Cuisine" | "Seafood" | "Cafe" | "Family Restaurant" | "Fine Dining";
  image: string;
  specialty: string[];
  priceRange: string;
  contact: string;
  socialMedia: string;
  website: string;
  operatingHours: string;
  coordinates: LocationCoordinates;
  mapUrl: string;
  rating: number;
}

export interface TourismEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  dateRange: string;       // e.g. "September 17–18, 2025"
  month: string;
  day: string;
  year: string;
  description: string;
  type: "Festival" | "Community" | "Sports" | "Seasonal";
  image: string;
  heroImage: string;       // wide hero banner for the detail page
  gallery: string[];       // additional images
  location: string;        // venue / area
  organizer: string;
  // Blog-style rich content
  overview: string;        // full overview paragraph
  history: string;         // origin & historical background
  highlights: string[];    // key moments / what to expect
  schedule: { time: string; activity: string }[];
  tips: string[];          // practical visitor tips
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Waterfalls" | "Rivers" | "Beaches" | "People" | "Culture" | "Food" | "Drone";
  image: string;
  author: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: "Travel Guide" | "Hidden Gem" | "Festival Guide" | "Photography";
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

// AI Trip Planner & Itinerary Builder types
export interface TripPreference {
  days: number;
  interest: string;
  budget: "Budget" | "Mid-range" | "Luxury";
  groupSize: "Solo" | "Couple" | "Family" | "Friends";
}

export interface ItineraryActivity {
  time: string;
  activityName: string;
  locationName: string;
  description: string;
  estimatedCost: string;
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  activities: ItineraryActivity[];
}

export interface BudgetBreakdown {
  accommodation: string;
  food: string;
  toursAndEntranceFees: string;
  transportation: string;
  totalEstimated: string;
}

export interface GeneratedItinerary {
  itineraryName: string;
  days: ItineraryDay[];
  travelTips: string[];
  budgetBreakdown: BudgetBreakdown;
}

export interface SavedItinerary extends GeneratedItinerary {
  id: string;
  createdAt: string;
  preferences: TripPreference;
}

export interface Establishment {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: "Shops & Malls" | "Convenience Stores" | "Dining & Cafes" | "Sports & Recreation" | "Surfing & Beaches" | "Services & Others" | "Accommodations" | "Churches & Landmarks" | "Attractions";
  image: string;
  location: string;
  contact: string;
  socialMedia: string;
  website: string;
  operatingHours: string;
  coordinates: LocationCoordinates;
  mapUrl: string;
  rating: number;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  image: string;
  seaters: number;
  luggage: string;
  transmission: string;
  fuel: string;
  rate: string;
  features: string[];
  description: string;
}

export interface Operator {
  id: string;
  name: string;
  phone: string;
  rating: string;
  reviews: number;
  badge: string;
  bio: string;
  supportedVehicles: string[]; // vehicle IDs
  supportsSelfDrive: boolean;
  supportsWithDriver: boolean;
  socials: {
    facebook?: string;
    messenger?: string;
    whatsapp?: string;
  };
}

