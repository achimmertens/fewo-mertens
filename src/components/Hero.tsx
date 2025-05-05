import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <div className="hero-image w-full min-h-[70vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://einruhr.wordpress.com/wp-content/uploads/2022/09/pxl_20220729_164415339-1.jpg?w=1024&h=768')" }}>
      <div className="container mx-auto px-4 text-center relative py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 drop-shadow-lg mt-8 sm:mt-16 text-black bg-white/70 py-2 rounded-lg">
          Ferienwohnung Waldoase Mertens in Einruhr
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-md text-black bg-white/70 py-2 rounded-lg">
          Entdecken Sie Ihren perfekten Rückzugsort im Herzen des Nationalparks Eifel
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-forest-600 hover:bg-forest-700 text-white font-medium relative overflow-hidden group w-full sm:w-auto border-2 border-white/80 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 hover:scale-[1.02] active:scale-100"
            style={{
              backgroundImage: "url('https://einruhr.wordpress.com/wp-content/uploads/2022/10/ferienwohnung-einruhr-mertens02.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: isMobile ? "150px" : "200px",
              width: isMobile ? "100%" : "400px",
              transform: "perspective(1000px) rotateX(0deg)",
              transition: "transform 0.2s ease-out"
            }}
          >
            <Link to="/apartment">
              <span className="relative z-10 drop-shadow-md">Die Wohnung entdecken</span>
              <div className="absolute inset-0 bg-forest-600/60 group-hover:bg-forest-700/70 transition-colors"></div>
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-forest-600 hover:bg-forest-700 text-white font-medium relative overflow-hidden group w-full sm:w-auto border-2 border-white/80 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 hover:scale-[1.02] active:scale-100"
            style={{
              height: isMobile ? "150px" : "200px",
              width: isMobile ? "100%" : "400px",
              transform: "perspective(100000px) rotateX(0deg)",
              transition: "transform 0.2s ease-out"
            }}
          >
            <Link to="/calculator">
              <span className="relative z-10 text-center flex flex-col">
                <span className="text-sm">Ab 84 €/Nacht</span>
                <span className="text-sm">für 1-4 Personen</span>
                <span className="text-sm">inkl. Reinigung.</span>
                <span className="text-sm">Jede weitere Nacht nur 50 €.</span>
                <span className="text-sm">Für Preisberechnung und Reservierungsanfrage</span>
                <span>Hier Klicken</span>
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
