
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bed, Users, Bath, CheckSquare, Flame, Phone } from "lucide-react";

const ApartmentPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">Die Wohnung</h1>
            <p className="text-xl max-w-3xl">
              Entdecken Sie unsere gemütliche und vollständig ausgestattete Ferienwohnung im Herzen des Nationalparks Eifel.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">
                  Ihr Zuhause in Einruhr
                </h2>
                <p>
                  Unsere liebevoll eingerichtete Ferienwohnung befindet sich in dem schönen Dorf Einruhr, direkt am Obersee und am Rande des Nationalparks Eifel.
                </p>
                <p>
                  Die Wohnung ist bequem für bis zu 4 Personen ausgelegt, wobei der Wohnraum als Schlafzimmer und Wohnküche dient. Die Einrichtung ist komplett neu, liebevoll ausgesucht und bietet Ihnen allen Komfort für einen erholsamen Aufenthalt.
                </p>
                
                <div className="my-8">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    Ausstattung im Überblick:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0">
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Voll ausgestattete Küchenzeile
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Großer Kühlschrank mit Gefrierfach
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      French Press für Kaffee
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Wasserkocher und Toaster
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Geschirr und Kochutensilien
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Badezimmer mit Dusche
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Grundlegende Essensvorräte
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Boxspringbett (180x200 cm)
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Ausziehbare Schlafcouch
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Wäschepaket (gegen Aufpreis)
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Gemütlicher Kamin
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Guter Mobilfunkempfang
                    </li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                  Schlafmöglichkeiten
                </h3>
                <p>
                  Die Wohnung verfügt über ein hochwertiges Boxspringbett (180x200 cm) sowie eine ausziehbare Schlafcouch im Wohnbereich, auf der bequem zwei weitere Personen schlafen können.
                </p>
                
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Badezimmer
                </h3>
                <p>
                  Das Badezimmer ist mit einer Dusche ausgestattet. Handtücher können auf Wunsch als Wäschepaket dazugebucht werden.
                </p>
                
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Küche
                </h3>
                <p>
                  Die offene Küchenzeile ist vollständig ausgestattet, sodass Sie sich während Ihres Aufenthalts selbst versorgen können. Sie finden hier alles, was Sie zum Kochen benötigen: Herd, Kühlschrank mit Gefrierfach, French Press für Kaffee, Wasserkocher, Toaster sowie Geschirr und Kochutensilien. Zudem haben wir immer einige Essensvorräte im Schrank für Sie.
                </p>
                
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Heizung & Kamin
                </h3>
                <p>
                  Die Wohnung verfügt über keine klassische Heizung, dafür aber über einen wunderschönen, gemütlichen Kamin, der an kühlen Tagen für eine angenehme Wärme und eine besondere Atmosphäre sorgt.
                </p>
                
                <div className="mt-8">
                  <Button asChild className="bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">Preis berechnen</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-forest-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                  Wohnungsdetails
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Users className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Für bis zu 4 Personen</span>
                  </li>
                  <li className="flex items-center">
                    <Bed className="h-5 w-5 text-forest-600 mr-3" />
                    <span>1 Boxspringbett (180x200 cm)</span>
                  </li>
                  <li className="flex items-center">
                    <Bed className="h-5 w-5 text-forest-600 mr-3" />
                    <span>1 ausziehbare Schlafcouch</span>
                  </li>
                  <li className="flex items-center">
                    <Bath className="h-5 w-5 text-forest-600 mr-3" />
                    <span>1 Badezimmer mit Dusche</span>
                  </li>
                  <li className="flex items-center">
                    <Flame className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Gemütlicher Kamin</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Guter Mobilfunkempfang</span>
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Haustiere erlaubt</span>
                  </li>
                </ul>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    Mögliche Zusatzleistungen
                  </h3>
                  <div>
                    <h4 className="font-medium">Frühstück</h4>
                    <p className="text-gray-700">Nach Rücksprache servieren wir Ihnen ein einfaches Frühstück (7,50 € pro Person/Tag).</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Wäschepaket</h4>
                    <p className="text-gray-700">Handtücher und Bettwäsche können für 5 € pro Person dazugebucht werden.</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Kontakt aufnehmen</Link>
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

export default ApartmentPage;
