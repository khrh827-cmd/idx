import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Shipment } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

const mockShipments: Shipment[] = [
  {
    id: 'GLP987654321',
    origin: 'New York, USA',
    destination: 'London, UK',
    status: 'Delivered',
    date: '2024-07-28',
  },
  {
    id: 'GLP123456789',
    origin: 'Shanghai, China',
    destination: 'Rotterdam, NL',
    status: 'In Transit',
    date: '2024-07-15',
  },
  {
    id: 'GLP246813579',
    origin: 'Santos, Brazil',
    destination: 'Singapore',
    status: 'Processing',
    date: '2024-08-05',
  },
  {
    id: 'GLP112233445',
    origin: 'Los Angeles, USA',
    destination: 'Tokyo, Japan',
    status: 'Delivered',
    date: '2024-07-20',
  },
  {
    id: 'GLP556677889',
    origin: 'Hamburg, Germany',
    destination: 'Dubai, UAE',
    status: 'Cancelled',
    date: '2024-08-01',
  },
    {
    id: 'GLP789012345',
    origin: 'Antwerp, Belgium',
    destination: 'Cape Town, SA',
    status: 'In Transit',
    date: '2024-08-03',
  },
];

const statusStyles = {
    Delivered: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    'In Transit': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    Processing: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    Cancelled: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
};


export default function ShipmentHistory() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Your Shipments</CardTitle>
            <CardDescription>A list of your recent shipments.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                    <TableCell className="font-medium text-primary">{shipment.id}</TableCell>
                    <TableCell>{shipment.origin}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>{shipment.date}</TableCell>
                    <TableCell>
                        <Badge variant="outline" className={cn('font-semibold', statusStyles[shipment.status])}>
                            {shipment.status}
                        </Badge>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
