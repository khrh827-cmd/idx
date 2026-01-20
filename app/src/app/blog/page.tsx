import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';
import { ChevronRight } from "lucide-react";

const blogPosts = [
  {
    title: "Optimizació de Rutes: El Futur de la Logística",
    summary: "Descobreix com la intel·ligència artificial està revolucionant la planificació de rutes per a un transport més eficient i sostenible.",
    date: "15 de Juliol, 2024",
    author: "Equip de Redacció",
    image: placeholderImages.blog[0],
    href: "#",
  },
  {
    title: "Tendències del Transport Marítim per al 2025",
    summary: "Un anàlisi de les noves tecnologies i regulacions que marcaran el futur del comerç internacional per mar.",
    date: "10 de Juliol, 2024",
    author: "Jordi Martí",
    image: placeholderImages.blog[1],
    href: "#",
  },
  {
    title: "La Importància de la Resiliència a la Cadena de Subministrament",
    summary: "Després dels reptes globals recents, explorem estratègies clau per construir una cadena de subministrament robusta i adaptable.",
    date: "5 de Juliol, 2024",
    author: "Anna Puig",
    image: placeholderImages.blog[2],
    href: "#",
  }
];

export default function BlogPage() {
  return (
    <div className="bg-gray-50/90">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
            Últimes Notícies del Nostre Blog
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Mantén-te informat sobre les últimes tendències, notícies i anàlisis del sector logístic i el comerç internacional.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0 relative h-48 w-full">
                 <Image 
                    src={post.image.src}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.image.hint}
                  />
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{post.date} &middot; {post.author}</p>
                <CardTitle className="mt-2 mb-3 text-xl leading-tight">{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href={post.href}>
                    Llegir Més <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
