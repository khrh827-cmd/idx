
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-50/50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <article className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={post.imageUrl}
                alt={post.title}
                data-ai-hint={post.imageHint}
                fill
                className="object-cover"
                priority
              />
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-primary">
                {post.title}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-4 text-md text-gray-500 pt-4">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" /> {post.author}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
           <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/blog">Tornar al Blog</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
