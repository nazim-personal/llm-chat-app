'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Trash2, Edit, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/modules/chat/hooks/useChat';
import type { Conversation } from '@/modules/chat/types/chat.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
}

export function ConversationItem({ conversation, isActive }: ConversationItemProps) {
  const router = useRouter();
  const { deleteConversation, renameConversation } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(conversation.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleDelete = async () => {
    await deleteConversation(conversation.id);
    router.push('/chat');
  };

  const handleRename = async () => {
    if (editedTitle.trim() && editedTitle !== conversation.title) {
      await renameConversation(conversation.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditedTitle(conversation.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={cn(
        'group relative flex items-center rounded-lg px-3 py-2 text-sm transition-colors',
        isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent'
      )}
    >
      <MessageSquare className="mr-3 h-4 w-4 flex-shrink-0" />
      {isEditing ? (
        <Input
          ref={inputRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={handleKeyDown}
          className="h-7 w-full flex-grow bg-transparent p-0 text-sm focus:ring-0"
        />
      ) : (
        <Link href={`/chat/${conversation.id}`} className="w-full flex-grow truncate">
          {conversation.title}
        </Link>
      )}

      <div className={cn("absolute right-2 flex items-center gap-1", isEditing ? "flex" : "hidden group-hover:flex")}>
        {isEditing ? (
          <>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleRename}>
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/80 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the conversation "{conversation.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </div>
  );
}
