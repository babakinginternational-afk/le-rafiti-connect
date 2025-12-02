import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import galleryAerialNight from "@/assets/gallery-aerial-night.jpg";
import galleryExteriorDay from "@/assets/gallery-exterior-day.jpg";
import galleryExteriorNight from "@/assets/gallery-exterior-night.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import galleryInterior1 from "@/assets/gallery-interior-1.png";
import galleryInterior2 from "@/assets/gallery-interior-2.png";
import galleryLogo from "@/assets/gallery-logo.jpg";
import galleryOpen247 from "@/assets/gallery-open-247.jpg";
import salonAmbiance from "@/assets/salon-ambiance.webp";
import salonBar from "@/assets/salon-bar.webp";
import salonLounge from "@/assets/salon-lounge.webp";

const galleryImages = [
  { src: galleryInterior1, alt: "Intérieur élégant du restaurant", title: "Ambiance Luxueuse" },
  { src: galleryInterior2, alt: "Salle de restauration", title: "Espace Raffiné" },
  { src: salonLounge, alt: "Salon lounge", title: "Lounge Premium" },
  { src: salonBar, alt: "Bar du restaurant", title: "Notre Bar" },
  { src: salonAmbiance, alt: "Ambiance du salon", title: "Atmosphère Unique" },
  { src: galleryFood, alt: "Nos plats signature", title: "Gastronomie" },
  { src: galleryExteriorDay, alt: "Extérieur de jour", title: "Vue Extérieure" },
  { src: galleryExteriorNight, alt: "Extérieur de nuit", title: "Ambiance Nocturne" },
  { src: galleryAerialNight, alt: "Vue aérienne de nuit", title: "Vue Panoramique" },
  { src: galleryOpen247, alt: "Ouvert 24h/24", title: "Toujours Ouvert" },
  { src: galleryLogo, alt: "Logo Le Rafiti", title: "Le Rafiti" },
];

export const ImageGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Découvrez Notre Univers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une immersion dans l'élégance et le raffinement de nos espaces
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 relative aspect-[16/9]"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                      {image.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  selectedIndex === index
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
