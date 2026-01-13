import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Ship, Truck, Warehouse } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  
  return (
    <>
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="object-cover"
                priority
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight">
                Connectem el teu negoci amb el món
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200">
                Solucions logístiques integrals per a un comerç global sense fronteres.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/services">Descobreix els Serveis</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                     <Link href="/contact">Sol·licitar Cotització</Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-gray-50/70">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Serveis a la teva mida</h2>
                <p className="mt-2 text-lg text-muted-foreground">La teva càrrega, la nostra prioritat. Per mar, terra o aire.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <Ship className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Transport Marítim</h3>
                    <p className="text-muted-foreground mb-4">Gestió de contenidors FCL/LCL a nivell mundial. Seguretat i eficiència per a les teves importacions i exportacions.</p>
                    <Button variant="link" asChild>
                        <Link href="/services">Veure més <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <Truck className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Transport Terrestre</h3>
                    <p className="text-muted-foreground mb-4">Àmplia xarxa per a transport per carretera a tot Europa. Flexibilitat per a càrregues completes i fraccionades.</p>
                     <Button variant="link" asChild>
                        <Link href="/services">Veure més <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <Warehouse className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Magatzematge</h3>
                    <p className="text-muted-foreground mb-4">Solucions d'emmagatzematge segur, gestió d'inventari i preparació de comandes (picking) al nostre centre logístic.</p>
                     <Button variant="link" asChild>
                        <Link href="/services">Veure més <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-gray-800">Per què escollir Global Cargocare?</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Som més que un proveïdor; som el teu soci logístic estratègic. Ens comprometem amb el teu èxit, oferint transparència, tecnologia i un equip dedicat a superar les teves expectatives.
            </p>
            <Button asChild size="lg" className="mt-8">
                <Link href="/about">Coneix-nos Millor</Link>
            </Button>
        </div>
      </section>
    </>
  );
}
