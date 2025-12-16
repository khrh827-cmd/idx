'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      router.replace('/login');
    } else {
      try {
        const user = JSON.parse(userString);
        setUserName(user.name);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        localStorage.removeItem('user');
        router.replace('/login');
      }
    }
    setIsLoading(false);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading || !userName) {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-10 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                        <Skeleton className="h-10 w-32" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <div className="w-full max-w-2xl">
            <Card className="text-center shadow-lg">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold font-headline">Benvingut a la teva zona privada, {userName}!</CardTitle>
                    <CardDescription className="text-muted-foreground pt-2">
                        Aquí podràs gestionar els teus enviaments i documents.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-8">
                    <Button onClick={handleSignOut} variant="outline">
                        <LogOut className="mr-2" /> Sortir
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
