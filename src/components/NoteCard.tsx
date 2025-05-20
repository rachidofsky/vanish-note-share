
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from './CopyButton';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NoteCardProps {
  id: string;
}

export const NoteCard = ({ id }: NoteCardProps) => {
  const [note, setNote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    // In a real app, this would be fetching from an API
    const fetchNote = () => {
      try {
        setIsLoading(true);
        
        const notes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
        const foundNote = notes[id];
        
        if (!foundNote) {
          setError('This note does not exist or has already been viewed.');
          setIsLoading(false);
          return;
        }
        
        // If note exists and hasn't been viewed yet
        setNote(foundNote);
        
        // Only mark as viewed if not previously viewed
        if (!foundNote.viewed) {
          // Mark as viewed
          foundNote.viewed = true;
          notes[id] = foundNote;
          localStorage.setItem('oneTimeNotes', JSON.stringify(notes));
          
          // Start countdown
          const timer = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                // Delete note after countdown
                setTimeout(() => {
                  const updatedNotes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
                  delete updatedNotes[id];
                  localStorage.setItem('oneTimeNotes', JSON.stringify(updatedNotes));
                  setNote(null);
                  setError('This note has self-destructed and is no longer available.');
                }, 500);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          // If already viewed but still in storage (during countdown period),
          // we still show it but with proper message
          setCountdown(0);
        }
      } catch (err) {
        setError('An error occurred while retrieving the note.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNote();
  }, [id]);
  
  if (isLoading) {
    return (
      <Card className="w-full max-w-lg animate-pulse-slow">
        <CardHeader>
          <CardTitle>Loading secure note...</CardTitle>
          <CardDescription>Please wait</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted rounded-md"></div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full max-w-lg border-destructive">
        <CardHeader>
          <CardTitle>Note Unavailable</CardTitle>
          <CardDescription>This note cannot be accessed</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-lg animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle>Secure Note</CardTitle>
        <CardDescription>
          {countdown > 0 
            ? `This note will self-destruct in ${countdown} seconds` 
            : "This note has been viewed and will be deleted soon"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-accent rounded-md min-h-32 whitespace-pre-wrap break-words">
          {note.content}
        </div>
        
        <div className="flex justify-end">
          <CopyButton textToCopy={note.content} />
        </div>
      </CardContent>
    </Card>
  );
};
