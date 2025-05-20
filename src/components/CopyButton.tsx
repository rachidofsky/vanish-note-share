
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  successMessage?: string;
  compact?: boolean;
}

export const CopyButton = ({ 
  textToCopy, 
  className = '', 
  successMessage = 'Copied to clipboard!',
  compact = false
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success(successMessage, {
        icon: <CheckCircle className="h-4 w-4" />
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={copied ? "secondary" : "outline"} 
            size={compact ? "icon" : "sm"} 
            onClick={copyToClipboard} 
            className={`transition-all duration-300 ${className} ${
              copied 
                ? 'bg-green-500/20 text-green-700 border-green-500/50' 
                : ''
            } ${compact ? 'w-8 h-8 p-0' : 'text-xs flex items-center gap-1'}`}
          >
            {copied ? (
              <>
                <Check className={compact ? "h-4 w-4" : "h-3.5 w-3.5"} />
                {!compact && 'Copied!'}
              </>
            ) : (
              <>
                <Copy className={compact ? "h-4 w-4" : "h-3.5 w-3.5"} />
                {!compact && 'Copy'}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? 'Copied!' : 'Copy to clipboard'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
