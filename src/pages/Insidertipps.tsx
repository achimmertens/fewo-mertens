import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Insidertipps = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-serif font-bold mb-4">{t('insidertipps.title')}</h1>
            <p className="text-lg text-gray-700 mb-6">{t('insidertipps.subtitle')}</p>
            <h2 className="mt-8">{t('insidertipps.keyHandover')}</h2>
            <div className="text-center mt-6">
              <Link to="/handover" className="text-forest-700 hover:underline">{t('insidertipps.keyHandoverLink')}</Link>
            </div>
            <h2 className="mt-8">{t('insidertipps.fuseBox')}</h2>
            <br />
            <p>{t('insidertipps.fuseBoxDesc1')}</p>
            <p>{t('insidertipps.fuseBoxDesc2')}</p>
            <img src="/lovable-uploads/Sicherungen.webp" alt={t('insidertipps.fuseBox')} className="w-full h-full object-cover rounded-lg border" />
            <div className="mt-8">
              <h2>{t('insidertipps.videoGuide')}</h2>
            </div>
            <div className="prose mx-auto">
              <p>{t('insidertipps.hotWaterVideo')}</p>
              <div className="flex justify-center my-8">
                <div className="aspect-w-16 aspect-h-9 max-w-lg w-full rounded-lg overflow-hidden">
                  <iframe className="w-full h-96 rounded-lg" src="https://www.youtube.com/embed/a2lsYbuym9E" title="Insidertipps Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>
              <h2 className="mt-8">{t('insidertipps.woodShed')}</h2>
              <p className="text-sm text-gray-600">{t('insidertipps.woodShedDesc')}</p>
              <img src="https://greensniper.wordpress.com/wp-content/uploads/2026/01/20250502_202332.jpg" alt="Insider 1" className="w-full h-full object-cover rounded-lg border" />
            </div>
          </div>
          <div className="text-center">
            <Link to="/" className="text-forest-700 hover:underline">{t('insidertipps.backHome')}</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Insidertipps;
