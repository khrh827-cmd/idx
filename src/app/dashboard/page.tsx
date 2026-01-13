'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Truck, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useAuth, useDoc, useMemoFirebase } from '@/firebase';
import { doc, getFirestore } from 'firebase/firestore';

const UserDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Els Meus Enviaments</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Panell d'Enviaments</div>
                <p className="text-xs text-muted-foreground">Consulta l'estat dels teus enviaments.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Els Meus Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Gestió Documental</div>
                <p className="text-xs text-muted-foreground">Accedeix a les teves factures i CMRs.</p>
            </CardContent>
        </Card>
    </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  
  const firestore = auth ? getFirestore(auth.app) : null;

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<{firstName: string}>(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = async () => {
    if (auth) {
        await auth.signOut();
    }
    router.push('/login');
  };

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading || !userProfile) {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="w-full max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-10 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <div className="flex justify-end">
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="w-full max-w-4xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-4xl font-bold font-headline">Benvingut, {userProfile?.firstName || ''}!</CardTitle>
                            <CardDescription className="text-muted-foreground pt-2">
                                Panell de control del client.
                            </CardDescription>
                        </div>
                        <Button onClick={handleSignOut} variant="outline">
                            <LogOut className="mr-2" /> Sortir
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                   <UserDashboard />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
