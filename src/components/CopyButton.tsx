
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
      variant="outline" 
      size="sm" 
      onClick={copyToClipboard} 
      className={`text-xs ${className}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
};
