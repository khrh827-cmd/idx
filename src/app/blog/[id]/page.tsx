import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { notFound } from 'next/navigation';

const blogPosts = [
  {
    id: "0",
    title: "Optimització de la Cadena de Subministrament a l'Era Digital",
    content: `La digitalització no és només una tendència, és una necessitat en el món logístic actual. L'ús de tecnologies com el Big Data, la Intel·ligència Artificial i el Blockchain està permetent a les empreses tenir una visibilitat sense precedents sobre les seves cadenes de subministrament. 
    
    Aquesta visibilitat es tradueix en una presa de decisions més ràpida i encertada, una reducció de costos operatius i, el més important, una millora significativa en l'experiència del client final. En aquest article, explorem com la teva empresa pot començar a implementar aquestes solucions pas a pas.`,
    date: "20 de Juliol, 2024",
    author: "Dr. Logística Digital",
    image: placeholderImages.blog[0],
  },
  {
    id: "1",
    title: "INCOTERMS 2024: Què ha canviat i com t'afecta",
    content: `Els INCOTERMS són les regles internacionals que defineixen les responsabilitats de compradors i venedors en el comerç exterior. Amb l'actualització de 2024, s'han introduït canvis subtils però importants en la gestió de les assegurances i la distribució de costos en els ports.
    
    És vital que qualsevol empresa exportadora o importadora estigui al dia d'aquests canvis per evitar malentesos legals o costos inesperats durant el transport de la mercaderia. Analitzem els punts clau que has de revisar en els teus contractes actuals.`,
    date: "12 de Juliol, 2024",
    author: "Expert en Comerç Exterior",
    image: placeholderImages.blog[1],
  },
  {
    id: "2",
    title: "Sostenibilitat en el Transport de Mercaderies",
    content: `La pressió per reduir l'empremta de carboni mai ha estat tan alta. Les noves regulacions europees i la consciència ambiental dels consumidors estan obligant les empreses de transport a buscar alternatives més ecològiques, com el transport multimodal o l'ús de vehicles elèctrics i d'hidrogen.
    
    En aquest sentit, la logística 'verda' no només ajuda al planeta, sinó que també pot suposar un estalvi energètic considerable i una millora de la imatge corporativa. Descobreix les millors pràctiques per fer el teu transport més sostenible.`,
    date: "1 de Juliol, 2024",
    author: "Consultor Ambiental",
    image: placeholderImages.blog[2],
  }
];

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Tornar al blog
          </Link>
        </Button>

        <article>
          <div className="relative h-[300px] md:h-[450px] w-full mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.image.src}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.image.hint}
            />
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold font-headline text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">T'interessa aquest tema?</h3>
            <p className="text-muted-foreground mb-6">
              Si necessites assessorament personalitzat per a la teva logística internacional, no dubtis a contactar amb el nostre equip d'experts.
            </p>
            <Button asChild variant="cta" size="lg">
              <Link href="/contact">Demanar més informació</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
