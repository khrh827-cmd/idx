import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Optimització de la Cadena de Subministrament a l\'Era Digital',
    description: 'Descobreix com la tecnologia està transformant la logística i com la teva empresa se\'n pot beneficiar.',
    date: '15 de Juliol, 2024',
    author: 'Equip Global Cargocare',
    imageUrl: 'https://picsum.photos/seed/warehouse-automation/800/600',
    imageHint: 'warehouse automation',
  },
  {
    id: 2,
    title: 'INCOTERMS 2024: Què ha canviat i com t\'afecta',
    description: 'Una guia completa sobre les últimes actualitzacions dels termes comercials internacionals i el seu impacte.',
    date: '01 de Juliol, 2024',
    author: 'Expert Logístic',
    imageUrl: 'https://watermark.lovepik.com/photo/20211202/large/lovepik-yangshan-deepwater-port-automated-container-picture_501398411.jpg',
    imageHint: 'container port',
  },
  {
    id: 3,
    title: 'Sostenibilitat en el Transport de Mercaderies',
    description: 'Explorem les iniciatives i pràctiques per a una logística més verda i responsable.',
    date: '20 de Juny, 2024',
    author: 'Equip Global Cargocare',
    imageUrl: 'https://picsum.photos/seed/electric-truck/800/600',
    imageHint: 'electric truck',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-800">El Nostre Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Notícies, anàlisis i tendències del sector de la logística i el transport internacional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-56 w-full">
              <Image
                src={post.imageUrl}
                alt={post.title}
                data-ai-hint={post.imageHint}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">{post.title}</CardTitle>
              <CardDescription className="text-xs text-gray-500 pt-1">
                {post.date} - per {post.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600 text-sm">{post.description}</p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="flex items-center font-semibold text-primary hover:underline">
                Llegir Més <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
