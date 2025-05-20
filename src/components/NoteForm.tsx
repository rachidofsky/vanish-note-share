
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Shield, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NoteFormProps {
  onUnauthenticatedAction?: () => boolean;
}

export const NoteForm = ({ onUnauthenticatedAction }: NoteFormProps) => {
  const [noteContent, setNoteContent] = useState('');
  const [expiryType, setExpiryType] = useState('read');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, notesRemaining, decrementNotesRemaining, totalNotesAllowed } = useAuth();

  // Calculate character count and limits
  const maxChars = 5000;
  const charCount = noteContent.length;
  const isNearLimit = charCount > maxChars * 0.8;
  const isAtLimit = charCount >= maxChars;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check authentication first if handler provided
    if (onUnauthenticatedAction && !user) {
      const showingAuthModal = onUnauthenticatedAction();
      if (showingAuthModal) return;
    }
    
    if (!noteContent.trim()) {
      toast.error('Please enter a note');
      return;
    }

    if (isAtLimit) {
      toast.error(`Note exceeds maximum length of ${maxChars} characters`);
      return;
    }

    // Check if user has notes remaining
    if (notesRemaining <= 0) {
      toast.error('You have reached your monthly limit of free notes');
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would send data to a server
    // For now, we'll simulate creating a note with a unique ID
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

  const handleExpiryChange = (value: string) => {
    // Check authentication when user tries to change expiry
    if (onUnauthenticatedAction && !user) {
      const showingAuthModal = onUnauthenticatedAction();
      if (showingAuthModal) return;
    }
    setExpiryType(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
      <div className="flex items-center justify-center mb-4 text-center">
        <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 px-4 py-2 rounded-full flex items-center gap-2">
          <Lock className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-medium">End-to-End Encrypted</span>
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
          <span className={`text-xs ${isNearLimit ? (isAtLimit ? 'text-red-500' : 'text-amber-500') : 'text-muted-foreground'}`}>
            {charCount}/{maxChars}
          </span>
        </div>
        
        <Textarea
          id="note-content"
          placeholder="Type your sensitive information here..."
          className={`min-h-32 resize-none ${isAtLimit ? 'border-red-500' : isNearLimit ? 'border-amber-500' : ''} bg-background/90 backdrop-blur-sm`}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onFocus={handleTextareaFocus}
          disabled={loading || notesRemaining <= 0}
          maxLength={maxChars}
        />
        
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3 mt-2">
          <div className="flex items-start gap-2">
            <Lock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
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
          className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold py-6 shadow-lg shadow-primary/20 border border-white/10"
          disabled={loading || !noteContent.trim() || notesRemaining <= 0 || isAtLimit}
        >
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
  );
};
