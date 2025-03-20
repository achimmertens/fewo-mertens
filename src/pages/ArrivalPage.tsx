
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const ArrivalPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">Anreise</h1>
            <p className="text-xl max-w-3xl">
              So finden Sie zu unserer Ferienwohnung in Einruhr
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-forest-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">Adresse</h3>
                    <p className="text-forest-700 text-lg mb-2">
                      Heilsteinstr. 39<br />
                      52152 Simmerath-Einruhr<br />
                      Deutschland
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/qkxbJidBxtzRt5Vv9" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-forest-600 hover:underline inline-flex items-center mt-2 text-lg"
                    >
                      Route in Google Maps anzeigen
                      <MapPin className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-16">
              <div>
                <img 
                  src="https://greensniper.files.wordpress.com/2022/07/grafik-4.png" 
                  alt="Anfahrt zur Ferienwohnung" 
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-lg italic">
                  Einfach die obere Heilsteinstraße bis ans Ende fahren. Das Haus, dessen obere Hälfte ein Fachwerkhaus ist, hat ein rotes Dach und steht links, halb im Wald.
                </p>
              </div>
              
              <div>
                <img 
                  src="https://greensniper.files.wordpress.com/2022/07/grafik.png" 
                  alt="Übersicht Haus" 
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <div className="text-lg">
                  <p className="font-bold mb-2">Heilsteinstr. 39</p>
                  <p className="italic mb-4">Unsere Wohnung ist die mit der oberen Terasse.</p>
                  <p className="mb-4">Man kann direkt vor dem Haus oder in der Halbgarage parken.</p>
                  <p>Vor dem Haus geht links eine Treppe hoch. Diese bis ganz nach oben gehen.</p>
                </div>
              </div>
              
              <div>
                <img 
                  src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/grafik-6.png?w=1017" 
                  alt="Treppe zur Wohnung" 
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-lg italic">
                  Zur Wohnung
                </p>
              </div>
              
              <div>
                <img 
                  src="https://greensniper.files.wordpress.com/2022/08/grafik-5.png" 
                  alt="Eingang zur Wohnung" 
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-lg italic">
                  Nach dem Öffnen der Haustüre befindet sich die Wohnung geradeaus, rechts unten neben der Innentreppe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ArrivalPage;
