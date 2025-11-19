import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus } from "lucide-react";
import burgerImage from "@/assets/food-burger-platter.jpg";
import chickenImage from "@/assets/food-chicken-fries.jpg";
import steakImage from "@/assets/food-steak-fries.jpg";
import pastaImage from "@/assets/food-pasta.jpg";
import saladImage from "@/assets/food-salad.jpg";
import cocktailsImage from "@/assets/drinks-cocktails.jpg";
import wineImage from "@/assets/drinks-wine.jpg";

const categories = [
  "Tous",
  "Entrées",
  "Plats Togolais",
  "Grillades",
  "Pâtes",
  "Desserts",
  "Boissons"
];

const menuItems = [
  {
    id: 1,
    name: "Salade Composée",
    category: "Entrées",
    price: 2500,
    image: saladImage,
    description: "Légumes frais, tomates, concombres, oignons, vinaigrette maison",
    tags: ["Végétarien", "Populaire"]
  },
  {
    id: 2,
    name: "Poulet Grillé",
    category: "Plats Togolais",
    price: 3800,
    image: chickenImage,
    description: "Poulet mariné aux épices locales, servi avec frites et coleslaw",
    tags: ["Populaire", "Piquant"]
  },
  {
    id: 3,
    name: "Burger Premium",
    category: "Grillades",
    price: 4500,
    image: burgerImage,
    description: "Burger artisanal, steak haché, fromage, bacon, sauce signature",
    tags: ["Populaire"]
  },
  {
    id: 4,
    name: "Steak Grillé",
    category: "Grillades",
    price: 5500,
    image: steakImage,
    description: "Viande de bœuf tendre, frites maison, sauce au poivre",
    tags: []
  },
  {
    id: 5,
    name: "Pâtes Carbonara",
    category: "Pâtes",
    price: 3200,
    image: pastaImage,
    description: "Pâtes fraîches, sauce crémeuse, lardons, parmesan",
    tags: []
  },
  {
    id: 6,
    name: "Cocktails Signature",
    category: "Boissons",
    price: 2000,
    image: cocktailsImage,
    description: "Cocktails maison préparés par nos barmans",
    tags: ["Populaire"]
  },
  {
    id: 7,
    name: "Vins Sélection",
    category: "Boissons",
    price: 15000,
    image: wineImage,
    description: "Sélection de vins rouge, blanc et rosé",
    tags: []
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredItems = selectedCategory === "Tous" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
              Notre Carte
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Menu Le Rafiti
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez notre sélection de plats raffinés, préparés avec passion et des ingrédients frais
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-background sticky top-20 z-40 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gold hover:bg-gold-dark text-background whitespace-nowrap"
                      : "border-border hover:border-gold whitespace-nowrap"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id}
                  className="overflow-hidden border-border hover:border-gold transition-smooth bg-card group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge 
                          key={tag}
                          className="bg-gold/90 text-background border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gold text-xs font-medium uppercase tracking-wider mb-2">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold">
                        {item.price.toLocaleString()} FCFA
                      </span>
                      <Button 
                        size="sm"
                        className="bg-gold hover:bg-gold-dark text-background"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Prêt à commander ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Commandez en ligne et profitez de nos plats sur place, à emporter ou en livraison
            </p>
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Commander maintenant
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
