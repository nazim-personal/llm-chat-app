export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  conversationId: string;
  role: Role;
  content: string;
  createdAt: string; // Using string for date to ensure serializability
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string; // Using string for date to ensure serializability
  updatedAt: string; // Using string for date to ensure serializability
}
