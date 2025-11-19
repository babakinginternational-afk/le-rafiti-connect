import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

// Import images
import burgerImage from "@/assets/food-burger-platter.jpg";
import chickenImage from "@/assets/food-chicken-fries.jpg";
import steakImage from "@/assets/food-steak-fries.jpg";
import pastaImage from "@/assets/food-pasta.jpg";
import saladImage from "@/assets/food-salad.jpg";
import cocktailsImage from "@/assets/drinks-cocktails.jpg";
import wineImage from "@/assets/drinks-wine.jpg";
import platTogolais1 from "@/assets/plat-togolais-1.png";
import platTogolais2 from "@/assets/plat-togolais-2.jpg";
import brochettesImage from "@/assets/brochettes-viande.jpg";
import patesCrevettesImage from "@/assets/pates-crevettes.jpg";

const categories = [
  "Tous",
  "Entrées",
  "Plats Togolais",
  "Grillades",
  "Poissons",
  "Pâtes & Riz",
  "Desserts",
  "Boissons"
];

const menuItems = [
  {
    id: "entree-1",
    name: "Salade Composée",
    category: "Entrées",
    price: 2500,
    image: saladImage,
    description: "Légumes frais, tomates, concombres, oignons, vinaigrette maison",
    tags: ["Végétarien", "Populaire"]
  },
  {
    id: "togolais-1",
    name: "Fufu Sauce Arachide",
    category: "Plats Togolais",
    price: 3500,
    image: platTogolais1,
    description: "Fufu traditionnel accompagné de sauce d'arachide maison",
    tags: ["Populaire", "Traditionnel"]
  },
  {
    id: "togolais-2",
    name: "Akoumé Gboma Dessi",
    category: "Plats Togolais",
    price: 3800,
    image: platTogolais2,
    description: "Pâte de maïs servie avec sauce gboma dessi aux légumes",
    tags: ["Traditionnel", "Piquant"]
  },
  {
    id: "togolais-3",
    name: "Poulet Grillé Togolais",
    category: "Plats Togolais",
    price: 4200,
    image: chickenImage,
    description: "Poulet mariné aux épices locales, servi avec attiéké et sauce pimentée",
    tags: ["Populaire", "Piquant"]
  },
  {
    id: "grillade-1",
    name: "Brochettes de Viande",
    category: "Grillades",
    price: 4000,
    image: brochettesImage,
    description: "Brochettes de bœuf marinées, grillées à la perfection",
    tags: ["Populaire"]
  },
  {
    id: "grillade-2",
    name: "Burger Premium",
    category: "Grillades",
    price: 4500,
    image: burgerImage,
    description: "Burger artisanal, steak haché, fromage, bacon, sauce signature",
    tags: ["Populaire"]
  },
  {
    id: "grillade-3",
    name: "Steak Grillé",
    category: "Grillades",
    price: 5500,
    image: steakImage,
    description: "Viande de bœuf tendre, frites maison, sauce au poivre",
    tags: []
  },
  {
    id: "pates-1",
    name: "Pâtes aux Crevettes",
    category: "Pâtes & Riz",
    price: 4800,
    image: patesCrevettesImage,
    description: "Pâtes fraîches aux crevettes, sauce tomate basilic, parmesan",
    tags: ["Populaire"]
  },
  {
    id: "pates-2",
    name: "Pâtes Carbonara",
    category: "Pâtes & Riz",
    price: 3200,
    image: pastaImage,
    description: "Pâtes fraîches, sauce crémeuse, lardons, parmesan",
    tags: []
  },
  {
    id: "boisson-1",
    name: "Cocktails Signature",
    category: "Boissons",
    price: 2000,
    image: cocktailsImage,
    description: "Cocktails maison préparés par nos barmans experts",
    tags: ["Populaire"]
  },
  {
    id: "boisson-2",
    name: "Vins Sélection",
    category: "Boissons",
    price: 15000,
    image: wineImage,
    description: "Sélection de vins rouge, blanc et rosé importés",
    tags: []
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const addItem = useCartStore((state) => state.addItem);

  const filteredItems = selectedCategory === "Tous" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    toast.success(`${item.name} ajouté au panier`, {
      description: `Prix: ${item.price.toLocaleString('fr-FR')} FCFA`
    });
  };

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
                      ? "bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold whitespace-nowrap"
                      : "whitespace-nowrap hover:border-gold hover:text-gold"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-border bg-card hover:shadow-gold-lg transition-all duration-300 group">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                        {item.tags.map((tag) => (
                          <Badge 
                            key={tag}
                            className={
                              tag === "Populaire" 
                                ? "bg-gold text-background" 
                                : tag === "Piquant"
                                ? "bg-pepper-red text-foreground"
                                : tag === "Végétarien"
                                ? "bg-green-600 text-white"
                                : "bg-secondary text-secondary-foreground"
                            }
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="font-serif text-xl font-semibold mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gold font-medium">{item.category}</p>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="font-bold text-2xl text-gold">
                        {item.price.toLocaleString('fr-FR')} <span className="text-sm">FCFA</span>
                      </p>
                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold"
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
        <section className="py-20 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Prêt à Commander ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Profitez de nos plats exquis livrés directement chez vous ou venez les déguster sur place
            </p>
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold-lg text-lg px-10"
            >
              Commander Maintenant
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
