import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

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
              <Link href={`/blog/${post.id}`} className="flex items-center font-semibold text-primary hover:underline">
                Llegir Més <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
