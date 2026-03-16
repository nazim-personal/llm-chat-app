import { ChatInput } from './ChatInput';

export function EmptyChat() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-8">
            <p className="text-4xl font-semibold text-gray-400">
                Hey, Nazim. Ready to dive in?
            </p>
        </div>
        <div className="w-full max-w-3xl px-4">
            <ChatInput />
        </div>
    </div>
  );
}
