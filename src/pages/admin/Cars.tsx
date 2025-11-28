import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";

export default function AdminCars() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Véhicules</h2>
          <p className="text-muted-foreground">
            Gérez votre flotte de véhicules
          </p>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground">
            Interface de gestion des véhicules à venir...
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
