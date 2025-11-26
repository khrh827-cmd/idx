import ShipmentHistory from '@/components/shipment-history';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-headline">Shipment History</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/quote">
                New Shipment <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>
      <ShipmentHistory />
    </div>
  );
}
