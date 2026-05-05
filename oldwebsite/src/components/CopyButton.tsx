'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-2 text-sm border border-border rounded-md transition-colors ${
        copied 
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700' 
          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 inline mr-1" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 inline mr-1" />
          Copy
        </>
      )}
    </button>
  );
}