import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Ship, Plane, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <Ship className="h-10 w-10 text-primary" />,
    title: 'Maritime Freight',
    description: 'Cost-effective and reliable sea freight services for large shipments worldwide.',
    image: PlaceHolderImages.find((img) => img.id === 'feature-maritime'),
  },
  {
    icon: <Plane className="h-10 w-10 text-primary" />,
    title: 'Air Freight',
    description: 'Fast and secure air cargo solutions for time-sensitive deliveries.',
    image: PlaceHolderImages.find((img) => img.id === 'feature-air'),
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Road Freight',
    description: 'Flexible and efficient domestic and cross-border trucking services.',
    image: PlaceHolderImages.find((img) => img.id === 'feature-road'),
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'home-hero');
  const ctaImage = PlaceHolderImages.find((img) => img.id === 'cta-background');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight leading-tight">
            Global Logistics Pro
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            Your trusted partner for seamless national and international merchandise transport.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/quote">
                Get an Instant Quote <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/tracking">Track a Shipment</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Core Services</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              We provide a comprehensive range of logistics services to meet your specific needs, ensuring your cargo arrives safely and on time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                {feature.image && (
                  <div className="relative h-48">
                    <Image
                      src={feature.image.imageUrl}
                      alt={feature.image.description}
                      data-ai-hint={feature.image.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader className="flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle className="text-2xl font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32">
        {ctaImage && (
          <Image
            src={ctaImage.imageUrl}
            alt={ctaImage.description}
            data-ai-hint={ctaImage.imageHint}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Optimize Your Logistics?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg">
            Use our AI-powered tool to find the most efficient and cost-effective route for your shipment.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/route-optimizer">
              Optimize My Route <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
