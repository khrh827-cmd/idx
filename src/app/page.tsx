import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Truck, Ship, Warehouse, ChevronRight, Users, CheckCircle } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

const services = [
  {
    icon: <Ship className="w-10 h-10 text-primary" />,
    title: "Transport Internacional Marítim",
    description: "Consolidació i gestió de contenidors FCL/LCL per a un abast global segur i eficient.",
    features: [
      "INCOTERMS: FOB, CIF, DAP",
      "Contenidors de 20' i 40'",
      "Trànsit estimat: 15–35 dies",
      "Bill of Lading electrònic"
    ],
    href: "/contact"
  },
  {
    icon: <Truck className="w-10 h-10 text-primary" />,
    title: "Transport Internacional per Carretera",
    description: "Àmplia xarxa de camions TIR per a transport terrestre flexible i ràpid dins la Unió Europea.",
    features: [
      "Càrregues de fins a 24 tones",
      "Transport de mercaderies ADR",
      "Trànsit estimat: 24–96 hores",
      "Documentació CMR electrònica"
    ],
    href: "/contact"
  },
  {
    icon: <Warehouse className="w-10 h-10 text-primary" />,
    title: "Magatzematge i Distribució",
    description: "Gestió d'inventari avançada, cross-docking i preparació de comandes a mida.",
    features: [
      "WMS amb codis d'estàndard GS1",
      "Control de temperatura i humitat",
      "Capacitat per a 10.000 palets",
      "Picking i packing automatitzat"
    ],
    href: "/contact"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full">
          <Image
            src={placeholderImages.hero.src}
            alt="Container ship at a busy port"
            fill
            className="object-cover"
            priority
            data-ai-hint={placeholderImages.hero.hint}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Solucions Logístiques Globals
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-200">
              Connectem el teu negoci amb el món a través de serveis de transport marítim, aeri i terrestre eficients i fiables.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg" className="bg-blue-900 text-white hover:bg-blue-900/90">
                <Link href="/contact" className="flex items-center">
                  Demanar Pressupost
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-24 bg-gray-50/90">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
                        Una Solució per a Cada Necessitat
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Oferim una gamma completa de solucions logístiques per connectar el teu negoci amb el món.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {services.map((service) => (
                    <Card key={service.title} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="items-center text-center">
                        {service.icon}
                        <CardTitle className="text-xl mt-4">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="mb-4 text-center">{service.description}</CardDescription>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {service.features.map((feature) =>(
                            <li key={feature} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                           <Link href={service.href}>Sol·licitar Cotització</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
