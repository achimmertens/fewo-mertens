
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Ferienwohnung Waldoase Mertens in Einruhr</h3>
            <p className="mb-2">Ihr gemütliches Zuhause im Nationalpark Eifel</p>
            <div className="flex items-center mt-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Heilsteinstr. 39, 52152 Simmerath-Einruhr</span>
            </div>
            <div className="mt-4 w-28">
              <Logo />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Kontakt</h3>
            <div className="flex items-center mb-3">
              <Phone className="h-5 w-5 mr-2" />
              <span>+49 1517 4412216 oder 02403 837412</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:einruhr.mertens@web.de" className="hover:text-lake-300 transition-colors">
                einruhr.mertens@web.de
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-lake-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/apartment" className="hover:text-lake-300 transition-colors">
                  Die Wohnung
                </Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-lake-300 transition-colors">
                  Umgebung
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-lake-300 transition-colors">
                  Preisrechner
                </Link>
              </li>
              <li>
                <Link to="/info" className="hover:text-lake-300 transition-colors">
                  Preise & Infos
                </Link>
              </li>
              <li>
                <Link to="/impressum" className="hover:text-lake-300 transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-forest-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} Ferienwohnung Waldoase Mertens in Einruhr. Alle Rechte vorbehalten.</p>
          <p className="mt-2">
            <Link to="/impressum" className="hover:text-lake-300 transition-colors">
              Impressum
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
