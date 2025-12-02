import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImageGallery } from "@/components/ImageGallery";
import { MenuPreview } from "@/components/MenuPreview";
import { BlogPreview } from "@/components/BlogPreview";
import { Locations } from "@/components/Locations";
import { Footer } from "@/components/Footer";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ImageGallery />
        <MenuPreview />
        <BlogPreview />
        <Locations />
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default Index;
