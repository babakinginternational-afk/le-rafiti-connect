import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoRafiti from "@/assets/logo-rafiti.jpg";
import { useCartStore } from "@/stores/cartStore";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoRafiti} 
              alt="Le Rafiti" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-gold transition-smooth font-medium"
            >
              Accueil
            </Link>
            <Link 
              to="/menu" 
              className="text-foreground hover:text-gold transition-smooth font-medium"
            >
              Menu
            </Link>
            <Link 
              to="/emplacements" 
              className="text-foreground hover:text-gold transition-smooth font-medium"
            >
              Emplacements
            </Link>
            <a 
              href="tel:+22892928207" 
              className="text-foreground hover:text-gold transition-smooth font-medium flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/panier">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-background text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/commander">
              <Button className="bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold">
                Commander
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-gold transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/menu" 
                className="text-foreground hover:text-gold transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/emplacements" 
                className="text-foreground hover:text-gold transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Emplacements
              </Link>
              <a 
                href="tel:+22892928207" 
                className="text-foreground hover:text-gold transition-smooth font-medium py-2 flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Contact
              </a>
              <div className="flex gap-4 pt-4">
                <Link to="/panier" className="flex-1">
                  <Button variant="outline" className="w-full relative">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Panier {totalItems > 0 && `(${totalItems})`}
                  </Button>
                </Link>
                <Link to="/commander" className="flex-1">
                  <Button className="w-full bg-gold hover:bg-gold-dark text-background">
                    Commander
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
