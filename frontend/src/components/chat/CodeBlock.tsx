'use client';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  language: string | undefined;
  value: string;
}

export const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <div className="group relative my-4 rounded-lg bg-secondary font-code text-sm">
      <div className="flex items-center justify-between rounded-t-lg bg-secondary/80 px-4 py-2">
        <span className="text-xs text-foreground/70">{language || 'code'}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
        >
          {hasCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1rem', backgroundColor: 'transparent' }}
        codeTagProps={{ style: { fontFamily: 'inherit' } }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};
