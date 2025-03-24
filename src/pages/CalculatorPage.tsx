
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCalculator from "@/components/PriceCalculator";
import GoogleCalendar from "@/components/GoogleCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

const CalculatorPage = () => {
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
                    <img 
                      src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/gerumpel.jpg?w=2046" 
                      alt="Außenansicht Eingang" 
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
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
