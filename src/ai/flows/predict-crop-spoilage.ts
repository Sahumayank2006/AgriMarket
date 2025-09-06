// src/ai/flows/predict-crop-spoilage.ts
'use server';
/**
 * @fileOverview Predicts crop spoilage based on sensor data and historical data.
 *
 * - predictCropSpoilage - A function that handles the crop spoilage prediction process.
 * - PredictCropSpoilageInput - The input type for the predictCropSpoilage function.
 * - PredictCropSpoilageOutput - The return type for the predictCropSpoilage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCropSpoilageInputSchema = z.object({
  cropType: z.string().describe('The type of crop.'),
  temperature: z.number().describe('The temperature in Celsius.'),
  humidity: z.number().describe('The humidity percentage.'),
  storageDays: z.number().describe('The number of days the crop has been in storage.'),
  historicalSpoilageRate: z.number().describe('The historical spoilage rate for this crop type (percentage).'),
});
export type PredictCropSpoilageInput = z.infer<typeof PredictCropSpoilageInputSchema>;

const PredictCropSpoilageOutputSchema = z.object({
  predictedSpoilageRisk: z
    .number()
    .describe('The predicted spoilage risk percentage.'),
  recommendations: z
    .string()
    .describe('Recommendations to reduce spoilage risk.'),
});
export type PredictCropSpoilageOutput = z.infer<typeof PredictCropSpoilageOutputSchema>;

export async function predictCropSpoilage(input: PredictCropSpoilageInput): Promise<PredictCropSpoilageOutput> {
  return predictCropSpoilageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCropSpoilagePrompt',
  input: {schema: PredictCropSpoilageInputSchema},
  output: {schema: PredictCropSpoilageOutputSchema},
  prompt: `You are an AI assistant specializing in predicting crop spoilage.

  Based on the following information, predict the spoilage risk percentage and provide recommendations to reduce spoilage.

  Crop Type: {{{cropType}}}
  Temperature: {{{temperature}}} Celsius
  Humidity: {{{humidity}}}%
  Storage Days: {{{storageDays}}}
  Historical Spoilage Rate: {{{historicalSpoilageRate}}}%

  Provide the predicted spoilage risk as a percentage, followed by practical recommendations to mitigate the spoilage risk.`,
});

const predictCropSpoilageFlow = ai.defineFlow(
  {
    name: 'predictCropSpoilageFlow',
    inputSchema: PredictCropSpoilageInputSchema,
    outputSchema: PredictCropSpoilageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
