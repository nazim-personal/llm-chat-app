'use client';

import { ChevronDown, Gift, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-transparent px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-1 text-lg font-semibold px-2">
              <span>ChatGPT</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>ChatGPT 4</DropdownMenuItem>
            <DropdownMenuItem>ChatGPT 3.5</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2 rounded-full border-purple-500/50 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200">
          <Gift className="h-4 w-4" />
          Free offer
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserPlus className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
