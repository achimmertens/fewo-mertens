
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DateRange } from "react-day-picker";
import { Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, differenceInCalendarDays } from "date-fns";
import { de } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { PriceDetails, ContactInfo, BookingPeriod } from "@/types/booking";
import { calculatePriceDetails, createEmailTemplate } from "@/utils/priceCalculator";
import { fetchBookedPeriods, isRangeOverlappingBookings } from "@/utils/calendarUtils";
import DateSelection from "./calculator/DateSelection";
import GuestOptions from "./calculator/GuestOptions";
import ContactForm from "./calculator/ContactForm";
import PriceDisplay from "./calculator/PriceDisplay";
import EmailDialog from "./calculator/EmailDialog";
import { useLanguage } from "@/contexts/LanguageContext";

const PriceCalculator = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [date, setDate] = useState<DateRange | undefined>({ from: undefined, to: undefined });
  const [guests, setGuests] = useState<number>(2);
  const [laundryPackages, setLaundryPackages] = useState<number>(0);
  const [breakfastCount, setBreakfastCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [isDateBooked, setIsDateBooked] = useState<boolean>(false);
  const [bookingPeriods, setBookingPeriods] = useState<BookingPeriod[]>([]);
  const [emailTemplate, setEmailTemplate] = useState<string>("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ name: "", email: "", phone: "", message: "" });

  useEffect(() => { loadBookedPeriods(); }, []);

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
      toast({ title: t('priceCalculator.error'), description: t('priceCalculator.errorLoadBookings'), variant: "destructive" });
    }
  };

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      const overlapping = isRangeOverlappingBookings(newDate.from, newDate.to, bookingPeriods);
      setIsDateBooked(overlapping);
      if (!overlapping) {
        const result = calculatePriceDetails(newDate, breakfastCount, laundryPackages);
        if (result) { setPriceDetails(result.priceDetails); setTotalPrice(result.totalPrice); updateEmailTemplate(newDate); }
      }
    }
  };

  const handleContactInfoChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const updateEmailTemplate = (dateRange: DateRange, bindingBooking: boolean = false) => {
    if (!dateRange.from || !dateRange.to) return;
    const template = createEmailTemplate(dateRange, guests, laundryPackages, breakfastCount, contactInfo, priceDetails, totalPrice, bindingBooking);
    setEmailTemplate(template);
  };

  const sendReservationRequest = (bindingBooking: boolean = false) => {
    if (!date?.from || !date?.to) {
      toast({ title: t('priceCalculator.error'), description: t('priceCalculator.errorSelectDates'), variant: "destructive" });
      return;
    }
    if (!contactInfo.name || !contactInfo.email) {
      toast({ title: t('priceCalculator.error'), description: t('priceCalculator.errorContactInfo'), variant: "destructive" });
      return;
    }
    if (totalPrice === null) {
      const result = calculatePriceDetails(date, breakfastCount, laundryPackages);
      if (result) { setPriceDetails(result.priceDetails); setTotalPrice(result.totalPrice); }
    }
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', { 'send_to': 'AW-17408162748/nOG9CKjlr_waELz37exA' });
    }
    updateEmailTemplate(date, bindingBooking);
    setShowEmailDialog(true);
  };

  const openDefaultEmailClient = () => {
    const subject = encodeURIComponent(t('priceCalculator.reservationSubject'));
    const mailtoLink = `mailto:fewo@amertens.me?subject=${subject}&body=${encodeURIComponent("")}`;
    window.location.href = mailtoLink;
    toast({ title: t('priceCalculator.emailOpening'), description: t('priceCalculator.emailOpeningDesc') });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">{t('calculator.priceCalcTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <DateSelection date={date} isDateBooked={isDateBooked} bookingPeriods={bookingPeriods} onDateChange={handleDateChange} />
        <GuestOptions guests={guests} laundryPackages={laundryPackages} breakfastCount={breakfastCount} onGuestsChange={setGuests} onLaundryPackagesChange={setLaundryPackages} onBreakfastCountChange={setBreakfastCount} />
        <Separator className="my-4" />
        <ContactForm contactInfo={contactInfo} onContactInfoChange={handleContactInfoChange} />
      </CardContent>
      <CardFooter className="flex flex-col">
        {totalPrice !== null && priceDetails && (
          <PriceDisplay totalPrice={totalPrice} priceDetails={priceDetails} laundryPackages={laundryPackages} breakfastCount={breakfastCount} />
        )}
        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="w-full">
                    <Button onClick={() => sendReservationRequest(false)} disabled={!date?.from || !date?.to || !contactInfo.name || !contactInfo.email} className="w-full bg-forest-700 hover:bg-forest-800 flex items-center gap-2">
                      <Mail className="h-4 w-4" />{t('priceCalculator.inquireByEmail')}
                    </Button>
                  </span>
                </TooltipTrigger>
                {(!date?.from || !date?.to || !contactInfo.name || !contactInfo.email) && (
                  <TooltipContent><p>{t('priceCalculator.fillFields')}</p></TooltipContent>
                )}
              </Tooltip>
              <p className="text-xs text-muted-foreground mt-2 text-center">{t('priceCalculator.inquireHint')}</p>
            </div>
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="w-full">
                    <Button onClick={() => sendReservationRequest(true)} disabled={!date?.from || !date?.to || !contactInfo.name || !contactInfo.email} className="w-full bg-forest-900 hover:bg-forest-950 flex items-center gap-2">
                      <Mail className="h-4 w-4" />{t('priceCalculator.bindingBooking')}
                    </Button>
                  </span>
                </TooltipTrigger>
                {(!date?.from || !date?.to || !contactInfo.name || !contactInfo.email) && (
                  <TooltipContent><p>{t('priceCalculator.fillFields')}</p></TooltipContent>
                )}
              </Tooltip>
              <p className="text-xs text-muted-foreground mt-2 text-center">{t('priceCalculator.bindingHint')}</p>
            </div>
          </div>
        </TooltipProvider>
        <EmailDialog showEmailDialog={showEmailDialog} setShowEmailDialog={setShowEmailDialog} emailTemplate={emailTemplate} handleEmailOpen={openDefaultEmailClient} />
      </CardFooter>
    </Card>
  );
};

export default PriceCalculator;
