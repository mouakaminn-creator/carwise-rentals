import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";

export default function AdminAlerts() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Alertes et Échéances</h2>
          <p className="text-muted-foreground">
            Suivez les dates importantes et les alertes
          </p>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground">
            Interface des alertes à venir...
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
