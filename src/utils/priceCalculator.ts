
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";
import { PriceDetails } from "@/types/booking";
import { PRICES } from "@/constants/prices";

export const calculatePriceDetails = (
  dateRange: DateRange,
  breakfastCount: number,
  laundryPackages: number
): { priceDetails: PriceDetails; totalPrice: number } | null => {
  if (!dateRange.from || !dateRange.to) return null;
  
  const numNights = Math.max(1, differenceInCalendarDays(dateRange.to, dateRange.from));
  
  const firstNightPrice = PRICES.FIRST_NIGHT;
  const additionalNightsCount = numNights - 1;
  const additionalNightsPrice = additionalNightsCount > 0 ? additionalNightsCount * PRICES.ADDITIONAL_NIGHT : 0;
  
  let breakfastPrice = 0;
  let breakfastFirstPersonPrice = 0;
  let breakfastAdditionalPrice = 0;
  
  if (breakfastCount > 0) {
    breakfastFirstPersonPrice = PRICES.BREAKFAST.FIRST_PERSON;
    breakfastAdditionalPrice = (breakfastCount - 1) * PRICES.BREAKFAST.ADDITIONAL_PERSON;
    breakfastPrice = breakfastFirstPersonPrice + breakfastAdditionalPrice;
  }
  
  const laundryPrice = laundryPackages * PRICES.LAUNDRY_PACKAGE;
  const cleaningPrice = PRICES.CLEANING_FEE;
  
  const totalPrice = firstNightPrice + additionalNightsPrice + breakfastPrice + laundryPrice + cleaningPrice;
  
  const priceDetails = {
    firstNightPrice,
    additionalNightsPrice,
    additionalNightsCount,
    breakfastPrice,
    breakfastFirstPersonPrice,
    breakfastAdditionalPrice,
    laundryPrice,
    cleaningPrice
  };

  return { priceDetails, totalPrice };
};

export const createEmailTemplate = (
  dateRange: DateRange,
  guests: number,
  laundryPackages: number,
  breakfastCount: number,
  contactInfo: { name: string; email: string; phone: string; message: string },
  priceDetails: PriceDetails | null,
  totalPrice: number | null
): string => {
  if (!dateRange.from || !dateRange.to) return '';
  
  const numNights = Math.max(1, differenceInCalendarDays(dateRange.to, dateRange.from));

  let emailBody = `Sehr geehrter Herr Mertens,

ich möchte gerne folgende Reservierung anfragen:

Anreisedatum: ${dateRange.from.toLocaleDateString('de-DE')}
Abreisedatum: ${dateRange.to.toLocaleDateString('de-DE')}
Anzahl Nächte: ${numNights}
Anzahl Personen: ${guests}`;

  if (laundryPackages > 0) {
    emailBody += `\nWäschepakete: ${laundryPackages} (${PRICES.LAUNDRY_PACKAGE}€ pro Paket)`;
  }

  if (breakfastCount > 0) {
    emailBody += `\nFrühstück: ${breakfastCount} Person(en) (${PRICES.BREAKFAST.FIRST_PERSON}€ für erste Person, ${PRICES.BREAKFAST.ADDITIONAL_PERSON}€ für jede weitere)`;
  }

  if (priceDetails && totalPrice !== null) {
    emailBody += `\n\nPreisübersicht:
- Erste Nacht: €${priceDetails.firstNightPrice.toFixed(2)}`;

    if (priceDetails.additionalNightsCount > 0) {
      emailBody += `\n- Weitere Nächte (${priceDetails.additionalNightsCount}x): €${priceDetails.additionalNightsPrice.toFixed(2)}`;
    }

    if (priceDetails.breakfastPrice > 0) {
      emailBody += `\n- Frühstück: €${priceDetails.breakfastPrice.toFixed(2)}`;
    }

    if (priceDetails.laundryPrice > 0) {
      emailBody += `\n- Wäschepakete (${laundryPackages}x à ${PRICES.LAUNDRY_PACKAGE}€): €${priceDetails.laundryPrice.toFixed(2)}`;
    }

    emailBody += `\n- Endreinigung: €${priceDetails.cleaningPrice.toFixed(2)}
- Gesamtpreis: €${totalPrice.toFixed(2)}`;
  }

  if (contactInfo.message) {
    emailBody += `\n\nMeine Nachricht/Wünsche:\n${contactInfo.message}`;
  }

  emailBody += `\n\nIch freue mich auf Ihre Rückmeldung.

Mit freundlichen Grüßen,
${contactInfo.name || '[Ihr Name]'}

Kontaktdaten:`;

  if (contactInfo.name) {
    emailBody += `\nName: ${contactInfo.name}`;
  }

  if (contactInfo.email) {
    emailBody += `\nE-Mail: ${contactInfo.email}`;
  }

  if (contactInfo.phone) {
    emailBody += `\nTelefon: ${contactInfo.phone}`;
  }

  return emailBody;
};
