
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/apartment', label: t('nav.apartment') },
    { to: '/location', label: t('nav.location') },
    { to: '/activities', label: t('nav.activities') },
    { to: '/info', label: t('nav.pricesInfo') },
    { to: '/calculator', label: t('nav.calculator') },
    { to: '/arrival', label: t('nav.arrival') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold text-forest-700">
            {t('hero.title')}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-forest-700 hover:text-forest-500 font-medium">
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm font-medium rounded-md border border-forest-200 bg-forest-50 text-forest-700 hover:bg-forest-100 transition-colors"
            aria-label="Switch language"
          >
            {language === 'de' ? 'EN' : 'DE'}
          </button>
        </nav>

        {/* Mobile: language + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm font-medium rounded-md border border-forest-200 bg-forest-50 text-forest-700 hover:bg-forest-100 transition-colors"
            aria-label="Switch language"
          >
            {language === 'de' ? 'EN' : 'DE'}
          </button>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-forest-700 hover:text-forest-500 font-medium py-2" onClick={toggleMenu}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
