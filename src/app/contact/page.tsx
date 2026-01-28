import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-muted flex-grow py-12 md:py-24">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
            Contacta amb Nosaltres
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Estem aquí per ajudar-te. Omple el formulari o utilitza les nostres dades de contacte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Columna Esquerra: Formulari */}
          <Card>
            <CardHeader>
              <CardTitle>Envia'ns un Missatge</CardTitle>
              <p className="text-muted-foreground pt-2">Respondrem la teva consulta el més aviat possible.</p>
            </CardHeader>
            <CardContent>
              <form action="https://formsubmit.co/khrh827@vidalibarraquer.net" method="POST" className="space-y-6">
                {/* Hidden Inputs for FormSubmit configuration */}
                <input type="hidden" name="_subject" value="Nou missatge de contacte des del web!" />
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" name="name" placeholder="El teu nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correu Electrònic</Label>
                  <Input id="email" type="email" name="email" placeholder="el.teu@correu.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Missatge</Label>
                  <Textarea id="message" name="message" placeholder="Com et podem ajudar?" className="min-h-[150px]" required />
                </div>
                <Button type="submit" variant="cta" className="w-full" size="lg">Enviar Missatge</Button>
              </form>
            </CardContent>
          </Card>

          {/* Columna Dreta: Dades */}
          <Card>
            <CardHeader>
              <CardTitle>Informació de Contacte</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Adreça</h4>
                    <p>Carrer de la Indústria, 12 – Tarragona, Espanya</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Telèfon</h4>
                    <p>+34 977 000 000</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Correu Electrònic</h4>
                    <p>info@globalcargocare.com</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
