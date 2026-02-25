'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Package, MapPin, Info, CheckCircle2, Clock, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Tipus de dades ---
type BookingRequest = {
  id: string;
  data: string;
  usuari: string;
  estat: 'Pendent' | 'Aprovat' | 'Rebutjat';
  detalls: string;
};

type LocalUser = {
  nom_usuari: string;
  usuari: string;
  empresa: string;
  rol: string;
};

const API_URL = 'https://sheetdb.io/api/v1/pxnx6b606vc93?sheet=solicituds';

export default function BookingPage() {
  const router = useRouter();
  const [user, setUser] = useState<LocalUser | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Estats del formulari
  const [servei, setServei] = useState('Transport Marítim');
  const [origen, setOrigen] = useState('');
  const [desti, setDesti] = useState('');
  const [carrega, setCarrega] = useState('');
  
  // Estats de l'aplicació
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Verificar sessió
  useEffect(() => {
    if (hasMounted) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push('/login');
      }
    }
  }, [hasMounted, router]);

  // Carregar històric
  const fetchMyRequests = async (username: string) => {
    setIsFetching(true);
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) throw new Error('Error al carregar les sol·licituds');
      const data: BookingRequest[] = await response.json();
      // Filtrar per usuari actual
      const filtered = data.filter(req => req.usuari === username);
      setRequests(filtered.reverse()); // Les més recents primer
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user?.usuari) {
      fetchMyRequests(user.usuari);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    setError(null);

    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('ca-ES');
    
    // Concatenació de detalls segons format requerit
    const detallsConcatenats = `Servei: ${servei} | Origen: ${origen} | Destí: ${desti} | Càrrega: ${carrega}`;

    const newRequest = {
      id: bookingId,
      data: today,
      usuari: user.usuari,
      estat: 'Pendent',
      detalls: detallsConcatenats
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [newRequest] })
      });

      if (response.ok) {
        // Reset formulari
        setOrigen('');
        setDesti('');
        setCarrega('');
        // Refresh llista
        fetchMyRequests(user.usuari);
      } else {
        throw new Error('No s\'ha pogut enviar la sol·licitud');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasMounted || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-muted min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline text-primary">Gestió de Comandes</h1>
          <p className="text-muted-foreground mt-2 text-lg">Reserva el teu transport i segueix les teves sol·licituds.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FORMULARI */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  Nova Sol·licitud
                </CardTitle>
                <CardDescription>Omple les dades per rebre una cotització.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="servei">Tipus de Servei</Label>
                    <select
                      id="servei"
                      value={servei}
                      onChange={(e) => setServei(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option>Transport Marítim</option>
                      <option>Transport Aeri</option>
                      <option>Transport Terrestre</option>
                      <option>Magatzem</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="origen">Origen</Label>
                    <Input 
                      id="origen" 
                      placeholder="Ex: Port de Barcelona" 
                      value={origen} 
                      onChange={(e) => setOrigen(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desti">Destí</Label>
                    <Input 
                      id="desti" 
                      placeholder="Ex: Shanghai, Xina" 
                      value={desti} 
                      onChange={(e) => setDesti(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carrega">Descripció de la Càrrega</Label>
                    <Input 
                      id="carrega" 
                      placeholder="Pes, mides, tipus de mercaderia..." 
                      value={carrega} 
                      onChange={(e) => setCarrega(e.target.value)}
                      required 
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" variant="cta" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar Sol·licitud'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          {/* LLISTAT HISTÒRIC */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Les meves sol·licituds
            </h2>

            {isFetching ? (
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : requests.length > 0 ? (
              <div className="grid gap-4">
                {requests.map((req) => (
                  <Card key={req.id} className="overflow-hidden border-l-4 transition-shadow hover:shadow-md" style={{ borderLeftColor: req.estat === 'Aprovat' ? '#22c55e' : req.estat === 'Pendent' ? '#eab308' : '#ef4444' }}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-bold">{req.id}</CardTitle>
                          <p className="text-xs text-muted-foreground">{req.data}</p>
                        </div>
                        <div className={cn(
                          "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                          req.estat === 'Pendent' ? "bg-yellow-100 text-yellow-700" :
                          req.estat === 'Aprovat' ? "bg-green-100 text-green-700" :
                          "bg-red-100 text-red-700"
                        )}>
                          {req.estat}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg">
                        <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm leading-relaxed">{req.detalls}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">Encara no has realitzat cap sol·licitud.</p>
              </Card>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
