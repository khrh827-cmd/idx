'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, LogOut, Loader2, Truck, Briefcase, Users as UsersIcon, FileText } from 'lucide-react';
import Link from 'next/link';
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
  const [hasMounted, setHasMounted] = useState(false);
  
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [showShipments, setShowShipments] = useState(false);
  const [isFetchingShipments, setIsFetchingShipments] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object' && 'nom_usuari' in parsedUser && 'rol' in parsedUser) {
            setUser(parsedUser as LocalUser);
          } else {
            localStorage.removeItem('user');
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
          console.error("Could not parse user from local storage", error);
          localStorage.removeItem('user');
          router.push('/login');
      }
    }
  }, [hasMounted, router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged')); 
    router.push('/login');
  };

  const handleFetchShipments = async () => {
    if (showShipments) {
        setShowShipments(false);
        return;
    }

    setIsFetchingShipments(true);
    let url = SHIPMENTS_API_URL;
    if (user?.rol === 'treballador' && user.empresa) {
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


  if (!hasMounted || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer transition-shadow hover:shadow-md">
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
            className="cursor-pointer transition-shadow hover:shadow-md"
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
        <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Gestionar Empreses</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Empreses</div>
                <p className="text-xs text-muted-foreground">Administrar empreses clients</p>
            </CardContent>
        </Card>
        <Link href="/documents" passHref>
            <Card className="cursor-pointer transition-shadow hover:shadow-md h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Documents</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Facturació</div>
                    <p className="text-xs text-muted-foreground">Consultar factures i albarans</p>
                </CardContent>
            </Card>
        </Link>
    </div>
  );

  const renderTreballadorDashboard = () => (
     <div className='flex justify-center'>
        <Card className="w-full max-w-2xl bg-card shadow-sm">
            <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                    <User className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-xl font-semibold text-card-foreground">El Teu Perfil</h3>
                </div>

                <div className="pl-10">
                    <span className="text-muted-foreground">Rol: </span>
                    <span className="font-semibold text-primary">{user.rol}</span>
                </div>
                
                <div className="border-t my-6" />

                <div className="flex items-center gap-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-card-foreground">Panell de Treballador</h3>
                </div>

                <p className="pl-10 text-muted-foreground">
                    Aquí pots veure les teves tasques, enviaments i documents assignats.
                </p>

                 <div className='pt-2 pl-10 flex flex-wrap gap-4'>
                     <Button onClick={handleFetchShipments} disabled={isFetchingShipments} variant="outline">
                        {isFetchingShipments && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {showShipments ? 'Ocultar els meus enviaments' : 'Veure els meus enviaments'}
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/documents">
                            <FileText className="mr-2 h-4 w-4" />
                            Veure Documents
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
     </div>
  );

  return (
    <div className="bg-muted flex-grow py-12 md:py-24">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                        Benvingut, {user.nom_usuari}
                    </h1>
                    <p className="mt-1 text-lg text-muted-foreground">
                        Aquesta és la teva zona privada.
                    </p>
                </div>
                <Button onClick={handleLogout} variant="outline">
                    <LogOut className="mr-2 h-4 w-4" /> Sortir
                </Button>
            </div>
            
            <div className="w-full">
              {user.rol === 'administrador' ? renderAdminDashboard() : renderTreballadorDashboard()}
            </div>

            {showShipments && (
                <div className="w-full max-w-4xl mt-8 mx-auto animate-in fade-in-50">
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
