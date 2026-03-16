'use server';

import { coreChatInteraction as coreChatInteractionFlow, CoreChatInteractionInput } from './core-chat-interaction';
import { generateConversationTitle as generateConversationTitleFlow, GenerateConversationTitleInput } from './automatic-conversation-naming';

export async function coreChatInteraction(input: CoreChatInteractionInput) {
    return coreChatInteractionFlow(input);
}

export async function generateConversationTitle(input: GenerateConversationTitleInput) {
    return generateConversationTitleFlow(input);
}
