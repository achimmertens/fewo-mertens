
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
import { format, differenceInCalendarDays, addDays, isSameDay, startOfDay, isBefore, isAfter } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

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
    laundryPrice: number;
    cleaningPrice: number;
  } | null>(null);
  const [isDateBooked, setIsDateBooked] = useState<boolean>(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [emailTemplate, setEmailTemplate] = useState<string>("");
  const [showEmailTemplate, setShowEmailTemplate] = useState<boolean>(false);
  
  // Contact form fields
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price constants
  const FIRST_NIGHT_PRICE = 59;              // €59 für die erste Nacht
  const ADDITIONAL_NIGHT_PRICE = 50;         // €50 für jede weitere Nacht
  const BREAKFAST_FIRST_PERSON_PRICE = 14;   // €14 für die erste Person mit Frühstück
  const BREAKFAST_ADDITIONAL_PRICE = 6;      // €6 für jede weitere Person mit Frühstück
  const LAUNDRY_PACKAGE_PRICE = 7;           // €7 pro Wäschepaket pro Person
  const CLEANING_FEE = 25;                   // €25 für die Endreinigung

  useEffect(() => {
    // This would normally fetch data from the Google Calendar API
    // For now, let's just set some example booked dates
    fetchBookedDates();
  }, []);

  // Fetch booked dates from Google Calendar API
  const fetchBookedDates = async () => {
    try {
      // In a real implementation, this would be an API call to get booked dates
      // For now, we'll simulate it with example data
      const today = new Date();
      
      // Example: Current month ranges
      const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 10);
      const currentMonthEnd = new Date(today.getFullYear(), today.getMonth(), 15);
      
      // Example: Next month ranges
      const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 5);
      const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 10);
      
      // Generate all dates in the booked ranges
      const bookedDatesArray: Date[] = [];
      
      // Add current month booking
      let currentDate = new Date(currentMonthStart);
      while (currentDate <= currentMonthEnd) {
        bookedDatesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      // Add next month booking
      currentDate = new Date(nextMonthStart);
      while (currentDate <= nextMonthEnd) {
        bookedDatesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      setBookedDates(bookedDatesArray);
      
    } catch (error) {
      console.error("Error fetching booked dates:", error);
      toast({
        title: "Fehler",
        description: "Die Belegungsdaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  // Check if a date is in the booking range but not on the exact start/end dates
  const isDayBooked = (day: Date) => {
    const dayStart = startOfDay(new Date(day));
    
    // Check if this exact day is in the booked dates array
    return bookedDates.some(bookedDate => 
      isSameDay(dayStart, bookedDate)
    );
  };

  // Check if the selected date range overlaps with booked dates
  const isRangeOverlappingBookings = (from: Date, to: Date) => {
    if (!from || !to) return false;
    
    // We need to check all days between from+1 and to-1
    // This allows bookings to end on the day another booking starts
    const checkStart = addDays(startOfDay(from), 1);
    const checkEnd = startOfDay(to);
    
    // If range is just one day, it's valid (departure = arrival)
    if (isSameDay(checkStart, checkEnd) || isBefore(checkEnd, checkStart)) {
      return false;
    }
    
    // Check each day in the range
    let current = new Date(checkStart);
    while (isBefore(current, checkEnd)) {
      if (isDayBooked(current)) {
        return true;
      }
      current = addDays(current, 1);
    }
    
    return false;
  };

  useEffect(() => {
    // Check if the selected date range overlaps with booked dates
    if (date?.from && date?.to) {
      const isOverlapping = isRangeOverlappingBookings(date.from, date.to);
      setIsDateBooked(isOverlapping);
      
      // Show warning toast if overlapping
      if (isOverlapping) {
        toast({
          title: "Belegung",
          description: "Leider ist zu diesem Zeitraum die Wohnung schon reserviert.",
          variant: "destructive",
        });
      }
    } else {
      setIsDateBooked(false);
    }
  }, [date, bookedDates]);

  // Generate email template whenever relevant data changes
  useEffect(() => {
    if (date?.from && date?.to) {
      const arrivalDateStr = format(date.from, "dd.MM.yyyy", { locale: de });
      const departureDateStr = format(date.to, "dd.MM.yyyy", { locale: de });
      const numNights = Math.max(1, differenceInCalendarDays(date.to, date.from));
      
      let template = 
`Betreff: Einruhr - Reservierungsanfrage

Hallo Herr Mertens,

bitte bestätigen Sie, dass die Wohnung in Einruhr vom ${arrivalDateStr} bis zum ${departureDateStr} für uns frei ist.
Wir würden sie gerne für diesen Zeitraum reservieren.`;
      
      if (laundryPackages > 0) {
        template += `\nWir buchen das Wäschepaket für ${laundryPackages} Personen.`;
      }
      
      if (breakfastCount > 0) {
        template += `\nWir möchten gerne Frühstück für ${breakfastCount} Personen dazu buchen.`;
      }
      
      if (priceDetails) {
        template += `\n\nPreisdetails:
- Erste Nacht: €${priceDetails.firstNightPrice.toFixed(2)}`;
        
        if (priceDetails.additionalNightsCount > 0) {
          template += `
- Weitere Nächte (${priceDetails.additionalNightsCount}x): €${priceDetails.additionalNightsPrice.toFixed(2)}`;
        }
        
        if (priceDetails.breakfastPrice > 0) {
          template += `
- Frühstück: €${priceDetails.breakfastPrice.toFixed(2)}`;
        }
        
        if (priceDetails.laundryPrice > 0) {
          template += `
- Wäschepakete: €${priceDetails.laundryPrice.toFixed(2)}`;
        }
        
        template += `
- Endreinigung: €${priceDetails.cleaningPrice.toFixed(2)}
- Gesamtpreis: €${totalPrice?.toFixed(2)}`;
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
        description: "Leider ist zu diesem Zeitraum die Wohnung schon reserviert.",
        variant: "destructive",
      });
      return;
    }

    const numNights = Math.max(1, differenceInCalendarDays(date.to, date.from));
    
    // Berechnung des Grundpreises: 59€ für erste Nacht, 50€ für jede weitere
    const firstNightPrice = FIRST_NIGHT_PRICE;
    const additionalNightsCount = numNights - 1;
    const additionalNightsPrice = additionalNightsCount > 0 ? additionalNightsCount * ADDITIONAL_NIGHT_PRICE : 0;
    
    // Frühstückspreis (falls ausgewählt)
    let breakfastPrice = 0;
    if (breakfastCount > 0) {
      // Erste Person zahlt 14€, jede weitere 6€ pro Tag mit Frühstück
      breakfastPrice = BREAKFAST_FIRST_PERSON_PRICE;
      if (breakfastCount > 1) {
        breakfastPrice += (breakfastCount - 1) * BREAKFAST_ADDITIONAL_PRICE;
      }
      breakfastPrice *= numNights; // Frühstück für jeden Tag
    }
    
    // Wäschepaketpreis (pro Person)
    const laundryPrice = laundryPackages * LAUNDRY_PACKAGE_PRICE;
    
    // Endreinigung
    const cleaningPrice = CLEANING_FEE;
    
    // Gesamtpreis
    const total = firstNightPrice + additionalNightsPrice + breakfastPrice + laundryPrice + cleaningPrice;
    
    setTotalPrice(total);
    setPriceDetails({
      firstNightPrice,
      additionalNightsPrice,
      additionalNightsCount,
      breakfastPrice,
      laundryPrice,
      cleaningPrice
    });
    
    // Show email template after price calculation
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
    
    // Format dates for the email body
    const arrivalDateStr = date.from ? format(date.from, "dd.MM.yyyy", { locale: de }) : "";
    const departureDateStr = date.to ? format(date.to, "dd.MM.yyyy", { locale: de }) : "";
    
    // Build the mailto link with the form data
    const subject = encodeURIComponent("Einruhr - Reservierungsanfrage");
    
    // Build the body of the email
    let body = encodeURIComponent(
      `Hallo Herr Mertens,\n\nbitte bestätigen Sie, dass die Wohnung in Einruhr vom ${arrivalDateStr} bis zum ${departureDateStr} für uns frei ist.\nWir würden sie gerne für diesen Zeitraum reservieren.`
    );
    
    // Add information about the laundry package if selected
    if (laundryPackages > 0) {
      body += encodeURIComponent(`\nWir buchen das Wäschepaket für ${laundryPackages} Personen.`);
    }
    
    // Add breakfast information if selected
    if (breakfastCount > 0) {
      body += encodeURIComponent(`\nWir möchten gerne Frühstück für ${breakfastCount} Personen dazu buchen.`);
    }
    
    // Add price details if available
    if (priceDetails && totalPrice) {
      body += encodeURIComponent(`\n\nPreisdetails:\n- Erste Nacht: €${priceDetails.firstNightPrice.toFixed(2)}`);
      
      if (priceDetails.additionalNightsCount > 0) {
        body += encodeURIComponent(`\n- Weitere Nächte (${priceDetails.additionalNightsCount}x): €${priceDetails.additionalNightsPrice.toFixed(2)}`);
      }
      
      if (priceDetails.breakfastPrice > 0) {
        body += encodeURIComponent(`\n- Frühstück: €${priceDetails.breakfastPrice.toFixed(2)}`);
      }
      
      if (priceDetails.laundryPrice > 0) {
        body += encodeURIComponent(`\n- Wäschepakete: €${priceDetails.laundryPrice.toFixed(2)}`);
      }
      
      body += encodeURIComponent(`\n- Endreinigung: €${priceDetails.cleaningPrice.toFixed(2)}\n- Gesamtpreis: €${totalPrice.toFixed(2)}`);
    }
    
    // Add the message if provided
    if (contactMessage) {
      body += encodeURIComponent(`\n\nWeitere Informationen:\n${contactMessage}`);
    }
    
    // Add sender's contact information
    body += encodeURIComponent(`\n\nMit freundlichen Grüßen,\n${contactName}\nTel: ${contactPhone}\nEmail: ${contactEmail}`);
    
    // Create and open the mailto link
    const mailtoLink = `mailto:einruhr.mertens@web.de?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show a confirmation toast
    toast({
      title: "E-Mail wird geöffnet",
      description: "Ihr E-Mail-Programm sollte sich jetzt öffnen. Bitte senden Sie die vorbereitete Nachricht ab.",
      variant: "default",
    });
    
    // Reset the form submission state after a delay
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
        {/* Date Range Picker */}
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
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(day) => {
                  // Prevent selecting dates in the past
                  if (isBefore(day, startOfDay(new Date()))) return true;
                  
                  // Allow selecting start/end of a booking
                  // but disable days that are in the middle of booked periods
                  return isDayBooked(day);
                }}
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

        {/* Guests */}
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

        {/* Laundry Packages */}
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

        {/* Breakfast */}
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
          <p className="text-sm text-muted-foreground">Erste Person: €14 pro Tag, jede weitere Person: €6 pro Tag. Wir bieten ein einfaches Frühstück nach Rücksprache an.</p>
        </div>

        <Separator className="my-4" />

        {/* Contact Information */}
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
                <div className="flex justify-between">
                  <span>Frühstück:</span>
                  <span>€{priceDetails.breakfastPrice.toFixed(2)}</span>
                </div>
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
