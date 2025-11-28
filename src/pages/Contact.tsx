import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message envoyé avec succès !", {
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      
      <main className="flex-1">
        <section className="py-12 bg-gradient-primary/5">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-lg text-muted-foreground">
              Une question ? Nous sommes là pour vous aider
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input id="name" required placeholder="Votre nom" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required placeholder="votre@email.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input id="phone" type="tel" required placeholder="+212 6 12 34 56 78" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="Comment pouvons-nous vous aider ?"
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Téléphone</h3>
                            <p className="text-muted-foreground">+212 6 12 34 56 78</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-muted-foreground">contact@carloc.ma</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Adresse</h3>
                            <p className="text-muted-foreground">
                              123 Boulevard Mohammed V<br />
                              Casablanca 20000, Maroc
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Horaires d'ouverture</h3>
                            <p className="text-muted-foreground">
                              Lundi - Samedi: 8h - 19h<br />
                              Dimanche: 9h - 17h
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <PublicFooter />
    </div>
  );
}
