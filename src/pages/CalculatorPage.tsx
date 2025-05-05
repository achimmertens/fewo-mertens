
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCalculator from "@/components/PriceCalculator";
import GoogleCalendar from "@/components/GoogleCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { de } from "date-fns/locale";

interface BookingPeriod {
  start: Date;
  end: Date;
  name: string;
}

const CalculatorPage = () => {
  const [bookingPeriods, setBookingPeriods] = useState<BookingPeriod[]>([]);

  useEffect(() => {
    fetchBookedPeriods();
  }, []);

  const fetchBookedPeriods = async () => {
    try {
      const calendarId = "6gk8bbmgm01bk625432gb33tk0@group.calendar.google.com";
      const apiKey = "AIzaSyBiD1VUk3DaVOZ2omR9T4xbr9k8vu4gS1c";
      const timeMin = new Date().toISOString();
      const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Kalenderdaten");
      }

      const data = await response.json();
      const bookings = data.items.map((event: any) => ({
        start: new Date(event.start.date || event.start.dateTime),
        end: new Date(event.end.date || event.end.dateTime),
        name: event.summary || "Unbekannt",
      }));

      setBookingPeriods(bookings);
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
            <h1 className="text-4xl font-serif font-bold mb-4">Preisrechner & Reservierung</h1>
            <p className="text-xl max-w-3xl">
              Berechnen Sie ganz einfach den Preis für Ihren Aufenthalt und senden Sie uns gleich eine Reservierungsanfrage.
            </p>
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
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">
                Verfügbarkeit prüfen
              </h2>
              <p className="mb-6 text-gray-700">
                Hier können Sie prüfen, ob unsere Ferienwohnung für Ihren Wunschtermin verfügbar ist. Die belegten Tage sind im Kalender markiert.
              </p>
              
              <GoogleCalendar />
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-4 font-serif flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-forest-600" />
                  Belegte Zeiträume der nächsten 90 Tage:
                </h3>
                {bookingPeriods.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {bookingPeriods.map((period, index) => (
                      <li key={index}>
                        {format(period.start, "dd.MM.yyyy", { locale: de })} -{" "}
                        {format(addDays(period.end, -1), "dd.MM.yyyy", { locale: de })}{" "}
                        ({period.name})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Daten werden geladen...</p>
                )}
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">
                  Kontaktdaten
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-forest-600 mr-4 mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">Telefon</h3>
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
                            <h3 className="font-medium mb-1">E-Mail</h3>
                            <p className="text-forest-700">einruhr.mertens@web.de</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-forest-600 mr-4 mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">Adresse</h3>
                            <p className="text-forest-700">
                              Heilsteinstr. 39<br />
                              52152 Simmerath-Einruhr<br />
                              Deutschland
                            </p>
                            <a 
                              href="https://maps.app.goo.gl/qkxbJidBxtzRt5Vv9" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-forest-600 hover:underline inline-flex items-center mt-2"
                            >
                              Route in Google Maps anzeigen
                              <MapPin className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex items-center justify-center">
                  <figure>
                <img 
                  src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/gerumpel.jpg?w=2046" 
                  alt="Wohnzimmer nach Einzug" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-1 italic text-center">Annette und Achim im Wohnzimmer direkt nach Einzug</figcaption>
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
