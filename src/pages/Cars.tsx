import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Fuel, Settings } from "lucide-react";

export default function Cars() {
  const { data: cars, isLoading } = useQuery({
    queryKey: ["public-cars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("status", "AVAILABLE")
        .order("brand");
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      
      <main className="flex-1">
        <section className="py-12 bg-gradient-primary/5">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Nos véhicules disponibles</h1>
            <p className="text-lg text-muted-foreground">
              Choisissez parmi notre sélection de voitures bien entretenues
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video bg-muted animate-pulse"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-6 bg-muted animate-pulse rounded"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                      <div className="h-10 bg-muted animate-pulse rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : cars && cars.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-primary/10 flex items-center justify-center">
                      {car.image_url ? (
                        <img src={car.image_url} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-6xl opacity-20">🚗</div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">
                        {car.brand} {car.model}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Settings className="h-4 w-4" />
                          {car.transmission === "MANUAL" ? "Manuel" : "Automatique"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-4 w-4" />
                          {car.fuel_type}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold text-primary">{car.daily_price} DH</span>
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
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Aucun véhicule disponible pour le moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <PublicFooter />
    </div>
  );
}
