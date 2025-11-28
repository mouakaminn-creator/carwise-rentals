import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const reservationSchema = z.object({
  fullName: z.string().trim().min(1, "Le nom est requis").max(100),
  phone: z.string().trim().min(10, "Numéro de téléphone invalide").max(20),
  email: z.string().trim().email("Email invalide").optional().or(z.literal("")),
  desiredCar: z.string().trim().max(200).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
});

export default function Reservation() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        fullName: formData.get("fullName") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        desiredCar: formData.get("desiredCar") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
        message: formData.get("message") as string,
      };

      // Validate input
      const validated = reservationSchema.parse(data);

      // Insert reservation request
      const { error } = await supabase
        .from("reservation_requests")
        .insert({
          full_name: validated.fullName,
          phone: validated.phone,
          email: validated.email || null,
          desired_car: validated.desiredCar || null,
          start_date: validated.startDate || null,
          end_date: validated.endDate || null,
          message: validated.message || null,
        });

      if (error) throw error;

      toast.success("Demande envoyée avec succès !", {
        description: "Nous vous contacterons très bientôt pour confirmer votre réservation.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Erreur de validation", {
          description: error.errors[0].message,
        });
      } else {
        toast.error("Une erreur est survenue", {
          description: "Veuillez réessayer plus tard.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      
      <main className="flex-1">
        <section className="py-12 bg-gradient-primary/5">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Demande de réservation</h1>
            <p className="text-lg text-muted-foreground">
              Remplissez le formulaire et nous vous contacterons rapidement
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Informations de réservation</CardTitle>
                <CardDescription>
                  Tous les champs marqués d'un * sont obligatoires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet *</Label>
                      <Input id="fullName" name="fullName" required placeholder="Votre nom complet" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="+212 6 12 34 56 78" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="votre@email.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="desiredCar">Véhicule souhaité</Label>
                    <Input id="desiredCar" name="desiredCar" placeholder="Ex: Dacia Sandero, Peugeot 208..." />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Date de début</Label>
                      <Input id="startDate" name="startDate" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Date de fin</Label>
                      <Input id="endDate" name="endDate" type="date" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message additionnel</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="Informations supplémentaires..."
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer la demande"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <PublicFooter />
    </div>
  );
}
