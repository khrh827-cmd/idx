'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nom ha de tenir almenys 2 caràcters.' }),
  email: z.string().email({ message: 'El format del correu electrònic no és vàlid.' }),
  message: z.string().min(10, { message: 'El missatge ha de tenir almenys 10 caràcters.' }),
});

export default function ContactPage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-800">Contacta amb Nosaltres</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Estem aquí per ajudar-te. Omple el formulari o utilitza les nostres dades de contacte.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Envia'ns un Missatge</CardTitle>
            <CardDescription>Respondrem la teva consulta el més aviat possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="https://formspree.io/f/xeoykrej" method="POST">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <Input id="name" name="name" placeholder="El teu nom" required minLength={2} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correu Electrònic</label>
                        <Input id="email" name="email" type="email" placeholder="el.teu@correu.com" required />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Missatge</label>
                        <Textarea id="message" name="message" placeholder="Com et podem ajudar?" className="min-h-[120px]" required minLength={10} />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Enviar Missatge
                    </Button>
                </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Informació de Contacte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Adreça</h3>
                            <p>Carrer de la Indústria, 12 – Tarragona, Espanya</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Telèfon</h3>
                            <p>+34 977 000 000</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Correu Electrònic</h3>
                            <p>info@globalcargocare.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
