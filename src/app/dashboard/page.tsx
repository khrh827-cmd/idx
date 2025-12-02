'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ListOrdered, PlusCircle, LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/client-area');
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (isUserLoading || !user) {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex justify-between items-center mb-8">
                <Skeleton className="h-10 w-1/4" />
                <Skeleton className="h-10 w-24" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/2 mb-2" />
                            <Skeleton className="h-4 w-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-20 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-4xl font-bold font-headline text-gray-800">Panell de Client</h1>
            <p className="mt-2 text-lg text-muted-foreground">
            Benvingut/da, {user.displayName || user.email}!
            </p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Tancar Sessió
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
                <ListOrdered className="h-8 w-8 text-primary" />
                <CardTitle>Estat de les Comandes</CardTitle>
            </div>
            <CardDescription className="pt-2">Fes el seguiment dels teus enviaments en temps real.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Actualment no hi ha comandes actives per mostrar.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <CardTitle>Els Meus Documents</CardTitle>
            </div>
            <CardDescription className="pt-2">Accedeix a CMRs, Bill of Lading i factures.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No tens documents disponibles en aquest moment.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-4">
                <PlusCircle className="h-8 w-8 text-primary" />
                <CardTitle>Nova Cotització</CardTitle>
            </div>
            <CardDescription className="pt-2">Sol·licita un pressupost per a un nou enviament.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/contact')}>
              Sol·licitar Cotització
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
