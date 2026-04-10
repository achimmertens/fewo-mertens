import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footprints, CookingPot, Landmark, Bike, ExternalLink } from 'lucide-react';
import rangerImage from '@/assets/ranger.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const ActivitiesPage = () => {
  const { t } = useLanguage();

  const activities = [
    {
      titleKey: 'activities.hiking.title',
      icon: Footprints,
      descriptionKey: 'activities.hiking.description',
      link: 'https://eifelverein-einruhr-erkensruhr.de/',
      linkLabelKey: 'activities.hiking.linkLabel',
      image: 'https://eifelverein-einruhr-erkensruhr.de//images/ev/Bilder/2024/Einruhr/DJI_0798-1.jpg',
    },
    {
      titleKey: 'activities.baking.title',
      icon: CookingPot,
      descriptionKey: 'activities.baking.description',
      link: 'https://www.erkensruhr.de/dorfleben/et-backes/',
      linkLabelKey: 'activities.baking.linkLabel',
      image: 'http://www.erkensruhr.de/wordpress/wp-content/uploads/2019/08/20160618_IMG_0913-300x225.jpg',
    },
    {
      titleKey: 'activities.museum.title',
      icon: Landmark,
      descriptionKey: 'activities.museum.description',
      link: 'https://rotes-haus-monschau.de/',
      linkLabelKey: 'activities.museum.linkLabel',
      image: 'https://rotes-haus-monschau.de/wp-content/uploads/2022/12/Ni000611-1920x1152.jpg',
    },
    {
      titleKey: 'activities.ranger.title',
      icon: Footprints,
      descriptionKey: 'activities.ranger.description',
      link: 'https://www.nationalpark-eifel.de/de/nationalpark-erleben/veranstaltungen/#/veranstaltungen',
      linkLabelKey: 'activities.ranger.linkLabel',
      image: rangerImage,
    },
    {
      titleKey: 'activities.canoe.title',
      icon: Bike,
      descriptionKey: 'activities.canoe.description',
      link: 'https://www.eifel.de/go/freizeitmoeglichkeiten-detail/fahrrad_und_kanuverleih_rurberg.html',
      linkLabelKey: 'activities.canoe.linkLabel',
      image: 'https://images.hive.blog/p/YpihifdXP4WNbGMdjw7e3DuhJWBvCw4SfuLZsrnJYHEpsqZFkiGGNCPvxdmKJPqJ34qfbzdvZMg7s7uHULEqhh36zbNo6wMpRpd1fdYoZ66rgQjqGrtRQ9TNgyTAsjgMuMmCsUYPBjePPK6QEP73nHqCxLZ1QFP3tLBfpmdYBCwY?format=match&mode=fit',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold text-forest-700 mb-4 text-center">
              {t('activities.title')}
            </h1>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t('activities.subtitle')}
            </p>

            <div className="space-y-8 max-w-4xl mx-auto">
              {activities.map((activity) => (
                <Card key={activity.titleKey} className="overflow-hidden">
                  <div className="md:flex">
                    {activity.image && (
                      <div className="md:w-1/3 h-56 md:h-auto">
                        <img src={activity.image} alt={t(activity.titleKey)} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <div className={activity.image ? 'md:w-2/3' : 'w-full'}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-forest-700">
                          <activity.icon className="h-6 w-6 text-forest-500" />
                          {t(activity.titleKey)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{t(activity.descriptionKey)}</p>
                        <a href={activity.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-800 font-medium transition-colors">
                          <ExternalLink className="h-4 w-4" />
                          {t(activity.linkLabelKey)}
                        </a>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ActivitiesPage;
