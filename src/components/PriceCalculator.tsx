interface BookingPeriod {
  start: Date;
  end: Date;
  name: string; // Name des Events
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Users, ShoppingCart, Coffee, AlertCircle, Mail, Phone, User, Copy, Check, ClipboardCopy } from "lucide-react";
import { format, differenceInCalendarDays, addDays, isSameDay, startOfDay, isBefore, isAfter, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const FIRST_NIGHT_PRICE = 59;
export const ADDITIONAL_NIGHT_PRICE = 50;
export const BREAKFAST_FIRST_PRICE = 14;
export const BREAKFAST_ADDITIONAL_PRICE = 7;
export const LAUNDRY_PACKAGE_PRICE = 7;
export const CLEANING_FEE = 25;

const PriceCalculator = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
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
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    fetchBookedPeriods();
  }, []);

  // Add handleDateChange function to handle date selection
  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    
    if (newDate?.from && newDate?.to) {
      const isOverlapping = isRangeOverlappingBookings(newDate.from, newDate.to);
      setIsDateBooked(isOverlapping);
      
      if (!isOverlapping) {
        const numNights = Math.max(1, differenceInCalendarDays(newDate.to, newDate.from));
        
        // Create email template for booking request
        const template = `Reservierungsanfrage für Ferienwohnung Waldoase Mertens in Einruhr

Sehr geehrter Herr Mertens,

ich möchte gerne folgende Reservierung anfragen:

Anreisedatum: ${format(newDate.from, "dd.MM.yyyy", { locale: de })}
Abreisedatum: ${format(newDate.to, "dd.MM.yyyy", { locale: de })}
Anzahl Nächte: ${numNights}
Anzahl Personen: ${guests}
${laundryPackages > 0 ? `Wäschepakete: ${laundryPackages}` : ''}
${breakfastCount > 0 ? `Frühstück: ${breakfastCount}` : ''}

${contactName ? `Name: ${contactName}` : ''}
${contactEmail ? `E-Mail: ${contactEmail}` : ''}
${contactPhone ? `Telefon: ${contactPhone}` : ''}
${contactMessage ? `Nachricht: ${contactMessage}` : ''}

Ich freue mich auf Ihre Rückmeldung.

Mit freundlichen Grüßen,
${contactName || '[Ihr Name]'}`;
        
        setEmailTemplate(template);
      }
    }
  };

  const fetchBookedPeriods = async () => {
    try {
      const calendarId = "6gk8bbmgm01bk625432gb33tk0@group.calendar.google.com"; // Einruhr-Kalender-ID
      const apiKey = "AIzaSyBiD1VUk3DaVOZ2omR9T4xbr9k8vu4gS1c"; // Dein API-Schlüssel
      const timeMin = new Date().toISOString(); // Startzeitpunkt: heute
      const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(); // Endzeitpunkt: 90 Tage in der Zukunft
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Kalenderdaten");
      }

      const data = await response.json();
      const bookings = data.items.map((event: any) => ({
        start: new Date(event.start.date || event.start.dateTime),
        end: new Date(event.end.date || event.end.dateTime),
        name: event.summary || "Unbekannt", // Extrahiere den Namen aus dem Event
      }));

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

  const isRangeOverlappingBookings = (from: Date, to: Date): boolean => {
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
  
      console.log("rangeStart:", rangeStart);
      console.log("periodStart:", periodStart);
      console.log("rangeEnd:", rangeEnd);
      console.log("periodEnd:", periodEnd);
  
      return (overlapsStart || overlapsEnd || fullyContains || exactMatch) && !startsOnPeriodEnd;
    });
  };

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
    
    let breakfastPrice = 0;
    let breakfastFirstPersonPrice = 0;
    let breakfastAdditionalPrice = 0;
    
    if (breakfastCount > 0) {
      breakfastFirstPersonPrice = BREAKFAST_FIRST_PRICE;
      
      if (breakfastCount > 1) {
        breakfastAdditionalPrice = (breakfastCount - 1) * BREAKFAST_ADDITIONAL_PRICE;
      }
      
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

    setShowEmailDialog(true);
  };

  const openDefaultEmailClient = () => {
    const subject = encodeURIComponent("Einruhr - Reservierungsanfrage");
    // Erstelle eine kurze Email mit einem Hinweis auf die vollständige E-Mail im Anhang
    const shortBody = encodeURIComponent(
      `Hallo Herr Mertens,\n\nAnbei meine Reservierungsanfrage für die Ferienwohnung Waldoase Mertens in Einruhr.\n\nBitte finden Sie alle Details in der nachfolgenden Nachricht:\n\n${emailTemplate.substring(0, 150)}...`
    );
    
    // Verwende nur eine kurze E-Mail für das mailto
    const mailtoLink = `mailto:einruhr.mertens@web.de?subject=${subject}&body=${shortBody}`;
    window.location.href = mailtoLink;
    
    toast({
      title: "E-Mail wird geöffnet",
      description: "Bitte fügen Sie die kopierte Nachricht in Ihre E-Mail ein.",
    });
  };

  const copyEmailTemplate = () => {
    navigator.clipboard.writeText(emailTemplate);
    setIsCopied(true);
    toast({
      title: "Kopiert!",
      description: "Die E-Mail-Vorlage wurde in die Zwischenablage kopiert.",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const createNumberOptions = (max: number, includeZero: boolean = true) => {
    const options = [];
    if (includeZero) options.push(0);
    for (let i = 1; i <= max; i++) {
      options.push(i);
    }
    return options;
  };

  const guestOptions = createNumberOptions(4, false);
  const laundryOptions = createNumberOptions(4);
  const breakfastOptions = createNumberOptions(8);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Preisrechner & Anfrage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
                onSelect={handleDateChange}
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
          {isMobile ? (
            <RadioGroup
              defaultValue={guests.toString()}
              onValueChange={(value) => setGuests(parseInt(value))}
              className="flex space-x-2"
            >
              {guestOptions.map((option) => (
                <div key={option} className="flex items-center space-x-1">
                  <RadioGroupItem value={option.toString()} id={`guests-${option}`} className="peer sr-only" />
                  <Label
                    htmlFor={`guests-${option}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-background 
                    peer-data-[state=checked]:bg-forest-100 peer-data-[state=checked]:border-forest-600 hover:bg-muted/10 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
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
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="laundry">Anzahl der Wäschepakete</Label>
          {isMobile ? (
            <RadioGroup
              defaultValue={laundryPackages.toString()}
              onValueChange={(value) => setLaundryPackages(parseInt(value))}
              className="flex space-x-2"
            >
              {laundryOptions.map((option) => (
                <div key={option} className="flex items-center space-x-1">
                  <RadioGroupItem value={option.toString()} id={`laundry-${option}`} className="peer sr-only" />
                  <Label
                    htmlFor={`laundry-${option}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-background 
                    peer-data-[state=checked]:bg-forest-100 peer-data-[state=checked]:border-forest-600 hover:bg-muted/10 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
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
          )}
          <p className="text-sm text-muted-foreground">Ein Wäschepaket kostet €7 pro Person und enthält Handtücher und Bettwäsche.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="breakfast">Anzahl Frühstück</Label>
          {isMobile ? (
            <RadioGroup
              defaultValue={breakfastCount.toString()}
              onValueChange={(value) => setBreakfastCount(parseInt(value))}
              className="flex flex-wrap gap-2"
            >
              {breakfastOptions.map((option) => (
                <div key={option} className="flex items-center space-x-1">
                  <RadioGroupItem value={option.toString()} id={`breakfast-${option}`} className="peer sr-only" />
                  <Label
                    htmlFor={`breakfast-${option}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-background 
                    peer-data-[state=checked]:bg-forest-100 peer-data-[state=checked]:border-forest-600 hover:bg-muted/10 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
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
          )}
          <p className="text-sm text-muted-foreground">
  Wir bieten ein einfaches Frühstück nach Rücksprache an. Das erste Frühstück kostet €{BREAKFAST_FIRST_PRICE}, jedes weitere Frühstück kostet €{BREAKFAST_ADDITIONAL_PRICE}.
</p>
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
            Preis anzeigen
          </Button>

          <Button 
            onClick={sendReservationRequest}
            disabled={isSubmitting || !date?.from || !date?.to || !contactName || !contactEmail}
            className="w-full bg-forest-700 hover:bg-forest-800 flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Via Email buchen
          </Button>
        </div>
          
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
                        {breakfastCount > 1 ? ` ${breakfastCount-1} weitere: €${priceDetails.breakfastAdditionalPrice.toFixed(2)}` : ""}
                        )
                      </span>
                      <span></span>
                    </div>
                  )}
                </>
              )}
              {priceDetails.laundryPrice > 0 && (
  <>
    <div className="flex justify-between">
      <span>Wäschepakete ({laundryPackages}x):</span>
      <span>€{priceDetails.laundryPrice.toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-xs text-gray-500 pl-4">
      <span>€7 pro Paket</span>
      <span></span>
    </div>
  </>
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

        {/* Email-Dialog */}
        <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">Reservierung versenden</DialogTitle>
              <DialogDescription>
                Die E-Mail-Vorlage wurde erstellt. Sie können sie jetzt kopieren und an einruhr.mertens@web.de senden.
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-lg font-serif">E-Mail-Vorlage:</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={copyEmailTemplate}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Kopieren
                      </>
                    )}
                  </Button>
                </div>
                <div className="whitespace-pre-wrap bg-white p-3 border rounded-md text-sm font-mono overflow-auto max-h-[250px]">
                  {emailTemplate}
                </div>
              </div>
              
              <Alert className="bg-blue-50">
                <div className="flex flex-col space-y-2">
                  <p className="font-medium">So verschicken Sie Ihre Reservierungsanfrage:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Klicken Sie auf "Kopieren" um den Text zu kopieren</li>
                    <li>Öffnen Sie Ihr E-Mail-Programm</li>
                    <li>Erstellen Sie eine neue E-Mail an: <span className="font-medium">einruhr.mertens@web.de</span></li>
                    <li>Fügen Sie den kopierten Text ein</li>
                    <li>Senden Sie die E-Mail ab</li>
                  </ol>
                </div>
              </Alert>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEmailDialog(false)}
                className="sm:order-1 order-2"
              >
                Schließen
              </Button>
              
              <Button 
                className="bg-forest-700 hover:bg-forest-800 flex items-center gap-2 sm:order-2 order-1 w-full sm:w-auto"
                onClick={() => {
                  copyEmailTemplate();
                  openDefaultEmailClient();
                }}
              >
                <Mail className="h-4 w-4" />
                E-Mail-Programm öffnen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PriceCalculator;
