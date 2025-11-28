import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function PublicNav() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CarLoc</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Accueil
          </Link>
          <Link to="/cars" className="text-sm font-medium transition-colors hover:text-primary">
            Véhicules
          </Link>
          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
          <ThemeToggle />
          <Button asChild variant="default" size="sm">
            <Link to="/reservation">Réserver</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
