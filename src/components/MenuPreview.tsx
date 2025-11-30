import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import burgerImage from "@/assets/food-burger-platter.jpg";
import chickenImage from "@/assets/food-chicken-fries.jpg";
import pastaImage from "@/assets/food-pasta.jpg";
import saladImage from "@/assets/food-salad.jpg";

const signatureDishes = [
  {
    id: 1,
    name: "Burger Premium",
    category: "Grillades",
    price: "4 500",
    image: burgerImage,
    description: "Burger artisanal avec frites maison"
  },
  {
    id: 2,
    name: "Poulet Grillé",
    category: "Plats Togolais",
    price: "3 800",
    image: chickenImage,
    description: "Poulet mariné aux épices locales"
  },
  {
    id: 3,
    name: "Pâtes Raffinées",
    category: "Pâtes",
    price: "3 200",
    image: pastaImage,
    description: "Pâtes fraîches sauce maison"
  },
  {
    id: 4,
    name: "Salade Composée",
    category: "Entrées",
    price: "2 500",
    image: saladImage,
    description: "Légumes frais du marché"
  }
];

export const MenuPreview = () => {
  const { addItem } = useCartStore();

  const handleAddToCart = (dish: typeof signatureDishes[0]) => {
    addItem({
      id: `home-${dish.id}`,
      menuItemId: String(dish.id),
      name: dish.name,
      price: parseInt(dish.price.replace(/\s/g, '')),
      image: dish.image,
      category: dish.category,
    });
    toast.success(`${dish.name} ajouté au panier`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
            Notre Carte
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Plats Signature
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez notre sélection de plats raffinés, préparés avec des ingrédients 
            frais et des recettes authentiques
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {signatureDishes.map((dish) => (
            <Card 
              key={dish.id}
              className="group overflow-hidden border-border hover:border-gold transition-smooth bg-card cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
              </div>
              <div className="p-6">
                <p className="text-gold text-xs font-medium uppercase tracking-wider mb-2">
                  {dish.category}
                </p>
                <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-gold transition-smooth">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xl font-bold text-gold">{dish.price} FCFA</span>
                  <Button 
                    size="sm" 
                    onClick={() => handleAddToCart(dish)}
                    className="bg-gold hover:bg-gold-dark text-background font-semibold"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/menu">
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold"
            >
              Voir le menu complet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
