import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    latitude: number;
    longitude: number;
    landmark?: string;
  }) => void;
}

export const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pour l'instant, version simplifiée sans Google Maps API
    // L'intégration complète nécessitera l'API key Google Maps
    if (mapRef.current) {
      // Placeholder pour la carte
      mapRef.current.innerHTML = `
        <div class="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <div class="text-center">
            <MapPin class="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p class="text-muted-foreground">Carte Google Maps</p>
            <p class="text-xs text-muted-foreground mt-1">Intégration en cours</p>
          </div>
        </div>
      `;
    }
  }, []);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    // Simuler une sélection de coordonnées (Lomé centre)
    if (value.length > 3) {
      onLocationSelect({
        address: value,
        latitude: 6.1256,
        longitude: 1.2223,
        landmark
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Adresse de livraison</Label>
        <div className="relative mt-2">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            placeholder="Entrez votre adresse"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="landmark">Point de repère (optionnel)</Label>
        <Input
          id="landmark"
          placeholder="Ex: À côté de la pharmacie"
          value={landmark}
          onChange={(e) => {
            setLandmark(e.target.value);
            if (address) {
              onLocationSelect({
                address,
                latitude: 6.1256,
                longitude: 1.2223,
                landmark: e.target.value
              });
            }
          }}
          className="mt-2"
        />
      </div>

      <div 
        ref={mapRef}
        className="w-full h-64 border border-border rounded-lg overflow-hidden"
      />
    </div>
  );
};
