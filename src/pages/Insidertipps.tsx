import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import SicherungenImg from '../../dist/lovable-uploads/Sicherungen.png';

const Insidertipps = () => {
  return (
    <>
      <Header />
      <main className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-serif font-bold mb-4">Insidertipps</h1>
            <p className="text-lg text-gray-700 mb-6">Detailinformationen zur Ferienwohnung.</p>
            <h2 className="mt-8">Link zur Schlüsselübergabe</h2>
            <div className="text-center mt-6">
            <Link to="/handover" className="text-forest-700 hover:underline"> Beschreibung Schlüsselübergabe</Link>
            </div>
            <h2 className="mt-8">Sicherungskasten</h2>
            <p>
              Strom für Warmwasser ein/aus-schalten geht über die Sicherungen, die mit der grünen "5" markiert sind:
            </p>
            <p>
              Sollte aus irgendwelchen Gründen einmal die Sicherungen für unsere Wohnung rausfliegen, schalten Sie diese bitte über die mit den blauen "4" markierten Sicherungen wieder ein.
            </p>
            {/* Bitte füge hier das Bild aus D:\Users\User\git\fewo-mertens\dist\lovable-uploads\Sicherungen.png ein */}
            <img src={SicherungenImg} alt="Sicherungskasten" className="w-full h-full object-cover rounded-lg border" />
            <div className="mt-8">
            <h2>Videoanleitung</h2>
            </div>
            <div className="prose mx-auto">
              <p>
                Strom für Warmwasser ein- und ausschalten:
              </p>
              <div className="flex justify-center my-8">
                <div className="aspect-w-16 aspect-h-9 max-w-lg w-full rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-96 rounded-lg"
                    src="https://www.youtube.com/embed/a2lsYbuym9E"
                    title="Insidertipps Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>

              <h2 className="mt-8">Holzschuppen</h2>
              <p className="text-sm text-gray-600">Unter der Terasse befindet sich ein kleiner Raum, in dem Kaminholz gelagert ist. Links im Raum befinden sich Kisten mit trockenem Holz. Diese können bei Bedarf für den Kamin im Wohnzimmer genutzt werden.
                Bitte das andere Holz, das rechts liegt oder draußen gelagert ist, nicht benutzen, da es noch feucht sein könnte.
              </p>

                <img src="https://greensniper.wordpress.com/wp-content/uploads/2026/01/20250502_202332.jpg" alt="Insider 1" className="w-full h-full object-cover rounded-lg border" />
           


            </div>
          </div>
          <div className="text-center">
            <Link to="/" className="text-forest-700 hover:underline">Zurück zur Startseite</Link>
          </div>


        </div>
      </main>
      <Footer />
    </>
  );
};

export default Insidertipps;
