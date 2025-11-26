'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PackageCheck, Package, Ship, Truck, CircleDotDashed } from 'lucide-react';

const TrackingEvent = ({ icon, title, date, description, isLast = false, isActive = false }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        {icon}
      </div>
      {!isLast && <div className="w-0.5 flex-grow bg-border my-2" />}
    </div>
    <div className={`pb-8 pt-1 ${isLast ? '' : 'border-b'}`}>
      <p className={`font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</p>
      <p className="text-sm text-muted-foreground">{date}</p>
      <p className="text-sm mt-1">{description}</p>
    </div>
  </div>
);

const trackingData = {
  'GLP123456789': {
    summary: {
      id: 'GLP123456789',
      status: 'In Transit',
      origin: 'Shanghai, China',
      destination: 'Rotterdam, Netherlands',
      estimatedDelivery: '2024-08-15',
    },
    events: [
      {
        icon: <PackageCheck className="h-6 w-6" />,
        title: 'Delivered',
        date: '',
        description: 'Your shipment has been delivered.',
        active: false,
      },
      {
        icon: <Truck className="h-6 w-6" />,
        title: 'Out for Delivery',
        date: '',
        description: 'The shipment is on its way to the final destination.',
        active: false,
      },
      {
        icon: <Package className="h-6 w-6" />,
        title: 'Arrived at Destination Port',
        date: '2024-08-10',
        description: 'Unloaded and cleared customs at Rotterdam Port.',
        active: true,
      },
      {
        icon: <Ship className="h-6 w-6" />,
        title: 'In Transit - At Sea',
        date: '2024-07-20',
        description: 'The vessel has left the port of Shanghai.',
        active: true,
      },
      {
        icon: <CircleDotDashed className="h-6 w-6" />,
        title: 'Order Processed',
        date: '2024-07-15',
        description: 'Shipment information received and is ready for transport.',
        active: true,
      },
    ],
  },
};

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId) {
      setError('Please enter a tracking ID.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const data = trackingData[trackingId.toUpperCase()];
      if (data) {
        setResult(data);
      } else {
        setError('Tracking ID not found. Please try again. (Hint: use GLP123456789)');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Track Your Shipment</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter your tracking ID to get real-time updates on your shipment's journey.
        </p>
      </div>

      <Card className="max-w-md mx-auto mt-8 shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleTrack} className="flex gap-2">
            <Input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID (e.g., GLP123456789)"
              className="text-base"
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
              {isLoading ? 'Tracking...' : 'Track'}
            </Button>
          </form>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>

      {result && (
        <Card className="max-w-3xl mx-auto mt-12 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Shipment Details</CardTitle>
            <CardDescription>Tracking ID: {result.summary.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm border-b pb-6">
              <div>
                <p className="font-semibold">Status</p>
                <p className="text-primary font-medium">{result.summary.status}</p>
              </div>
              <div>
                <p className="font-semibold">Origin</p>
                <p className="text-muted-foreground">{result.summary.origin}</p>
              </div>
              <div>
                <p className="font-semibold">Destination</p>
                <p className="text-muted-foreground">{result.summary.destination}</p>
              </div>
              <div>
                <p className="font-semibold">Estimated Delivery</p>
                <p className="text-muted-foreground">{result.summary.estimatedDelivery}</p>
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-4">Shipment History</h3>
            <div>
              {result.events.map((event, index) => (
                <TrackingEvent
                  key={index}
                  icon={event.icon}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  isLast={index === result.events.length - 1}
                  isActive={event.active}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
