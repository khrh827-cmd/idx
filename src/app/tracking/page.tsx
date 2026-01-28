'use client';

import * as React from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, AlertCircle, Warehouse, Truck, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type Shipment = {
  tracking_code: string;
  origin: string;
  destination: string;
  eta: string;
  status: 'En magatzem' | 'En trànsit' | 'Lliurat';
  location: string;
};

const API_URL = 'https://sheetdb.io/api/v1/pxnx6b606vc93';

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
      const response = await fetch(`${API_URL}/search?tracking_code=${trackingCode.trim()}`);
      if (!response.ok) {
        throw new Error('No s\'ha pogut connectar amb el servidor. Intenta-ho més tard.');
      }
      const data: Shipment[] = await response.json();
      
      if (data && data.length > 0) {
        setShipment(data[0]);
      } else {
        setError('Codi no trobat.');
      }
    } catch (e) {
        setError('Ha ocorregut un error en fer la cerca.');
        console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const statuses = [
    { name: 'En magatzem', icon: <Warehouse className="w-5 h-5" /> },
    { name: 'En trànsit', icon: <Truck className="w-5 h-5" /> },
    { name: 'Lliurat', icon: <PackageCheck className="w-5 h-5" /> },
  ];

  const currentStatusIndex = shipment ? statuses.findIndex(s => s.name === shipment.status) : -1;

  const getTimeline = () => {
    if (!shipment) return null;

    const activeColor = 
      shipment.status === 'Lliurat' ? 'bg-green-600 border-green-600' : 
      shipment.status === 'En trànsit' ? 'bg-blue-500 border-blue-500' :
      'bg-primary border-primary'; // 'En magatzem'

    const activeLineColor = 
      shipment.status === 'Lliurat' ? 'border-green-600' : 
      shipment.status === 'En trànsit' ? 'border-blue-500' : 
      'border-primary';

    const activeTextColor = 
      shipment.status === 'Lliurat' ? 'text-green-600' : 
      shipment.status === 'En trànsit' ? 'text-blue-500' : 
      'text-primary';

    return (
        <div className="w-full mt-6">
            <h3 className="font-semibold text-lg mb-4">Estat de l'enviament</h3>
            <div className="flex items-center w-full">
                {statuses.map((status, index) => (
                    <React.Fragment key={status.name}>
                        <div className="flex flex-col items-center">
                            <div
                                className={cn(
                                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-500',
                                    index <= currentStatusIndex
                                        ? `${activeColor} text-primary-foreground`
                                        : 'bg-muted border-border text-muted-foreground'
                                )}
                            >
                                {status.icon}
                            </div>
                            <p className={cn(
                                'mt-2 text-xs font-semibold text-center transition-colors duration-500 max-w-20',
                                index <= currentStatusIndex ? activeTextColor : 'text-muted-foreground'
                            )}>{status.name}</p>
                        </div>
                        {index < statuses.length - 1 && (
                            <div className={cn(
                                'flex-auto border-t-2 transition-colors duration-500',
                                index < currentStatusIndex ? activeLineColor : 'border-border'
                            )}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
  };


  return (
    <div className="bg-muted flex-grow py-12 md:py-24">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
            Localitza el teu enviament
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Introdueix el teu codi de seguiment per veure l'estat actual del teu enviament.
          </p>
        </div>

        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Ex: KR-2001"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-grow text-base"
                aria-label="Codi de seguiment"
              />
              <Button onClick={handleSearch} disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Cercar
              </Button>
            </div>
          </CardContent>
        </Card>

        {searched && (
          <div className="w-full max-w-2xl mt-4">
            {isLoading && (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {error && (
              <div className="flex items-center gap-4 p-4 text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}
            {shipment && (
              <Card className="animate-in fade-in-50">
                <CardHeader>
                  <CardTitle>Detalls de l'Enviament</CardTitle>
                  <CardDescription>Codi: {shipment.tracking_code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-6">
                    <div>
                      <p className="text-muted-foreground">Origen</p>
                      <p className="font-semibold">{shipment.origin}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Destinació</p>
                      <p className="font-semibold">{shipment.destination}</p>
                    </div>
                     <div>
                      <p className="text-muted-foreground">Data prevista (ETA)</p>
                      <p className="font-semibold">{shipment.eta}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ubicació actual</p>
                      <p className="font-semibold">{shipment.location}</p>
                    </div>
                  </div>
                  {getTimeline()}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
