'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, UserPlus, Home } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClientAreaPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <div className="w-full max-w-md">
           <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </CardContent>
           </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <div className="w-full max-w-md">
            <Card className="text-center shadow-lg">
                <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline">Àrea de Clients</CardTitle>
                <CardDescription className="text-muted-foreground pt-2">
                    Accedeix al teu panell per gestionar els teus enviaments i documents.
                </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                <Button asChild className="w-full" size="lg">
                    <Link href="/login">
                    <LogIn className="mr-2" /> Iniciar sessió
                    </Link>
                </Button>
                <Button asChild variant="outline" className="w-full" size="lg">
                    <Link href="/register">
                    <UserPlus className="mr-2" /> Registrar-se
                    </Link>
                </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
