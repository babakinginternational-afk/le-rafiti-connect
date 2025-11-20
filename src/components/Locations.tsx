import { LocationCard } from "./LocationCard";

const locations = [
  {
    name: "Léo 2000",
    address: "656G+GVR, Lomé, Togo",
    phone: "+228 92 92 82 07 / +228 92 92 81 48",
    mapLink: "https://maps.app.goo.gl/gAE5hqMQCAxLXRsB9",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0899837459!2d1.2268!3d6.1614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDknNDEuMCJOIDHCsDEzJzM2LjUiRQ!5e0!3m2!1sfr!2stg!4v1234567890"
  },
  {
    name: "Agoé Anomé",
    address: "Agoé Anomé, Lomé, Togo",
    phone: "+228 91 82 00 00",
    mapLink: "https://maps.app.goo.gl/fkTAGza9PTZsqESp6",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.5!2d1.25!3d6.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDknMDAuMCJOIDHCsDE1JzAwLjAiRQ!5e0!3m2!1sfr!2stg!4v1234567890"
  },
  {
    name: "Klikamé",
    address: "Klikamé, Lomé, Togo",
    phone: "+228 91 33 00 00",
    mapLink: "https://maps.app.goo.gl/UvThGco23cGBKxzb9",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.3!2d1.24!3d6.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDgnMjQuMCJOIDHCsDE0JzI0LjAiRQ!5e0!3m2!1sfr!2stg!4v1234567890"
  },
  {
    name: "Soagbado",
    address: "Soagbado, Lomé, Togo",
    phone: "+228 72 14 01 60",
    mapLink: "https://share.google/X1ArVqyaUoo9WNOeH",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.2!2d1.23!3d6.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDknMzYuMCJOIDHCsDEzJzQ4LjAiRQ!5e0!3m2!1sfr!2stg!4v1234567890"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {locations.map((location, index) => (
            <LocationCard key={index} {...location} />
          ))}
        </div>
      </div>
    </section>
  );
};
