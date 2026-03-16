'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConversationList } from './ConversationList';
import { Edit, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/modules/chat/hooks/useChat';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  activeConversationId: string | null;
}

export function Sidebar({ activeConversationId }: SidebarProps) {
  const router = useRouter();
  const { createNewConversation } = useChat();

  const handleNewChat = async () => {
    const newConversationId = await createNewConversation();
    router.push(`/chat/${newConversationId}`);
  };

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground pt-4">
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-lg font-semibold">
            ChatGPT
        </span>
        <Button variant="ghost" size="icon" onClick={handleNewChat} className="h-8 w-8">
            <Edit className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="mt-4">
            <h3 className="px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Your chats</h3>
            <ConversationList activeConversationId={activeConversationId} />
        </div>
      </ScrollArea>
      <div className="border-t border-sidebar-border p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-2">
                <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-primary-foreground font-semibold">SN</div>
                <div className='flex flex-col items-start'>
                  <span className='font-semibold'>Sk Abdul Nazim</span>
                  <span className='text-xs text-muted-foreground'>Free</span>
                </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2 ml-2" side="top" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings">
              <DropdownMenuItem className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
