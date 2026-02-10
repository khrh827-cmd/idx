import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';
import { ChevronRight } from "lucide-react";

const blogPosts = [
  {
    title: "Optimització de la Cadena de Subministrament a l'Era Digital",
    summary: "Descobreix com la digitalització està transformant la logística i com la teva empresa pot aprofitar-ho.",
    date: "20 de Juliol, 2024",
    author: "Dr. Logística Digital",
    image: placeholderImages.blog[0],
    href: "#",
  },
  {
    title: "INCOTERMS 2024: Què ha canviat i com t'afecta",
    summary: "Anàlisi detallada de les últimes actualitzacions dels INCOTERMS i el seu impacte en el comerç internacional.",
    date: "12 de Juliol, 2024",
    author: "Expert en Comerç Exterior",
    image: placeholderImages.blog[1],
    href: "#",
  },
  {
    title: "Sostenibilitat en el Transport de Mercaderies",
    summary: "Explorem estratègies i tecnologies per a un transport de mercaderies més ecològic i sostenible.",
    date: "1 de Juliol, 2024",
    author: "Consultor Ambiental",
    image: placeholderImages.blog[2],
    href: "#",
  }
];

export default function BlogPage() {
  return (
    <div className="bg-muted">
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
            <Card key={post.title} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-md">
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
