import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationCard } from "@/components/LocationCard";

const locations = [
  {
    name: "Léo 2000",
    address: "Léo 2000, Lomé",
    phone: "+228 92 92 82 07",
    mapLink: "https://share.google/X1ArVqyaUoo9WNOeH"
  },
  {
    name: "Agoé Anomé",
    address: "Agoé Anomé, Lomé",
    phone: "+228 91 82 00 00",
    mapLink: "https://share.google/X1ArVqyaUoo9WNOeH"
  },
  {
    name: "Klikamé",
    address: "Klikamé, Lomé",
    phone: "+228 91 33 00 00",
    mapLink: "https://share.google/X1ArVqyaUoo9WNOeH"
  },
  {
    name: "Soagbado",
    address: "Soagbado, Lomé",
    phone: "+228 72 14 01 60",
    mapLink: "https://share.google/X1ArVqyaUoo9WNOeH"
  }
];

const Emplacements = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
              Nos Restaurants
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Trouvez-nous à Lomé
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Le Rafiti est présent dans 4 emplacements stratégiques à Lomé pour mieux vous servir
            </p>
          </div>
        </section>

        {/* Locations */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {locations.map((location, index) => (
                <LocationCard key={index} {...location} />
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Carte des emplacements
                </h2>
                <p className="text-muted-foreground">
                  Visualisez tous nos restaurants sur Google Maps
                </p>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.8123!2d1.2573!3d6.1319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnNTQuOCJOIDHCsDE1JzI2LjMiRQ!5e0!3m2!1sen!2stg!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Emplacements;
