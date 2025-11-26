export type Shipment = {
  id: string;
  origin: string;
  destination: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
  date: string;
};
