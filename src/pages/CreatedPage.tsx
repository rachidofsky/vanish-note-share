
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/CopyButton';
import { Check, Lock, Clock, AlertTriangle, Mail, Loader2, Phone } from 'lucide-react';
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
import { useIsMobile } from '@/hooks/use-mobile';

// Define constants for Supabase URLs and keys
const SUPABASE_URL = "https://njgtazruxbmyitstqsaj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ3RhenJ1eGJteWl0c3Rxc2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NDYyMjYsImV4cCI6MjA2MzAyMjIyNn0.5Cgc8xcm68F111w-QQGNGxAPkVL_p6MSdC2oUl9qzRw";

const CreatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noteDetails, setNoteDetails] = useState<any>(null);
  const shareUrl = `${window.location.origin}/note/${id}`;
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Get note details from localStorage
    const notes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
    if (notes[id || '']) {
      setNoteDetails({
        expiryType: notes[id || ''].expiryType,
        passwordProtected: notes[id || ''].passwordProtected
      });
    }
    
    console.log("Created page loaded for note ID:", id);
    console.log("Share URL:", shareUrl);
    console.log("Is mobile device:", isMobile);
    
  }, [id, shareUrl, isMobile]);
  
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
      console.log("Sending email to:", emailInput);
      console.log("Note link:", shareUrl);
      console.log("Sender email:", user?.email);
      
      // Enhanced error handling for edge function call using the constants
      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-note-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          recipientEmail: emailInput,
          noteLink: shareUrl,
          senderEmail: user?.email
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
      
      const data = await response.json();
      console.log("Email sent successfully:", data);
      
      toast.success(`Link sent to ${emailInput}`, {
        description: "The secure note link has been emailed successfully."
      });
      setEmailDialogOpen(false);
      setEmailInput('');
    } catch (err: any) {
      console.error('Exception sending email:', err);
      toast.error('Failed to send email', {
        description: err.message || 'Please try again later.'
      });
    } finally {
      setIsEmailSending(false);
    }
  };

  // On mobile, direct SMS sharing via native share API
  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Secure Note',
          text: 'I\'ve shared a secure note with you. This note may self-destruct after viewing.',
          url: shareUrl
        });
        toast.success('Ready to share via SMS or any app');
      } else {
        toast.error('Sharing not supported on this device');
      }
    } catch (err: any) {
      console.error('Error sharing:', err);
      if (err.name !== 'AbortError') {
        toast.error('Failed to share note');
      }
    }
  };
  
  const [emailInput, setEmailInput] = useState('');
  
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
            
            <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-1"} w-full gap-2`}>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                onClick={() => setEmailDialogOpen(true)}
              >
                <Mail className="mr-2 h-4 w-4" /> Send via Email
              </Button>
              
              {isMobile && (
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={handleNativeShare}
                >
                  <Phone className="mr-2 h-4 w-4" /> Send via SMS
                </Button>
              )}
            </div>
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
