import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Car, Users, FileText, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [carsRes, clientsRes, rentalsRes, activeRentalsRes] = await Promise.all([
        supabase.from("cars").select("*", { count: "exact", head: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("rentals").select("*", { count: "exact", head: true }),
        supabase.from("rentals").select("*", { count: "exact", head: true }).eq("status", "ACTIVE"),
      ]);

      return {
        totalCars: carsRes.count || 0,
        totalClients: clientsRes.count || 0,
        totalRentals: rentalsRes.count || 0,
        activeRentals: activeRentalsRes.count || 0,
      };
    },
  });

  const { data: availableCars } = useQuery({
    queryKey: ["available-cars"],
    queryFn: async () => {
      const { count } = await supabase
        .from("cars")
        .select("*", { count: "exact", head: true })
        .eq("status", "AVAILABLE");
      return count || 0;
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre activité de location
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Véhicules</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCars || 0}</div>
              <p className="text-xs text-muted-foreground">
                {availableCars || 0} disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalClients || 0}</div>
              <p className="text-xs text-muted-foreground">
                Clients enregistrés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Locations Actives</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeRentals || 0}</div>
              <p className="text-xs text-muted-foreground">
                En cours aujourd'hui
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalRentals || 0}</div>
              <p className="text-xs text-muted-foreground">
                Toutes les locations
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bienvenue sur CarLoc Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Gérez vos véhicules, clients, locations et maintenance depuis ce tableau de bord.
              Utilisez le menu de gauche pour naviguer entre les différentes sections.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
