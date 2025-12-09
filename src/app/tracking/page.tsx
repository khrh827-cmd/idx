
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Shipment } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

async function getTrackingData(): Promise<Shipment[]> {
  try {
    const res = await fetch('https://sheetdb.io/api/v1/ycafzp3o2dxfp');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: Shipment[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    // Return empty array in case of error to avoid crashing the page
    return [];
  }
}

function getStatusVariant(status: string) {
    if (!status) {
        return 'secondary';
    }
    switch (status.toLowerCase()) {
        case 'entregat':
            return 'default';
        case 'en trànsit':
            return 'secondary';
        case 'en espera':
            return 'outline';
        case 'incidència':
            return 'destructive';
        default:
            return 'secondary';
    }
}


export default async function TrackingPage() {
  const shipments = await getTrackingData();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-800">Seguiment d'Enviaments</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Consulta l'estat actual dels teus enviaments en temps real.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Informació de Seguiment</CardTitle>
            <CardDescription>Llistat d'enviaments actius i el seu estat.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Tracking Code</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Origen</TableHead>
                    <TableHead>Destinació</TableHead>
                    <TableHead>Estat</TableHead>
                    <TableHead>Ubicació Actual</TableHead>
                    <TableHead>Entrega Estimada</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {shipments.length > 0 ? (
                    shipments.map((shipment) => (
                    <TableRow key={shipment.tracking_code}>
                        <TableCell className="font-medium">{shipment.tracking_code}</TableCell>
                        <TableCell>{shipment.client}</TableCell>
                        <TableCell>{shipment.origin}</TableCell>
                        <TableCell>{shipment.destination}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(shipment.status)}>{shipment.status || 'N/A'}</Badge>
                        </TableCell>
                        <TableCell>{shipment.location}</TableCell>
                        <TableCell>{shipment.eta}</TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center">
                            No s'han trobat dades de seguiment o hi ha hagut un error en carregar-les.
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
