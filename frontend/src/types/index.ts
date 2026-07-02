export type HotelPreference = "Budget" | "Mid-range" | "Luxury";

export interface PlanRequest {
  destination: string;
  departure: string;
  travel_dates: string;
  travelers: string;
  budget: string;
  hotel: string;
  interests: string;
}

export interface PlanResponse {
  success: boolean;
  itinerary: string;
}

export interface TripFormValues {
  departure: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;
  adults: number;
  children: number;
  budget: number;
  hotel: HotelPreference;
  interests: string[];
}
