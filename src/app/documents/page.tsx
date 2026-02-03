'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Printer, ArrowLeft, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/logo';

// --- Tipus de dades ---
type UserSession = {
  nom_usuari: string;
  empresa: string;
  rol: 'administrador' | 'treballador' | 'client';
};

type DocumentLine = {
  num_factura: string;
  data: string;
  usuari: string;
  fpagament: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  albara: string;
};

type UserData = {
  usuari: string;
  rol: 'administrador' | 'treballador' | 'client';
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
};

type ProcessedInvoice = {
  id: string;
  date: string;
  paymentMethod: string;
  clientData: UserData;
  lines: {
    concept: string;
    unitPrice: number;
    quantity: number;
    discount: number;
    netTotal: number;
    vatRate: number;
  }[];
  subtotal: number;
  vatBreakdown: { [key: number]: { base: number; amount: number } };
  totalVat: number;
  totalAmount: number;
};

// --- Constants ---
const USERS_API_URL = 'https://sheetdb.io/api/v1/pxnx6b606vc93?sheet=usuaris';
const DOCUMENTS_API_URL = 'https://sheetdb.io/api/v1/pxnx6b606vc93?sheet=documents';

// --- Component Principal ---
export default function DocumentsPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [processedInvoices, setProcessedInvoices] = useState<ProcessedInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<ProcessedInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.nom_usuari && parsedUser.rol) {
            setUser(parsedUser);
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        router.push('/login');
      }
    }
  }, [hasMounted, router]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [docsResponse, usersResponse] = await Promise.all([
          fetch(DOCUMENTS_API_URL),
          fetch(USERS_API_URL)
        ]);

        if (!docsResponse.ok || !usersResponse.ok) {
          throw new Error("No s'han pogut carregar les dades. Intenta-ho més tard.");
        }

        const docLines: DocumentLine[] = await docsResponse.json();
        const usersData: UserData[] = await usersResponse.json();

        // Filtrar documents segons el rol de l'usuari
        const accessibleDocs = user.rol === 'administrador' || user.rol === 'treballador'
          ? docLines
          : docLines.filter(doc => doc.usuari === user.nom_usuari);
        
        if (accessibleDocs.length === 0) {
            setProcessedInvoices([]);
            setIsLoading(false);
            return;
        }

        // Processar les factures
        const invoicesMap = new Map<string, DocumentLine[]>();
        for (const line of accessibleDocs) {
          if (!line.num_factura) continue;
          if (!invoicesMap.has(line.num_factura)) {
            invoicesMap.set(line.num_factura, []);
          }
          invoicesMap.get(line.num_factura)!.push(line);
        }

        const finalInvoices: ProcessedInvoice[] = [];
        for (const [invoiceId, lines] of invoicesMap.entries()) {
          const clientUsername = lines[0].usuari;
          const clientData = usersData.find(u => u.usuari === clientUsername);

          if (!clientData) continue; // No es pot processar si no hi ha dades del client

          const rawDate = lines[0].data;
          let safeDateString = rawDate;
          if (rawDate && typeof rawDate === 'string' && rawDate.split('/').length === 3) {
            const [day, month, shortYear] = rawDate.split('/');
            if(day && month && shortYear && !isNaN(parseInt(day)) && !isNaN(parseInt(month)) && !isNaN(parseInt(shortYear))) {
               const fullYear = parseInt(shortYear, 10) < 100 ? `20${shortYear}` : shortYear;
               safeDateString = `${fullYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            }
          }
          
          let subtotal = 0;
          const vatBreakdown: { [key: number]: { base: number; amount: number } } = {};

          const processedLines = lines.map(line => {
            const unitPrice = parseFloat(line.preu_unitari) || 0;
            const quantity = parseInt(line.unitats, 10) || 0;
            const discount = parseFloat(line.dte) || 0;
            const vatRate = parseInt(line.iva, 10) || 0;

            const lineTotal = unitPrice * quantity;
            const discountedTotal = lineTotal * (1 - discount / 100);
            
            subtotal += discountedTotal;
            const vatAmount = discountedTotal * (vatRate / 100);

            if (!vatBreakdown[vatRate]) {
              vatBreakdown[vatRate] = { base: 0, amount: 0 };
            }
            vatBreakdown[vatRate].base += discountedTotal;
            vatBreakdown[vatRate].amount += vatAmount;

            return {
              concept: line.concepte,
              unitPrice,
              quantity,
              discount,
              netTotal: discountedTotal,
              vatRate,
            };
          });

          const totalVat = Object.values(vatBreakdown).reduce((acc, curr) => acc + curr.amount, 0);
          const totalAmount = subtotal + totalVat;

          finalInvoices.push({
            id: invoiceId,
            date: safeDateString,
            paymentMethod: lines[0].fpagament,
            clientData,
            lines: processedLines,
            subtotal,
            vatBreakdown,
            totalVat,
            totalAmount,
          });
        }

        setProcessedInvoices(finalInvoices.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err: any) {
        setError(err.message || "Hi ha hagut un error desconegut.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Data invàlida';
    }
    return date.toLocaleDateString('ca-ES', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
  }
  
  if (!hasMounted || isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Carregant documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
         <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
                <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
                <h2 className="mt-4 text-xl font-semibold">Error en Carregar</h2>
                <p className="mt-2 text-muted-foreground">{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-6" variant="cta">
                    Reintentar
                </Button>
            </CardContent>
         </Card>
      </div>
    );
  }

  // --- Vista de Detall de Factura ---
  if (selectedInvoice) {
    return (
      <div className="bg-muted min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
            <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tornar al llistat
            </Button>
            <Button variant="cta" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir PDF
            </Button>
        </div>
        <div id="zona-factura" className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-md rounded-lg border">
            {/* Header de la factura */}
            <header className="flex justify-between items-start pb-8 border-b">
                <div>
                    <Logo />
                    <p className="mt-4 text-sm text-muted-foreground">
                        Global Cargocare, S.L.<br/>
                        Carrer de la Indústria, 12<br/>
                        Tarragona, Espanya<br/>
                        NIF: B12345678
                    </p>
                </div>
                <div className="text-right">
                    <h1 className="text-3xl font-bold text-primary font-headline">FACTURA</h1>
                    <p className="mt-2 text-muted-foreground">
                        <span className="font-semibold text-foreground">Número:</span> {selectedInvoice.id}
                    </p>
                    <p>
                        <span className="font-semibold text-foreground">Data:</span> {formatDate(selectedInvoice.date)}
                    </p>
                </div>
            </header>

            {/* Dades del Client */}
            <section className="mt-8 grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Facturar a</h2>
                    <p className="font-bold text-lg text-primary">{selectedInvoice.clientData.empresa}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {selectedInvoice.clientData.adreca}<br/>
                        NIF: {selectedInvoice.clientData.fiscalid}<br/>
                        Tel: {selectedInvoice.clientData.telefon}
                    </p>
                </div>
            </section>

            {/* Línies de la factura */}
            <section className="mt-10">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted">
                            <TableHead className="w-1/2">Concepte</TableHead>
                            <TableHead className="text-right">P. Unitari</TableHead>
                            <TableHead className="text-right">Uds.</TableHead>
                            <TableHead className="text-right">Dte.</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedInvoice.lines.map((line, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{line.concept}</TableCell>
                                <TableCell className="text-right">{formatCurrency(line.unitPrice)}</TableCell>
                                <TableCell className="text-right">{line.quantity}</TableCell>
                                <TableCell className="text-right">{line.discount > 0 ? `${line.discount}%` : '-'}</TableCell>
                                <TableCell className="text-right font-medium">{formatCurrency(line.netTotal)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            {/* Totals */}
            <section className="mt-8 flex justify-end">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Base Imposable</span>
                        <span className="font-semibold">{formatCurrency(selectedInvoice.subtotal)}</span>
                    </div>
                    {Object.entries(selectedInvoice.vatBreakdown).map(([rate, values]) => (
                        <div key={rate} className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">IVA ({rate}%)</span>
                            <span className="font-semibold">{formatCurrency(values.amount)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between py-3 text-lg bg-muted -mx-4 px-4 mt-2 rounded">
                        <span className="font-bold text-primary">TOTAL</span>
                        <span className="font-bold text-primary">{formatCurrency(selectedInvoice.totalAmount)}</span>
                    </div>
                </div>
            </section>
            
            {/* Peu de factura */}
            <footer className="mt-12 pt-8 border-t text-xs text-muted-foreground">
                <p><span className='font-semibold'>Forma de pagament:</span> {selectedInvoice.paymentMethod}</p>
                <p className="mt-4">
                    Inscrita al Registre Mercantil de Tarragona, Tom XXX, Foli XXX, Full X-XXXXX.
                </p>
                <p className="mt-2">
                    De conformitat amb el que estableix el Reglament (UE) 2016/679 del Parlament Europeu i del Consell, de 27 d'abril de 2016, l'informem que les seves dades seran tractades sota la responsabilitat de Global Cargocare, S.L. amb la finalitat de gestionar la relació comercial.
                </p>
            </footer>
        </div>
      </div>
    );
  }
  
  // --- Vista de Llistat de Factures ---
  return (
    <div className="bg-muted min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline text-primary">
                Els Meus Documents
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Consulta i gestiona les teves factures.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Llistat de Factures</CardTitle>
                <CardDescription>
                    {processedInvoices.length} factures trobades.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Número</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead className="text-right">Import</TableHead>
                            <TableHead className="text-right">Accions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {processedInvoices.length > 0 ? (
                            processedInvoices.map(invoice => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{formatDate(invoice.date)}</TableCell>
                                    <TableCell>{invoice.clientData.empresa}</TableCell>
                                    <TableCell className="text-right font-semibold">{formatCurrency(invoice.totalAmount)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                                            Veure
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No s'han trobat factures.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
