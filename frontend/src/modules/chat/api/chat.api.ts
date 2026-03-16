// This file is a placeholder for API calls that might be used
// if the application had a traditional backend instead of using
// server actions with Genkit.
// The functions are not currently called from anywhere in the app.

import axios from '@/lib/axios';
import type { Conversation, Message } from '@/modules/chat/types/chat.types';
import { createId } from '@/lib/id';

// MOCK API - in a real app, this would be a database.
const MOCK_DB = {
    conversations: [] as Conversation[],
    messages: {} as Record<string, Message[]>,
};

export const getConversations = async (): Promise<Conversation[]> => {
    console.log('API: getConversations called (mocked)');
    return Promise.resolve(MOCK_DB.conversations);
};

export const getMessages = async (conversationId: string): Promise<Message[]> => {
    console.log(`API: getMessages for ${conversationId} called (mocked)`);
    return Promise.resolve(MOCK_DB.messages[conversationId] || []);
};

export const postMessage = async (conversationId: string, content: string): Promise<Message> => {
    console.log(`API: postMessage to ${conversationId} called (mocked)`);
    const newMessage: Message = {
        id: createId(),
        conversationId,
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
    };
    // In a real API, you would also get a response from the assistant
    return Promise.resolve(newMessage);
};

export const createConversation = async (title: string): Promise<Conversation> => {
    console.log('API: createConversation called (mocked)');
    const newConversation: Conversation = {
        id: createId(),
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    MOCK_DB.conversations.unshift(newConversation);
    MOCK_DB.messages[newConversation.id] = [];
    return Promise.resolve(newConversation);
};

export const deleteConversation = async (conversationId: string): Promise<void> => {
    console.log(`API: deleteConversation ${conversationId} called (mocked)`);
    MOCK_DB.conversations = MOCK_DB.conversations.filter(c => c.id !== conversationId);
    delete MOCK_DB.messages[conversationId];
    return Promise.resolve();
};

export const renameConversation = async (conversationId: string, newTitle: string): Promise<Conversation> => {
    console.log(`API: renameConversation ${conversationId} called (mocked)`);
    const conversation = MOCK_DB.conversations.find(c => c.id === conversationId);
    if (conversation) {
        conversation.title = newTitle;
        conversation.updatedAt = new Date().toISOString();
        return Promise.resolve(conversation);
    }
    return Promise.reject(new Error('Conversation not found'));
};
