import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar as CalendarIcon, Users, MapPin, Clock, ChefHat } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
];

const locations = [
  { id: "leo-2000", name: "Léo 2000" },
  { id: "agoe-anome", name: "Agoé Anomé" },
  { id: "klikame", name: "Klikamé" },
  { id: "soagbado", name: "Soagbado" }
];

const Reservation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("2");
  const [locationId, setLocationId] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !locationId) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reservations").insert({
        reservation_date: format(date, "yyyy-MM-dd"),
        reservation_time: time,
        number_of_guests: parseInt(guests),
        location_id: locationId,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || null,
        special_requests: specialRequests || null,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Réservation confirmée !",
        description: "Nous vous contacterons pour confirmer votre réservation.",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Réserver une Table
            </h1>
            <p className="text-muted-foreground text-lg">
              Réservez votre table dans l'un de nos restaurants et vivez une expérience culinaire exceptionnelle
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 bg-card border border-border rounded-2xl p-8 shadow-lg">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-base flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-gold" />
                Date de réservation *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-12",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : "Sélectionnez une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold" />
                Heure *
              </Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionnez une heure" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Guests */}
            <div className="space-y-2">
              <Label htmlFor="guests" className="text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-gold" />
                Nombre de personnes *
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Nombre de personnes" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(20)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} {i === 0 ? "personne" : "personnes"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Selection */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />
                Emplacement *
              </Label>
              <Select value={locationId} onValueChange={setLocationId}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choisissez un restaurant" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Nom complet *
                </Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Votre nom"
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">
                  Téléphone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+228 XX XX XX XX"
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email (optionnel)
              </Label>
              <Input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="votre@email.com"
                className="h-12"
              />
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="requests" className="text-base flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-gold" />
                Demandes spéciales ou plats souhaités
              </Label>
              <Textarea
                id="requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Allergies, occasions spéciales, plats que vous souhaitez réserver..."
                className="min-h-[120px]"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold-dark text-background font-bold text-lg py-6"
            >
              {isSubmitting ? "Envoi en cours..." : "Confirmer la réservation"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              * Champs obligatoires. Nous vous contacterons pour confirmer votre réservation.
            </p>
          </form>
        </div>
      </main>

      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default Reservation;
