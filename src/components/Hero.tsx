
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="hero-image w-full min-h-[70vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://einruhr.wordpress.com/wp-content/uploads/2022/09/pxl_20220729_164415339-1.jpg?w=1024&h=768')" }}>
      <div className="container mx-auto px-4 text-center relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 drop-shadow-lg mt-16 text-black bg-white/70 py-2 rounded-lg">
          Ferienwohnung Einruhr Waldoase Mertens
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 drop-shadow-md text-black bg-white/70 py-2 rounded-lg">
          Entdecken Sie Ihren perfekten Rückzugsort im Herzen des Nationalparks Eifel
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-forest-600 hover:bg-forest-700 text-white font-medium px-10 py-7 text-lg relative overflow-hidden group"
            style={{
              backgroundImage: "url('https://einruhr.wordpress.com/wp-content/uploads/2022/10/ferienwohnung-einruhr-mertens02.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
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
            variant="outline"
            className="bg-white/80 border-forest-600 text-forest-700 hover:bg-white/90 font-medium px-8"
          >
            <Link to="/calculator">Preis berechnen</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
