'use client';
import { useEffect, useRef } from 'react';
import { useChat } from '@/modules/chat/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyChat } from './EmptyChat';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatWindowProps {
  conversationId: string;
}

export function ChatWindow({ conversationId }: ChatWindowProps) {
  const { messages, isLoading, setActiveConversation } = useChat(conversationId);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveConversation(conversationId);
  }, [conversationId, setActiveConversation]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-3xl px-4">
                    <div className="space-y-6 py-6">
                        <Skeleton className="h-16 w-3/4" />
                        <Skeleton className="ml-auto h-12 w-1/2" />
                        <Skeleton className="h-24 w-4/5" />
                    </div>
                </div>
            </div>
             <div className="mx-auto w-full max-w-3xl px-4">
                <ChatInput />
            </div>
        </div>
    )
  }

  if (messages.length === 0) {
    return <EmptyChat />;
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4">
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl px-4">
        <ChatInput />
      </div>
    </div>
  );
}
