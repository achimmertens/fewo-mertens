import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, Users, Clock, ShoppingCart, Coffee, HelpCircle, MapPin } from "lucide-react";
import GoogleCalendar from "@/components/GoogleCalendar";
import { PRICES } from "@/constants/prices";
import { useLanguage } from "@/contexts/LanguageContext";

const InfoPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">{t('info.title')}</h1>
            <p className="text-xl max-w-3xl">{t('info.subtitle')}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 mr-2" />{t('info.prices')}
                </h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">{t('info.basePrice')}</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="font-medium">{t('info.overnight')}</h4>
                        <p className="text-forest-700 text-lg font-medium">{PRICES.FIRST_NIGHT} € {t('info.firstNight')}</p>
                        <p className="text-forest-700 text-lg font-medium">{PRICES.ADDITIONAL_NIGHT} € {t('info.additionalNight')}</p>
                        <p className="text-sm text-gray-600">{t('info.independentOfPersons')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">{t('info.additionalServices')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex">
                        <ShoppingCart className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">{t('info.laundryPackage')}</h4>
                          <p className="text-forest-700 text-lg font-medium">{PRICES.LAUNDRY_PACKAGE} € {t('info.perPerson')}</p>
                          <p className="text-sm text-gray-600">{t('info.towelsBedding')}</p>
                          <p className="text-sm text-gray-600">{t('info.laundryNote')}</p>
                          <div className="w-full p-2 flex flex-col">
                            <img src="https://einruhr.wordpress.com/wp-content/uploads/2023/03/image.webp?w=2046" alt={t('info.laundryPackage')} className="w-full h-60 object-cover" />
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <Coffee className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">{t('info.breakfast')}</h4>
                          <p className="text-forest-700 text-lg font-medium">{PRICES.BREAKFAST.FIRST_PERSON} € {t('info.firstPerson')}</p>
                          <p className="text-forest-700 text-lg font-medium">{PRICES.BREAKFAST.ADDITIONAL_PERSON} € {t('info.additionalPerson')}</p>
                          <p className="text-sm text-gray-600">{t('info.breakfastNote')}</p>
                          <div className="w-full p-2 flex flex-col">
                            <img src="https://files.peakd.com/file/peakd-hive/achimmertens/23vi3sQjf1FmHwfh9CpsLyQZERVyYX4Ltf8j5oR1XDT1qwyVu6UKYnhpjZXRzwMUpE6xs.jpg" alt={t('info.breakfast')} className="w-full h-60 object-cover" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">{t('info.otherCosts')}</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="font-medium">{t('info.cleaningFee')}</h4>
                        <p className="text-forest-700 text-lg font-medium">{PRICES.CLEANING_FEE} €</p>
                        <p className="text-sm text-gray-600">{t('info.alwaysCharged')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button asChild className="bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">{t('info.toPriceCalculator')}</Link>
                  </Button>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2" />{t('info.bookingConditions')}
                </h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">{t('info.stayDuration')}</h3>
                    <p>{t('info.stayDurationDesc')}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">{t('info.arrivalDeparture')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex">
                        <Clock className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">{t('info.checkIn')}</h4>
                          <p>{t('info.checkInTime')}</p>
                          <p className="text-sm text-gray-600">{t('info.earlyCheckIn')}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Clock className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">{t('info.checkOut')}</h4>
                          <p>{t('info.checkOutTime')}</p>
                          <p className="text-sm text-gray-600">{t('info.lateCheckOut')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <HelpCircle className="h-6 w-6 mr-2" />{t('info.faq')}
                </h2>
                <div className="space-y-6">
                  {[
                    { q: t('info.faqPets'), a: t('info.faqPetsAnswer') },
                    { q: t('info.faqParking'), a: t('info.faqParkingAnswer') },
                    { q: t('info.faqWifi'), a: t('info.faqWifiAnswer') },
                    { q: t('info.faqTrash'), a: t('info.faqTrashAnswer') },
                    { q: t('info.faqHeating'), a: t('info.faqHeatingAnswer') },
                    { q: t('info.faqKey'), a: t('info.faqKeyAnswer') },
                  ].map((faq, i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="font-medium mb-2">{faq.q}</h3>
                      <p>{faq.a}</p>
                    </div>
                  ))}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">{t('info.faqBooking')}</h3>
                    <p>
                      {t('info.faqBookingAnswer1')} <Link to="/calculator" className="text-forest-600 hover:underline">{t('info.faqBookingLink')}</Link> {t('info.faqBookingAnswer2')}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">{t('info.faqOtherApartments')}</h3>
                    <p>
                      {t('info.faqOtherApartmentsAnswer')}<br/>
                      <Link to="https://www.airbnb.de/rooms/607971960710618288" className="text-forest-600 hover:underline">{t('info.faqAirbnbRoof')}</Link><br/>
                      <Link to="https://www.airbnb.de/rooms/1418908294068782739" className="text-forest-600 hover:underline">{t('info.faqAirbnbFirst')}</Link><br/>
                      <Link to="https://www.airbnb.de/rooms/713491294435463769" className="text-forest-600 hover:underline">{t('info.faqAirbnbForest')}</Link>
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-forest-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">{t('info.availability')}</h3>
                <p className="mb-4">{t('info.availabilityDesc')}</p>
                <GoogleCalendar />
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">{t('info.capacity')}</h3>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-forest-600 mr-3" />
                    <span>{t('info.upTo4Persons')}</span>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">{t('info.directionsTitle')}</h3>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-forest-600 mr-3 mt-1" />
                    <div>
                      <p className="mb-2">Heilsteinstr. 39, 52152 Simmerath-Einruhr</p>
                      <a href="https://maps.app.goo.gl/qkxbJidBxtzRt5Vv9" target="_blank" rel="noopener noreferrer" className="text-forest-600 hover:underline inline-flex items-center">
                        {t('arrival.showRoute')}
                        <MapPin className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild className="w-full bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">{t('info.calculatePrice')}</Link>
                  </Button>
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

export default InfoPage;
