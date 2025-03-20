import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Users, ShoppingCart, Coffee, AlertCircle, Mail, Phone, User, Copy } from "lucide-react";
import { format, differenceInCalendarDays, addDays, isSameDay, startOfDay } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

const PriceCalculator = () => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [guests, setGuests] = useState<number>(2);
  const [laundryPackages, setLaundryPackages] = useState<number>(0);
  const [withBreakfast, setWithBreakfast] = useState<string>("no");
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
  
  // Contact form fields
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price constants
  const FIRST_NIGHT_PRICE = 59;              // €59 für die erste Nacht
  const ADDITIONAL_NIGHT_PRICE = 50;         // €50 für jede weitere Nacht
  const BREAKFAST_PRICE_PER_PERSON = 9;      // €9 pro Person pro Tag mit Frühstück
  const LAUNDRY_PACKAGE_PRICE = 7;           // €7 pro Wäschepaket pro Person
  const CLEANING_FEE = 25;                   // €25 für die Endreinigung

  useEffect(() => {
    // Check if the selected dates are booked, but allow overlap on first and last day
    if (startDate && endDate && bookedDates.length > 0) {
      const start = startOfDay(new Date(startDate));
      const end = startOfDay(new Date(endDate));
      
      // Check only the days between start+1 and end-1
      // This allows bookings to overlap on arrival and departure days
      let current = addDays(start, 1);
      let isBooked = false;
      
      while (current < end) {
        if (bookedDates.some(date => isSameDay(date, current))) {
          isBooked = true;
          break;
        }
        current = addDays(current, 1);
      }
      
      setIsDateBooked(isBooked);
    } else {
      setIsDateBooked(false);
    }
  }, [startDate, endDate, bookedDates]);

  useEffect(() => {
    // This would normally fetch data from the Google Calendar API
    // For now, let's just set some example booked dates
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    // Example: March 21-22, 2025 is booked
    setBookedDates([
      new Date(2025, 2, 21), // March 21, 2025
      new Date(2025, 2, 22), // March 22, 2025
    ]);
  }, []);

  // Generate email template whenever relevant data changes
  useEffect(() => {
    if (startDate && endDate) {
      const arrivalDateStr = format(startDate, "dd.MM.yyyy", { locale: de });
      const departureDateStr = format(endDate, "dd.MM.yyyy", { locale: de });
      const numNights = Math.max(1, differenceInCalendarDays(endDate, startDate));
      
      let template = 
`Betreff: Einruhr - Reservierungsanfrage

Hallo Herr Mertens,

bitte bestätigen Sie, dass die Wohnung in Einruhr vom ${arrivalDateStr} bis zum ${departureDateStr} für uns frei ist.
Wir würden sie gerne für diesen Zeitraum reservieren.`;
      
      if (laundryPackages > 0) {
        template += `\nWir buchen das Wäschepaket für ${laundryPackages} Personen.`;
      }
      
      if (withBreakfast === "yes") {
        template += `\nWir möchten gerne Frühstück für ${guests} Personen dazu buchen.`;
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
  }, [startDate, endDate, guests, laundryPackages, withBreakfast, contactName, contactEmail, contactPhone, contactMessage, totalPrice, priceDetails]);

  const calculatePrice = () => {
    if (!startDate || !endDate) {
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
        description: "Der gewählte Zeitraum ist teilweise belegt. Bitte wählen Sie ein anderes Datum.",
        variant: "destructive",
      });
      return;
    }

    const numNights = Math.max(1, differenceInCalendarDays(endDate, startDate));
    
    // Berechnung des Grundpreises: 59€ für erste Nacht, 50€ für jede weitere
    const firstNightPrice = FIRST_NIGHT_PRICE;
    const additionalNightsCount = numNights - 1;
    const additionalNightsPrice = additionalNightsCount > 0 ? additionalNightsCount * ADDITIONAL_NIGHT_PRICE : 0;
    
    // Frühstückspreis (falls ausgewählt)
    const breakfastPrice = withBreakfast === "yes" ? guests * BREAKFAST_PRICE_PER_PERSON * numNights : 0;
    
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

    toast({
      title: "Preisberechnung abgeschlossen",
      description: `Gesamtpreis für ${numNights} Nächte: €${total.toFixed(2)}`,
    });
  };

  const sendReservationRequest = () => {
    if (!startDate || !endDate) {
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
    const arrivalDateStr = startDate ? format(startDate, "dd.MM.yyyy", { locale: de }) : "";
    const departureDateStr = endDate ? format(endDate, "dd.MM.yyyy", { locale: de }) : "";
    
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
    if (withBreakfast === "yes") {
      body += encodeURIComponent(`\nWir möchten gerne Frühstück für ${guests} Personen dazu buchen.`);
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
        <CardDescription>
          Berechnen Sie den Preis für Ihren Aufenthalt und senden Sie eine Reservierungsanfrage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="startDate">Anreisedatum</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP", { locale: de })
                  ) : (
                    <span>Datum auswählen</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">Abreisedatum</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="endDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "PPP", { locale: de })
                  ) : (
                    <span>Datum auswählen</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => 
                    date < (startDate ? startDate : new Date())
                  }
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {isDateBooked && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Der gewählte Zeitraum ist teilweise belegt. Bitte wählen Sie ein anderes Datum.
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
              value={laundryPackages}
              onChange={(e) => setLaundryPackages(parseInt(e.target.value) || 0)}
              className="w-full"
            />
          </div>
          <p className="text-sm text-muted-foreground">Ein Wäschepaket kostet €7 pro Person und enthält Handtücher und Bettwäsche.</p>
        </div>

        {/* Breakfast */}
        <div className="space-y-2">
          <Label>Frühstück (€9 pro Person/Tag)</Label>
          <div className="flex items-center">
            <Coffee className="mr-2 h-4 w-4 text-muted-foreground" />
            <RadioGroup
              value={withBreakfast}
              onValueChange={setWithBreakfast}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="breakfast-yes" />
                <Label htmlFor="breakfast-yes" className="cursor-pointer">Ja</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="breakfast-no" />
                <Label htmlFor="breakfast-no" className="cursor-pointer">Nein</Label>
              </div>
            </RadioGroup>
          </div>
          <p className="text-sm text-muted-foreground">Wir bieten ein einfaches Frühstück nach Rücksprache an.</p>
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
            disabled={isSubmitting || !startDate || !endDate || !contactName || !contactEmail}
            className="w-full bg-forest-700 hover:bg-forest-800 flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {isSubmitting ? "Wird gesendet..." : "Reservierungsanfrage senden"}
          </Button>
        </div>

        {startDate && endDate && (
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
