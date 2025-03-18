
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCalculator from "@/components/PriceCalculator";
import GoogleCalendar from "@/components/GoogleCalendar";

const CalculatorPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">Preisrechner</h1>
            <p className="text-xl max-w-3xl">
              Berechnen Sie ganz einfach den Preis für Ihren Aufenthalt in unserem Ferienhaus.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="max-w-xl">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">
                  Preis berechnen
                </h2>
                <p className="mb-8 text-gray-700">
                  Mit unserem Preisrechner können Sie ganz einfach den Gesamtpreis für Ihren Aufenthalt in unserem Ferienhaus berechnen. Geben Sie einfach Ihre Daten ein und sehen Sie sofort den Gesamtpreis.
                </p>
                
                <PriceCalculator />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">
                Verfügbarkeit prüfen
              </h2>
              <p className="mb-8 text-gray-700">
                Hier können Sie prüfen, ob unser Ferienhaus für Ihren Wunschtermin verfügbar ist. Die belegten Tage sind im Kalender markiert.
              </p>
              
              <GoogleCalendar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CalculatorPage;
