
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from './CopyButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface NoteCardProps {
  id: string;
}

export const NoteCard = ({ id }: NoteCardProps) => {
  const [note, setNote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);
  const [hasReadNote, setHasReadNote] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
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
        
        // Set the note content without marking as viewed yet
        setNote(foundNote);
        setIsLoading(false);
        
      } catch (err) {
        setError('An error occurred while retrieving the note.');
        setIsLoading(false);
      }
    };
    
    fetchNote();
  }, [id]);
  
  const handleViewNote = () => {
    setIsConfirmed(true);
    
    // Only mark as viewed if not previously viewed
    if (note && !note.viewed) {
      // Wait a moment to give time to read before starting the countdown
      setTimeout(() => {
        setHasReadNote(true);
        
        // Mark as viewed in localStorage
        const updatedNotes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
        if (updatedNotes[id]) {
          updatedNotes[id].viewed = true;
          localStorage.setItem('oneTimeNotes', JSON.stringify(updatedNotes));
        }
        
        // Start countdown for deletion
        const countdownTimer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownTimer);
              // Delete note after countdown
              setTimeout(() => {
                const finalNotes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
                delete finalNotes[id];
                localStorage.setItem('oneTimeNotes', JSON.stringify(finalNotes));
                setNote(null);
                setError('This note has self-destructed and is no longer available.');
              }, 500);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 2000); // Wait 2 seconds before marking as viewed
    } else if (note && note.viewed) {
      // If already viewed but still in storage (during countdown period),
      // we still show it but with proper message
      setHasReadNote(true);
      setCountdown(0);
    }
  };
  
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
  
  if (!isConfirmed) {
    return (
      <Card className="w-full max-w-lg animate-fade-in">
        <CardHeader>
          <CardTitle>Secure Note Ready</CardTitle>
          <CardDescription>
            Someone has shared a secure, self-destructing note with you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-amber-50 text-amber-800 border-amber-200">
            <AlertDescription>
              ⚠️ This note will be permanently deleted after viewing. Only view when you're ready to read the contents.
            </AlertDescription>
          </Alert>
          
          <Button 
            onClick={handleViewNote} 
            className="w-full"
          >
            I'm ready to view this secure note
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-lg animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle>Secure Note</CardTitle>
        <CardDescription>
          {hasReadNote ? 
            (countdown > 0 
              ? `This note will self-destruct in ${countdown} seconds` 
              : "This note has been viewed and will be deleted soon")
            : "Reading your secure note..."}
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
