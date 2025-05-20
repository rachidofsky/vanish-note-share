
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export const CopyButton = ({ textToCopy, className = '' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success('Copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Button 
      variant={copied ? "secondary" : "outline"} 
      size="sm" 
      onClick={copyToClipboard} 
      className={`text-xs flex items-center gap-1 transition-all duration-300 ${className} ${copied ? 'bg-green-500/20 text-green-700 border-green-500/50' : ''}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </Button>
  );
};
