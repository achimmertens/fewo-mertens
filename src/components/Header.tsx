
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold text-forest-700">Ferienwohnung Einruhr</span>
        </Link>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-forest-700 hover:text-forest-500 font-medium">
            Home
          </Link>
          <Link to="/apartment" className="text-forest-700 hover:text-forest-500 font-medium">
            Die Wohnung
          </Link>
          <Link to="/location" className="text-forest-700 hover:text-forest-500 font-medium">
            Umgebung
          </Link>
          <Link to="/info" className="text-forest-700 hover:text-forest-500 font-medium">
            Preise & Infos
          </Link>
          <Link to="/calculator" className="text-forest-700 hover:text-forest-500 font-medium">
            Preisrechner
          </Link>
          <Link to="/arrival" className="text-forest-700 hover:text-forest-500 font-medium">
            Anreise
          </Link>
          <Link to="/contact" className="text-forest-700 hover:text-forest-500 font-medium">
            Kontakt
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="text-forest-700 hover:text-forest-500 font-medium py-2" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/apartment" className="text-forest-700 hover:text-forest-500 font-medium py-2" onClick={toggleMenu}>
              Die Wohnung
            </Link>
            <Link to="/location" className="text-forest-700 hover:text-forest-500 font-medium py-2" onClick={toggleMenu}>
              Umgebung
            </Link>
            <Link to="/info" className="text-forest-700 hover:text-forest-500 font-medium py-2" onClick={toggleMenu}>
              Preise & Infos
            </Link>
            <Link to="/calculator" className="text-forest-700 hover:text-forest-500 font-medium py-2" onClick={toggleMenu}>
              Preisrechner
            </Link>
            <Link to="/arrival" className="text-forest-700 hover:text-forest-500 font-medium py-2" onClick={toggleMenu}>
              Anreise
            </Link>
            <Link to="/contact" className="text-forest-700 hover:text-forest-500 font-medium py-2" onClick={toggleMenu}>
              Kontakt
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
