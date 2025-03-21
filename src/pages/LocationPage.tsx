
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Mountain, Compass, Bike, Ship, Utensils } from "lucide-react";

const LocationPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">Die Umgebung</h1>
            <p className="text-xl max-w-3xl">
              Entdecken Sie die vielfältige und wunderschöne Umgebung des Nationalparks Eifel rund um Einruhr.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">
                Über Einruhr
              </h2>
              <div className="w-full p-2">
                    <img 
                      src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/pxl_20220729_164415339-1.jpg?w=1024&h=768" 
                      alt="Ferienwohnung Außenansicht" 
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
              <p className="mb-4">
                Einruhr ist ein idyllisches Dorf im Nationalpark Eifel, direkt am Ufer des Obersees gelegen. Der Ort bietet die perfekte Mischung aus Natur, Ruhe und Erholung, gepaart mit zahlreichen Möglichkeiten für Aktivitäten in der Umgebung.
              </p>
              <p>
                Mit seiner Lage am Wasser und am Rande des Nationalparks ist Einruhr der ideale Ausgangspunkt für Wanderungen, Radtouren und Wassersport. Zudem finden Sie hier gemütliche Restaurants und Cafés, in denen Sie lokale Spezialitäten genießen können.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <img 
                    src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/einruhrvonoben.jpg?w=1024" 
                    alt="Einruhr von oben" 
                    className="w-full h-auto rounded-lg shadow-md mb-2"
                  />
                </div>
                <div>
                  <img 
                    src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/gansestimmung.jpg?w=1024" 
                    alt="Gänsestimmung" 
                    className="w-full h-auto rounded-lg shadow-md mb-2"
                  />
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">
                Nationalpark Eifel
              </h2>
              <p className="mb-4">
                Der Nationalpark Eifel, gegründet im Jahr 2004, erstreckt sich über eine Fläche von rund 110 Quadratkilometern und beherbergt eine einzigartige Tier- und Pflanzenwelt. Hier können Sie die unberührte Natur auf zahlreichen Wanderwegen erkunden.
              </p>
              <p className="mb-6">
                Besonders beeindruckend sind die ausgedehnten Buchenwälder, die klaren Bäche und die vielfältige Tierwelt des Parks. Mit etwas Glück können Sie hier Wildkatzen, Schwarzspechte oder sogar den seltenen Schwarzstorch beobachten.
              </p>
              
              <div className="mb-8">
                <img 
                  src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/grafik-8.png?w=2046" 
                  alt="Schafswiese oberhalb von Einruhr" 
                  className="w-full h-auto rounded-lg shadow-md mb-2"
                />
                <p className="text-sm text-gray-600 italic text-center">
                  Schafswiese oberhalb von Einruhr auf der Ginsterhöhe
                </p>
              </div>
              
              <div className="mb-6">
                <img 
                  src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/einruhr-knotenpunkt.jpg?w=2046" 
                  alt="Wanderrouten um Einruhr" 
                  className="w-full h-auto rounded-lg shadow-md mb-2"
                />
                <p className="text-sm text-gray-600 italic text-center">
                  Wanderrouten
                </p>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">
                Aktivitäten in der Umgebung
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-forest-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Mountain className="h-6 w-6 text-forest-600 mr-3" />
                    <h3 className="text-xl font-serif font-medium">Wandern</h3>
                  </div>
                  <p>
                    Die Region bietet ein umfangreiches Netz an Wanderwegen mit unterschiedlichen Schwierigkeitsgraden. Besonders empfehlenswert ist der Wildnis-Trail, der durch den gesamten Nationalpark führt, sowie der Eifelsteig, der auf 313 Kilometern von Aachen bis Trier verläuft.
                  </p>
                </div>
                
                <div className="bg-forest-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Bike className="h-6 w-6 text-forest-600 mr-3" />
                    <h3 className="text-xl font-serif font-medium">Radfahren</h3>
                  </div>
                  <p>
                    Die Eifel ist ein Paradies für Radfahrer. Die gut ausgebauten Radwege führen Sie entlang der malerischen Seen und durch die hügelige Landschaft. Der Rur-Ufer-Radweg und der Eifel-Radweg sind besonders beliebt und bieten spektakuläre Ausblicke.
                  </p>
                </div>
                
                <div className="bg-forest-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Ship className="h-6 w-6 text-forest-600 mr-3" />
                    <h3 className="text-xl font-serif font-medium">Wassersport</h3>
                  </div>
                  <p>
                    Im nahegelegenen Untersee können Sie verschiedene Wassersportarten ausüben. Der See ist natürlich geblieben und bietet ideale Bedingungen zum Paddeln, Stand-up-Paddling oder Schwimmen in naturbelassener Umgebung.
                  </p>
                </div>
                
                <div className="bg-forest-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Compass className="h-6 w-6 text-forest-600 mr-3" />
                    <h3 className="text-xl font-serif font-medium">Ausflugsziele</h3>
                  </div>
                  <p>
                    Entdecken Sie die charmanten Städte und Dörfer der Region wie Monschau mit seinen historischen Fachwerkhäusern, das mittelalterliche Heimbach oder die ehemalige Ordensburg Vogelsang. Auch die Städte Aachen und Köln sind für Tagesausflüge erreichbar.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <img 
                  src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/herbertseck.jpg?w=1024" 
                  alt="Herberts Eck" 
                  className="w-full h-auto rounded-lg shadow-md mb-2"
                />
                <p className="text-sm text-gray-600 italic text-center">
                  Herberts Eck
                </p>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">
                Gastronomie
              </h2>
              <div className="flex items-start mb-4">
                <Utensils className="h-6 w-6 text-forest-600 mr-3 mt-1" />
                <div>
                  <p className="mb-4">
                    In und um Einruhr finden Sie zahlreiche gemütliche Restaurants und Cafés, die lokale Spezialitäten und internationale Gerichte anbieten. Genießen Sie die regionale Küche mit frischen Produkten aus der Eifel.
                  </p>
                  <p>
                    Besonders beliebt sind die traditionellen Eifel-Gerichte wie "Himmel un Ääd" (Himmel und Erde), Wildspezialitäten und der leckere Apfelkuchen, der hier eine lange Tradition hat.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">
                Anfahrt
              </h2>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-forest-600 mr-3 mt-1" />
                <div>
                  <p className="mb-4">
                    Unsere Ferienwohnung befindet sich in der Heilsteinstr. 39 in 52152 Simmerath-Einruhr. Die Anreise ist sowohl mit dem Auto als auch mit öffentlichen Verkehrsmitteln möglich.
                  </p>
                  <p className="mb-4">
                    Mit dem Auto erreichen Sie uns über die A44 und A4, die beide gut an das deutsche Autobahnnetz angebunden sind. Von dort aus führen gut ausgebaute Landstraßen nach Einruhr.
                  </p>
                  <p className="mb-4">
                    Mit öffentlichen Verkehrsmitteln reisen Sie zunächst mit dem Zug nach Aachen oder Düren und nehmen von dort aus den Bus nach Einruhr.
                  </p>
                  <p className="mb-4">
                    <a 
                      href="https://maps.app.goo.gl/qkxbJidBxtzRt5Vv9" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-forest-600 hover:underline inline-flex items-center"
                    >
                      Route in Google Maps anzeigen
                      <MapPin className="h-4 w-4 ml-1" />
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button asChild className="bg-forest-600 hover:bg-forest-700">
                  <Link to="/calculator">Verfügbarkeit prüfen</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LocationPage;
