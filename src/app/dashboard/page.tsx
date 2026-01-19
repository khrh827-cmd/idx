'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, LogOut, Loader2, Truck, PlusCircle, BarChart, Users as UsersIcon } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';

type LocalUser = {
  nom_usuari: string;
  empresa: string;
  rol: 'administrador' | 'treballador';
};

type Shipment = {
  tracking_code: string;
  client: string;
  origin: string;
  destination: string;
  status: 'En magatzem' | 'En trànsit' | 'Lliurat';
};

const SHIPMENTS_API_URL = 'https://sheetdb.io/api/v1/2kd07izw1k26k';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [showShipments, setShowShipments] = useState(false);
  const [isFetchingShipments, setIsFetchingShipments] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
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
    window.dispatchEvent(new Event('userChanged')); 
    router.push('/login');
  };

  const handleFetchShipments = async () => {
    if (showShipments) {
        setShowShipments(false);
        setShipments([]);
        return;
    }

    setIsFetchingShipments(true);
    let url = SHIPMENTS_API_URL;
    if (user?.rol === 'treballador') {
        url = `${SHIPMENTS_API_URL}/search?client=${user.empresa}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en obtenir els enviaments');
        }
        const data: Shipment[] = await response.json();
        setShipments(data);
        setShowShipments(true);
    } catch (error) {
        console.error("Failed to fetch shipments:", error);
    } finally {
        setIsFetchingShipments(false);
    }
  };


  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Gestionar Usuaris</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Usuaris</div>
                <p className="text-xs text-muted-foreground">Administrar treballadors</p>
            </CardContent>
        </Card>
        <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={!isFetchingShipments ? handleFetchShipments : undefined}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tots els Enviaments</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 <div className="text-2xl font-bold">
                    {isFetchingShipments ? <Loader2 className="h-6 w-6 animate-spin" /> : (showShipments ? 'Ocultar Llista' : 'Veure Llista')}
                </div>
                <p className="text-xs text-muted-foreground">Consultar tots els paquets</p>
            </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Gestionar Empreses</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Empreses</div>
                <p className="text-xs text-muted-foreground">Administrar empreses clients</p>
            </CardContent>
        </Card>
    </div>
  );

  const renderTreballadorDashboard = () => (
     <div className='flex flex-col items-center gap-6'>
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle>El Teu Perfil de Treballador</CardTitle>
                <CardDescription>Aquestes són les teves dades i els teus enviaments assignats.</CardDescription>
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
                    <p className="text-sm text-muted-foreground">Empresa Assignada</p>
                    <p className="font-semibold">{user.empresa}</p>
                </div>
                </div>
            </CardContent>
            <CardFooter className='flex-col gap-4'>
                 <Button onClick={handleFetchShipments} disabled={isFetchingShipments} className='w-full'>
                    {isFetchingShipments && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {showShipments ? 'Ocultar els meus enviaments' : 'Veure els meus enviaments'}
                </Button>
                <Button onClick={handleLogout} variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Tancar Sessió
                </Button>
            </CardFooter>
        </Card>
     </div>
  );

  return (
    <div className="bg-gray-50/90 flex-grow py-12 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center gap-8">
            <div className="text-center w-full">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
                    Panell de Control
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Benvingut, {user.nom_usuari}. Rol: {user.rol}
                </p>
            </div>
            
            <div className="w-full max-w-4xl">
              {user.rol === 'administrador' ? renderAdminDashboard() : renderTreballadorDashboard()}
            </div>

            {showShipments && (
                <div className="w-full max-w-4xl mt-8 animate-in fade-in-50">
                    <Card>
                        <CardHeader>
                            <CardTitle>Llista d'Enviaments</CardTitle>
                            <CardDescription>
                                {user.rol === 'administrador' 
                                    ? "Aquí es mostren tots els enviaments registrats."
                                    : `Enviaments per a l'empresa: ${user.empresa}`
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tracking ID</TableHead>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Origen</TableHead>
                                        <TableHead>Destí</TableHead>
                                        <TableHead>Estat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {shipments.length > 0 ? shipments.map((shipment) => (
                                        <TableRow key={shipment.tracking_code}>
                                            <TableCell className="font-medium">{shipment.tracking_code}</TableCell>
                                            <TableCell>{shipment.client}</TableCell>
                                            <TableCell>{shipment.origin}</TableCell>
                                            <TableCell>{shipment.destination}</TableCell>
                                            <TableCell>
                                                <span className={cn(
                                                    'font-semibold',
                                                    shipment.status === 'Lliurat' && 'text-green-600',
                                                    shipment.status === 'En trànsit' && 'text-blue-600',
                                                )}>
                                                    {shipment.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">No s'han trobat enviaments.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
      </div>
    </div>
  );
}
