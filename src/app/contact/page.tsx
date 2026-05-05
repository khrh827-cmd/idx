'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Loader2, CheckCircle2, AlertCircle, MessageSquareWarning } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [claimStatus, setClaimStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, type: 'contact' | 'claim') {
    e.preventDefault();
    const setTargetStatus = type === 'contact' ? setStatus : setClaimStatus;
    
    setTargetStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // Afegim el tipus de missatge per a Formspree
    const payload = { ...data, subject: type === 'contact' ? 'Consulta General' : 'Queixa o Reclamació' };

    try {
      const response = await fetch('https://formspree.io/f/xeoykrej', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setTargetStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Hi ha hagut un problema en enviar el missatge.');
      }
    } catch (err: any) {
      console.error("Error enviant el formulari:", err);
      setTargetStatus('error');
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

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          
          <Card className="shadow-lg border-t-4 border-t-accent">
            <CardHeader>
              <CardTitle>Envia'ns un Missatge</CardTitle>
              <CardDescription className="pt-2">Respondrem la teva consulta el més aviat possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Missatge rebut!</h3>
                  <p className="text-muted-foreground mt-2">Gràcies per contactar amb Cargocare. Et respondrem en menys de 24 hores.</p>
                  <Button 
                    variant="outline" 
                    className="mt-6" 
                    onClick={() => setStatus('idle')}
                  >
                    Enviar un altre missatge
                  </Button>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, 'contact')} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="El teu nom complet" 
                      required 
                      disabled={status === 'loading'} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correu Electrònic</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      name="email" 
                      placeholder="exemple@empresa.com" 
                      required 
                      disabled={status === 'loading'} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Missatge</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Explica'ns breument com et podem ajudar..." 
                      className="min-h-[150px]" 
                      required 
                      disabled={status === 'loading'} 
                    />
                  </div>
                  
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg animate-in shake-1">
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

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Informació de Contacte</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-8 text-muted-foreground mt-4">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">Adreça</h4>
                    <p>Polígon de Constantí, Tarragona (Espanya)</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">Telèfon</h4>
                    <p>+34 977 000 000</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">Correu Electrònic</h4>
                    <p>info@cargocare.cat</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Secció de Queixes i Reclamacions */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-l-4 border-l-destructive bg-white">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-destructive/10 p-3 rounded-full">
                <MessageSquareWarning className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Queixes i Reclamacions</CardTitle>
                <CardDescription>
                  Volem millorar el nostre servei. Si has tingut algun inconvenient, si us plau, fes-nos-ho saber.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {claimStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="h-10 w-10 text-green-600 mb-3" />
                  <h3 className="text-lg font-bold text-primary">Reclamació enviada</h3>
                  <p className="text-muted-foreground mt-1 text-sm">Hem rebut la teva queixa. El departament d'atenció al client es posarà en contacte amb tu en breu.</p>
                  <Button 
                    variant="link" 
                    className="mt-4" 
                    onClick={() => setClaimStatus('idle')}
                  >
                    Enviar una altra reclamació
                  </Button>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, 'claim')} className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="claim-name">Nom Complet</Label>
                      <Input id="claim-name" name="name" placeholder="Nom i cognoms" required disabled={claimStatus === 'loading'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="claim-id">Referència d'Enviament / Factura</Label>
                      <Input id="claim-id" name="reference" placeholder="Ex: BK-1234 o FACT-5678" required disabled={claimStatus === 'loading'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="claim-email">Correu Electrònic de Contacte</Label>
                      <Input id="claim-email" name="email" type="email" placeholder="correu@empresa.com" required disabled={claimStatus === 'loading'} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="claim-message">Motiu de la Queixa</Label>
                      <Textarea 
                        id="claim-message" 
                        name="message" 
                        placeholder="Explica'ns què ha passat amb el màxim detall possible..." 
                        className="min-h-[155px]"
                        required 
                        disabled={claimStatus === 'loading'} 
                      />
                    </div>
                    <Button type="submit" variant="destructive" className="w-full" disabled={claimStatus === 'loading'}>
                      {claimStatus === 'loading' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviant Reclamació...
                        </>
                      ) : (
                        'Enviar Reclamació Oficial'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
