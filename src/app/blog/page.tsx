import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

const blogPosts = [
  {
    title: "Optimizació de Rutes: El Futur de la Logística",
    summary: "Descobreix com la intel·ligència artificial està revolucionant la planificació de rutes per a un transport més eficient i sostenible.",
    date: "15 de Juliol, 2024",
    image: placeholderImages.blog[0]
  },
  {
    title: "Tendències del Transport Marítim per al 2025",
    summary: "Un anàlisi de les noves tecnologies i regulacions que marcaran el futur del comerç internacional per mar.",
    date: "10 de Juliol, 2024",
    image: placeholderImages.blog[1]
  },
  {
    title: "La Importància de la Resiliència a la Cadena de Subministrament",
    summary: "Després dels reptes globals recents, explorem estratègies clau per construir una cadena de subministrament robusta i adaptable.",
    date: "5 de Juliol, 2024",
    image: placeholderImages.blog[2]
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
            <Card key={post.title} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                 <Image 
                    src={post.image.src}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover"
                    data-ai-hint={post.image.hint}
                  />
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="mb-2 text-xl">{post.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{post.summary}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <p className="text-xs text-gray-500">{post.date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
