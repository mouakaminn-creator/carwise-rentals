import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Car, Shield, Wrench, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Location de voitures{" "}
                <span className="text-primary">simple et rapide</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Découvrez notre flotte de véhicules bien entretenus au Maroc. 
                Service professionnel, prix transparents, assistance 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link to="/cars">
                    Voir nos véhicules <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base">
                  <Link to="/reservation">Demander une réservation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi nous choisir ?</h2>
              <p className="text-muted-foreground">
                Une expérience de location sans souci avec un service de qualité
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Flotte moderne</h3>
                  <p className="text-sm text-muted-foreground">
                    Véhicules récents et bien entretenus
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Assurance complète</h3>
                  <p className="text-sm text-muted-foreground">
                    Protection maximale pour votre tranquillité
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Entretien régulier</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintenance professionnelle garantie
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Support 24/7</h3>
                  <p className="text-sm text-muted-foreground">
                    Assistance disponible à tout moment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Cars Preview */}
        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Nos véhicules populaires</h2>
                <p className="text-muted-foreground">Découvrez notre sélection</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/cars">Voir tout <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Dacia Sandero", price: "250", type: "Manuel • Essence" },
                { name: "Peugeot 208", price: "350", type: "Automatique • Diesel" },
                { name: "Renault Clio", price: "300", type: "Manuel • Diesel" },
              ].map((car) => (
                <Card key={car.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-primary/10"></div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-1">{car.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{car.type}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">{car.price} DH</span>
                        <span className="text-sm text-muted-foreground">/jour</span>
                      </div>
                      <Button asChild size="sm">
                        <Link to="/reservation">Réserver</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Prêt à partir à l'aventure ?
              </h2>
              <p className="text-lg opacity-90">
                Réservez votre véhicule dès maintenant et profitez de tarifs compétitifs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" variant="secondary" className="text-base">
                  <Link to="/reservation">Faire une réservation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <PublicFooter />
    </div>
  );
}
