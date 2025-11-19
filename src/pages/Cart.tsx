import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Placeholder for cart items - will be managed with state management later
  const cartItems: any[] = [];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 min-h-[calc(100vh-5rem)]">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  Votre Panier
                </h1>
                <p className="text-muted-foreground">
                  {cartItems.length === 0 
                    ? "Votre panier est vide" 
                    : `${cartItems.length} article${cartItems.length > 1 ? 's' : ''} dans votre panier`
                  }
                </p>
              </div>

              {cartItems.length === 0 ? (
                /* Empty State */
                <Card className="p-12 text-center border-border bg-card">
                  <div className="max-w-sm mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gold/10 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-gold" />
                    </div>
                    <h2 className="font-serif text-2xl font-semibold mb-4">
                      Votre panier est vide
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Découvrez notre menu et ajoutez vos plats préférés
                    </p>
                    <Link to="/menu">
                      <Button 
                        size="lg"
                        className="bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold"
                      >
                        Découvrir le menu
                      </Button>
                    </Link>
                  </div>
                </Card>
              ) : (
                /* Cart with Items */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Placeholder for cart items mapping */}
                    <Card className="p-4 border-border bg-card">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-semibold mb-1">Item Name</h3>
                          <p className="text-sm text-muted-foreground mb-3">Description</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button size="sm" variant="outline">
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-semibold">1</span>
                              <Button size="sm" variant="outline">
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button size="sm" variant="ghost" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gold">3 500 FCFA</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <Card className="p-6 border-border bg-card sticky top-24">
                      <h2 className="font-serif text-2xl font-semibold mb-6">Résumé</h2>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sous-total</span>
                          <span className="font-semibold">0 FCFA</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Frais de livraison</span>
                          <span className="font-semibold">0 FCFA</span>
                        </div>
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-xl text-gold">0 FCFA</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold"
                        size="lg"
                      >
                        Passer la commande
                      </Button>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
