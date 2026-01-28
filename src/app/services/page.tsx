import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Ship, Warehouse, CheckCircle } from 'lucide-react';

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
    ]
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
    ]
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
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-muted py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
            Els Nostres Serveis
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Oferim una gamma completa de solucions logístiques per connectar el teu negoci amb el món. La nostra expertesa garanteix eficiència, fiabilitat i tranquil·litat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col transition-shadow duration-300">
              <CardHeader className="flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.features.map((feature) =>(
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="cta" className="w-full">Sol·licitar Cotització</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
