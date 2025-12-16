'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Users, Truck, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
  name: string;
  company: string;
  role: 'Administrador' | 'Treballador' | string;
}

const AdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Gestió d'Usuaris</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Panell d'Usuaris</div>
                <p className="text-xs text-muted-foreground">Gestiona rols i permisos.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Seguiment Global</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Tots els Enviaments</div>
                <p className="text-xs text-muted-foreground">Visualitza l'estat de cada enviament.</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Empreses</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Clients Corporatius</div>
                <p className="text-xs text-muted-foreground">Accés a dades de totes les empreses.</p>
            </CardContent>
        </Card>
    </div>
);

const WorkerDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Seguiment d'Enviaments</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Panell de Seguiment</div>
                <p className="text-xs text-muted-foreground">Visualitza tots els enviaments.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Registre d'Incidències</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Nova Incidència</div>
                <p className="text-xs text-muted-foreground">Registra problemes interns.</p>
            </CardContent>
        </Card>
    </div>
);


export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      router.replace('/login');
    } else {
      try {
        const userData = JSON.parse(userString);
        setUser(userData);
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

  if (isLoading || !user) {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="w-full max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-10 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Skeleton className="h-24 w-full" />
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

  const userRole = user.role?.toLowerCase();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="w-full max-w-4xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-4xl font-bold font-headline">Benvingut, {user.name}!</CardTitle>
                            <CardDescription className="text-muted-foreground pt-2">
                                Panell de control per a {user.role}.
                            </CardDescription>
                        </div>
                        <Button onClick={handleSignOut} variant="outline">
                            <LogOut className="mr-2" /> Sortir
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                   {userRole === 'administrador' && <AdminDashboard />}
                   {userRole === 'treballador' && <WorkerDashboard />}
                   {userRole !== 'administrador' && userRole !== 'treballador' && (
                       <p>Rol no reconegut. Contacta amb el suport tècnic.</p>
                   )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
