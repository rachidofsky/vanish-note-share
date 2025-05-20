
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/CopyButton';
import { Check, Lock, Clock, AlertTriangle, Mail, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AdUnit } from '@/components/AdUnit';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const CreatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noteDetails, setNoteDetails] = useState<any>(null);
  const shareUrl = `${window.location.origin}/note/${id}`;
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    // Get note details from localStorage
    const notes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
    if (notes[id || '']) {
      setNoteDetails({
        expiryType: notes[id || ''].expiryType,
        passwordProtected: notes[id || ''].passwordProtected
      });
    }
  }, [id]);
  
  const renderExpiryInfo = () => {
    if (!noteDetails) return null;
    
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
  
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailSending(true);
    
    try {
      // Call the Supabase Edge Function to send email
      const { data, error } = await supabase.functions.invoke('send-note-email', {
        body: {
          recipientEmail: emailInput,
          noteLink: shareUrl,
          senderEmail: user?.email
        }
      });
      
      if (error) {
        console.error('Error sending email:', error);
        toast.error('Failed to send email', {
          description: error.message || 'Please try again later.'
        });
      } else {
        toast.success(`Link sent to ${emailInput}`, {
          description: "The secure note link has been emailed successfully."
        });
        setEmailDialogOpen(false);
        setEmailInput('');
      }
    } catch (err: any) {
      console.error('Exception sending email:', err);
      toast.error('Failed to send email', {
        description: err.message || 'Please try again later.'
      });
    } finally {
      setIsEmailSending(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center mx-auto p-4 w-full max-w-2xl">
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
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button 
              variant="outline" 
              className="w-full" 
              asChild
            >
              <Link to="/">Create another note</Link>
            </Button>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              onClick={() => setEmailDialogOpen(true)}
            >
              <Mail className="mr-2 h-4 w-4" /> Send via Email
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Note Link via Email</DialogTitle>
            <DialogDescription>
              Enter the recipient's email address to send them the secure note link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendEmail}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="recipient@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  disabled={isEmailSending}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Only the link to access the note will be sent. The note content remains secure.
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setEmailDialogOpen(false)} disabled={isEmailSending}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                disabled={!emailInput || isEmailSending}
              >
                {isEmailSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Link'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Ad below the note card */}
      <div className="w-full mt-8">
        <AdUnit adSlot="5678901234" adFormat="rectangle" />
      </div>
    </div>
  );
};

export default CreatedPage;
