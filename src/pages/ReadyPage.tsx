
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';

const ReadyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [noteExists, setNoteExists] = useState(false);

  useEffect(() => {
    // Check if the note exists in localStorage
    const checkNoteExists = () => {
      try {
        const notesJson = localStorage.getItem('oneTimeNotes');
        if (notesJson) {
          const notes = JSON.parse(notesJson);
          setNoteExists(!!notes[id]);
        }
      } catch (err) {
        console.error('Error checking note existence:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      checkNoteExists();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleProceed = () => {
    if (id) {
      navigate(`/note/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!id || !noteExists) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-lg border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle>Note Not Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                This note does not exist or has already been viewed.
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Button 
                variant="outline"
                className="w-full"
                asChild
              >
                <a href="/">Create a new note</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg animate-fade-in border-primary/20 backdrop-blur-md bg-card/80 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Are you ready for the secure message?</CardTitle>
          <CardDescription className="text-base">
            Someone has shared a confidential note with you
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">End-to-End Encrypted</span>
          </div>
          
          <Alert className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <strong>Important:</strong> This message will self-destruct immediately after viewing. Make sure you're ready to read it now.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>The message will be permanently deleted after viewing</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>You won't be able to access it again</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>Make sure you're in a private location</div>
            </div>
          </div>
          
          <Button 
            onClick={handleProceed}
            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white text-lg py-6"
          >
            Yes, I'm ready to view the message
          </Button>
          
          <Button 
            variant="outline"
            className="w-full"
            asChild
          >
            <a href="/">Not now - Create my own secure note</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadyPage;
