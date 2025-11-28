import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";

export default function AdminRentals() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Locations</h2>
          <p className="text-muted-foreground">
            Gérez les contrats de location
          </p>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground">
            Interface de gestion des locations à venir...
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
