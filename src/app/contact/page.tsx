'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xeoykrej', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Hi ha hagut un problema en enviar el missatge.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'No s\'ha pogut enviar el missatge. Intenta-ho més tard.');
    }
  }

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
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-primary">Missatge Enviat!</h3>
                  <p className="text-muted-foreground mt-2">Gràcies per contactar amb Cargocare. Et respondrem ben aviat.</p>
                  <Button 
                    variant="outline" 
                    className="mt-6" 
                    onClick={() => setStatus('idle')}
                  >
                    Enviar un altre missatge
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input type="text" id="name" name="name" placeholder="El teu nom" required disabled={status === 'loading'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correu Electrònic</Label>
                    <Input id="email" type="email" name="email" placeholder="el.teu@correu.com" required disabled={status === 'loading'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Missatge</Label>
                    <Textarea id="message" name="message" placeholder="Com et podem ajudar?" className="min-h-[150px]" required disabled={status === 'loading'} />
                  </div>
                  
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                      <AlertCircle className="h-4 w-4" />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <Button type="submit" variant="cta" className="w-full" size="lg" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviant...
                      </>
                    ) : (
                      'Enviar Missatge'
                    )}
                  </Button>
                </form>
              )}
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
                    <p>info@cargocare.cat</p>
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
