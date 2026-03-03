import Image from 'next/image';
import { Target, Globe, Zap } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-80 w-full flex items-center justify-center overflow-hidden">
        <Image
          src={placeholderImages.about.src}
          alt="Equip de Global Cargocare"
          fill
          className="object-cover"
          priority
          data-ai-hint={placeholderImages.about.hint}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-primary-foreground p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
            Sobre Global Cargocare
          </h1>
          <p className="mt-4 max-w-2xl text-lg mx-auto">
            La teva aliança estratègica per a una logística sense fronteres, connectant mercats amb eficiència.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Our History */}
            <div className="prose lg:prose-lg max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-primary font-headline">La Nostra Història</h2>
              <p className="text-muted-foreground">
                Fundada a Tarragona, un enclavament logístic clau a la Mediterrània, Global Cargocare va néixer amb la missió de simplificar la complexitat del transport global. Amb anys d'experiència en el sector, hem construït una xarxa sòlida que connecta mercats i facilita el creixement internacional dels nostres clients.
              </p>
              <p className="text-muted-foreground">
                El nostre equip està format per experts apassionats per la logística, compromesos a oferir solucions personalitzades, innovadores i fiables que superin les expectatives en cada enviament.
              </p>
            </div>

            {/* Right Column: Our Values */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary font-headline mb-6">Els Nostres Valors</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
                  <div className="flex-shrink-0 pt-1">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Compromís</h4>
                    <p className="text-muted-foreground">
                      Ens dediquem plenament a l'èxit de cada enviament i a la satisfacció dels nostres clients.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
                  <div className="flex-shrink-0 pt-1">
                    <Globe className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Integritat</h4>
                    <p className="text-muted-foreground">
                      Actuem amb transparència i honestedat en totes les nostres operacions globals.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
                  <div className="flex-shrink-0 pt-1">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Innovació</h4>
                    <p className="text-muted-foreground">
                      Busquem constantment noves tecnologies i mètodes per optimitzar la cadena de subministrament.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
