'use server';

/**
 * @fileOverview An AI agent for suggesting optimal routes for shipments, balancing cost and speed.
 *
 * - suggestOptimalRoute - A function that suggests optimal routes for shipments.
 * - SuggestOptimalRouteInput - The input type for the suggestOptimalRoute function.
 * - SuggestOptimalRouteOutput - The return type for the suggestOptimalRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalRouteInputSchema = z.object({
  origin: z.string().describe('The origin location of the shipment.'),
  destination: z.string().describe('The destination location of the shipment.'),
  weightKg: z.number().describe('The weight of the shipment in kilograms.'),
  dimensionsCm: z.string().describe('The dimensions of the shipment in centimeters (e.g., 10x20x30).'),
  transportationType: z
    .enum(['maritime', 'air', 'road', 'rail'])
    .describe('The preferred transportation type.'),
  priority: z
    .enum(['cost', 'speed', 'balanced'])
    .describe('The priority for the route optimization (cost, speed, or balanced).'),
  currentConditions: z.string().optional().describe('Any current conditions that may affect the route (e.g., weather, traffic).'),
});
export type SuggestOptimalRouteInput = z.infer<typeof SuggestOptimalRouteInputSchema>;

const SuggestOptimalRouteOutputSchema = z.object({
  routeSummary: z.string().describe('A summary of the suggested optimal route.'),
  estimatedCost: z.number().describe('The estimated cost of the shipment.'),
  estimatedTime: z.string().describe('The estimated time of delivery.'),
  breakdown: z.string().describe('A detailed breakdown of the route, including transit points and methods.'),
});
export type SuggestOptimalRouteOutput = z.infer<typeof SuggestOptimalRouteOutputSchema>;

export async function suggestOptimalRoute(input: SuggestOptimalRouteInput): Promise<SuggestOptimalRouteOutput> {
  return suggestOptimalRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalRoutePrompt',
  input: {schema: SuggestOptimalRouteInputSchema},
  output: {schema: SuggestOptimalRouteOutputSchema},
  prompt: `You are an expert logistics professional specializing in route optimization.

  Based on the provided shipment details, suggest the optimal route, considering the transportation type, priority, and any current conditions.

  Origin: {{{origin}}}
  Destination: {{{destination}}}
  Weight (kg): {{{weightKg}}}
  Dimensions (cm): {{{dimensionsCm}}}
  Transportation Type: {{{transportationType}}}
  Priority: {{{priority}}}
  Current Conditions: {{{currentConditions}}}

  Provide a route summary, estimated cost, estimated time of delivery, and a detailed breakdown of the route. Focus on balancing cost and speed.
  Ensure your output is well-formatted and easy to understand.
  Ensure the estimated cost is a number (omit currency symbol).
  `,
});

const suggestOptimalRouteFlow = ai.defineFlow(
  {
    name: 'suggestOptimalRouteFlow',
    inputSchema: SuggestOptimalRouteInputSchema,
    outputSchema: SuggestOptimalRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
