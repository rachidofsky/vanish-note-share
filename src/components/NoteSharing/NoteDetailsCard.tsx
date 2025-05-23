
import { Check, Clock, Lock, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from '@/components/CopyButton';
import { useIsMobile } from '@/hooks/use-mobile';

interface NoteDetailsProps {
  noteDetails: {
    expiryType?: string;
    passwordProtected?: boolean;
  } | null;
  shareUrl: string;
  debugInfo?: string | null;
}

export const NoteDetailsCard = ({ noteDetails, shareUrl, debugInfo }: NoteDetailsProps) => {
  const isMobile = useIsMobile();
  
  const renderExpiryInfo = () => {
    if (!noteDetails) return 'This note will self-destruct after being viewed.';
    
    switch (noteDetails.expiryType) {
      case 'read':
        return 'This note will be permanently deleted after it is viewed once.';
      case '1h':
        return 'This note will be permanently deleted after 1 hour.';
      case '24h':
        return 'This note will be permanently deleted after 24 hours.';
      default:
        return 'This note will self-destruct after being viewed.';
    }
  };

  return (
    <Card className="w-full shadow-lg shadow-primary/10 border-primary/20 backdrop-blur-md bg-card/80">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl">Note Created Successfully!</CardTitle>
        <CardDescription className="text-base max-w-md mx-auto">
          Your secure note is ready to be shared with the recipient.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-2 font-medium">Note link:</div>
          <div className="flex items-center gap-2 bg-accent/40 border border-primary/10 rounded-md px-3 py-2 overflow-hidden">
            <div className="truncate text-sm">{shareUrl}</div>
            <CopyButton textToCopy={shareUrl} compact={true} />
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground space-y-2">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
              <div>{renderExpiryInfo()}</div>
            </div>
            
            {noteDetails?.passwordProtected && (
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <div>This note is password protected. The recipient will need the password to view it.</div>
              </div>
            )}
            
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-500" />
              <div>
                Make sure to copy this link now. For security reasons, we don't store it anywhere and you won't be able to access it again.
              </div>
            </div>
          </div>
          
          {/* Special note for mobile users */}
          {isMobile && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>For mobile sharing:</strong> To ensure the recipient can access this note properly, we recommend using the share buttons below instead of copying the link manually.
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Debug info for development or when explicitly enabled */}
        {(import.meta.env.DEV || window.location.hostname === 'localhost') && debugInfo && (
          <div className="p-2 border border-dashed border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs overflow-auto">
            <p className="font-mono break-words whitespace-pre-wrap">Debug: {debugInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
