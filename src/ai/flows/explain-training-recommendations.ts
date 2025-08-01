'use server';

/**
 * @fileOverview Explains the reasoning behind AI-generated training recommendations for riders.
 *
 * - explainTrainingRecommendations - A function that generates explanations for training recommendations.
 * - ExplainTrainingRecommendationsInput - The input type for the explainTrainingRecommendations function.
 * - ExplainTrainingRecommendationsOutput - The return type for the explainTrainingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainTrainingRecommendationsInputSchema = z.object({
  riderPerformanceData: z
    .string()
    .describe("The rider's recent performance data, including deliveries, success rate, and feedback."),
  trainingRecommendations: z
    .string()
    .describe('The AI-generated training recommendations for the rider.'),
});
export type ExplainTrainingRecommendationsInput = z.infer<
  typeof ExplainTrainingRecommendationsInputSchema
>;

const ExplainTrainingRecommendationsOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A detailed explanation of the reasoning behind the training recommendations, tailored to the rider performance data.'
    ),
});
export type ExplainTrainingRecommendationsOutput = z.infer<
  typeof ExplainTrainingRecommendationsOutputSchema
>;

export async function explainTrainingRecommendations(
  input: ExplainTrainingRecommendationsInput
): Promise<ExplainTrainingRecommendationsOutput> {
  return explainTrainingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainTrainingRecommendationsPrompt',
  input: {schema: ExplainTrainingRecommendationsInputSchema},
  output: {schema: ExplainTrainingRecommendationsOutputSchema},
  prompt: `You are an AI assistant that explains training recommendations to riders.

You are provided with the rider's performance data and the AI-generated training recommendations.

Your task is to explain the reasoning behind these recommendations in a clear and understandable manner, focusing on how the training plan will address the rider's specific performance gaps.

Rider Performance Data: {{{riderPerformanceData}}}
Training Recommendations: {{{trainingRecommendations}}}

Explanation:`,
});

const explainTrainingRecommendationsFlow = ai.defineFlow(
  {
    name: 'explainTrainingRecommendationsFlow',
    inputSchema: ExplainTrainingRecommendationsInputSchema,
    outputSchema: ExplainTrainingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
