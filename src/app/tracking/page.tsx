'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, PackageCheck, PackageSearch, Rocket, Warehouse } from 'lucide-react';
import type { Shipment } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!trackingCode.trim()) {
      setError('Si us plau, introdueix un codi de seguiment.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipment(null);
    setSearched(true);

    try {
      const res = await fetch(`https://sheetdb.io/api/v1/2kd07izw1k26k/search?tracking_code=${trackingCode}`);
      if (!res.ok) {
        throw new Error("No s'ha pogut contactar amb el servidor de seguiment.");
      }
      const data: Shipment[] = await res.json();
      if (data.length > 0) {
        setShipment(data[0]);
      } else {
        setError('Codi no trobat. Verifica el codi i torna a intentar-ho.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocorregut un error inesperat.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusDetails = (status: string | undefined) => {
    if (!status) return { progress: 0, color: 'bg-gray-400', label: 'Desconegut', icon: <PackageSearch className="h-5 w-5" /> };

    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes('entregat') || lowerStatus.includes('lliurat')) {
      return { progress: 100, color: 'bg-green-600', label: 'Lliurat', icon: <PackageCheck className="h-5 w-5 text-green-600" /> };
    }
    if (lowerStatus.includes('en trànsit')) {
      return { progress: 50, color: 'bg-blue-600', label: 'En Trànsit', icon: <Rocket className="h-5 w-5 text-blue-600" /> };
    }
    if (lowerStatus.includes('en magatzem') || lowerStatus.includes('en espera')) {
      return { progress: 10, color: 'bg-yellow-500', label: 'En Magatzem', icon: <Warehouse className="h-5 w-5 text-yellow-500" /> };
    }
    return { progress: 5, color: 'bg-gray-400', label: status, icon: <PackageSearch className="h-5 w-5" /> };
  };

  const { progress, color, label: statusLabel, icon: statusIcon } = getStatusDetails(shipment?.status);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-gray-800">Localitza el teu enviament</CardTitle>
            <CardDescription className="pt-2">Introdueix el codi de seguiment per veure l'estat actual.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ex: GCC-12345XYZ"
                className="flex-grow text-center sm:text-left"
              />
              <Button onClick={handleSearch} disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? 'Cercant...' : 'Cercar'}
              </Button>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {isLoading && (
            <Card className="mt-8 shadow-lg">
                <CardHeader>
                   <Skeleton className="h-6 w-1/2 mb-2" />
                   <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="pt-4 space-y-6">
                    <Skeleton className="h-8 w-full" />
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                         <Skeleton className="h-12 w-full" />
                    </div>
                </CardContent>
            </Card>
        )}

        {shipment && !isLoading && (
          <Card className="mt-8 shadow-lg animate-in fade-in-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Resultat del Seguiment</span>
                <span className="text-sm font-mono bg-muted text-muted-foreground px-2 py-1 rounded-md">{shipment.tracking_code}</span>
              </CardTitle>
               <CardDescription>Informació detallada del teu enviament.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                        {statusIcon}
                        <span>Estat actual</span>
                    </div>
                    <span className="font-bold text-primary">{statusLabel}</span>
                </div>
                <Progress value={progress} className={cn("h-3", color)} />
                 <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Recollit</span>
                    <span>En trànsit</span>
                    <span>Lliurat</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-semibold text-gray-800">Origen</p>
                  <p className="text-gray-600">{shipment.origin || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-semibold text-gray-800">Destinació</p>
                  <p className="text-gray-600">{shipment.destination || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-semibold text-gray-800">Ubicació Actual</p>
                  <p className="text-gray-600">{shipment.location || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-semibold text-gray-800">Data Prevista (ETA)</p>
                  <p className="text-gray-600">{shipment.eta || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!shipment && !isLoading && !error && searched && (
            <div className="text-center mt-8 text-muted-foreground">
                <PackageSearch className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4">No s'ha trobat cap enviament amb aquest codi.</p>
            </div>
        )}
      </div>
    </div>
  );
}
