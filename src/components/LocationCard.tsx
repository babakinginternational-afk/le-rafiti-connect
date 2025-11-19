import { MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  name: string;
  address: string;
  phone: string;
  mapLink?: string;
}

export const LocationCard = ({ name, address, phone, mapLink }: LocationCardProps) => {
  return (
    <Card className="p-6 border-border hover:border-gold transition-smooth bg-card">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gold/10 rounded-lg">
          <MapPin className="h-6 w-6 text-gold" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold mb-2">{name}</h3>
          <p className="text-muted-foreground mb-4">{address}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:${phone}`} className="flex-1">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full border-gold text-gold hover:bg-gold hover:text-background"
              >
                <Phone className="h-4 w-4 mr-2" />
                {phone}
              </Button>
            </a>
            {mapLink && (
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button 
                  size="sm"
                  className="w-full bg-gold hover:bg-gold-dark text-background"
                >
                  Voir sur Maps
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
