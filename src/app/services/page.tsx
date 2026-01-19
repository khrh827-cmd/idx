import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Truck, Ship, Plane } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function ServicesPage() {
  return (
    <div className="bg-gray-50/90">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
            Els Nostres Serveis
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Oferim una gamma completa de solucions logístiques per connectar el teu negoci amb el món. La nostra expertesa garanteix eficiència, fiabilitat i tranquil·litat.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Ship className="w-10 h-10 text-primary" />
                <CardTitle>Transport Marítim</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Image 
                src={placeholderImages.services[0].src}
                alt="Cargo ship"
                width={600}
                height={400}
                className="rounded-md mb-4"
                data-ai-hint={placeholderImages.services[0].hint}
              />
              <CardDescription>
                Serveis de càrrega completa (FCL) i consolidada (LCL) a tots els ports del món. Gestió duanera experta i seguiment en temps real per a una visibilitat total.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Plane className="w-10 h-10 text-primary" />
                <CardTitle>Transport Aeri</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Image 
                 src={placeholderImages.services[1].src}
                 alt="Cargo plane"
                 width={600}
                 height={400}
                 className="rounded-md mb-4"
                 data-ai-hint={placeholderImages.services[1].hint}
              />
              <CardDescription>
                Solucions ràpides i fiables per a les teves trameses més urgents. Oferim consolidació de càrrega i vols xàrter per a una flexibilitat màxima.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Truck className="w-10 h-10 text-primary" />
                <CardTitle>Transport Terrestre</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Image 
                src={placeholderImages.services[2].src}
                alt="Cargo truck"
                width={600}
                height={400}
                className="rounded-md mb-4"
                data-ai-hint={placeholderImages.services[2].hint}
              />
              <CardDescription>
                Distribució eficient a nivell nacional i internacional per carretera. La nostra flota moderna i una extensa xarxa de socis garanteixen lliuraments puntuals i segurs.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
