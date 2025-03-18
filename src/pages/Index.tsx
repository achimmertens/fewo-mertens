
import { Bed, Map, Coffee, Mountain, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleCalendar from "@/components/GoogleCalendar";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">Ihr Zuhause im Nationalpark Eifel</h2>
              <p className="text-lg text-gray-700">
                Erleben Sie unvergessliche Tage in unserem gemütlichen Ferienhaus inmitten der wunderschönen Natur des Nationalparks Eifel.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <FeatureCard
                title="Komfortable Unterkunft"
                description="Unsere liebevoll eingerichtete Ferienwohnung bietet Platz für bis zu 4 Personen und ist mit allem ausgestattet, was Sie für einen erholsamen Aufenthalt benötigen."
                icon={Bed}
              />
              <FeatureCard
                title="Ideale Lage"
                description="Das Ferienhaus befindet sich in der idyllischen Ortschaft Einruhr, direkt am Nationalpark Eifel und dem malerischen Obersee."
                icon={Map}
              />
              <FeatureCard
                title="Frühstück (optional)"
                description="Auf Wunsch bieten wir Ihnen ein reichhaltiges Frühstück an, damit Sie gestärkt in den Tag starten können."
                icon={Coffee}
              />
              <FeatureCard
                title="Vielfältige Aktivitäten"
                description="Die Region bietet zahlreiche Möglichkeiten für Outdoor-Aktivitäten wie Wandern, Radfahren und Wassersport auf dem Rursee."
                icon={Mountain}
              />
              <FeatureCard
                title="Moderne Annehmlichkeiten"
                description="Kostenfreies WLAN, Smart-TV und eine voll ausgestattete Küche sorgen für einen komfortablen Aufenthalt."
                icon={Wifi}
              />
              <div className="flex items-center justify-center h-full">
                <Button 
                  asChild
                  className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-6"
                >
                  <Link to="/calculator">
                    Jetzt Preis berechnen
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-forest-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">Verfügbarkeit prüfen</h2>
              <p className="text-lg text-gray-700 mb-8">
                Hier können Sie sehen, wann unser Ferienhaus verfügbar ist. Die belegten Tage sind im Kalender markiert.
              </p>
              <GoogleCalendar />
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold mb-4">Kontaktieren Sie uns</h2>
                <p className="text-lg text-gray-700">
                  Haben Sie Fragen oder möchten Sie buchen? Wir freuen uns auf Ihre Nachricht!
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <Button 
                  asChild
                  className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-6 w-full md:w-auto"
                >
                  <Link to="/contact">
                    Kontakt aufnehmen
                  </Link>
                </Button>
                <Separator className="hidden md:block h-12 w-px bg-gray-300" orientation="vertical" />
                <div className="text-center md:text-left">
                  <p className="font-medium text-gray-900">Telefonisch erreichen Sie uns unter:</p>
                  <p className="text-forest-700 text-lg">+49 1734142620</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
