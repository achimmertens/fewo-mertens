
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Mountain, Compass, Bike, Ship, Utensils } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LocationPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">{t('location.title')}</h1>
            <p className="text-xl max-w-3xl">{t('location.subtitle')}</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">{t('location.aboutEinruhr')}</h2>
              <div className="w-full p-2">
                <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/pxl_20220729_164415339-1.jpg?w=1024&h=768" alt="Einruhr" className="rounded-lg w-full h-auto object-cover" />
                <figcaption className="text-sm text-gray-500 mt-1 italic text-center">Einruhr</figcaption>
              </div>
              <p className="mb-4">{t('location.einruhrDesc1')}</p>
              <p>{t('location.einruhrDesc2')}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/einruhrvonoben.jpg?w=1024" alt={t('location.route35')} className="w-full h-auto rounded-lg shadow-md mb-2" />
                  <figcaption className="text-sm text-gray-500 mt-1 italic text-center">{t('location.route35')}</figcaption>
                </div>
                <div>
                  <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/gansestimmung.jpg?w=1024" alt={t('location.gooseAtmosphere')} className="w-full h-auto rounded-lg shadow-md mb-2" />
                  <figcaption className="text-sm text-gray-500 mt-1 italic text-center">{t('location.gooseAtmosphere')}</figcaption>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">{t('location.nationalPark')}</h2>
              <p className="mb-4">{t('location.npDesc1')}</p>
              <p className="mb-6">{t('location.npDesc2')}</p>
              
              <div className="mb-8">
                <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/grafik-8.png?w=2046" alt={t('location.sheepMeadow')} className="w-full h-auto rounded-lg shadow-md mb-2" />
                <p className="text-sm text-gray-600 italic text-center">{t('location.sheepMeadow')}</p>
              </div>
              
              <div className="mb-6">
                <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/einruhr-knotenpunkt.jpg?w=2046" alt={t('location.hikingRoutes')} className="w-full h-auto rounded-lg shadow-md mb-2" />
                <p className="text-sm text-gray-600 italic text-center">{t('location.hikingRoutes')}</p>
              </div>
              <div className="mb-6">
                <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/herbertseck.jpg?w=1024" alt={t('location.herbertsEck')} className="w-full h-auto rounded-lg shadow-md mb-2" />
                <p className="text-sm text-gray-600 italic text-center">{t('location.herbertsEck')}</p>
              </div>
            </section>
            
            <section className="section-padding bg-card">
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">{t('location.activitiesInArea')}</h2>
              <p className="mb-4">{t('location.activitiesDesc')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="mb-6">
                  <img src="https://images.hive.blog/p/YpihifdXP4WNbGMdjw7e3DuhJWBvCw4SfuLZsrnJYHEpsqZFkiGGNCPvxdmKJPqJ34qfbzdvZMg7s7uHULEqhh36zbNo6wMpRpd1fdYoZ66rgQjqGrtRQ9TNgyTAsjgMuMmCsUYPBjePPK6QEP73nHqCxLZ1QFP3tLBfpmdYBCwY?format=match&mode=fit" alt={t('location.canoeTrip')} className="w-full h-auto rounded-lg shadow-md mb-2" />
                  <p className="text-sm text-gray-600 italic text-center">{t('location.canoeTrip')}</p>
                </div>
                <div>
                  <Button asChild className="bg-forest-600 hover:bg-forest-700">
                    <Link to="/activities">{t('location.toActivities')}</Link>
                  </Button>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">{t('location.gastronomy')}</h2>
              <div className="flex items-start mb-4">
                <Utensils className="h-6 w-6 text-forest-600 mr-3 mt-1" />
                <div>
                  <p className="mb-4">{t('location.gastroDesc1')}</p>
                  <p>{t('location.gastroDesc2')}</p>
                </div>
              </div>
            </section>
            
            <section>
              <div className="mt-8 flex justify-center">
                <Button asChild className="bg-forest-600 hover:bg-forest-700">
                  <Link to="/calculator">{t('location.checkAvailability')}</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LocationPage;
