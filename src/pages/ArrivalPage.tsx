import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ArrivalPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">{t('arrival.title')}</h1>
            <p className="text-xl max-w-3xl">{t('arrival.subtitle')}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-forest-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">{t('arrival.address')}</h3>
                    <p className="text-forest-700 text-lg mb-2">
                      Heilsteinstr. 39<br />
                      52152 Simmerath-Einruhr<br />
                      {t('arrival.germany')}
                    </p>
                    <a href="https://maps.app.goo.gl/qkxbJidBxtzRt5Vv9" target="_blank" rel="noopener noreferrer" className="text-forest-600 hover:underline inline-flex items-center mt-2 text-lg">
                      {t('arrival.showRoute')}
                      <MapPin className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="mt-8">
                  <h3 className="text-xl font-serif font-medium text-forest-700 mb-4">{t('arrival.directions')}</h3>
                  <p className="mb-4">{t('arrival.directionsDesc1')}</p>
                  <p>{t('arrival.directionsDesc2')}</p>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <img src="https://einruhr.wordpress.com/wp-content/uploads/2025/03/einruhr_eifel.jpg" alt="Einruhr Eifel" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div className="space-y-16">
              <div>
                <img src="https://greensniper.files.wordpress.com/2022/07/grafik-4.png" alt={t('arrival.directions')} className="w-full h-auto rounded-lg shadow-md mb-4" />
                <p className="text-lg italic">{t('arrival.driveDesc')}</p>
              </div>

              <div>
                <img src="https://greensniper.files.wordpress.com/2022/07/grafik.png" alt={t('arrival.directions')} className="w-full h-auto rounded-lg shadow-md mb-4" />
                <div className="text-lg">
                  <p className="font-bold mb-2">Heilsteinstr. 39</p>
                  <p className="italic mb-4">{t('arrival.houseOverview')}</p>
                  <p className="mb-4">{t('arrival.parking')}</p>
                  <p>{t('arrival.stairs')}</p>
                </div>
              </div>

              <div>
                <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/grafik-6.png?w=1017" alt={t('arrival.toApartment')} className="w-full h-auto rounded-lg shadow-md mb-4" />
                <p className="text-lg italic">{t('arrival.toApartment')}</p>
              </div>

              <div>
                <img src="https://greensniper.files.wordpress.com/2022/08/grafik-5.png" alt={t('arrival.entrance')} className="w-full h-auto rounded-lg shadow-md mb-4" />
                <p className="text-lg italic">{t('arrival.entrance')}</p>
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
