'use client';

import { useChatStore } from '@/modules/chat/store/chat.store';
import { useMemo } from 'react';

export const useChat = (conversationId?: string | null) => {
  const store = useChatStore();

  const activeConversationId = conversationId || store.activeConversationId;

  const messages = useMemo(() => {
    return activeConversationId ? store.messages[activeConversationId] || [] : [];
  }, [activeConversationId, store.messages]);

  const activeConversation = useMemo(() => {
    return store.conversations.find(c => c.id === activeConversationId);
  }, [activeConversationId, store.conversations]);
  
  return {
    // State
    conversations: store.conversations,
    activeConversationId,
    activeConversation,
    messages,
    isLoading: store.isLoading,
    isStreaming: store.isStreaming,
    error: store.error,

    // Actions
    loadConversations: store.loadConversations,
    setActiveConversation: store.setActiveConversation,
    createNewConversation: store.createNewConversation,
    sendMessage: store.sendMessage,
    deleteConversation: store.deleteConversation,
    renameConversation: store.renameConversation,
  };
};
