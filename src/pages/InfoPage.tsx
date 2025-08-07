import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  ShoppingCart,
  Coffee,
  HelpCircle,
  MapPin
} from "lucide-react";
import GoogleCalendar from "@/components/GoogleCalendar";
import { PRICES } from "@/constants/prices";

const InfoPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">Preise & Infos</h1>
            <p className="text-xl max-w-3xl">
              Alle wichtigen Informationen zu Preisen, Buchungsbedingungen und Hausregeln auf einen Blick.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 mr-2" />
                  Preise
                </h2>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">Grundpreis</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="font-medium">Übernachtung</h4>
                        <p className="text-forest-700 text-lg font-medium">{PRICES.FIRST_NIGHT} € für die erste Nacht</p>
                        <p className="text-forest-700 text-lg font-medium">{PRICES.ADDITIONAL_NIGHT} € für jede weitere Nacht</p>
                        <p className="text-sm text-gray-600">Unabhängig von der Personenanzahl</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">Zusatzleistungen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex">
                        <ShoppingCart className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Wäschepaket</h4>
                          <p className="text-forest-700 text-lg font-medium">{PRICES.LAUNDRY_PACKAGE} € pro Person</p>
                          <p className="text-sm text-gray-600">Handtücher & Bettwäsche</p>
                          <p className="text-sm text-gray-600">Bitte dann buchen, wenn Sie keine eigene Bettwäsche und Handtücher mitbringen.</p>
                          <div className="w-full p-2 flex flex-col">
                            <img
                              src="https://einruhr.wordpress.com/wp-content/uploads/2023/03/image.png?w=2046"
                              alt="Frühstück"
                              className="w-full h-60 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <Coffee className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Frühstück</h4>
                          <p className="text-forest-700 text-lg font-medium">{PRICES.BREAKFAST.FIRST_PERSON} € für die erste Person am ersten Tag</p>
                          <p className="text-forest-700 text-lg font-medium">{PRICES.BREAKFAST.ADDITIONAL_PERSON} € für jede weitere Person und/oder Tag</p>
                          <p className="text-sm text-gray-600">Einfaches Frühstück nach Rücksprache für max. zwei Tage</p>
                          <div className="w-full p-2 flex flex-col">
                            <img
                              src="https://files.peakd.com/file/peakd-hive/achimmertens/23vi3sQjf1FmHwfh9CpsLyQZERVyYX4Ltf8j5oR1XDT1qwyVu6UKYnhpjZXRzwMUpE6xs.jpg"
                              alt="Frühstück"
                              className="w-full h-60 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">Sonstige Kosten</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="font-medium">Endreinigung</h4>
                        <p className="text-forest-700 text-lg font-medium">{PRICES.CLEANING_FEE} €</p>
                        <p className="text-sm text-gray-600">Wird immer erhoben</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button asChild className="bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">Zum Preisrechner</Link>
                  </Button>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2" />
                  Buchungsbedingungen
                </h2>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">Aufenthaltsdauer</h3>
                    <p>
                      Die Mindestaufenthaltsdauer beträgt 1 Nacht. An Feiertagen und in der Hauptsaison kann die Mindestaufenthaltsdauer variieren.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-serif font-medium mb-4">An- und Abreise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex">
                        <Clock className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Check-in</h4>
                          <p>Ab 15:00 Uhr</p>
                          <p className="text-sm text-gray-600">Früherer Check-in nach Absprache möglich</p>
                        </div>
                      </div>
                      <div className="flex">
                        <Clock className="h-5 w-5 text-forest-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Check-out</h4>
                          <p>Bis 12:00 Uhr</p>
                          <p className="text-sm text-gray-600">Späterer Check-out nach Absprache möglich</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6 flex items-center">
                  <HelpCircle className="h-6 w-6 mr-2" />
                  Häufig gestellte Fragen
                </h2>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Sind Haustiere erlaubt?</h3>
                    <p>
                      Ja, Haustiere sind in unserer Ferienwohnung erlaubt. Wir bitten Sie jedoch, alle Tierspuren (Haare, Dreck) vor der Abreise zu entfernen.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Gibt es Parkmöglichkeiten?</h3>
                    <p>
                      Ja, es gibt kostenfreie Parkmöglichkeiten direkt am Haus.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Ist WLAN verfügbar?</h3>
                    <p>
                      Nein, wir bieten kein WLAN an. Der Funkempfang ist aber sehr gut.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Wie kann ich buchen?</h3>
                    <p>
                      Sie können direkt über unseren <Link to="/calculator" className="text-forest-600 hover:underline">Preisrechner</Link> anfragen oder uns telefonisch unter +49 1517 4412216 oder 02403 837412 erreichen.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Wohin mit dem Müll?</h3>
                    <p>
                      Unten vor dem Haus stehen Abfalleimer für Restmüll und Papier. Grüner Punkt kann zur Not im Restmüll entsorgt werden. Flaschen sollten mitgenommen oder auch im Restmüll entsorgt werden.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Müssen wir Strom- und Heizkosten bezahlen?</h3>
                    <p>
                      Nein. Wir gehen davon aus, dass Sie verantwortungsbewusst mit den Ressourcen umgehen. Sie dürfen gerne das in Körben bereitgestellte Holz für den Kamin benutzen. Gegen eine kleine Spende haben wir natürlich nichts ;-)
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-2">Wie erfolgt die Schlüsselübergabe?</h3>
                    <p>
                      Nachdem Sie eine Reservierungsanfrage an uns gesendet haben und wir uns einig über die Konditionen geworden sind, erhalten Sie unsere Konto-Daten. Nach Geldeingang erhalten Sie die Beschreibung zum Schlüsseltresor und den dazugehörigen Code. Den Schlüssel hängen Sie bitte bei der Abreise wieder in den Kasten.
                    </p>
                  </div>


                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-medium mb-2">Gibt es weitere Ferienwohnung in dem Haus?</h3>
                  <p>
                    Ja. Das Haus hat derzeit vier Ferienwohnungnen. Die anderen drei sind hier zu finden: <p/>
                    <Link to="https://www.airbnb.de/rooms/607971960710618288" className="text-forest-600 hover:underline">airbnb Dachgeschoss Seeblick</Link> <p/>
                    <Link to="https://www.airbnb.de/rooms/1418908294068782739" className="text-forest-600 hover:underline">airbnb 1. Stock Seeblick</Link> <p/>
                    <Link to="https://www.airbnb.de/rooms/713491294435463769" className="text-forest-600 hover:underline">airbnb Dachgeschoss Waldblick</Link>
                  </p>
                </div>                                   
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-forest-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                  Verfügbarkeit
                </h3>
                <p className="mb-4">
                  Hier können Sie sehen, wann unsere Ferienwohnung verfügbar ist. Die belegten Tage sind im Kalender markiert.
                </p>

                <GoogleCalendar />

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    Kapazität
                  </h3>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-forest-600 mr-3" />
                    <span>Für bis zu 4 Personen geeignet</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    Anfahrt
                  </h3>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-forest-600 mr-3 mt-1" />
                    <div>
                      <p className="mb-2">Heilsteinstr. 39, 52152 Simmerath-Einruhr</p>
                      <a
                        href="https://maps.app.goo.gl/qkxbJidBxtzRt5Vv9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-600 hover:underline inline-flex items-center"
                      >
                        Route in Google Maps anzeigen
                        <MapPin className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button asChild className="w-full bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">Jetzt Preis berechnen</Link>
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

export default InfoPage;
