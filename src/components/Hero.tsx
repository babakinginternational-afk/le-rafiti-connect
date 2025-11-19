import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/restaurant-exterior-2.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Le Rafiti Restaurant" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Subtitle */}
          <p className="text-gold text-sm md:text-base font-medium tracking-widest uppercase mb-6 animate-fade-in">
            Restaurant Lounge Premium
          </p>
          
          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-in">
            LE RAFITI
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Gastronomie africaine raffinée, grillades succulentes et cocktails signature 
            dans une ambiance lounge exceptionnelle à Lomé
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/commander">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-dark text-background font-bold text-lg px-8 py-6 shadow-gold-lg hover:shadow-gold transition-smooth"
              >
                Commander en ligne
              </Button>
            </Link>
            <Link to="/menu">
              <Button 
                size="lg" 
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-background font-bold text-lg px-8 py-6 transition-smooth"
              >
                Découvrir le menu
              </Button>
            </Link>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold transition-smooth">
              <MapPin className="h-8 w-8 text-gold mx-auto mb-3" />
              <h3 className="font-serif text-xl font-semibold mb-2">4 Emplacements</h3>
              <p className="text-muted-foreground text-sm">
                Léo 2000 • Agoé Anomé • Klikamé • Soagbado
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold transition-smooth">
              <Clock className="h-8 w-8 text-gold mx-auto mb-3" />
              <h3 className="font-serif text-xl font-semibold mb-2">Ouvert tous les jours</h3>
              <p className="text-muted-foreground text-sm">
                Service rapide • Sur place • À emporter • Livraison
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gold rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
