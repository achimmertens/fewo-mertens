
import { FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ImpressumPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="h-8 w-8 text-forest-600" />
              <h1 className="text-3xl font-serif font-bold">{t('impressum.title')}</h1>
            </div>
            
            <div className="prose prose-forest max-w-none">
              <h2>{t('impressum.accordingTo')}</h2>
              <p>Achim Mertens<br />Vennstr. 31<br />52249 Eschweiler</p>
              
              <h2>{t('impressum.contact')}</h2>
              <p>Telefon: +49 1517 4412216 oder 02403 837412<br />E-Mail: fewo@amertens.me</p>
              
              <h2>{t('impressum.vatId')}</h2>
              <p>{t('impressum.vatIdDesc')}<br />202/5271/2748</p>
              
              <h2>{t('impressum.disputeResolution')}</h2>
              <p>{t('impressum.disputeResolutionDesc')}</p>
              
              <h2>{t('impressum.contentLiability')}</h2>
              <p>{t('impressum.contentLiabilityDesc1')}</p>
              <p>{t('impressum.contentLiabilityDesc2')}</p>
              
              <h2>{t('impressum.linkLiability')}</h2>
              <p>{t('impressum.linkLiabilityDesc1')}</p>
              <p>{t('impressum.linkLiabilityDesc2')}</p>
              
              <h2>{t('impressum.copyright')}</h2>
              <p>{t('impressum.copyrightDesc1')}</p>
              <p>{t('impressum.copyrightDesc2')}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ImpressumPage;
