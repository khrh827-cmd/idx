import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Ship, Truck, Warehouse, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    ref: 'INT-MAR-01',
    icon: <Ship className="h-10 w-10 text-primary" />,
    title: 'Transport Internacional Marítim',
    description: 'Consolidació i gestió de contenidors FCL/LCL per a un abast global segur i eficient.',
    features: [
        "INCOTERMS: FOB, CIF, DAP",
        "Contenidors de 20' i 40'",
        "Trànsit estimat: 15–35 dies",
        "Bill of Lading electrònic"
    ],
    image: PlaceHolderImages.find((img) => img.id === 'service-maritime'),
  },
  {
    ref: 'INT-TRK-02',
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Transport Internacional per Carretera',
    description: 'Àmplia xarxa de camions TIR per a transport terrestre flexible i ràpid dins la Unió Europea.',
    features: [
        "Càrregues de fins a 24 tones",
        "Transport de mercaderies ADR",
        "Trànsit estimat: 24–96 hores",
        "Documentació CMR electrònica"
    ],
    image: PlaceHolderImages.find((img) => img.id === 'service-road'),
  },
  {
    ref: 'WMS-DIST-03',
    icon: <Warehouse className="h-10 w-10 text-primary" />,
    title: 'Magatzematge i Distribució',
    description: 'Gestió d’inventari avançada, cross-docking i preparació de comandes a mida.',
    features: [
        "WMS amb codis d'estàndard GS1",
        "Control de temperatura i humitat",
        "Capacitat per a 10.000 palets",
        "Picking i packing automatitzat"
    ],
    image: PlaceHolderImages.find((img) => img.id === 'service-warehouse'),
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-800">Els Nostres Serveis</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Descobreix com les nostres solucions logístiques integrals poden impulsar el teu negoci.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.ref} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-gray-200">
            {service.image && (
              <div className="relative h-56">
                <Image
                  src={service.image.imageUrl}
                  alt={service.image.description}
                  data-ai-hint={service.image.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-4">
                {service.icon}
                <CardTitle className="text-xl font-headline text-primary">{service.title}</CardTitle>
              </div>
              <CardDescription className="text-sm pt-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <ul className="space-y-2 text-sm text-gray-600">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  <Link href={`/contact?service_ref=${service.ref}`}>Sol·licitar Cotització</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
