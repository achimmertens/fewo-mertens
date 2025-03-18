
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Hero = () => {
  return (
    <div className="hero-image w-full min-h-[70vh] flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://einruhr.wordpress.com/wp-content/uploads/2022/09/pxl_20220729_164415339-1.jpg?w=1024&h=768')" }}>
      <div className="container mx-auto px-4 text-center relative">
        <div className="absolute top-4 left-4 md:top-8 md:left-8 w-32">
          <Logo />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 drop-shadow-lg mt-16">
          Ferienwohnung Einruhr Waldoase Mertens
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 drop-shadow-md">
          Entdecken Sie Ihren perfekten Rückzugsort im Herzen des Nationalparks Eifel
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-forest-600 hover:bg-forest-700 text-white font-medium px-8"
          >
            <Link to="/apartment">Die Wohnung entdecken</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 font-medium px-8"
          >
            <Link to="/calculator">Preis berechnen</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
