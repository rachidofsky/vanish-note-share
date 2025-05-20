
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
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
        <Label htmlFor="note-content">Your secure note</Label>
        <Textarea
          id="note-content"
          placeholder="Type your sensitive information here..."
          className="min-h-32 resize-none"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onFocus={handleTextareaFocus}
          disabled={loading || notesRemaining <= 0}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expiry-type">Expiration method</Label>
        <Select 
          value={expiryType} 
          onValueChange={handleExpiryChange}
          disabled={loading || notesRemaining <= 0}
        >
          <SelectTrigger id="expiry-type" className="w-full">
            <SelectValue placeholder="Select expiration method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="read">Delete after first read</SelectItem>
            <SelectItem value="1h">Delete after 1 hour</SelectItem>
            <SelectItem value="24h">Delete after 24 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {user && (
            <span>
              {notesRemaining}/{totalNotesAllowed} free notes remaining this month
            </span>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-auto" 
          disabled={loading || !noteContent.trim() || notesRemaining <= 0}
        >
          {loading ? 'Creating...' : 'Create Secure Note'}
        </Button>
      </div>
    </form>
  );
};
