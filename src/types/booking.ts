
// Types for booking-related data
export interface BookingPeriod {
  start: Date;
  end: Date;
  name: string;
}

export interface PriceDetails {
  firstNightPrice: number;
  additionalNightsPrice: number;
  additionalNightsCount: number;
  breakfastPrice: number;
  breakfastFirstPersonPrice: number;
  breakfastAdditionalPrice: number;
  laundryPrice: number;
  cleaningPrice: number;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  message: string;
}
