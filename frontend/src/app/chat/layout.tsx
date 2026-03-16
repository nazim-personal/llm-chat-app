'use client';
import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/layout/Header';
import { Sidebar as AppSidebar } from '@/components/sidebar/Sidebar';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  // A conversation ID is present if the path is /chat/<id>
  const conversationId = pathParts.length > 2 && pathParts[1] === 'chat' ? pathParts[2] : null;

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar activeConversationId={conversationId} />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
