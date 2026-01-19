import { Globe, Users, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';


export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center">
        <Image
          src={placeholderImages.about.src}
          alt="Team collaborating in an office"
          fill
          className="object-cover"
          data-ai-hint={placeholderImages.about.hint}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 text-center text-primary-foreground p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
            Sobre Global Cargocare
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            La teva aliança estratègica per a una logística sense fronteres.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose lg:prose-lg max-w-none text-muted-foreground">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">La Nostra Missió</h2>
                <p>
                    A Global Cargocare, la nostra missió és simplificar la complexitat del comerç internacional. Amb més de dues dècades d'experiència, ens hem consolidat com a líders en el sector logístic, oferint solucions integrals i personalitzades que connecten el teu negoci amb el món.
                </p>
                <p>
                    Ens comprometem a oferir un servei excepcional, basat en la confiança, la transparència i la innovació constant. El nostre equip expert treballa incansablement per garantir que les teves mercaderies arribin al seu destí de manera eficient, segura i puntual.
                </p>
            </div>
            <div>
                 <Image 
                    src="https://picsum.photos/seed/team/600/400"
                    alt="Diverse team meeting"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl"
                    data-ai-hint="team meeting"
                />
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-12 md:py-24 bg-gray-50/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">Els Nostres Valors</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Els pilars que guien cada una de les nostres decisions i accions.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl">Fiabilitat</CardTitle>
                <p className="text-muted-foreground">
                  Ens comprometem a complir les nostres promeses. La teva càrrega està segura amb nosaltres.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl">Client-centrisme</CardTitle>
                <p className="text-muted-foreground">
                  El teu èxit és el nostre. Oferim solucions a mida i un servei d'atenció personalitzat.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Globe className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl">Perspectiva Global</CardTitle>
                <p className="text-muted-foreground">
                  La nostra extensa xarxa internacional ens permet oferir solucions logístiques a qualsevol lloc del món.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
