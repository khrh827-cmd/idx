'use client';

import { suggestOptimalRoute, type SuggestOptimalRouteOutput } from '@/ai/flows/suggest-optimal-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { DraftingCompass, Loader2, Sparkles, Clock, DollarSign, Route } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const routeSchema = z.object({
  origin: z.string().min(2, { message: 'Origin is required.' }),
  destination: z.string().min(2, { message: 'Destination is required.' }),
  weightKg: z.coerce.number().min(0.1, { message: 'Weight must be at least 0.1 kg.' }),
  dimensionsCm: z.string().regex(/^\d+x\d+x\d+$/, { message: 'Format must be LxWxH, e.g., 10x20x30' }),
  transportationType: z.enum(['maritime', 'air', 'road', 'rail'], { required_error: 'Please select a transport type.' }),
  priority: z.enum(['cost', 'speed', 'balanced'], { required_error: 'Please select a priority.' }),
  currentConditions: z.string().optional(),
});

type RouteFormValues = z.infer<typeof routeSchema>;

export default function RouteOptimizerPage() {
  const [routeResult, setRouteResult] = useState<SuggestOptimalRouteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      origin: '',
      destination: '',
      weightKg: 100,
      dimensionsCm: '100x80x50',
      priority: 'balanced',
    },
  });

  async function onSubmit(data: RouteFormValues) {
    setIsLoading(true);
    setRouteResult(null);
    try {
      const result = await suggestOptimalRoute(data);
      setRouteResult(result);
    } catch (error) {
      console.error('Error suggesting route:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to suggest an optimal route. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">AI-Powered Route Optimizer</h1>
            <p className="mt-4 text-lg text-muted-foreground">
            Let our AI find the smartest, fastest, and most cost-effective route for your shipment.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Card className="lg:col-span-2 shadow-lg h-fit">
                <CardHeader>
                <CardTitle>Shipment & Route Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="origin" render={({ field }) => (
                            <FormItem><FormLabel>Origin</FormLabel><FormControl><Input placeholder="e.g., Shanghai, China" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="destination" render={({ field }) => (
                            <FormItem><FormLabel>Destination</FormLabel><FormControl><Input placeholder="e.g., Hamburg, Germany" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="weightKg" render={({ field }) => (
                                <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" placeholder="100" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="dimensionsCm" render={({ field }) => (
                                <FormItem><FormLabel>Dimensions (cm)</FormLabel><FormControl><Input placeholder="100x80x50" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="transportationType" render={({ field }) => (
                            <FormItem><FormLabel>Preferred Transport</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select transport type" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="maritime">Maritime</SelectItem>
                                    <SelectItem value="air">Air</SelectItem>
                                    <SelectItem value="road">Road</SelectItem>
                                    <SelectItem value="rail">Rail</SelectItem>
                                </SelectContent>
                            </Select><FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="priority" render={({ field }) => (
                            <FormItem><FormLabel>Optimization Priority</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="balanced">Balanced</SelectItem>
                                    <SelectItem value="cost">Lowest Cost</SelectItem>
                                    <SelectItem value="speed">Fastest Speed</SelectItem>
                                </SelectContent>
                            </Select><FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="currentConditions" render={({ field }) => (
                            <FormItem><FormLabel>Current Conditions (Optional)</FormLabel><FormControl><Textarea placeholder="e.g., peak season, fragile goods..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DraftingCompass className="mr-2 h-4 w-4" />}
                            Optimize Route
                        </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
          
            <div className="lg:col-span-3 flex items-center justify-center">
                {isLoading && (
                    <div className="flex flex-col items-center gap-4 text-muted-foreground w-full">
                        <Loader2 className="w-16 h-16 animate-spin text-primary" />
                        <p className="font-semibold text-lg">Optimizing your route...</p>
                        <p className="text-sm text-center">Our AI is analyzing millions of data points to find the best path.</p>
                    </div>
                )}
                {!isLoading && routeResult && (
                <div className="w-full space-y-6">
                    <Card className="shadow-xl bg-secondary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                            <Sparkles />
                            Suggested Optimal Route
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-base">{routeResult.routeSummary}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Estimated Cost</CardTitle>
                                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">${routeResult.estimatedCost.toLocaleString()}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{routeResult.estimatedTime}</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Route />
                                Route Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm whitespace-pre-wrap font-mono bg-background p-4 rounded-md">{routeResult.breakdown}</p>
                        </CardContent>
                    </Card>
                </div>
                )}
                {!isLoading && !routeResult && (
                    <Card className="w-full shadow-lg border-dashed h-full">
                        <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                            <DraftingCompass className="h-16 w-16 text-muted-foreground/30 mb-4" />
                            <h3 className="font-semibold text-xl text-muted-foreground">Your optimized route will be displayed here</h3>
                            <p className="text-sm text-muted-foreground/80 mt-2 max-w-sm">Enter your shipment details and let our AI create the most efficient logistics plan for you.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
