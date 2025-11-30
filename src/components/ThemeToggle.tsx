import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Attendre que le composant soit monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.success(`Mode ${newTheme === "light" ? "clair" : "sombre"} activé`);
  };

  // Ne rien afficher pendant le chargement côté serveur
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gold/10"
        disabled
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="hover:bg-gold/10"
      title={`Basculer en mode ${currentTheme === "light" ? "sombre" : "clair"}`}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
