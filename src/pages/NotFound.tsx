
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-serif font-bold text-forest-700 mb-6">{t('notFound.title')}</h1>
          <p className="text-xl text-gray-700 mb-8">{t('notFound.message')}</p>
          <Button asChild className="bg-forest-600 hover:bg-forest-700">
            <Link to="/">{t('notFound.backHome')}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
