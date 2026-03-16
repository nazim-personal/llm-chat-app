import { ChatWindow } from '@/components/chat/ChatWindow';

interface ConversationPageProps {
  params: {
    conversationId: string;
  };
}

export default function ConversationPage({ params }: ConversationPageProps) {
  return <ChatWindow conversationId={params.conversationId} />;
}
