'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Package, MapPin, Info, Clock, PlusCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type BookingRequest = {
  id: string;
  data: string;
  usuari: string;
  estat: string;
  detalls: string;
};

type LocalUser = {
  nom_usuari: string;
  usuari: string;
  empresa: string;
  rol: string;
};

const API_BASE_URL = 'https://sheetdb.io/api/v1/pxnx6b606vc93';
const SHEET_NAME = 'solicituds';

export default function BookingPage() {
  const router = useRouter();
  const [user, setUser] = useState<LocalUser | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  
  const [servei, setServei] = useState('Transport Marítim');
  const [origen, setOrigen] = useState('');
  const [desti, setDesti] = useState('');
  const [carrega, setCarrega] = useState('');
  
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [hasMounted, router]);

  const fetchMyRequests = async (username: string) => {
    setIsFetching(true);
    try {
      const response = await fetch(`${API_BASE_URL}?sheet=${SHEET_NAME}`);
      if (!response.ok) throw new Error('Error al carregar les sol·licituds');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const filtered = data.filter((req: any) => req.usuari === username);
        setRequests(filtered.reverse());
      }
    } catch (err) {
      console.error("Error obtenint dades:", err);
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

    const bookingId = `BK-${Math.floor(100000000 + Math.random() * 900000000)}`;
    const today = new Date().toLocaleDateString('ca-ES');
    
    let detallsConcatenats = '';
    if (servei === 'Magatzem') {
      detallsConcatenats = `Servei: Magatzem | Ubicació: Polígon de Constantí, Espanya | Càrrega: ${carrega}`;
    } else {
      detallsConcatenats = `Servei: ${servei} | Origen: ${origen} | Destí: ${desti} | Càrrega: ${carrega}`;
    }

    const newRequest = {
      id: bookingId,
      data: today,
      usuari: user.usuari,
      estat: 'Pendent',
      detalls: detallsConcatenats
    };

    try {
      const response = await fetch(`${API_BASE_URL}?sheet=${SHEET_NAME}`, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: [newRequest] })
      });

      if (!response.ok) {
        throw new Error(`Error de servidor (${response.status})`);
      }

      setOrigen('');
      setDesti('');
      setCarrega('');
      await fetchMyRequests(user.usuari);
      
    } catch (err: any) {
      console.error("Error en l'enviament:", err);
      setError("No s'ha pogut enviar la sol·licitud. Revisa la connexió o les columnes de l'Excel.");
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

  const isWarehouse = servei === 'Magatzem';

  // Funció millorada per determinar el color de l'estat
  const getStatusConfig = (status: string) => {
    const s = status.toLowerCase();
    // Afegim 'acceptat' i 'acceptada' a la llista de color verd
    if (s.includes('aprovat') || s.includes('acceptat') || s.includes('acceptada') || s.includes('finalitzat') || s.includes('lliurat')) {
      return { 
        color: '#22c55e', 
        classes: 'bg-green-100 text-green-700 border-green-200' 
      };
    }
    if (s.includes('pendent')) {
      return { 
        color: '#eab308', 
        classes: 'bg-yellow-100 text-yellow-700 border-yellow-200' 
      };
    }
    return { 
      color: '#ef4444', 
      classes: 'bg-red-100 text-red-700 border-red-200' 
    };
  };

  return (
    <div className="bg-muted min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold font-headline text-primary">Gestió de Comandes</h1>
          <p className="text-muted-foreground mt-2 text-lg">Reserva el teu transport i segueix les teves sol·licituds en temps real.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-md border-t-4 border-t-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <PlusCircle className="h-5 w-5 text-accent" />
                  Nova Sol·licitud
                </CardTitle>
                <CardDescription>
                  {isWarehouse 
                    ? "Reserva espai al nostre magatzem de Constantí." 
                    : "Introdueix les dades per rebre una cotització de transport."
                  }
                </CardDescription>
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

                  {!isWarehouse ? (
                    <>
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Label htmlFor="origen">Origen</Label>
                        <Input 
                          id="origen" 
                          placeholder="Ex: Port de Barcelona" 
                          value={origen} 
                          onChange={(e) => setOrigen(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Label htmlFor="desti">Destí</Label>
                        <Input 
                          id="desti" 
                          placeholder="Ex: Shanghai, Xina" 
                          value={desti} 
                          onChange={(e) => setDesti(e.target.value)}
                          required 
                        />
                      </div>
                    </>
                  ) : (
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex flex-col gap-2 animate-in fade-in zoom-in-95">
                      <div className="flex items-center gap-2 text-primary">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">Ubicació</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Magatzem: Polígon de Constantí, Tarragona (Espanya)
                      </p>
                    </div>
                  )}

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
                  {error && (
                    <div className="w-full flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg animate-in shake">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full" variant="cta" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar Sol·licitud'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Històric de Sol·licituds
            </h2>

            {isFetching ? (
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : requests.length > 0 ? (
              <div className="grid gap-4">
                {requests.map((req) => {
                  const statusConfig = getStatusConfig(req.estat);
                  return (
                    <Card key={req.id} className="overflow-hidden border-l-4 transition-shadow hover:shadow-md bg-background" style={{ borderLeftColor: statusConfig.color }}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg font-bold text-primary">{req.id}</CardTitle>
                            <p className="text-xs text-muted-foreground">{req.data}</p>
                          </div>
                          <div className={cn(
                            "px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest",
                            statusConfig.classes
                          )}>
                            {req.estat}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border">
                          <Info className="h-5 w-5 text-primary/50 flex-shrink-0 mt-0.5" />
                          <p className="text-sm leading-relaxed text-foreground/80">{req.detalls}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center bg-background/50 border-dashed">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">Encara no has realitzat cap sol·licitud de comanda.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}