'use server';
/**
 * @fileOverview Implements the core chat interaction flow for the ChatGPT-NextGen application.
 * This flow handles sending a user message to the AI and streaming back the AI's response in real-time.
 *
 * - coreChatInteraction - A function that initiates the chat interaction and returns a stream of AI responses.
 * - CoreChatInteractionInput - The input type for the coreChatInteraction function.
 * - CoreChatInteractionOutput - The type of each chunk streamed back from the AI.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema for the chat interaction
const CoreChatInteractionInputSchema = z.object({
  message: z.string().describe('The user\'s current message.'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('Previous messages in the conversation to provide context.'),
});
export type CoreChatInteractionInput = z.infer<typeof CoreChatInteractionInputSchema>;

// Output Schema for each chunk of the streaming response
const CoreChatInteractionOutputSchema = z.object({
  text: z.string().describe('A chunk of the assistant\'s streaming response.'),
});
export type CoreChatInteractionOutput = z.infer<typeof CoreChatInteractionOutputSchema>;

/**
 * Initiates a core chat interaction, sending a user message and returning a real-time,
 * streaming response from the AI.
 * @param input - The input containing the user's message and optional conversation history.
 * @returns An AsyncIterable of CoreChatInteractionOutput objects, each containing a text chunk.
 */
export async function coreChatInteraction(
  input: CoreChatInteractionInput
): Promise<AsyncIterable<CoreChatInteractionOutput>> {
  return coreChatInteractionFlow(input);
}

/**
 * Helper function to convert the conversation history into the format expected by Genkit's `messages` array.
 * Genkit chat models expect roles 'user' and 'model'.
 */
function formatChatMessages(
  history: Array<{role: 'user' | 'assistant'; content: string}>,
  currentMessage: string
): Array<{role: 'user' | 'model'; content: string}> {
  const formattedMessages: Array<{role: 'user' | 'model'; content: string}> = [];

  // Add historical messages
  if (history) {
    for (const msg of history) {
      formattedMessages.push({
        role: msg.role === 'user' ? 'user' : 'model',
        content: msg.content,
      });
    }
  }

  // Add the current user message
  formattedMessages.push({ role: 'user', content: currentMessage });

  return formattedMessages;
}

const coreChatInteractionFlow = ai.defineFlow(
  {
    name: 'coreChatInteractionFlow',
    inputSchema: CoreChatInteractionInputSchema,
    // The output schema describes the shape of each item yielded by the async generator.
    outputSchema: CoreChatInteractionOutputSchema,
  },
  async function* (input) { // Use an async generator function for streaming output
    const chatMessages = formatChatMessages(input.history || [], input.message);

    const { stream, response } = ai.generateStream({
      model: 'googleai/gemini-2.5-flash', // Using the default Gemini model for chat
      messages: chatMessages,
      // Optional: Add safety settings if needed
      // config: {
      //   safetySettings: [
      //     {
      //       category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      //       threshold: 'BLOCK_NONE',
      //     },
      //   ],
      // },
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        yield { text: chunk.text }; // Yield each text chunk wrapped in the output schema object
      }
    }
    await response; // Wait for the full response to ensure completion and catch any errors
  }
);
