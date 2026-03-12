import { Sparkles } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-lg font-bold text-primary ${className}`}>
      <Sparkles className="h-6 w-6" />
      <span>ChatGPT-NextGen</span>
    </div>
  );
}
