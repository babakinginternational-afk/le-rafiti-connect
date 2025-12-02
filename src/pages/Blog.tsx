import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Blog = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data;
    },
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", selectedLocation],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("*, locations(name)")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (selectedLocation) {
        query = query.eq("location_id", selectedLocation);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Actualités & Événements
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Restez informé des dernières nouvelles, événements et promotions de nos restaurants
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedLocation(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedLocation === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Tous les emplacements
              </button>
              {locations?.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLocation === location.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[16/10] rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      {post.featured_image_url ? (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                          <span className="font-playfair text-4xl text-primary/50">Le Rafiti</span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(post.published_at), "d MMMM yyyy", { locale: fr })}
                            </span>
                          )}
                          {post.locations && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {post.locations.name}
                            </span>
                          )}
                        </div>
                        <h2 className="font-playfair text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                          Lire la suite
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                  Aucun article disponible
                </h3>
                <p className="text-muted-foreground">
                  Revenez bientôt pour découvrir nos actualités et événements
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default Blog;
