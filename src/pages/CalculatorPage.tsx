import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCalculator from "@/components/PriceCalculator";
import GoogleCalendar from "@/components/GoogleCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { BookingPeriod } from "@/types/booking";
import { fetchBookedPeriods } from "@/utils/calendarUtils";
import { useLanguage } from "@/contexts/LanguageContext";

const CalculatorPage = () => {
  const [bookingPeriods, setBookingPeriods] = useState<BookingPeriod[]>([]);
  const { t, language } = useLanguage();
  const dateLocale = language === 'de' ? de : enUS;

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBookedPeriods();
  }, []);

  const loadBookedPeriods = async () => {
    try {
      const periods = await fetchBookedPeriods();
      setBookingPeriods(periods);
    } catch (error) {
      console.error("Error fetching booked periods:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">{t('calculator.title')}</h1>
            <p className="text-xl max-w-3xl">{t('calculator.subtitle')}</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="max-w-xl">
                <PriceCalculator />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">{t('calculator.checkAvailability')}</h2>
              <p className="mb-6 text-gray-700">{t('calculator.checkAvailabilityDesc')}</p>
              <GoogleCalendar />
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-4 font-serif flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-forest-600" />
                  {t('calculator.bookedPeriods')}
                </h3>
                {bookingPeriods.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {bookingPeriods.map((period, index) => (
                      <li key={index}>
                        {format(period.start, "dd.MM.yyyy", { locale: dateLocale })} -{" "}
                        {format(addDays(period.end, -1), "dd.MM.yyyy", { locale: dateLocale })}{" "}
                        ({period.name})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">{t('calculator.loadingData')}</p>
                )}
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">{t('calculator.contactDetails')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-forest-600 mr-4 mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">{t('calculator.phone')}</h3>
                            <p className="text-forest-700">+49 1517 4412216</p>
                            <p className="text-forest-700">02403 837412</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-forest-600 mr-4 mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">{t('calculator.email')}</h3>
                            <p className="text-forest-700">fewo@amertens.me</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-forest-600 mr-4 mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">{t('calculator.address')}</h3>
                            <p className="text-forest-700">
                              Heilsteinstr. 39<br />52152 Simmerath-Einruhr<br />{t('calculator.germany')}
                            </p>
                            <a href="https://maps.app.goo.gl/qkxbJidBxtzRt5Vv9" target="_blank" rel="noopener noreferrer" className="text-forest-600 hover:underline inline-flex items-center mt-2">
                              {t('calculator.showRoute')}<MapPin className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex items-center justify-center">
                    <figure>
                      <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/gerumpel.jpg?w=2046" alt={t('calculator.photoCaption')} className="w-full h-auto rounded-lg shadow-md" />
                      <figcaption className="text-sm text-gray-500 mt-1 italic text-center">{t('calculator.photoCaption')}</figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CalculatorPage;
