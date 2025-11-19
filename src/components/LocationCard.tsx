import { MapPin, Phone, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  name: string;
  address: string;
  phone: string;
  mapLink?: string;
  embedUrl?: string;
}

export const LocationCard = ({ name, address, phone, mapLink, embedUrl }: LocationCardProps) => {
  return (
    <Card className="overflow-hidden border-border hover:border-gold transition-smooth bg-card group">
      {/* Carte Google Maps intégrée */}
      {embedUrl && (
        <div className="w-full h-64 relative overflow-hidden">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-gold/10 rounded-lg flex-shrink-0">
            <MapPin className="h-6 w-6 text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-xl font-semibold mb-2">{name}</h3>
            <p className="text-muted-foreground text-sm mb-1">{address}</p>
            <a 
              href={`tel:${phone.split(' / ')[0]}`} 
              className="text-gold hover:text-gold-dark text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <Phone className="h-3 w-3" />
              {phone}
            </a>
          </div>
        </div>
        
        {mapLink && (
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="block">
            <Button 
              size="sm"
              className="w-full bg-gold hover:bg-gold-dark text-background shadow-gold"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Voir l'itinéraire
            </Button>
          </a>
        )}
      </div>
    </Card>
  );
};
