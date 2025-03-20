
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Users, ShoppingCart, Coffee, AlertCircle } from "lucide-react";
import { format, differenceInCalendarDays, addDays, isSameDay, startOfDay } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  // Price constants
  const FIRST_NIGHT_PRICE = 59;              // €59 für die erste Nacht
  const ADDITIONAL_NIGHT_PRICE = 50;         // €50 für jede weitere Nacht
  const BREAKFAST_PRICE_PER_PERSON = 9;      // €9 pro Person pro Tag mit Frühstück
  const LAUNDRY_PACKAGE_PRICE = 7;           // €7 pro Wäschepaket pro Person
  const CLEANING_FEE = 25;                   // €25 für die Endreinigung

  useEffect(() => {
    // Check if the selected dates are booked
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
        description: "Der gewählte Zeitraum ist bereits belegt.",
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Preisrechner</CardTitle>
        <CardDescription>
          Berechnen Sie den Preis für Ihren Aufenthalt in unserer Ferienwohnung.
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
                    date < (startDate ? addDays(startDate, 1) : new Date())
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
              Der gewählte Zeitraum ist bereits belegt. Bitte wählen Sie ein anderes Datum.
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
      </CardContent>

      <CardFooter className="flex flex-col">
        <Button 
          onClick={calculatePrice}
          className="w-full bg-forest-600 hover:bg-forest-700"
        >
          Preis berechnen
        </Button>

        {totalPrice !== null && priceDetails && (
          <div className="mt-6 p-4 bg-forest-50 rounded-md w-full">
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
