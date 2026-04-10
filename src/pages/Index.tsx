
import { Bed, Map, Coffee, Mountain, Phone, Flame, Dog } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleCalendar from "@/components/GoogleCalendar";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">{t('index.homeTitle')}</h2>
              <p className="text-lg text-gray-700">
                {t('index.homeSubtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <FeatureCard title={t('index.comfortableAccommodation')} description={t('index.comfortableAccommodationDesc')} icon={Bed} />
              <FeatureCard title={t('index.idealLocation')} description={t('index.idealLocationDesc')} icon={Map} />
              <FeatureCard title={t('index.breakfast')} description={t('index.breakfastDesc')} icon={Coffee} />
              <FeatureCard title={t('index.activities')} description={t('index.activitiesDesc')} icon={Mountain} />
              <FeatureCard title={t('index.mobileReception')} description={t('index.mobileReceptionDesc')} icon={Phone} />
              <FeatureCard title={t('index.cozyFireplace')} description={t('index.cozyFireplaceDesc')} icon={Flame} />
              <FeatureCard title={t('index.petsAllowed')} description={t('index.petsAllowedDesc')} icon={Dog} />
            </div>
          </div>
          <div className="flex justify-center my-8">
            <div className="aspect-w-16 aspect-h-9 max-w-lg w-full rounded-lg overflow-hidden">
              <iframe
                className="w-full h-96 rounded-lg"
                src="https://www.youtube.com/embed/STdEPUSYcSU"
                title={t('index.videoTitle')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </section>
        <section className="py-16 bg-forest-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">{t('index.checkAvailability')}</h2>
              <p className="text-lg text-gray-700 mb-8">
                {t('index.checkAvailabilityDesc')}
              </p>
              <GoogleCalendar />
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold mb-4">{t('index.contactUs')}</h2>
                <p className="text-lg text-gray-700">
                  {t('index.contactUsDesc')}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <Button 
                  asChild
                  className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-6 w-full md:w-auto"
                >
                  <Link to="/calculator">
                    {t('index.bookNow')}
                  </Link>
                </Button>
                <Separator className="hidden md:block h-12 w-px bg-gray-300" orientation="vertical" />
                <div className="text-center md:text-left">
                  <p className="font-medium text-gray-900">{t('index.phoneReach')}</p>
                  <p className="text-forest-700 text-lg">+49 1517 4412216 oder 02403 837412</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
