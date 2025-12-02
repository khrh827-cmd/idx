import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Target, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-800">Qui Som</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A Global Cargocare, som més que un proveïdor logístic. Som el teu soci estratègic per al comerç internacional.
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl mb-16">
          {aboutImage && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                data-ai-hint={aboutImage.imageHint}
                fill
                className="object-cover"
              />
            </div>
          )}
        </Card>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">La Nostra Història</h2>
            <p className="text-gray-600 mb-4">
              Fundada a Tarragona, un enclavament logístic clau, Global Cargocare va néixer amb la missió de simplificar la complexitat del transport global. Amb anys d'experiència, hem construït una xarxa sòlida que connecta mercats i facilita el creixement dels nostres clients.
            </p>
            <p className="text-gray-600">
              El nostre equip està format per experts apassionats per la logística, compromesos a oferir solucions personalitzades, innovadores i fiables que superin les expectatives.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Els Nostres Valors</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">Compromís</h3>
                  <p className="text-gray-600">Ens dediquem plenament a l'èxit de cada enviament i a la satisfacció dels nostres clients.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">Integritat</h3>
                  <p className="text-gray-600">Actuem amb transparència i honestedat en totes les nostres operacions.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">Innovació</h3>
                  <p className="text-gray-600">Busquem constantment noves tecnologies i mètodes per optimitzar la cadena de subministrament.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
