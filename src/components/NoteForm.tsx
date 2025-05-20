
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const NoteForm = () => {
  const [noteContent, setNoteContent] = useState('');
  const [expiryType, setExpiryType] = useState('read');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!noteContent.trim()) {
      toast.error('Please enter a note');
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
        
        // Redirect to the success page
        navigate(`/created/${noteId}`);
      } catch (error) {
        toast.error('Failed to create note');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
      <div className="space-y-2">
        <Label htmlFor="note-content">Your secure note</Label>
        <Textarea
          id="note-content"
          placeholder="Type your sensitive information here..."
          className="min-h-32 resize-none"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expiry-type">Expiration method</Label>
        <Select 
          value={expiryType} 
          onValueChange={setExpiryType}
          disabled={loading}
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
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading || !noteContent.trim()}
      >
        {loading ? 'Creating...' : 'Create Secure Note'}
      </Button>
    </form>
  );
};
