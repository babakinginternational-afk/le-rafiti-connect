import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, ArrowLeft, User, Share2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, locations(name)")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post?.title,
        text: post?.excerpt || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {isLoading ? (
          <div className="container mx-auto px-4 py-16">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="aspect-[21/9] rounded-xl mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : error || !post ? (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="font-playfair text-3xl font-bold text-foreground mb-4">
              Article non trouvé
            </h1>
            <p className="text-muted-foreground mb-8">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux actualités
              </Link>
            </Button>
          </div>
        ) : (
          <article>
            {/* Hero Image */}
            {post.featured_image_url ? (
              <div className="relative aspect-[21/9] max-h-[500px]">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            ) : (
              <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary" />
            )}

            <div className="container mx-auto px-4 py-8 md:py-12">
              {/* Back Link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour aux actualités
              </Link>

              <div className="max-w-3xl mx-auto">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
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
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author_name}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Share Button */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>

                {/* Content */}
                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer CTA */}
                <div className="mt-12 pt-8 border-t border-border text-center">
                  <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                    Envie de nous rendre visite ?
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild>
                      <Link to="/menu">Voir le Menu</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/reservation">Réserver une Table</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default BlogPost;
