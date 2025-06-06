import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bed, Users, Bath, CheckSquare, Flame, Phone } from "lucide-react";
import { PRICES } from "@/constants/prices";

const ApartmentPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">Die Wohnung</h1>
            <p className="text-xl max-w-3xl">
              Entdecken Sie unsere gemütliche und vollständig ausgestattete Ferienwohnung im Herzen des Nationalparks Eifel.
            </p>
          </div>
        </div>


        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">
                  Ihr Zuhause in Einruhr
                </h2>

                <div className="flex flex-wrap -mx-2 mb-8">
                  <div className="flex flex-wrap -mx-2 my-4">
                    <div className="w-full p-2">
                      <figure>
                        <img
                          src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/20240807_185001.jpg?w=2048"
                          alt="Wohnzimmer mit Ausblick"
                          className="rounded-lg w-full h-auto object-cover"
                        />
                        <figcaption className="text-sm text-gray-500 mt-1 italic text-center">Wohnzimmer</figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="my-8">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    Ausstattung im Überblick:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0">
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Gemütlicher Kamin
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Voll ausgestattete Küchenzeile
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Großer Kühlschrank mit Gefrierfach
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      French Press + Kaffee
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Wasserkocher und Toaster
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Geschirr und Kochutensilien
                    </li>

                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Grundlegende Essensvorräte (Nudeln, Dosen, etc.)
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Salz, Zucker, Gewürze, Tee
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Boxspringbett (180x200 cm)
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Ausziehbare Schlafcouch
                    </li>

                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Badezimmer mit Dusche
                    </li>                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Klopapier
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                      Guter Mobilfunkempfang
                    </li>
                  </ul>
                </div>

                <p>
                  Unsere liebevoll eingerichtete Ferienwohnung befindet sich in dem schönen Dorf Einruhr, direkt am Obersee und am Rande des Nationalparks Eifel.
                </p>
                <p>
                  Die Wohnung ist bequem für bis zu 4 Personen ausgelegt, mit einem Wohnzimmer, einem Schlafzimmer, einem Badezimmer, einer Kochniesche und einer Außenterrasse. Die Einrichtung ist komplett neu (2023), stielvoll ausgesucht und bietet Ihnen allen Komfort für einen erholsamen Aufenthalt.
                </p>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Das Wohnzimmer
                </h3>
                <div className="w-full p-2">
                  <img
                    src="https://einruhr.wordpress.com/wp-content/uploads/2022/10/ferienwohnung-einruhr-mertens02.jpg?w=2046"
                    alt="Wohnzimmer"
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>


                <p>
                  Im Wohnzimmer befindet sich eine ausziehbare Schlafcouch, auf der bequem zwei weitere Personen schlafen können.
                </p>


                <p>
                  Die weiche Sitzecke ist auf den Kamin ausgerichtet, der sowohl wohlige Wärme, als auch Ruhe und Gemütlichkeit ausstrahlt. Hier können Sie die schöne Aussicht in den Wald genießen, abends entspannen oder ein Buch lesen.
                </p>


                <div className="flex flex-wrap -mx-2 my-4">
                  <div className="w-full md:w-1/2 p-2 flex flex-col">
                    <div className="flex-1">
                      <img
                        src="https://einruhr.wordpress.com/wp-content/uploads/2023/03/20230325_131529.jpg?w=2046"
                        alt="Wohnzimmer mit gemütlicher Einrichtung"
                        className="rounded-lg w-full h-auto object-cover"
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-1 mt-2">
                      <img
                        src="https://files.peakd.com/file/peakd-hive/achimmertens/23wqiH5x66WZJiJmsb9LV6QR6F4Jfmj6NZ2uvpmFw9Vo77ucHXwzmAVrngUuUf81zDB83.jpg"
                        alt="Wohnzimmer mit gemütlicher Einrichtung"
                        className="rounded-lg w-full h-auto object-cover"
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <img
                      src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/comica1741615898162.png"
                      alt="Wohnraum mit Sitzecke"
                      className="rounded-lg w-full h-auto object-cover"
                      style={{ height: '600px', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Heizung & Kamin
                </h3>
                <p>
                  Die Wohnung verfügt über keine klassische Heizung, dafür aber über einen wunderschönen, gemütlichen Kamin, der an kühlen Tagen für eine angenehme Wärme und eine besondere Atmosphäre sorgt. Holz ist genügend kostenlos vorhanden. Über eine kleine Spende würden wir uns aber freuen.
                  Der Kamin ist eigentlich einfach zu bedienen. Sollten Sie aber eine Anleitung wünschen, finden Sie diese in unserem Erklärvideo.
                </p>

                <div className="aspect-w-16 aspect-h-9 my-8 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-96 rounded-lg"
                    src="https://www.youtube.com/embed/KIV6JJX35dA"
                    title="Ofenbedienung Ferienwohnung Mertens Einruhr"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>


                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Das Schlafzimmer
                </h3>



                <div className="flex flex-wrap -mx-2 my-4">

                  <div className="w-full p-2">
                    <img
                      src="https://einruhr.wordpress.com/wp-content/uploads/2022/10/ferienwohnung-einruhr-mertens03.jpg?w=2046"
                      alt="Schlafzimmer mit Boxspringbett"
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <p>
                  Die Wohnung verfügt über ein hochwertiges Boxspringbett (180x200 cm)
                </p>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Badezimmer
                </h3>

                <div className="w-full p-2">
                  <img
                    src="https://einruhr.wordpress.com/wp-content/uploads/2025/04/badezimmer_einruhr.jpg"
                    alt="Badezimmer"
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>


                <p>
                  Das Badezimmer ist mit einer Dusche ausgestattet. Handtücher können auf Wunsch als Wäschepaket dazugebucht werden.
                </p>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Die Küche
                </h3>
                <div className="flex flex-wrap -mx-2 my-8">

                  <div className="w-full p-2">
                    <img
                      src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/kuche-1.jpg"
                      alt="Kochnische"
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <p>
                  Die offene Küchenzeile ist vollständig ausgestattet, sodass Sie sich während Ihres Aufenthalts selbst versorgen können. Sie finden hier alles, was Sie zum Kochen benötigen: Herd, Kühlschrank mit Gefrierfach, French Press für Kaffee, Wasserkocher, Toaster sowie Geschirr und Kochutensilien. Zudem haben wir immer einige Essensvorräte im Schrank für Sie, die Sie gegen eine kleine Spende entnehmen dürfen.
                </p>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  Terrasse
                </h3>

                <div className="flex flex-wrap -mx-2 my-4">
                  <div className="w-full md:w-1/2 p-2">
                    <img
                      src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/20240807_185130.jpg?w=2048"
                      alt="Terrasse mit Sitzgelegenheit"
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <img
                      src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/20240807_185227.jpg?w=2048"
                      alt="Terrasse mit Blick ins Grüne"
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <p>
                  Die Ferienwohnung verfügt über eine schöne Terrasse, auf der Sie bei gutem Wetter entspannen und die Natur genießen können. Der Nationalpark Eifel fängt direkt neben und hinter der Terrasse an, Sie sitzen quasie mittendrin und können manchmal seltene Vogelarten, Siebenschläfer oder sonstige Tiere sehen.
                </p>
                   <div className="w-full md:w-1/2 p-2">
                    <figure>
                      <img
                      src="https://files.peakd.com/file/peakd-hive/achimmertens/23zGVmj2Q8WpJ9jyxtJ5v3shNTMR73b6d91haT6RerqU8NkygXTphR5aAb25KKpTwLSLx.jpg"
                      alt="Alte Ansicht der Terrasse"
                      className="rounded-lg w-full h-auto object-cover"
                    />
                    <figcaption className="text-sm text-gray-500 mt-1 italic text-center">Siebenschläfer</figcaption>
                  </figure>
                </div>

                <div className="mt-8">
                  <Button asChild className="bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">Preis berechnen</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-forest-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                  Wohnungsdetails
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Users className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Für bis zu 4 Personen</span>
                  </li>
                  <li className="flex items-center">
                    <Bed className="h-5 w-5 text-forest-600 mr-3" />
                    <span>1 Boxspringbett (180x200 cm)</span>
                  </li>
                  <li className="flex items-center">
                    <Bed className="h-5 w-5 text-forest-600 mr-3" />
                    <span>1 ausziehbare Schlafcouch</span>
                  </li>
                  <li className="flex items-center">
                    <Bath className="h-5 w-5 text-forest-600 mr-3" />
                    <span>1 Badezimmer mit Dusche</span>
                  </li>
                  <li className="flex items-center">
                    <Flame className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Gemütlicher Kamin</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Guter Mobilfunkempfang</span>
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Haustiere erlaubt</span>
                  </li>
                </ul>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    Mögliche Zusatzleistungen
                  </h3>
                  <div>
                    <h4 className="font-medium">Frühstück</h4>
                    <p className="text-gray-700">Nach Rücksprache servieren wir Ihnen ein einfaches Frühstück (€{PRICES.BREAKFAST.FIRST_PERSON} für die erste Person, €{PRICES.BREAKFAST.ADDITIONAL_PERSON} für jede weitere Person/Tag).</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Wäschepaket</h4>
                    <p className="text-gray-700">Handtücher und Bettwäsche können für €{PRICES.LAUNDRY_PACKAGE} pro Person dazugebucht werden.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Kontakt aufnehmen</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ApartmentPage;
