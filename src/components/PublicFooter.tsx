import { Link } from "react-router-dom";
import { Car, Mail, Phone, MapPin } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CarLoc</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Location de voitures simple et rapide au Maroc
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link to="/cars" className="text-muted-foreground hover:text-primary transition-colors">Véhicules</Link></li>
              <li><Link to="/reservation" className="text-muted-foreground hover:text-primary transition-colors">Réserver</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+212 6 12 34 56 78</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>contact@carloc.ma</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Casablanca, Maroc</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Horaires</h3>
            <p className="text-sm text-muted-foreground">
              Lundi - Samedi: 8h - 19h<br />
              Dimanche: 9h - 17h
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CarLoc Morocco. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
