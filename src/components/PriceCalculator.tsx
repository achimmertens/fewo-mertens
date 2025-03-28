
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Users, ShoppingCart, Coffee, AlertCircle, Mail, Phone, User, Copy } from "lucide-react";
import { format, differenceInCalendarDays, addDays, isSameDay, startOfDay, isBefore, isAfter, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

interface BookingPeriod {
  start: Date;
  end: Date;
}

const PriceCalculator = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState<number>(2);
  const [laundryPackages, setLaundryPackages] = useState<number>(0);
  const [breakfastCount, setBreakfastCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [priceDetails, setPriceDetails] = useState<{
    firstNightPrice: number;
    additionalNightsPrice: number;
    additionalNightsCount: number;
    breakfastPrice: number;
    breakfastFirstPersonPrice: number;
    breakfastAdditionalPrice: number;
    laundryPrice: number;
    cleaningPrice: number;
  } | null>(null);
  const [isDateBooked, setIsDateBooked] = useState<boolean>(false);
  const [bookingPeriods, setBookingPeriods] = useState<BookingPeriod[]>([]);
  const [emailTemplate, setEmailTemplate] = useState<string>("");
  const [showEmailTemplate, setShowEmailTemplate] = useState<boolean>(false);
  
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FIRST_NIGHT_PRICE = 59;
  const ADDITIONAL_NIGHT_PRICE = 50;
  const BREAKFAST_FIRST_PRICE = 14;
  const BREAKFAST_ADDITIONAL_PRICE = 6;
  const LAUNDRY_PACKAGE_PRICE = 7;
  const CLEANING_FEE = 25;

  useEffect(() => {
    fetchBookedPeriods();
  }, []);

  const fetchBookedPeriods = async () => {
    try {
      // Real booking data based on Google Calendar information
      const bookings: BookingPeriod[] = [
        { start: new Date(2024, 3, 13), end: new Date(2024, 3, 15) }, // Wannes: April 13-14
        { start: new Date(2024, 3, 18), end: new Date(2024, 3, 20) }, // Magdalena: April 18-19
        { start: new Date(2024, 3, 24), end: new Date(2024, 3, 27) }  // Antje: April 24-26
      ];
      
      setBookingPeriods(bookings);
    } catch (error) {
      console.error("Error fetching booked periods:", error);
      toast({
        title: "Fehler",
        description: "Die Belegungsdaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  // This function determines if a specific day is an arrival or departure date
  const isArrivalOrDepartureDate = (day: Date): boolean => {
    return bookingPeriods.some(period => 
      isSameDay(startOfDay(day), startOfDay(period.start)) || 
      isSameDay(startOfDay(day), startOfDay(period.end))
    );
  };

  // This function determines if a specific day is inside a booking period (not including arrival/departure)
  const isDayWithinBooking = (day: Date): boolean => {
    return bookingPeriods.some(period => {
      const periodStart = startOfDay(period.start);
      const periodEnd = startOfDay(period.end);
      const dayStart = startOfDay(new Date(day));
      
      return isAfter(dayStart, periodStart) && isBefore(dayStart, periodEnd);
    });
  };

  // This checks if the date is disabled in the calendar
  const isDateDisabled = (day: Date) => {
    // Allow selection of dates in the past for historical analysis
    // if (isBefore(day, startOfDay(new Date()))) return true;
    
    // Disable days that are within booking periods (not arrival or departure dates)
    return isDayWithinBooking(day);
  };

  // This checks if a selected date range overlaps with any booking
  const isRangeOverlappingBookings = (from: Date, to: Date): boolean => {
    if (!from || !to) return false;
    
    const rangeStart = startOfDay(from);
    const rangeEnd = startOfDay(to);
    
    // Check if any day in the selected range (excluding endpoints) is booked
    let currentDate = addDays(rangeStart, 1);
    while (isBefore(currentDate, rangeEnd)) {
      if (isDayWithinBooking(currentDate)) {
        return true;
      }
      currentDate = addDays(currentDate, 1);
    }
    
    // Check if selected range overlaps with any booking period
    return bookingPeriods.some(period => {
      const periodStart = startOfDay(period.start);
      const periodEnd = startOfDay(period.end);
      
      // If selected range completely contains a booking period
      if (isBefore(rangeStart, periodStart) && isAfter(rangeEnd, periodEnd)) {
        return true;
      }
      
      // If selected range starts during a booking (not on arrival day)
      if (isAfter(rangeStart, periodStart) && isBefore(rangeStart, periodEnd) && 
          !isSameDay(rangeStart, periodEnd)) {
        return true;
      }
      
      // If selected range ends during a booking (not on departure day)
      if (isAfter(rangeEnd, periodStart) && isBefore(rangeEnd, periodEnd) && 
          !isSameDay(rangeEnd, periodStart)) {
        return true;
      }
      
      return false;
    });
  };

  const handleDateChange = (selectedRange: DateRange | undefined) => {
    if (!selectedRange || !selectedRange.from || !selectedRange.to) {
      setDate(selectedRange);
      setIsDateBooked(false);
      return;
    }
    
    const isOverlapping = isRangeOverlappingBookings(selectedRange.from, selectedRange.to);
    
    if (isOverlapping) {
      setIsDateBooked(true);
      toast({
        title: "Belegung",
        description: "Leider ist zu diesem Zeitraum die Wohnung schon reserviert.",
        variant: "destructive",
      });
    } else {
      setIsDateBooked(false);
    }
    
    setDate(selectedRange);
  };

  useEffect(() => {
    if (date?.from && date?.to) {
      const arrivalDateStr = format(date.from, "dd.MM.yyyy", { locale: de });
      const departureDateStr = format(date.to, "dd.MM.yyyy", { locale: de });
      const numNights = Math.max(1, differenceInCalendarDays(date.to, date.from));
      
      let template = 
`Betreff: Einruhr - Reservierungsanfrage

Hallo Herr Mertens,

bitte bestätigen Sie, dass die Wohnung Waldoase Mertens in Einruhr vom ${arrivalDateStr} bis zum ${departureDateStr} für uns frei ist.
Wir würden sie gerne für diesen Zeitraum reservieren.`;
      
      if (laundryPackages > 0) {
        template += `\nWir buchen das Wäschepaket für ${laundryPackages} Personen.`;
      }
      
      if (breakfastCount > 0) {
        template += `\nWir möchten gerne ${breakfastCount} Frühstück dazu buchen.`;
      }
      
      if (priceDetails && totalPrice) {
        template += `\n\nPreisdetails:
- Erste Nacht: €${priceDetails.firstNightPrice.toFixed(2)}`;
        
        if (priceDetails.additionalNightsCount > 0) {
          template += `
- Weitere Nächte (${priceDetails.additionalNightsCount}x): €${priceDetails.additionalNightsPrice.toFixed(2)}`;
        }
        
        if (priceDetails.breakfastPrice > 0) {
          template += `
- Frühstück: €${priceDetails.breakfastPrice.toFixed(2)}`;
          
          if (breakfastCount > 1) {
            template += ` (Erstes Frühstück: €${priceDetails.breakfastFirstPersonPrice.toFixed(2)}, ${breakfastCount-1} weitere: €${priceDetails.breakfastAdditionalPrice.toFixed(2)})`;
          }
        }
        
        if (priceDetails.laundryPrice > 0) {
          template += `
- Wäschepakete: €${priceDetails.laundryPrice.toFixed(2)}`;
        }
        
        template += `
- Endreinigung: €${priceDetails.cleaningPrice.toFixed(2)}
- Gesamtpreis: €${totalPrice.toFixed(2)}`;
      }
      
      if (contactMessage) {
        template += `\n\nWeitere Informationen:\n${contactMessage}`;
      }
      
      template += `\n\nMit freundlichen Grüßen,\n${contactName || "[Ihr Name]"}`;
      
      if (contactPhone) {
        template += `\nTel: ${contactPhone}`;
      }
      
      if (contactEmail) {
        template += `\nEmail: ${contactEmail || "[Ihre Email]"}`;
      }
      
      setEmailTemplate(template);
    }
  }, [date, guests, laundryPackages, breakfastCount, contactName, contactEmail, contactPhone, contactMessage, totalPrice, priceDetails]);

  const calculatePrice = () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie Start- und Enddatum aus.",
        variant: "destructive",
      });
      return;
    }

    if (isDateBooked) {
      toast({
        title: "Achtung",
        description: "Leider ist zu diesem Zeitraum die Wohnung Waldoase Mertens in Einruhr schon reserviert.",
        variant: "destructive",
      });
      return;
    }

    const numNights = Math.max(1, differenceInCalendarDays(date.to, date.from));
    
    const firstNightPrice = FIRST_NIGHT_PRICE;
    const additionalNightsCount = numNights - 1;
    const additionalNightsPrice = additionalNightsCount > 0 ? additionalNightsCount * ADDITIONAL_NIGHT_PRICE : 0;
    
    // Fix for breakfast price calculation
    let breakfastPrice = 0;
    let breakfastFirstPersonPrice = 0;
    let breakfastAdditionalPrice = 0;
    
    if (breakfastCount > 0) {
      breakfastFirstPersonPrice = BREAKFAST_FIRST_PRICE;
      
      if (breakfastCount > 1) {
        // The correct calculation: 6€ for EACH additional breakfast
        breakfastAdditionalPrice = (breakfastCount - 1) * BREAKFAST_ADDITIONAL_PRICE;
      }
      
      // Total breakfast price for all nights
      breakfastPrice = breakfastFirstPersonPrice + breakfastAdditionalPrice;
    }
    
    const laundryPrice = laundryPackages * LAUNDRY_PACKAGE_PRICE;
    
    const cleaningPrice = CLEANING_FEE;
    
    const total = firstNightPrice + additionalNightsPrice + breakfastPrice + laundryPrice + cleaningPrice;
    
    setTotalPrice(total);
    setPriceDetails({
      firstNightPrice,
      additionalNightsPrice,
      additionalNightsCount,
      breakfastPrice,
      breakfastFirstPersonPrice,
      breakfastAdditionalPrice,
      laundryPrice,
      cleaningPrice
    });
    
    setShowEmailTemplate(true);

    toast({
      title: "Preisberechnung abgeschlossen",
      description: `Gesamtpreis für ${numNights} Nächte: €${total.toFixed(2)}`,
    });
  };

  const sendReservationRequest = () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie Start- und Enddatum aus.",
        variant: "destructive",
      });
      return;
    }

    if (!contactName || !contactEmail) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const arrivalDateStr = date.from ? format(date.from, "dd.MM.yyyy", { locale: de }) : "";
    const departureDateStr = date.to ? format(date.to, "dd.MM.yyyy", { locale: de }) : "";
    
    const subject = encodeURIComponent("Einruhr - Reservierungsanfrage");
    
    let body = encodeURIComponent(
      `Hallo Herr Mertens,\n\nbitte bestätigen Sie, dass die Wohnung Waldoase Mertens in Einruhr vom ${arrivalDateStr} bis zum ${departureDateStr} für uns frei ist.\nWir würden sie gerne für diesen Zeitraum reservieren.`
    );
    
    if (laundryPackages > 0) {
      body += encodeURIComponent(`\nWir buchen das Wäschepaket für ${laundryPackages} Personen.`);
    }
    
    if (breakfastCount > 0) {
      body += encodeURIComponent(`\nWir möchten gerne ${breakfastCount} Frühstück dazu buchen.`);
    }
    
    if (priceDetails && totalPrice) {
      body += encodeURIComponent(`\n\nPreisdetails:\n- Erste Nacht: €${priceDetails.firstNightPrice.toFixed(2)}`);
      
      if (priceDetails.additionalNightsCount > 0) {
        body += encodeURIComponent(`\n- Weitere Nächte (${priceDetails.additionalNightsCount}x): €${priceDetails.additionalNightsPrice.toFixed(2)}`);
      }
      
      if (priceDetails.breakfastPrice > 0) {
        body += encodeURIComponent(`\n- Frühstück: €${priceDetails.breakfastPrice.toFixed(2)}`);
        if (breakfastCount > 1) {
          body += encodeURIComponent(` (Erstes Frühstück: €${priceDetails.breakfastFirstPersonPrice.toFixed(2)}, ${breakfastCount-1} weitere: €${priceDetails.breakfastAdditionalPrice.toFixed(2)})`);
        }
      }
      
      if (priceDetails.laundryPrice > 0) {
        body += encodeURIComponent(`\n- Wäschepakete: €${priceDetails.laundryPrice.toFixed(2)}`);
      }
      
      body += encodeURIComponent(`\n- Endreinigung: €${priceDetails.cleaningPrice.toFixed(2)}\n- Gesamtpreis: €${totalPrice.toFixed(2)}`);
    }
    
    if (contactMessage) {
      body += encodeURIComponent(`\n\nWeitere Informationen:\n${contactMessage}`);
    }
    
    body += encodeURIComponent(`\n\nMit freundlichen Grüßen,\n${contactName}\nTel: ${contactPhone}\nEmail: ${contactEmail}`);
    
    const mailtoLink = `mailto:einruhr.mertens@web.de?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    toast({
      title: "E-Mail wird geöffnet",
      description: "Ihr E-Mail-Programm sollte sich jetzt öffnen. Bitte senden Sie die vorbereitete Nachricht ab.",
      variant: "default",
    });
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  const copyEmailTemplate = () => {
    navigator.clipboard.writeText(emailTemplate);
    toast({
      title: "Kopiert!",
      description: "Die E-Mail-Vorlage wurde in die Zwischenablage kopiert.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Preisrechner & Anfrage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Anreise- und Abreisedatum</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
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
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={2}
                disabled={isDateDisabled}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {isDateBooked && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Leider ist zu diesem Zeitraum die Wohnung schon reserviert.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="guests">Anzahl der Personen</Label>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="guests"
              type="number"
              min={1}
              max={4}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="laundry">Anzahl der Wäschepakete</Label>
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="laundry"
              type="number"
              min={0}
              max={4}
              value={laundryPackages}
              onChange={(e) => setLaundryPackages(Math.min(4, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full"
            />
          </div>
          <p className="text-sm text-muted-foreground">Ein Wäschepaket kostet €7 pro Person und enthält Handtücher und Bettwäsche.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="breakfast">Anzahl Frühstück</Label>
          <div className="flex items-center">
            <Coffee className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="breakfast"
              type="number"
              min={0}
              max={8}
              value={breakfastCount}
              onChange={(e) => setBreakfastCount(Math.min(8, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full"
            />
          </div>
          <p className="text-sm text-muted-foreground">Das erste Frühstück kostet €14, jedes weitere Frühstück kostet €6. Wir bieten ein einfaches Frühstück nach Rücksprache an.</p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Ihre Kontaktdaten</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Für Ihre Reservierungsanfrage benötigen wir folgende Informationen:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Ihr Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail *</Label>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Ihre E-Mail"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full"
                placeholder="Ihre Telefonnummer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Nachricht</Label>
            <Textarea
              id="message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Weitere Wünsche oder Fragen..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
          <Button 
            onClick={calculatePrice}
            className="w-full bg-forest-600 hover:bg-forest-700"
          >
            Preis berechnen
          </Button>

          <Button 
            onClick={sendReservationRequest}
            disabled={isSubmitting || !date?.from || !date?.to || !contactName || !contactEmail}
            className="w-full bg-forest-700 hover:bg-forest-800 flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {isSubmitting ? "Wird gesendet..." : "Reservierungsanfrage senden"}
          </Button>
        </div>

        {showEmailTemplate && date?.from && date?.to && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md w-full">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-lg font-serif">E-Mail-Vorlage:</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={copyEmailTemplate}
              >
                <Copy className="h-4 w-4" />
                Kopieren
              </Button>
            </div>
            <div className="whitespace-pre-wrap bg-white p-3 border rounded-md text-sm font-mono">
              {emailTemplate}
            </div>
          </div>
        )}

        {totalPrice !== null && priceDetails && (
          <div className="mt-4 p-4 bg-forest-50 rounded-md w-full">
            <h3 className="font-medium text-lg mb-2 font-serif">Preisdetails:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Erste Nacht:</span>
                <span>€{priceDetails.firstNightPrice.toFixed(2)}</span>
              </div>
              {priceDetails.additionalNightsCount > 0 && (
                <div className="flex justify-between">
                  <span>Weitere Nächte ({priceDetails.additionalNightsCount}x):</span>
                  <span>€{priceDetails.additionalNightsPrice.toFixed(2)}</span>
                </div>
              )}
              {priceDetails.breakfastPrice > 0 && (
                <>
                  <div className="flex justify-between">
                    <span>Frühstück:</span>
                    <span>€{priceDetails.breakfastPrice.toFixed(2)}</span>
                  </div>
                  {breakfastCount > 1 && (
                    <div className="flex justify-between text-xs text-gray-500 pl-4">
                      <span>
                        (Erstes Frühstück: €{priceDetails.breakfastFirstPersonPrice.toFixed(2)}, 
                        {breakfastCount > 1 ? ` ${breakfastCount-1} weitere: €${priceDetails.breakfastAdditionalPersonsPrice.toFixed(2)}` : ""}
                        )
                      </span>
                      <span></span>
                    </div>
                  )}
                </>
              )}
              {priceDetails.laundryPrice > 0 && (
                <div className="flex justify-between">
                  <span>Wäschepakete:</span>
                  <span>€{priceDetails.laundryPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Endreinigung:</span>
                <span>€{priceDetails.cleaningPrice.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Gesamtpreis:</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PriceCalculator;
