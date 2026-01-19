'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, LogOut, Loader2 } from 'lucide-react';

type LocalUser = {
  nom_usuari: string;
  empresa: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push('/login');
      }
    } catch (error) {
        console.error("Could not parse user from local storage", error);
        router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged')); // Notify header to update
    router.push('/');
  };

  if (isLoading || !user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50/90 flex-grow py-12 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center gap-8">
            <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
                Panell de Client
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Benvingut de nou, {user.nom_usuari}.
            </p>
            </div>

            <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle>La teva Informació</CardTitle>
                <CardDescription>Aquestes són les teves dades d'usuari.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                    <p className="text-sm text-muted-foreground">Nom d'usuari</p>
                    <p className="font-semibold">{user.nom_usuari}</p>
                </div>
                </div>
                <div className="flex items-center gap-4">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                    <p className="text-sm text-muted-foreground">Empresa</p>
                    <p className="font-semibold">{user.empresa}</p>
                </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogout} variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Tancar Sessió
                </Button>
            </CardFooter>
            </Card>
      </div>
    </div>
  );
}
