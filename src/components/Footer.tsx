import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { Facebook, Instagram } from "lucide-react";
import logoRafiti from "@/assets/logo-rafiti.jpg";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img 
              src={logoRafiti} 
              alt="Le Rafiti" 
              className="h-16 w-auto object-contain mb-4"
            />
            <p className="text-muted-foreground text-sm">
              Restaurant lounge premium à Lomé. Gastronomie africaine raffinée dans une ambiance exceptionnelle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-gold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-gold transition-smooth">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-gold transition-smooth">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/commander" className="text-muted-foreground hover:text-gold transition-smooth">
                  Commander
                </Link>
              </li>
              <li>
                <Link to="/emplacements" className="text-muted-foreground hover:text-gold transition-smooth">
                  Emplacements
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-gold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p>Léo 2000: +228 92 92 82 07</p>
                  <p>Anomé: +228 91 82 00 00</p>
                  <p>Klikamé: +228 91 33 00 00</p>
                  <p>Soagbado: +228 72 14 01 60</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-gold">Suivez-nous</h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://web.facebook.com/LeRafitiRestaurantLounge/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gold/10 rounded-lg hover:bg-gold hover:text-background transition-smooth"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/le_rafiti_restaurant/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gold/10 rounded-lg hover:bg-gold hover:text-background transition-smooth"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://tiktok.com/@lerafiti_restaurant" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gold/10 rounded-lg hover:bg-gold hover:text-background transition-smooth"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              Ouvert tous les jours<br />
              Service midi et soir
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Le Rafiti Restaurant Lounge. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
