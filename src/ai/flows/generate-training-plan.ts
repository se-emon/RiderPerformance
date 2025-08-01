// The AI flow that generates personalized training plans for riders based on their performance data.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTrainingPlanInputSchema = z.object({
  riderPerformanceData: z.string().describe('The rider performance data.'),
});
export type GenerateTrainingPlanInput = z.infer<typeof GenerateTrainingPlanInputSchema>;

const GenerateTrainingPlanOutputSchema = z.object({
  trainingPlan: z.string().describe('The generated training plan for the rider.'),
  reasoning: z.string().describe('The reasoning behind the training recommendations.'),
});
export type GenerateTrainingPlanOutput = z.infer<typeof GenerateTrainingPlanOutputSchema>;

export async function generateTrainingPlan(input: GenerateTrainingPlanInput): Promise<GenerateTrainingPlanOutput> {
  return generateTrainingPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTrainingPlanPrompt',
  input: {schema: GenerateTrainingPlanInputSchema},
  output: {schema: GenerateTrainingPlanOutputSchema},
  prompt: `You are an AI performance coach specializing in generating training plans for riders based on their performance data.

You will use the rider performance data to generate a personalized training plan for the rider, and provide the reasoning behind the training recommendations.

Rider Performance Data: {{{riderPerformanceData}}}`,
});

const generateTrainingPlanFlow = ai.defineFlow(
  {
    name: 'generateTrainingPlanFlow',
    inputSchema: GenerateTrainingPlanInputSchema,
    outputSchema: GenerateTrainingPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
