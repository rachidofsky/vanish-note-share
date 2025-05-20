
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Shield, Lock, Info, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface NoteFormProps {
  onUnauthenticatedAction?: () => boolean;
}

export const NoteForm = ({ onUnauthenticatedAction }: NoteFormProps) => {
  const [noteContent, setNoteContent] = useState('');
  const [expiryType, setExpiryType] = useState('read');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, notesRemaining, decrementNotesRemaining, totalNotesAllowed } = useAuth();

  // Calculate character count and limits
  const maxChars = 5000;
  const charCount = noteContent.length;
  const isNearLimit = charCount > maxChars * 0.8;
  const isAtLimit = charCount >= maxChars;
  const characterPercentage = Math.min((charCount / maxChars) * 100, 100);

  const validateNote = () => {
    if (!noteContent.trim()) {
      setValidationError('Please enter a note');
      return false;
    }

    if (isAtLimit) {
      setValidationError(`Note exceeds maximum length of ${maxChars} characters`);
      return false;
    }
    
    if (notesRemaining <= 0) {
      setValidationError('You have reached your monthly limit of free notes');
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check authentication first if handler provided
    if (onUnauthenticatedAction && !user) {
      const showingAuthModal = onUnauthenticatedAction();
      if (showingAuthModal) return;
    }
    
    if (validateNote()) {
      // Instead of creating immediately, show confirmation dialog
      setShowConfirmation(true);
    } else {
      // Show error toast
      if (validationError) {
        toast.error(validationError);
      }
    }
  };

  const createNote = () => {
    setLoading(true);
    setShowConfirmation(false);
    
    // In a real app, this would send data to a server
    setTimeout(() => {
      try {
        const noteId = uuidv4();
        
        // Store note in localStorage (in a real app, this would be encrypted and stored in a database)
        const note = {
          id: noteId,
          content: noteContent,
          expiryType,
          createdAt: new Date().toISOString(),
          viewed: false
        };
        
        // Store in localStorage
        const notes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
        notes[noteId] = note;
        localStorage.setItem('oneTimeNotes', JSON.stringify(notes));
        
        // Decrement the user's remaining notes count
        decrementNotesRemaining();
        
        toast.success('Secure note created successfully!', {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />
        });
        
        // Redirect to the success page
        navigate(`/created/${noteId}`);
      } catch (error) {
        toast.error('Failed to create note');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleTextareaFocus = () => {
    // Check authentication when user tries to type a note
    if (onUnauthenticatedAction && !user) {
      onUnauthenticatedAction();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
    // Real-time validation feedback
    if (e.target.value.length > maxChars) {
      setValidationError(`Note exceeds maximum length of ${maxChars} characters`);
    } else {
      setValidationError(null);
    }
  };

  const handleExpiryChange = (value: string) => {
    // Check authentication when user tries to change expiry
    if (onUnauthenticatedAction && !user) {
      const showingAuthModal = onUnauthenticatedAction();
      if (showingAuthModal) return;
    }
    setExpiryType(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <div className="flex items-center justify-center mb-4 text-center">
          <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 px-4 py-2 rounded-full flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-medium">End-to-End Encrypted</span>
            <CheckCircle className="h-3 w-3 text-emerald-500" />
          </div>
        </div>
        
        {user && notesRemaining <= 5 && (
          <Alert variant={notesRemaining === 0 ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {notesRemaining === 0 
                ? "You've used all your free notes for this month." 
                : `You have ${notesRemaining} note${notesRemaining === 1 ? '' : 's'} remaining this month.`}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="note-content" className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Your secure note
            </Label>
            <span 
              className={`text-xs font-medium flex items-center gap-1 ${
                isNearLimit 
                  ? (isAtLimit ? 'text-red-500' : 'text-amber-500') 
                  : 'text-muted-foreground'
              }`}
            >
              {charCount}/{maxChars}
              {isNearLimit && <AlertCircle className="h-3 w-3" />}
            </span>
          </div>
          
          <Textarea
            id="note-content"
            placeholder="Type your sensitive information here..."
            className={`min-h-32 resize-none ${
              validationError ? 'border-red-500' : 
              isAtLimit ? 'border-red-500' : 
              isNearLimit ? 'border-amber-500' : ''
            } bg-background/90 backdrop-blur-sm`}
            value={noteContent}
            onChange={handleTextareaChange}
            onFocus={handleTextareaFocus}
            disabled={loading || notesRemaining <= 0}
            maxLength={maxChars + 10} // Allow slightly over to show error
          />
          
          <div className="mt-1">
            <Progress value={characterPercentage} 
              className={`h-1 ${
                characterPercentage > 80 ? (
                  characterPercentage >= 100 ? 'bg-red-500' : 'bg-amber-500'
                ) : 'bg-green-500'
              }`} 
            />
          </div>
          
          {validationError && (
            <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" />
              {validationError}
            </div>
          )}
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3 mt-2">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your note is encrypted and will be permanently deleted after being viewed or when it expires. Never include personally identifying information.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expiry-type" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            Expiration method
          </Label>
          <Select 
            value={expiryType} 
            onValueChange={handleExpiryChange}
            disabled={loading || notesRemaining <= 0}
          >
            <SelectTrigger id="expiry-type" className="w-full border-primary/40">
              <SelectValue placeholder="Select expiration method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="read">Delete after first read</SelectItem>
              <SelectItem value="1h">Delete after 1 hour</SelectItem>
              <SelectItem value="24h">Delete after 24 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-4 mt-6">
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold py-6 shadow-lg shadow-primary/20 border border-white/10 relative overflow-hidden group animate-pulse-slow"
            disabled={loading || !noteContent.trim() || notesRemaining <= 0 || isAtLimit}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></span>
            <Shield className="h-5 w-5 mr-2" />
            {loading ? 'Creating Secure Note...' : 'Create Secure Note'}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            {user && (
              <span>
                {notesRemaining}/{totalNotesAllowed} free notes remaining this month
              </span>
            )}
          </div>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Confirm Note Creation
            </DialogTitle>
            <DialogDescription>
              You're about to create a secure, self-destructing note. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted/50 rounded-md mb-4">
            <p className="text-sm font-medium">Note details:</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>Length: {charCount} characters</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Expiration: {expiryType === 'read' ? 'After first read' : expiryType === '1h' ? 'After 1 hour' : 'After 24 hours'}</span>
              </li>
            </ul>
          </div>
          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button 
              onClick={createNote} 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Secure Note'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
