
import { useState } from 'react';
import { Shield, Lock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

export const SecurityBadge = ({ className }: { className?: string }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600/90 to-cyan-600/90 px-3 py-2 text-white shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer hover:shadow-xl hover:from-green-600 hover:to-cyan-600",
              expanded ? "px-4 py-2.5" : "",
              className
            )}
            onClick={() => setExpanded(!expanded)}
          >
            <div className="relative">
              <Lock className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <span className="text-xs font-medium">Secure Connection</span>
            <CheckCircle className="h-4 w-4 text-green-300" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="p-4 max-w-xs">
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Security Information
            </h4>
            <p className="text-xs text-muted-foreground">
              Your connection to OneTimeNote is encrypted using TLS 1.3. All notes are encrypted with AES-256 encryption before storage.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
