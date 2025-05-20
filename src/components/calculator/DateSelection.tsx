
import { useState, useEffect } from "react";
import { format, addDays, isSameDay, startOfDay, isBefore, isAfter } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookingPeriod } from "@/types/booking";

interface DateSelectionProps {
  date: DateRange | undefined;
  isDateBooked: boolean;
  bookingPeriods: BookingPeriod[];
  onDateChange: (newDate: DateRange | undefined) => void;
}

const DateSelection = ({ 
  date, 
  isDateBooked, 
  bookingPeriods, 
  onDateChange 
}: DateSelectionProps) => {
  const isMobile = useIsMobile();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  // Überprüfen, ob der Kalender geklickt wurde und der Dialog geöffnet werden soll
  useEffect(() => {
    const shouldOpenDateSelector = localStorage.getItem("openDateSelector");
    if (shouldOpenDateSelector === "true") {
      setIsPopoverOpen(true);
      localStorage.removeItem("openDateSelector"); // Entfernen nach einmaligem Verwenden
    }
  }, []);

  const isDayWithinBooking = (day: Date): boolean => {
    return bookingPeriods.some(period => {
      const periodStart = startOfDay(period.start);
      const periodEnd = startOfDay(period.end);
      const dayStart = startOfDay(day);

      return isAfter(dayStart, periodStart) && isBefore(dayStart, periodEnd);
    });
  };

  const isDateDisabled = (day: Date): boolean => {
    const today = startOfDay(new Date());

    return (
      isBefore(day, today) || // Tage in der Vergangenheit deaktivieren
      bookingPeriods.some(period => {
        const periodStart = startOfDay(addDays(period.start, 0));
        const periodEnd = startOfDay(addDays(period.end, -1));
        const dayStart = startOfDay(day);

        return isAfter(dayStart, periodStart) && isBefore(dayStart, periodEnd);
      })
    );
  };

  return (
    <div className="space-y-2">
      <Label>Anreise- und Abreisedatum</Label>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            onClick={() => setIsPopoverOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "PPP", { locale: de })}
                  {" - "}
                  {format(date.to, "PPP", { locale: de })}
                </>
              ) : (
                format(date.from, "PPP", { locale: de })
              )
            ) : (
              <span>Wählen Sie Ihren Zeitraum</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="center" 
          side={isMobile ? "bottom" : "bottom"}
          alignOffset={0}
          sideOffset={8}
          avoidCollisions={true}
          collisionPadding={{ top: 20, bottom: 20 }}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={isMobile ? 1 : 2}
            disabled={isDateDisabled}
            modifiersClassNames={{
              selected: isDateBooked
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800",
              today: "font-bold underline",
            }}
            classNames={{
              day: "p-2 rounded-full",
            }}
          />
          <div className="flex justify-end p-4">
            <Button
              onClick={() => setIsPopoverOpen(false)}
              className="bg-forest-600 hover:bg-forest-700 text-white"
            >
              OK
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {isDateBooked && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Leider ist zu diesem Zeitraum die Wohnung schon reserviert.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DateSelection;
