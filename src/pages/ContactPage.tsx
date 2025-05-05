import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-12 sm:py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Kontakt</h1>
            <p className="text-lg sm:text-xl max-w-3xl">
              Haben Sie allgemeine Fragen? Kontaktieren Sie uns gerne!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-700 mb-6">
              Kontaktdaten
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-forest-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Telefon</h3>
                      <p className="text-forest-700">+49 1517 4412216</p>
                      <p className="text-forest-700">02403 837412</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-forest-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">E-Mail</h3>
                      <p className="text-forest-700 text-base sm:text-lg break-words">einruhr.mertens@web.de</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-forest-600 mr-3 mt-1 flex-shrink-0" />
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
            
            <div className="mt-8">
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
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
