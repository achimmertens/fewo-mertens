
import { startOfDay, isBefore, isAfter, isSameDay } from "date-fns";
import { BookingPeriod } from "@/types/booking";

export const isRangeOverlappingBookings = (from: Date, to: Date, bookingPeriods: BookingPeriod[]): boolean => {
  if (!from || !to) return false;

  const rangeStart = startOfDay(from);
  const rangeEnd = startOfDay(to);

  return bookingPeriods.some(period => {
    const periodStart = startOfDay(period.start);
    const periodEnd = startOfDay(period.end);

    // period.end ist jetzt der Abreisetag (normalisiert, kein exklusives Enddatum mehr)
    const overlapsStart = isBefore(rangeStart, periodEnd) && isAfter(rangeEnd, periodStart);
    const overlapsEnd = isBefore(rangeEnd, periodEnd) && isAfter(rangeStart, periodStart);
    const fullyContains = isBefore(rangeStart, periodStart) && isAfter(rangeEnd, periodEnd);
    const exactMatch = isSameDay(rangeStart, periodStart) && isSameDay(rangeEnd, periodEnd);

    // Anreise am Abreisetag ist ok (Abreise vormittags, Anreise nachmittags)
    const startsOnPeriodEnd = isSameDay(rangeStart, periodEnd);

    return (overlapsStart || overlapsEnd || fullyContains || exactMatch) && !startsOnPeriodEnd;
  });
};

export const fetchBookedPeriods = async (): Promise<BookingPeriod[]> => {
  try {
    const calendarId = "6gk8bbmgm01bk625432gb33tk0@group.calendar.google.com";
    const apiKey = "AIzaSyBiD1VUk3DaVOZ2omR9T4xbr9k8vu4gS1c";
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Kalenderdaten");
    }

    const data = await response.json();
    return data.items.map((event: any) => {
      const isAllDay = !!event.start.date;
      let end = new Date(event.end.date || event.end.dateTime);
      // Google Calendar API: bei Ganztages-Ereignissen ist end.date exklusiv
      // (Tag nach Abreise), bei Termin-Ereignissen ist end.dateTime der
      // tatsächliche Abreisezeitpunkt → normalisieren auf Abreisetag
      if (isAllDay) {
        end = new Date(end.getTime() - 24 * 60 * 60 * 1000);
      }
      return {
        start: new Date(event.start.date || event.start.dateTime),
        end,
        name: event.summary || "Unbekannt",
      };
    });
  } catch (error) {
    console.error("Error fetching booked periods:", error);
    return [];
  }
};
