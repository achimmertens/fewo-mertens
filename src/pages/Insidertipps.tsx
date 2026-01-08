import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Insidertipps = () => {
  return (
    <>
      <Header />
      <main className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-serif font-bold mb-4">Insidertipps</h1>
            <p className="text-lg text-gray-700 mb-6">Geheime Empfehlungen und kleine Tipps rund um Einruhr.</p>
            <div className="prose mx-auto">
              <p>
                Hier ein Video mit einer kleinen Tour:
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

              <h2 className="mt-8">Bilder</h2>
              <p className="text-sm text-gray-600">Platzhalter — Bilder kannst du später in <code>public/lovable-uploads/</code> ablegen.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <img src="https://greensniper.wordpress.com/wp-content/uploads/2026/01/20250502_202332.jpg" alt="Insider 1" className="w-full h-48 object-cover rounded-lg border" />
                <img src="/lovable-uploads/insider-2.png" alt="Insider 2" className="w-full h-48 object-cover rounded-lg border" />
                <img src="/lovable-uploads/insider-3.png" alt="Insider 3" className="w-full h-48 object-cover rounded-lg border" />
                <img src="/lovable-uploads/insider-4.png" alt="Insider 4" className="w-full h-48 object-cover rounded-lg border" />
                <Link to="https://greensniper.wordpress.com/hausordnung-und-stromzahler/" className="text-forest-700 hover:underline">Link zur Schlüsselübergabe </Link>


              </div>
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
