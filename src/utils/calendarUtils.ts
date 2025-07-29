import { startOfDay, isBefore, isAfter, addDays, isSameDay } from "date-fns";
import { BookingPeriod } from "@/types/booking";

export const isRangeOverlappingBookings = (from: Date, to: Date, bookingPeriods: BookingPeriod[]): boolean => {
  if (!from || !to) return false;

  const rangeStart = startOfDay(from);
  const rangeEnd = startOfDay(to);

  return bookingPeriods.some(period => {
    const periodStart = startOfDay(period.start);
    const periodEnd = startOfDay(period.end);

    const overlapsStart = isBefore(rangeStart, addDays(periodEnd, -1)) && isAfter(rangeEnd, periodStart);
    const overlapsEnd = isBefore(rangeEnd, periodEnd) && isAfter(rangeStart, periodStart);
    const fullyContains = isBefore(rangeStart, periodStart) && isAfter(rangeEnd, periodEnd);
    const exactMatch = isSameDay(rangeStart, periodStart) && isSameDay(rangeEnd, addDays(period.end, -1));

    const startsOnPeriodEnd = isSameDay(rangeStart, periodEnd);

    return (overlapsStart || overlapsEnd || fullyContains || exactMatch) && !startsOnPeriodEnd;
  });
};

export const fetchBookedPeriods = async (): Promise<BookingPeriod[]> => {
  try {
    const calendarId = "6gk8bbmgm01bk625432gb33tk0@group.calendar.google.com";
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Kalenderdaten");
    }

    const data = await response.json();
    return data.items.map((event: any) => ({
      start: new Date(event.start.date || event.start.dateTime),
      end: new Date(event.end.date || event.end.dateTime),
      name: event.summary || "Unbekannt",
    }));
  } catch (error) {
    console.error("Error fetching booked periods:", error);
    return [];
  }
};
