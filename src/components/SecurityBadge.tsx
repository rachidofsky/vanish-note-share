
import { Shield, Lock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SecurityBadge = ({ className }: { className?: string }) => {
  return (
    <div className={cn("fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600/90 to-cyan-600/90 px-3 py-2 text-white shadow-lg backdrop-blur-md border border-white/20", className)}>
      <Lock className="h-4 w-4" />
      <span className="text-xs font-medium">Secure Connection</span>
      <CheckCircle className="h-4 w-4 text-green-300" />
    </div>
  );
};
