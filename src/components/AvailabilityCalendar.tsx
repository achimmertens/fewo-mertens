import { useState, useEffect, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
  startOfDay,
  addMonths,
  subMonths,
} from "date-fns";
import { de, enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingPeriod } from "@/types/booking";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchBookedPeriods } from "@/utils/calendarUtils";

interface DayHalves {
  morning: "free" | "occupied";
  afternoon: "free" | "occupied";
}

/**
 * Determines the half-day occupancy status for a given day.
 *
 * A booking from `period.start` to `period.end` (end = Abreisetag, bereits
 * in fetchBookedPeriods normalisiert):
 *   - Check-in day (period.start): afternoon occupied
 *   - Middle days: fully occupied
 *   - Check-out day (period.end): morning occupied
 */
function getDayHalves(day: Date, periods: BookingPeriod[]): DayHalves {
  const dayStart = startOfDay(day);
  let morning: "free" | "occupied" = "free";
  let afternoon: "free" | "occupied" = "free";

  for (const period of periods) {
    const periodStart = startOfDay(period.start);
    const periodEnd = startOfDay(period.end);

    // Day is before the booking starts
    if (isBefore(dayStart, periodStart)) continue;
    // Day is after the booking ends (end is exclusive, so equal to end is still relevant)
    if (isAfter(dayStart, periodEnd)) continue;

    // Check-out day: morning occupied
    if (isSameDay(dayStart, periodEnd)) {
      morning = "occupied";
      continue;
    }
    // Check-in day: afternoon occupied
    if (isSameDay(dayStart, periodStart)) {
      afternoon = "occupied";
      continue;
    }
    // Day fully within booking
    morning = "occupied";
    afternoon = "occupied";
  }

  return { morning, afternoon };
}

const dayNamesDe = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const dayNamesEn = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingPeriods, setBookingPeriods] = useState<BookingPeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    loadBookedPeriods();
  }, []);

  const loadBookedPeriods = async () => {
    try {
      setLoading(true);
      setError(false);
      const periods = await fetchBookedPeriods();
      setBookingPeriods(periods);
    } catch (e) {
      console.error("Fehler beim Laden der Buchungsdaten:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const dayNames = language === "de" ? dayNamesDe : dayNamesEn;
  const dateLocale = language === "de" ? de : enUS;

  // Build the 6-week grid starting from Monday of the week containing the 1st
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  const today = startOfDay(new Date());

  const handlePrevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header / Navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <button
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-gray-800"
          aria-label="Vorheriger Monat"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-base font-semibold text-gray-800 capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: dateLocale })}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-gray-800"
          aria-label="Nächster Monat"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Loading / Error states */}
      {loading && (
        <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
          <div className="animate-pulse">{t("calculator.loadingData")}</div>
        </div>
      )}
      {error && !loading && (
        <div className="flex items-center justify-center py-12 text-red-500 text-sm">
          ⚠️ Fehler beim Laden der Kalenderdaten
        </div>
      )}

      {/* Calendar grid */}
      {!loading && !error && (
        <>
          {/* Day name headers */}
          <div className="grid grid-cols-7 px-2 pt-2">
            {dayNames.map((name) => (
              <div
                key={name}
                className="text-center text-[11px] font-medium text-gray-400 py-1"
              >
                {name}
              </div>
            ))}
          </div>

          {/* Week rows */}
          <div className="px-2 pb-2 space-y-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-px">
                {week.map((day) => {
                  const halves = getDayHalves(day, bookingPeriods);
                  const inMonth = isSameMonth(day, currentMonth);
                  const isToday = isSameDay(day, today);
                  const isPast = isBefore(day, today);

                  return (
                    <div
                      key={day.toISOString()}
                      className={cn(
                        "relative flex flex-col items-center pt-1.5 pb-1 rounded-sm select-none",
                        !inMonth && "opacity-30",
                        inMonth && "hover:bg-gray-50"
                      )}
                      title={
                        inMonth
                          ? `${
                              language === "de"
                                ? format(day, "dd.MM.yyyy")
                                : format(day, "MM/dd/yyyy")
                            }: ${
                              halves.morning === "occupied" &&
                              halves.afternoon === "occupied"
                                ? language === "de"
                                  ? "Ganzer Tag belegt"
                                  : "Full day occupied"
                                : halves.morning === "occupied"
                                ? language === "de"
                                  ? "Abreise (Vormittag belegt)"
                                  : "Check-out (morning occupied)"
                                : halves.afternoon === "occupied"
                                ? language === "de"
                                  ? "Anreise (Nachmittag belegt)"
                                  : "Check-in (afternoon occupied)"
                                : language === "de"
                                ? "Frei"
                                : "Free"
                            }`
                          : ""
                      }
                    >
                      {/* Date number */}
                      <span
                        className={cn(
                          "text-xs leading-none mb-1",
                          isToday &&
                            "bg-forest-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold",
                          !isToday && inMonth && "text-gray-700",
                          !isToday && isPast && inMonth && "text-gray-400",
                          !isToday && !inMonth && "text-gray-300"
                        )}
                      >
                        {format(day, "d")}
                      </span>

                      {/* Half-day indicator bars */}
                      <div className="flex flex-col gap-[1.5px] w-[70%]">
                        <div
                          className={cn(
                            "h-[3px] rounded-full transition-colors",
                            halves.morning === "occupied"
                              ? "bg-amber-400"
                              : "bg-green-300"
                          )}
                        />
                        <div
                          className={cn(
                            "h-[3px] rounded-full transition-colors",
                            halves.afternoon === "occupied"
                              ? "bg-amber-400"
                              : "bg-green-300"
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Legend */}
      <div className="border-t border-gray-100 px-4 py-2.5 bg-gray-50/50">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col gap-[1px]">
              <div className="w-3.5 h-[3px] rounded-full bg-green-300" />
              <div className="w-3.5 h-[3px] rounded-full bg-green-300" />
            </div>
            <span>
              {language === "de" ? "Frei" : "Free"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col gap-[1px]">
              <div className="w-3.5 h-[3px] rounded-full bg-amber-400" />
              <div className="w-3.5 h-[3px] rounded-full bg-green-300" />
            </div>
            <span>
              {language === "de" ? "Abreise (vorm.)" : "Check-out (AM)"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col gap-[1px]">
              <div className="w-3.5 h-[3px] rounded-full bg-green-300" />
              <div className="w-3.5 h-[3px] rounded-full bg-amber-400" />
            </div>
            <span>
              {language === "de" ? "Anreise (nachm.)" : "Check-in (PM)"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col gap-[1px]">
              <div className="w-3.5 h-[3px] rounded-full bg-amber-400" />
              <div className="w-3.5 h-[3px] rounded-full bg-amber-400" />
            </div>
            <span>
              {language === "de" ? "Belegt" : "Occupied"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;