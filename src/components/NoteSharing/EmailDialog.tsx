
import { useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

// Define constants for Supabase URLs and keys
const SUPABASE_URL = "https://njgtazruxbmyitstqsaj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ3RhenJ1eGJteWl0c3Rxc2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NDYyMjYsImV4cCI6MjA2MzAyMjIyNn0.5Cgc8xcm68F111w-QQGNGxAPkVL_p6MSdC2oUl9qzRw";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareUrl: string;
  senderEmail?: string;
}

export const EmailDialog = ({ open, onOpenChange, shareUrl, senderEmail }: EmailDialogProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailSending(true);
    
    try {
      console.log("Sending email to:", emailInput);
      console.log("Note link:", shareUrl);
      console.log("Sender email:", senderEmail);
      
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
          senderEmail
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
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isEmailSending}>
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
  );
};
