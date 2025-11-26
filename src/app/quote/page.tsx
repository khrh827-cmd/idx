'use client';

import { generateShippingQuote, type GenerateShippingQuoteOutput } from '@/ai/flows/generate-shipping-quote';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const quoteSchema = z.object({
  destination: z.string().min(2, { message: 'Destination is required.' }),
  weight: z.coerce.number().min(0.1, { message: 'Weight must be at least 0.1 kg.' }),
  length: z.coerce.number().min(1, { message: 'Length must be at least 1 cm.' }),
  width: z.coerce.number().min(1, { message: 'Width must be at least 1 cm.' }),
  height: z.coerce.number().min(1, { message: 'Height must be at least 1 cm.' }),
  transportationType: z.enum(['maritime', 'air', 'road'], { required_error: 'Please select a transport type.' }),
  serviceType: z.enum(['standard', 'express', 'specialized'], { required_error: 'Please select a service type.' }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function QuotePage() {
  const [quoteResult, setQuoteResult] = useState<GenerateShippingQuoteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      destination: '',
      weight: 10,
      length: 50,
      width: 50,
      height: 50,
      serviceType: 'standard',
    },
  });

  async function onSubmit(data: QuoteFormValues) {
    setIsLoading(true);
    setQuoteResult(null);
    try {
      const result = await generateShippingQuote(data);
      setQuoteResult(result);
    } catch (error) {
      console.error('Error generating quote:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate shipping quote. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Instant Shipping Quote</h1>
            <p className="mt-4 text-lg text-muted-foreground">
            Fill in your shipment details below to receive a real-time quotation powered by our AI engine.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Shipment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="destination" render={({ field }) => (
                    <FormItem><FormLabel>Destination</FormLabel><FormControl><Input placeholder="e.g., New York, USA" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="weight" render={({ field }) => (
                    <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" placeholder="10" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="length" render={({ field }) => (
                      <FormItem><FormLabel>Length (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="width" render={({ field }) => (
                      <FormItem><FormLabel>Width (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="height" render={({ field }) => (
                      <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="transportationType" render={({ field }) => (
                    <FormItem><FormLabel>Transport</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select transport type" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="maritime">Maritime</SelectItem>
                          <SelectItem value="air">Air</SelectItem>
                          <SelectItem value="road">Road</SelectItem>
                        </SelectContent>
                      </Select><FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="serviceType" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Service Type</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="standard" /></FormControl><FormLabel className="font-normal">Standard</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="express" /></FormControl><FormLabel className="font-normal">Express</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="specialized" /></FormControl><FormLabel className="font-normal">Specialized Handling</FormLabel></FormItem>
                        </RadioGroup>
                      </FormControl><FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate Quote
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
                <p className="font-semibold">Generating your quote...</p>
                <p className="text-sm text-center">Our AI is crunching the numbers.</p>
              </div>
            )}
            {!isLoading && quoteResult && (
              <Card className="w-full shadow-xl bg-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Sparkles />
                    Your AI-Generated Quote
                  </CardTitle>
                  <CardDescription>This is an estimated quote based on the details provided.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base whitespace-pre-wrap font-mono bg-background/50 p-4 rounded-md">{quoteResult.quote}</p>
                </CardContent>
              </Card>
            )}
            {!isLoading && !quoteResult && (
              <Card className="w-full shadow-lg border-dashed">
                <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                    <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="font-semibold text-lg text-muted-foreground">Your quote will appear here</h3>
                    <p className="text-sm text-muted-foreground/80 mt-1">Fill out the form to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
