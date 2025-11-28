import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";

export default function AdminMaintenance() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion de la Maintenance</h2>
          <p className="text-muted-foreground">
            Suivez l'entretien de vos véhicules
          </p>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground">
            Interface de gestion de la maintenance à venir...
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
