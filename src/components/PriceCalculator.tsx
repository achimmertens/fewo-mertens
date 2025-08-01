
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DateRange } from "react-day-picker";
import { Mail } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { de } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";

// Import types
import { PriceDetails, ContactInfo, BookingPeriod } from "@/types/booking";

// Import utilities
import { calculatePriceDetails, createEmailTemplate } from "@/utils/priceCalculator";
import { fetchBookedPeriods, isRangeOverlappingBookings } from "@/utils/calendarUtils";

// Import components
import DateSelection from "./calculator/DateSelection";
import GuestOptions from "./calculator/GuestOptions";
import ContactForm from "./calculator/ContactForm";
import PriceDisplay from "./calculator/PriceDisplay";
import EmailDialog from "./calculator/EmailDialog";

const PriceCalculator = () => {
  const { toast } = useToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState<number>(2);
  const [laundryPackages, setLaundryPackages] = useState<number>(0);
  const [breakfastCount, setBreakfastCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [isDateBooked, setIsDateBooked] = useState<boolean>(false);
  const [bookingPeriods, setBookingPeriods] = useState<BookingPeriod[]>([]);
  const [emailTemplate, setEmailTemplate] = useState<string>("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  
  // Contact information
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    loadBookedPeriods();
  }, []);

  // Automatically recalculate price when any parameter changes
  useEffect(() => {
    if (date?.from && date?.to && !isDateBooked) {
      const result = calculatePriceDetails(date, breakfastCount, laundryPackages);
      if (result) {
        setPriceDetails(result.priceDetails);
        setTotalPrice(result.totalPrice);
        updateEmailTemplate(date);
      }
    }
  }, [date, guests, laundryPackages, breakfastCount, contactInfo]);

  const loadBookedPeriods = async () => {
    try {
      const periods = await fetchBookedPeriods();
      setBookingPeriods(periods);
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Die Belegungsdaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  // Handle date selection
  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    
    if (newDate?.from && newDate?.to) {
      const overlapping = isRangeOverlappingBookings(newDate.from, newDate.to, bookingPeriods);
      setIsDateBooked(overlapping);
      
      if (!overlapping) {
        const result = calculatePriceDetails(newDate, breakfastCount, laundryPackages);
        if (result) {
          setPriceDetails(result.priceDetails);
          setTotalPrice(result.totalPrice);
          updateEmailTemplate(newDate);
        }
      }
    }
  };

  // Update contact info
  const handleContactInfoChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  // Update email template
  const updateEmailTemplate = (dateRange: DateRange) => {
    if (!dateRange.from || !dateRange.to) return;
    
    const template = createEmailTemplate(
      dateRange,
      guests,
      laundryPackages,
      breakfastCount,
      contactInfo,
      priceDetails,
      totalPrice
    );
    
    setEmailTemplate(template);
  };

  // Handle reservation request
  const sendReservationRequest = () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie Start- und Enddatum aus.",
        variant: "destructive",
      });
      return;
    }

    if (!contactInfo.name || !contactInfo.email) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return;
    }

    // Ensure price calculation is done
    if (totalPrice === null) {
      const result = calculatePriceDetails(date, breakfastCount, laundryPackages);
      if (result) {
        setPriceDetails(result.priceDetails);
        setTotalPrice(result.totalPrice);
      }
    }
    
    // Google Ads Conversion Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17408162748/nOG9CKjlr_waELz37exA'
      });
    }
    
    updateEmailTemplate(date);
    setShowEmailDialog(true);
  };

  // Open email client
  const openDefaultEmailClient = () => {
    const subject = encodeURIComponent("Reservierungsanfrage");
    const shortBody = encodeURIComponent("");
    
    const mailtoLink = `mailto:fewo@amertens.me?subject=${subject}&body=${shortBody}`;
    window.location.href = mailtoLink;
    
    toast({
      title: "E-Mail wird geöffnet",
      description: "Bitte fügen Sie die kopierte Nachricht in Ihre E-Mail ein.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Preisrechner & Anfrage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection Component */}
        <DateSelection 
          date={date}
          isDateBooked={isDateBooked}
          bookingPeriods={bookingPeriods}
          onDateChange={handleDateChange}
        />

        {/* Guest Options Component */}
        <GuestOptions 
          guests={guests}
          laundryPackages={laundryPackages}
          breakfastCount={breakfastCount}
          onGuestsChange={setGuests}
          onLaundryPackagesChange={setLaundryPackages}
          onBreakfastCountChange={setBreakfastCount}
        />

        <Separator className="my-4" />

        {/* Contact Form Component */}
        <ContactForm 
          contactInfo={contactInfo}
          onContactInfoChange={handleContactInfoChange}
        />
      </CardContent>

      <CardFooter className="flex flex-col">
        {/* Price Details Display */}
        {totalPrice !== null && priceDetails && (
          <PriceDisplay 
            totalPrice={totalPrice}
            priceDetails={priceDetails}
            laundryPackages={laundryPackages}
            breakfastCount={breakfastCount}
          />
        )}
        
        {/* Request Button */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <Button 
            onClick={sendReservationRequest}
            disabled={!date?.from || !date?.to || !contactInfo.name || !contactInfo.email}
            className="w-full bg-forest-700 hover:bg-forest-800 flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Via Email unverbindlich anfragen
          </Button>
        </div>

        {/* Email Dialog Component */}
        <EmailDialog 
          showEmailDialog={showEmailDialog}
          setShowEmailDialog={setShowEmailDialog}
          emailTemplate={emailTemplate}
          handleEmailOpen={openDefaultEmailClient}
        />
      </CardFooter>
    </Card>
  );
};

export default PriceCalculator;
