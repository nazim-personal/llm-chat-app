'use client';
import { create } from 'zustand';
import { produce } from 'immer';
import * as chatApi from '@/modules/chat/api/chat.api';
import type { Conversation, Message, Role } from '@/modules/chat/types/chat.types';
import { createId } from '@/lib/id';

// This is a server action that will be called from the store
import { coreChatInteraction, generateConversationTitle } from '@/ai/flows/actions';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;
  isStreaming: boolean;
  error: Error | null;

  // Actions
  loadConversations: () => Promise<void>;
  setActiveConversation: (conversationId: string | null) => void;
  createNewConversation: () => Promise<string>;
  sendMessage: (content: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  renameConversation: (conversationId: string, newTitle: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  messages: {},
  isLoading: false,
  isStreaming: false,
  error: null,

  loadConversations: async () => {
    // In a real app, this would fetch from an API
    // For now, we'll keep it in-memory.
    // If you want to persist across reloads, you could use localStorage middleware.
  },

  setActiveConversation: (conversationId) => {
    set({ activeConversationId: conversationId });
  },

  createNewConversation: async () => {
    const newConversation: Conversation = {
      id: createId(),
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set(produce((state: ChatState) => {
      state.conversations.unshift(newConversation);
      state.activeConversationId = newConversation.id;
      state.messages[newConversation.id] = [];
    }));

    return newConversation.id;
  },

  deleteConversation: async (conversationId) => {
    set(produce((state: ChatState) => {
      state.conversations = state.conversations.filter(c => c.id !== conversationId);
      delete state.messages[conversationId];
      if (state.activeConversationId === conversationId) {
        state.activeConversationId = state.conversations[0]?.id || null;
      }
    }));
  },

  renameConversation: async (conversationId, newTitle) => {
     set(produce((state: ChatState) => {
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.title = newTitle;
        conversation.updatedAt = new Date().toISOString();
      }
    }));
  },

  sendMessage: async (content) => {
    const activeId = get().activeConversationId;
    if (!activeId) return;

    const userMessage: Message = {
      id: createId(),
      conversationId: activeId,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    set(produce((state: ChatState) => {
      state.messages[activeId] = [...(state.messages[activeId] || []), userMessage];
      state.isStreaming = true;
    }));

    const assistantMessageId = createId();
    const assistantMessage: Message = {
      id: assistantMessageId,
      conversationId: activeId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      isStreaming: true,
    };
    
    set(produce((state: ChatState) => {
      state.messages[activeId] = [...state.messages[activeId], assistantMessage];
    }));

    try {
      const history = get().messages[activeId].slice(0, -2); // Get history excluding user's new message and placeholder
      const stream = await coreChatInteraction({ message: content, history: history.map(m => ({ role: m.role, content: m.content })) });

      for await (const chunk of stream) {
        if (chunk.text != null) {
          set(produce((state: ChatState) => {
            const msg = state.messages[activeId].find(m => m.id === assistantMessageId);
            if (msg) {
              msg.content += chunk.text;
            }
          }));
        }
      }
      
      const currentMessages = get().messages[activeId];
      // Auto-generate title after first assistant response
      if (currentMessages.length === 2) {
        // Fire-and-forget title generation
        generateConversationTitle({ firstMessage: content })
          .then(output => {
            get().renameConversation(activeId, output.title);
          })
          .catch(err => {
            console.error("Failed to generate conversation title, falling back to user's prompt.", err);
            // Fallback to using the user's prompt as the title, since that was the original request
            get().renameConversation(activeId, content);
          });
      }

    } catch (error) {
      console.error("Error during streaming:", error);
      set(produce((state: ChatState) => {
        const msg = state.messages[activeId].find(m => m.id === assistantMessageId);
        if (msg) {
          msg.content = "Sorry, I encountered an error. Please try again.";
        }
      }));
    } finally {
      set(produce((state: ChatState) => {
        const msg = state.messages[activeId].find(m => m.id === assistantMessageId);
        if (msg) {
          msg.isStreaming = false;
        }
        state.isStreaming = false;
      }));
    }
  },
}));
