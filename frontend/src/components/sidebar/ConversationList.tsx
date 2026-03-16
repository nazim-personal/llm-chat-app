'use client';

import { useChat } from '@/modules/chat/hooks/useChat';
import { ConversationItem } from './ConversationItem';

interface ConversationListProps {
  activeConversationId: string | null;
}

export function ConversationList({ activeConversationId }: ConversationListProps) {
  const { conversations } = useChat();

  if (!conversations.length) {
    return <div className="p-4 text-center text-sm text-muted-foreground">No chats yet.</div>;
  }

  return (
    <div className="flex flex-col gap-1 p-2">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
        />
      ))}
    </div>
  );
}
