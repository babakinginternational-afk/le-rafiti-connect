import { LocationCard } from "./LocationCard";

const locations = [
  {
    name: "Léo 2000",
    address: "Léo 2000, Lomé",
    phone: "+228 92 92 82 07 / +228 92 92 81 48",
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

export const Locations = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
            Nos Restaurants
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            4 Emplacements à Lomé
          </h2>
          <p className="text-muted-foreground text-lg">
            Trouvez le restaurant Le Rafiti le plus proche de vous
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <LocationCard key={index} {...location} />
          ))}
        </div>
      </div>
    </section>
  );
};
