import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Truck, Ship, Plane, Warehouse, ChevronRight, Users } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
              Solucions Logístiques Globals
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-200">
              Connectem el teu negoci amb el món a través de serveis de transport marítim, aeri i terrestre eficients i fiables.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link href="/services">Els Nostres Serveis</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Contacta'ns</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Serveis Integrals de Logística</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Oferim una gamma completa de serveis per satisfer totes les teves necessitats de transport.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
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
                    Serveis de càrrega completa (FCL) i consolidada (LCL) a tots els ports del món. Gestió duanera i seguiment en temps real.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
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
                    Solucions ràpides i fiables per a les teves trameses urgents. Consolació de càrrega i vols xàrter disponibles.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
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
                    Distribució nacional i internacional per carretera. Flota moderna i xarxa de socis per garantir lliuraments puntuals.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
                <Button asChild>
                    <Link href="/services">Veure tots els serveis <ChevronRight className="w-4 h-4 ml-2" /></Link>
                </Button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-12 md:py-24">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">La Teva Aliança Estratègica en Logística</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Amb més de 20 anys d'experiència, Global Cargocare s'ha consolidat com un líder en el sector logístic, oferint solucions personalitzades i un servei al client excepcional. La nostra missió és simplificar la complexitat del comerç global per als nostres clients.
                    </p>
                     <ul className="mt-6 space-y-4">
                        <li className="flex items-start">
                            <div className="flex-shrink-0">
                                <Warehouse className="w-6 h-6 text-primary" />
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold">Xarxa Global</h4>
                                <p className="text-muted-foreground">Presència a més de 150 països.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                             <div className="flex-shrink-0">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold">Equip Expert</h4>
                                <p className="text-muted-foreground">Professionals dedicats a la teva disposició.</p>
                            </div>
                        </li>
                    </ul>
                     <div className="mt-8">
                        <Button asChild size="lg">
                            <Link href="/about">Coneix-nos Millor</Link>
                        </Button>
                    </div>
                </div>
                 <div className="mt-8 md:mt-0">
                    <Image 
                        src={placeholderImages.about.src}
                        alt="Warehouse interior"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl"
                        data-ai-hint={placeholderImages.about.hint}
                    />
                </div>
            </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Comencem a Treballar Junts?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                    Estem preparats per ajudar-te a optimitzar la teva cadena de subministrament. Contacta amb nosaltres avui mateix per a una consulta gratuïta.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/contact">Sol·licita un Pressupost</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
