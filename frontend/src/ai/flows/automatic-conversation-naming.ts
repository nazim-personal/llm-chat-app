'use server';
/**
 * @fileOverview A Genkit flow for automatically generating a concise and descriptive title
 * for a conversation based on its initial message.
 *
 * - generateConversationTitle - A function that handles the title generation process.
 * - GenerateConversationTitleInput - The input type for the generateConversationTitle function.
 * - GenerateConversationTitleOutput - The return type for the generateConversationTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConversationTitleInputSchema = z.object({
  firstMessage: z.string().describe('The first message of the conversation.'),
});
export type GenerateConversationTitleInput = z.infer<typeof GenerateConversationTitleInputSchema>;

const GenerateConversationTitleOutputSchema = z.object({
  title: z.string().describe('A concise and descriptive title for the conversation.'),
});
export type GenerateConversationTitleOutput = z.infer<typeof GenerateConversationTitleOutputSchema>;

export async function generateConversationTitle(input: GenerateConversationTitleInput): Promise<GenerateConversationTitleOutput> {
  return automaticConversationNamingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automaticConversationNamingPrompt',
  input: {schema: GenerateConversationTitleInputSchema},
  output: {schema: GenerateConversationTitleOutputSchema},
  prompt: `You are an AI assistant tasked with generating concise and descriptive titles for conversations.

Given the first message of a conversation, generate a short, three to five word title that accurately reflects the main topic.

First message: """{{{firstMessage}}}"""

Example:
First message: "What are the best places to visit in Japan during spring?"
Title: "Japan Spring Travel Guide"

First message: "Can you explain quantum computing in simple terms?"
Title: "Quantum Computing Explained Simply"

First message: """{{{firstMessage}}}"""
Title:`,
});

const automaticConversationNamingFlow = ai.defineFlow(
  {
    name: 'automaticConversationNamingFlow',
    inputSchema: GenerateConversationTitleInputSchema,
    outputSchema: GenerateConversationTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
