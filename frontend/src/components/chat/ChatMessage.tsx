'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Message } from '@/modules/chat/types/chat.types';
import { TypingIndicator } from './TypingIndicator';
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { role, content, isStreaming } = message;
  const isAssistant = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-start space-x-4 py-6', {
        'justify-end space-x-reverse': !isAssistant,
      })}
    >
      <Avatar className={cn('h-8 w-8', { 'ml-4': !isAssistant })}>
        <AvatarImage />
        <AvatarFallback>
          {isAssistant ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn('max-w-xl rounded-lg px-4 py-3', {
          'bg-primary/10': isAssistant,
          'bg-primary text-primary-foreground': !isAssistant,
        })}
      >
        {isStreaming && content.length === 0 ? (
          <TypingIndicator />
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const lang = match ? match[1] : '';
                  const value = String(children).replace(/\n$/, '');
                  return (
                    <CodeBlock language={lang} value={value} />
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}
