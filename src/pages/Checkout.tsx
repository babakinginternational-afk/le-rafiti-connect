import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { LocationPicker } from "@/components/LocationPicker";
import { useCartStore } from "@/stores/cartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ShoppingBag, MapPin, Store } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getSubtotal } = useCartStore();
  const [orderType, setOrderType] = useState<"dine-in" | "delivery">("dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState<any>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  const subtotal = getSubtotal();
  const deliveryFee = orderType === "delivery" ? 1000 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    if (!customerName || !customerPhone) {
      toast.error("Veuillez remplir vos informations de contact");
      return;
    }

    if (orderType === "dine-in" && !tableNumber) {
      toast.error("Veuillez indiquer votre numéro de table");
      return;
    }

    if (orderType === "delivery" && !deliveryLocation?.address) {
      toast.error("Veuillez indiquer votre adresse de livraison");
      return;
    }

    // Simuler l'envoi de la commande
    toast.success("Commande envoyée avec succès!");
    console.log({
      orderType,
      tableNumber,
      deliveryLocation,
      customerName,
      customerPhone,
      specialNotes,
      items,
      total
    });

    // Rediriger vers une page de confirmation (à créer)
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 min-h-[calc(100vh-5rem)]">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Card className="p-12 text-center max-w-2xl mx-auto">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="font-serif text-2xl font-semibold mb-4">
                  Votre panier est vide
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ajoutez des plats à votre panier avant de passer commande
                </p>
                <Button onClick={() => navigate("/menu")} className="bg-gold hover:bg-gold-dark text-background">
                  Voir le menu
                </Button>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 min-h-[calc(100vh-5rem)]">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">
                Finaliser la commande
              </h1>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulaire */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Type de commande */}
                  <Card className="p-6 border-border bg-card">
                    <h2 className="font-serif text-2xl font-semibold mb-4">Type de commande</h2>
                    <RadioGroup value={orderType} onValueChange={(value: any) => setOrderType(value)}>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-gold transition-smooth cursor-pointer">
                        <RadioGroupItem value="dine-in" id="dine-in" />
                        <Label htmlFor="dine-in" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Store className="h-5 w-5 text-gold" />
                          <div>
                            <p className="font-semibold">Sur place</p>
                            <p className="text-sm text-muted-foreground">Manger au restaurant</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-gold transition-smooth cursor-pointer">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer flex-1">
                          <MapPin className="h-5 w-5 text-gold" />
                          <div>
                            <p className="font-semibold">Livraison</p>
                            <p className="text-sm text-muted-foreground">Se faire livrer à domicile (+1000 FCFA)</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </Card>

                  {/* Informations selon le type */}
                  <Card className="p-6 border-border bg-card">
                    <h2 className="font-serif text-2xl font-semibold mb-4">
                      {orderType === "dine-in" ? "Numéro de table" : "Adresse de livraison"}
                    </h2>
                    
                    {orderType === "dine-in" ? (
                      <div>
                        <Label htmlFor="table">Numéro de votre table</Label>
                        <Input
                          id="table"
                          type="text"
                          placeholder="Ex: 12"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                    ) : (
                      <LocationPicker onLocationSelect={setDeliveryLocation} />
                    )}
                  </Card>

                  {/* Informations client */}
                  <Card className="p-6 border-border bg-card">
                    <h2 className="font-serif text-2xl font-semibold mb-4">Vos informations</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Votre nom"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+228 XX XX XX XX"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes spéciales (optionnel)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Allergies, préférences de cuisson, etc."
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          className="mt-2 min-h-24"
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Résumé */}
                <div className="lg:col-span-1">
                  <Card className="p-6 border-border bg-card sticky top-24">
                    <h2 className="font-serif text-2xl font-semibold mb-6">Résumé</h2>
                    
                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-semibold">
                            {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sous-total</span>
                        <span className="font-semibold">{subtotal.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                      {orderType === "delivery" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Frais de livraison</span>
                          <span className="font-semibold">{deliveryFee.toLocaleString('fr-FR')} FCFA</span>
                        </div>
                      )}
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-xl text-gold">
                            {total.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gold hover:bg-gold-dark text-background font-semibold shadow-gold"
                      size="lg"
                    >
                      Confirmer la commande
                    </Button>
                  </Card>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
