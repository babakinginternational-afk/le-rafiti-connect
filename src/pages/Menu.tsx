import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Flame, Leaf } from "lucide-react";
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
  { id: "tous", name: "Tous", icon: null },
  { id: "entrees", name: "Entrées", icon: null },
  { id: "togolais", name: "Plats Togolais", icon: null },
  { id: "grillades", name: "Grillades", icon: null },
  { id: "pates", name: "Pâtes & Riz", icon: null },
  { id: "boissons", name: "Boissons", icon: null }
];

const menuItems = [
  {
    id: "entree-1",
    name: "Salade Composée",
    category: "entrees",
    price: 2500,
    image: saladImage,
    description: "Légumes frais, tomates, concombres, oignons, vinaigrette maison",
    isVegetarian: true,
    isPopular: true
  },
  {
    id: "togolais-1",
    name: "Fufu Sauce Arachide",
    category: "togolais",
    price: 3500,
    image: platTogolais1,
    description: "Fufu traditionnel accompagné de sauce d'arachide maison",
    isPopular: true,
    isSpicy: false
  },
  {
    id: "togolais-2",
    name: "Akoumé Gboma Dessi",
    category: "togolais",
    price: 3800,
    image: platTogolais2,
    description: "Pâte de maïs servie avec sauce gboma dessi aux légumes",
    isSpicy: true
  },
  {
    id: "togolais-3",
    name: "Poulet Grillé Togolais",
    category: "togolais",
    price: 4200,
    image: chickenImage,
    description: "Poulet mariné aux épices locales, servi avec attiéké et sauce pimentée",
    isPopular: true,
    isSpicy: true
  },
  {
    id: "grillade-1",
    name: "Brochettes de Viande",
    category: "grillades",
    price: 4000,
    image: brochettesImage,
    description: "Brochettes de bœuf marinées, grillées à la perfection",
    isPopular: true
  },
  {
    id: "grillade-2",
    name: "Burger Premium",
    category: "grillades",
    price: 4500,
    image: burgerImage,
    description: "Burger artisanal, steak haché, fromage, bacon, sauce signature",
    isPopular: true
  },
  {
    id: "grillade-3",
    name: "Steak Grillé",
    category: "grillades",
    price: 5500,
    image: steakImage,
    description: "Viande de bœuf tendre, frites maison, sauce au poivre"
  },
  {
    id: "pates-1",
    name: "Pâtes aux Crevettes",
    category: "pates",
    price: 4800,
    image: patesCrevettesImage,
    description: "Pâtes fraîches aux crevettes, sauce tomate basilic, parmesan",
    isPopular: true
  },
  {
    id: "pates-2",
    name: "Pâtes Carbonara",
    category: "pates",
    price: 3200,
    image: pastaImage,
    description: "Pâtes fraîches, sauce crémeuse, lardons, parmesan"
  },
  {
    id: "boisson-1",
    name: "Cocktails Signature",
    category: "boissons",
    price: 2000,
    image: cocktailsImage,
    description: "Cocktails maison préparés par nos barmans experts",
    isPopular: true
  },
  {
    id: "boisson-2",
    name: "Vins Sélection",
    category: "boissons",
    price: 15000,
    image: wineImage,
    description: "Notre sélection de vins fins"
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("tous");
  const { addItem } = useCartStore();

  const filteredItems = selectedCategory === "tous"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: categories.find(c => c.id === item.category)?.name
    });
    toast.success(`${item.name} ajouté au panier`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 min-h-[calc(100vh-5rem)]">
        <div className="flex h-[calc(100vh-5rem)]">
          {/* Sidebar des catégories */}
          <aside className="hidden md:flex w-64 border-r border-border bg-card/50 backdrop-blur-sm">
            <ScrollArea className="w-full p-4">
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-semibold mb-4 px-3">Catégories</h2>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-gold text-background font-semibold shadow-gold"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </aside>

          {/* Zone de contenu principale */}
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-8">
              {/* Header mobile des catégories */}
              <div className="md:hidden mb-6">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-2 pb-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className={selectedCategory === category.id ? "bg-gold hover:bg-gold-dark text-background" : ""}
                        size="sm"
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Titre de section */}
              <div className="mb-8">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
                  {categories.find(c => c.id === selectedCategory)?.name || "Notre Menu"}
                </h1>
                <p className="text-muted-foreground">
                  {filteredItems.length} plat{filteredItems.length > 1 ? 's' : ''} disponible{filteredItems.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Grille des plats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden border-border hover:border-gold transition-all duration-300 hover:shadow-gold bg-card"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {item.isPopular && (
                          <Badge className="bg-gold text-background border-0 shadow-lg">
                            Populaire
                          </Badge>
                        )}
                        {item.isSpicy && (
                          <Badge variant="destructive" className="shadow-lg">
                            <Flame className="h-3 w-3 mr-1" />
                            Piquant
                          </Badge>
                        )}
                        {item.isVegetarian && (
                          <Badge variant="secondary" className="shadow-lg">
                            <Leaf className="h-3 w-3 mr-1" />
                            Végé
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-5">
                      <h3 className="font-serif text-xl font-semibold mb-2 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xl text-gold">
                          {item.price.toLocaleString('fr-FR')} FCFA
                        </span>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          size="sm"
                          className="bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold group-hover:scale-105 transition-transform"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
