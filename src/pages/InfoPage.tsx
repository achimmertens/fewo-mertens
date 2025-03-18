
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  ShoppingCart,
  Coffee,
  HelpCircle
} from "lucide-react";
import GoogleCalendar from "@/components/GoogleCalendar";

const InfoPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">Preise & Infos</h1>
            <p className="text-xl max-w-3xl">
              Alle wichtigen Informationen zu Preisen, Buchungsbedingungen und Hausregeln auf einen Blick.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 mr-2" />
                  Preise
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">Grundpreis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Hauptsaison (Juni - August)</h4>
                        <p className="text-forest-700 text-lg font-medium">89 € pro Nacht</p>
                        <p className="text-sm text-gray-600">Für 2 Personen</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Nebensaison</h4>
                        <p className="text-forest-700 text-lg font-medium">80 € pro Nacht</p>
                        <p className="text-sm text-gray-600">Für 2 Personen</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium">Zusätzliche Personen</h4>
                        <p className="text-forest-700 text-lg font-medium">+10 € pro Person/Nacht</p>
                        <p className="text-sm text-gray-600">Maximal 4 Personen möglich</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">Zusatzleistungen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex">
                        <ShoppingCart className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Wäschepaket</h4>
                          <p className="text-forest-700 text-lg font-medium">10 € pro Paket</p>
                          <p className="text-sm text-gray-600">Handtücher & Bettwäsche</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Coffee className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Frühstück</h4>
                          <p className="text-forest-700 text-lg font-medium">7,50 € pro Person/Tag</p>
                          <p className="text-sm text-gray-600">Reichhaltiges Frühstück</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button asChild className="bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">Zum Preisrechner</Link>
                  </Button>
                </div>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2" />
                  Buchungsbedingungen
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">Aufenthaltsdauer</h3>
                    <p>
                      Die Mindestaufenthaltsdauer beträgt in der Regel 2 Nächte. An Feiertagen und in der Hauptsaison kann die Mindestaufenthaltsdauer variieren. Bei längeren Aufenthalten bieten wir Ihnen gerne einen Rabatt an - sprechen Sie uns einfach an!
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">An- und Abreise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex">
                        <Clock className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Check-in</h4>
                          <p>Ab 15:00 Uhr</p>
                          <p className="text-sm text-gray-600">Früherer Check-in nach Absprache möglich</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Clock className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Check-out</h4>
                          <p>Bis 11:00 Uhr</p>
                          <p className="text-sm text-gray-600">Späterer Check-out nach Absprache möglich</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">Stornierungsbedingungen</h3>
                    <ul className="space-y-2">
                      <li>Bis 30 Tage vor Anreise: kostenfreie Stornierung</li>
                      <li>29-14 Tage vor Anreise: 50% des Gesamtpreises</li>
                      <li>13-7 Tage vor Anreise: 75% des Gesamtpreises</li>
                      <li>Ab 6 Tage vor Anreise: 100% des Gesamtpreises</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <HelpCircle className="h-6 w-6 mr-2" />
                  Häufig gestellte Fragen
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Sind Haustiere erlaubt?</h3>
                    <p>
                      Leider sind Haustiere in unserer Ferienwohnung nicht gestattet.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Gibt es Parkmöglichkeiten?</h3>
                    <p>
                      Ja, es gibt kostenfreie Parkmöglichkeiten direkt am Haus.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Ist WLAN verfügbar?</h3>
                    <p>
                      Ja, wir bieten kostenloses WLAN für unsere Gäste an.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Wie kann ich buchen?</h3>
                    <p>
                      Sie können direkt über unsere <Link to="/contact" className="text-forest-600 hover:underline">Kontaktseite</Link> anfragen oder uns telefonisch unter +49 1734142620 erreichen.
                    </p>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-forest-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                  Verfügbarkeit
                </h3>
                <p className="mb-4">
                  Hier können Sie sehen, wann unser Ferienhaus verfügbar ist. Die belegten Tage sind im Kalender markiert.
                </p>
                
                <GoogleCalendar />
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    Kapazität
                  </h3>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Für bis zu 4 Personen geeignet</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button asChild className="w-full bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">Jetzt Preis berechnen</Link>
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
