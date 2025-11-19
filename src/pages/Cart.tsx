import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const deliveryFee: number = 0; // À calculer en fonction de l'adresse plus tard
  const total = subtotal + deliveryFee;

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} retiré du panier`);
  };

  const handleQuantityChange = (id: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty > 0) {
      updateQuantity(id, newQty);
    }
  };

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
                  {items.length === 0 
                    ? "Votre panier est vide" 
                    : `${items.length} article${items.length > 1 ? 's' : ''} dans votre panier`
                  }
                </p>
              </div>

              {items.length === 0 ? (
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
                    {items.map((item) => (
                      <Card key={item.id} className="p-4 border-border bg-card hover:shadow-gold transition-all duration-300">
                        <div className="flex gap-4">
                          {/* Image */}
                          <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-lg font-semibold mb-1 truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {item.category}
                            </p>
                            <div className="flex items-center justify-between">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-semibold text-lg min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              {/* Remove Button */}
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleRemoveItem(item.id, item.name)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-lg text-gold">
                              {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.price.toLocaleString('fr-FR')} FCFA/unité
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}

                    {/* Clear Cart Button */}
                    <Button
                      variant="outline"
                      className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => {
                        clearCart();
                        toast.success("Panier vidé");
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Vider le panier
                    </Button>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <Card className="p-6 border-border bg-card sticky top-24">
                      <h2 className="font-serif text-2xl font-semibold mb-6">Résumé</h2>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sous-total</span>
                          <span className="font-semibold">{subtotal.toLocaleString('fr-FR')} FCFA</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Frais de livraison</span>
                          <span className="font-semibold">
                            {deliveryFee === 0 ? "À calculer" : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}
                          </span>
                        </div>
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-xl text-gold">
                              {total.toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link to="/commander">
                        <Button 
                          className="w-full bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold"
                          size="lg"
                        >
                          Passer la commande
                        </Button>
                      </Link>
                      <Link to="/menu">
                        <Button 
                          variant="outline"
                          className="w-full mt-3"
                          size="lg"
                        >
                          Continuer mes achats
                        </Button>
                      </Link>
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
