import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footprints, CookingPot, Landmark, Bike, ExternalLink } from 'lucide-react';

const activities = [
  {
    title: 'Geführte Wandertouren',
    icon: Footprints,
    description:
      'Direkt neben unserem Haus wohnt zufälligerweise der Vorsitzende des Eifelvereins Einruhr-Erkensruhr Frank Wiesen. Er bietet regelmäßig geführte Wandertouren durch den Nationalpark Eifel an, die sowohl für Anfänger als auch für erfahrene Wanderer geeignet sind. Die Touren führen durch die wunderschönen Landschaften der direkten Umgebung und bieten die Möglichkeit, die vielfältige Flora und Fauna der Region zu entdecken. Die Termine entnehmen Sie bitte der Webseite des Eifelvereins Einruhr-Erkensruhr.',
    link: 'https://eifelverein-einruhr-erkensruhr.de/',
    linkLabel: 'Eifelverein Einruhr-Erkensruhr',
    image: 'https://eifelverein-einruhr-erkensruhr.de//images/ev/Bilder/2024/Einruhr/DJI_0798-1.jpg',
  },
  {
    title: 'Brot backen in Erkensruhr',
    icon: CookingPot,
    description:
      'Im kleinen Backhaus „Et Backes" im Fachwerkstil wird jeden ersten Samstag im Monat frisches Steinofenbrot gebacken. Weizen-Roggenmischbrot auf Sauerteigbasis – direkt aus dem Ofen. Verkauf ab ca. 10:30 Uhr. Das Backhaus, im ca. 3 km entfernten Nachbardorf Erkensruhr, wird vom Bürgerverein Erkensruhr/Hirschrott e.V. betrieben. Ein echtes Erlebnis für alle, die traditionelles Handwerk schätzen!',
    link: 'https://www.erkensruhr.de/dorfleben/et-backes/',
    linkLabel: 'Et Backes – Backhaus Erkensruhr',
    image: 'http://www.erkensruhr.de/wordpress/wp-content/uploads/2019/08/20160618_IMG_0913-300x225.jpg',
  },
  {
    title: 'Das Rote Haus in Monschau',
    icon: Landmark,
    description:
      'Das Museum Rotes Haus in Monschau bietet eine faszinierende Reise zurück ins 18. Jahrhundert. Der Tuchmacher Johann Heinrich Scheibler ließ sich um 1760 dieses repräsentative Wohnhaus errichten. Mit 13 vollständig eingerichteten Wohnräumen, kostbaren Leinwandtapeten und der weltberühmten Prunktreppe aus Eichenholz ist es ein unvergessliches Erlebnis. Geöffnet von April bis November, Dienstags bis Sonntags.',
    link: 'https://rotes-haus-monschau.de/',
    linkLabel: 'Museum Rotes Haus Monschau',
    image: 'https://rotes-haus-monschau.de/wp-content/uploads/2022/12/Ni000611-1920x1152.jpg',
  },
  {
    title: 'Kanu- und Fahrradverleih in Rurberg',
    icon: Bike,
    description:
      'Mieten Sie Kanus oder Fahrräder in Rurberg, nur wenige Kilometer von Einruhr entfernt. Erkunden Sie die malerische Landschaft des Nationalparks Eifel auf dem Wasser oder auf zwei Rädern.',
    link: 'https://www.eifel.de/go/freizeitmoeglichkeiten-detail/fahrrad_und_kanuverleih_rurberg.html',
    linkLabel: 'Kanu- und Fahrradverleih Rurberg',
    image: 'https://images.hive.blog/p/YpihifdXP4WNbGMdjw7e3DuhJWBvCw4SfuLZsrnJYHEpsqZFkiGGNCPvxdmKJPqJ34qfbzdvZMg7s7uHULEqhh36zbNo6wMpRpd1fdYoZ66rgQjqGrtRQ9TNgyTAsjgMuMmCsUYPBjePPK6QEP73nHqCxLZ1QFP3tLBfpmdYBCwY?format=match&mode=fit',
  },
];

const ActivitiesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold text-forest-700 mb-4 text-center">
              Aktivitäten in der Umgebung
            </h1>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Entdecken Sie spannende Ausflugsziele und Aktivitäten rund um Einruhr im Nationalpark Eifel.
            </p>

            <div className="space-y-8 max-w-4xl mx-auto">
              {activities.map((activity) => (
                <Card key={activity.title} className="overflow-hidden">
                  <div className="md:flex">
                    {activity.image && (
                      <div className="md:w-1/3 h-56 md:h-auto">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className={activity.image ? 'md:w-2/3' : 'w-full'}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-forest-700">
                          <activity.icon className="h-6 w-6 text-forest-500" />
                          {activity.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                        <a
                          href={activity.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-800 font-medium transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {activity.linkLabel}
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
