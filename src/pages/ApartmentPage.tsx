import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bed, Users, Bath, CheckSquare, Flame, Phone } from "lucide-react";
import { PRICES } from "@/constants/prices";
import { useLanguage } from "@/contexts/LanguageContext";

const ApartmentPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">{t('apartment.title')}</h1>
            <p className="text-xl max-w-3xl">
              {t('apartment.subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">
                  {t('apartment.yourHome')}
                </h2>

                <div className="flex flex-wrap -mx-2 mb-8">
                  <div className="flex flex-wrap -mx-2 my-4">
                    <div className="w-full p-2">
                      <figure>
                        <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/20240807_185001.jpg?w=2048" alt={t('apartment.livingRoom')} className="rounded-lg w-full h-auto object-cover" />
                        <figcaption className="text-sm text-gray-500 mt-1 italic text-center">{t('apartment.livingRoom')}</figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="my-8">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    {t('apartment.equipmentOverview')}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0">
                    {[
                      t('apartment.cozyFireplace'), t('apartment.fullyEquippedKitchen'),
                      t('apartment.largeFridge'), t('apartment.frenchPress'),
                      t('apartment.kettleToaster'), t('apartment.dishware'),
                      t('apartment.basicSupplies'), t('apartment.spices'),
                      t('apartment.boxspringBed'), t('apartment.sofaBed'),
                      t('apartment.bathroomShower'), t('apartment.toiletPaper'),
                      t('apartment.mobileReception'),
                    ].map((item) => (
                      <li key={item} className="flex items-center">
                        <CheckSquare className="h-5 w-5 text-forest-600 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p>{t('apartment.description1')}</p>
                <p>{t('apartment.description2')}</p>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  {t('apartment.livingRoomTitle')}
                </h3>
                <div className="w-full p-2">
                  <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/10/ferienwohnung-einruhr-mertens02.jpg?w=2046" alt={t('apartment.livingRoom')} className="rounded-lg w-full h-auto object-cover" />
                </div>

                <p>{t('apartment.livingRoomDesc1')}</p>
                <p>{t('apartment.livingRoomDesc2')}</p>

                <div className="flex flex-wrap -mx-2 my-4">
                  <div className="w-full md:w-1/2 p-2 flex flex-col">
                    <div className="flex-1">
                      <img src="https://einruhr.wordpress.com/wp-content/uploads/2023/03/20230325_131529.jpg?w=2046" alt={t('apartment.livingRoom')} className="rounded-lg w-full h-auto object-cover" style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                    <div className="flex-1 mt-2">
                      <img src="https://files.peakd.com/file/peakd-hive/achimmertens/23wqiH5x66WZJiJmsb9LV6QR6F4Jfmj6NZ2uvpmFw9Vo77ucHXwzmAVrngUuUf81zDB83.jpg" alt={t('apartment.livingRoom')} className="rounded-lg w-full h-auto object-cover" style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/comica1741615898162.png" alt={t('apartment.livingRoom')} className="rounded-lg w-full h-auto object-cover" style={{ height: '600px', objectFit: 'cover' }} />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  {t('apartment.heatingFireplace')}
                </h3>
                <p>{t('apartment.heatingDesc')}</p>

                <div className="aspect-w-16 aspect-h-9 my-8 rounded-lg overflow-hidden">
                  <iframe className="w-full h-96 rounded-lg" src="https://www.youtube.com/embed/KIV6JJX35dA" title="Ofenbedienung Ferienwohnung Mertens Einruhr" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  {t('apartment.bedroomTitle')}
                </h3>
                <div className="flex flex-wrap -mx-2 my-4">
                  <div className="w-full p-2">
                    <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/10/ferienwohnung-einruhr-mertens03.jpg?w=2046" alt={t('apartment.bedroomTitle')} className="rounded-lg w-full h-auto object-cover" />
                  </div>
                </div>
                <p>{t('apartment.bedroomDesc')}</p>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  {t('apartment.bathroomTitle')}
                </h3>
                <div className="w-full p-2">
                  <img src="https://einruhr.wordpress.com/wp-content/uploads/2025/04/badezimmer_einruhr.jpg" alt={t('apartment.bathroomTitle')} className="rounded-lg w-full h-auto object-cover" />
                </div>
                <p>{t('apartment.bathroomDesc')}</p>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  {t('apartment.kitchenTitle')}
                </h3>
                <div className="flex flex-wrap -mx-2 my-8">
                  <div className="w-full p-2">
                    <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/kuche-1.jpg" alt={t('apartment.kitchenTitle')} className="rounded-lg w-full h-auto object-cover" />
                  </div>
                </div>
                <p>{t('apartment.kitchenDesc')}</p>

                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4 mt-8">
                  {t('apartment.terraceTitle')}
                </h3>
                <div className="flex flex-wrap -mx-2 my-4">
                  <div className="w-full md:w-1/2 p-2">
                    <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/20240807_185130.jpg?w=2048" alt={t('apartment.terraceTitle')} className="rounded-lg w-full h-auto object-cover" />
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <img src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/20240807_185227.jpg?w=2048" alt={t('apartment.terraceTitle')} className="rounded-lg w-full h-auto object-cover" />
                  </div>
                </div>
                <p>{t('apartment.terraceDesc')}</p>
                <div className="w-full md:w-1/2 p-2">
                  <figure>
                    <img src="https://files.peakd.com/file/peakd-hive/achimmertens/23zGVmj2Q8WpJ9jyxtJ5v3shNTMR73b6d91haT6RerqU8NkygXTphR5aAb25KKpTwLSLx.jpg" alt={t('apartment.dormouse')} className="rounded-lg w-full h-auto object-cover" />
                    <figcaption className="text-sm text-gray-500 mt-1 italic text-center">{t('apartment.dormouse')}</figcaption>
                  </figure>
                </div>

                <div className="mt-8">
                  <Button asChild className="bg-forest-600 hover:bg-forest-700">
                    <Link to="/calculator">{t('apartment.calculatePrice')}</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-forest-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                  {t('apartment.apartmentDetails')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center"><Users className="h-5 w-5 text-forest-600 mr-3" /><span>{t('apartment.upTo4Persons')}</span></li>
                  <li className="flex items-center"><Bed className="h-5 w-5 text-forest-600 mr-3" /><span>{t('apartment.oneBoxspring')}</span></li>
                  <li className="flex items-center"><Bed className="h-5 w-5 text-forest-600 mr-3" /><span>{t('apartment.oneSofaBed')}</span></li>
                  <li className="flex items-center"><Bath className="h-5 w-5 text-forest-600 mr-3" /><span>{t('apartment.oneBathroom')}</span></li>
                  <li className="flex items-center"><Flame className="h-5 w-5 text-forest-600 mr-3" /><span>{t('apartment.cozyFireplace')}</span></li>
                  <li className="flex items-center"><Phone className="h-5 w-5 text-forest-600 mr-3" /><span>{t('apartment.mobileReception')}</span></li>
                  <li className="flex items-center"><CheckSquare className="h-5 w-5 text-forest-600 mr-3" /><span>{t('apartment.petsAllowed')}</span></li>
                </ul>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-forest-700 mb-4">
                    {t('apartment.additionalServices')}
                  </h3>
                  <div>
                    <h4 className="font-medium">{t('apartment.breakfastLabel')}</h4>
                    <p className="text-gray-700">{t('apartment.breakfastDesc')} (€{PRICES.BREAKFAST.FIRST_PERSON} / €{PRICES.BREAKFAST.ADDITIONAL_PERSON}).</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t('apartment.laundryPackage')}</h4>
                    <p className="text-gray-700">{t('apartment.laundryDesc')} €{PRICES.LAUNDRY_PACKAGE} {t('apartment.laundryDescSuffix')}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">{t('apartment.contactButton')}</Link>
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
