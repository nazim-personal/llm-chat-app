'use client';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, ArrowUp, Mic, AudioLines } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useChat } from '@/modules/chat/hooks/useChat';
import { Skeleton } from '@/components/ui/skeleton';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { sendMessage, isStreaming, activeConversationId, createNewConversation } = useChat();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = parseInt(getComputedStyle(textareaRef.current).maxHeight, 10);
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [input]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    let convId = activeConversationId;
    if (!convId) {
      convId = await createNewConversation();
      router.push(`/chat/${convId}`);
    }

    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  if (!hasMounted) {
    return (
      <div className="sticky bottom-0 bg-transparent pb-4 pt-2">
        <div className="relative mx-auto max-w-3xl">
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="sticky bottom-0 bg-transparent pb-4 pt-2">
      <div className="relative mx-auto max-w-3xl">
        <form onSubmit={handleSubmit} className="relative flex w-full items-center rounded-full border border-border bg-secondary/50">
          <Button type="button" variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            rows={1}
            className="max-h-32 w-full resize-none overflow-y-auto bg-transparent border-0 pl-12 pr-32 py-3 focus-visible:ring-0"
            disabled={isStreaming}
            aria-label="Chat message input"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
             <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <AudioLines className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Mic className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="h-8 w-8 rounded-full bg-primary disabled:bg-primary/50"
              disabled={!input.trim() || isStreaming}
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
