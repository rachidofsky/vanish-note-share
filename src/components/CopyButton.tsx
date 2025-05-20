
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
  showText?: boolean;
}

export const CopyButton = ({ 
  textToCopy, 
  className = '', 
  successMessage = 'Copied to clipboard!',
  compact = false,
  showText = true
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
            variant={copied ? "default" : "default"} 
            size={compact ? "icon" : "sm"} 
            onClick={copyToClipboard} 
            className={`copy-button animate-pulse-slow transition-all duration-300 ${className} ${
              copied 
                ? 'bg-green-500 text-white shadow-neon border-green-500/50' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
            } ${compact ? 'w-16 h-8 p-0' : 'text-xs flex items-center gap-1 w-[calc(100%*2)]'} relative overflow-hidden group`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></span>
            {copied ? (
              <>
                <Check className={`${compact ? "h-4 w-4" : "h-3.5 w-3.5"} animate-pulse-slow text-white`} />
                {showText && !compact && 'Copied!'}
              </>
            ) : (
              <>
                <Copy className={`${compact ? "h-5 w-5" : "h-4 w-4"} animate-float will-change-transform text-white`} />
                {showText && !compact && 'Copy'}
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
