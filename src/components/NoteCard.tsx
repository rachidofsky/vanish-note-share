
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from './CopyButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, AlertTriangle, Eye, EyeOff } from 'lucide-react';

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
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  
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

  const verifyPassword = () => {
    setIsVerifyingPassword(true);
    setPasswordError(null);

    // In a real implementation, this would be a secure comparison of hashed passwords
    setTimeout(() => {
      if (note && note.passwordProtected && password === note.password) {
        setIsVerifyingPassword(false);
        handleViewNote();
      } else {
        setIsVerifyingPassword(false);
        setPasswordError('Incorrect password. Please try again.');
      }
    }, 800); // Simulate API call delay
  };
  
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
      <Card className="w-full max-w-lg animate-pulse-slow border border-primary/20 shadow-lg shadow-primary/5 backdrop-blur-md bg-card/80">
        <CardHeader>
          <div className="flex items-center justify-center gap-2">
            <Lock className="h-5 w-5 text-primary animate-pulse" />
            <CardTitle>Decrypting secure note...</CardTitle>
          </div>
          <CardDescription>Please wait while we verify and decrypt your note</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted/50 rounded-md shimmer-bg"></div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full max-w-lg border-destructive/50 bg-destructive/5 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle>Note Unavailable</CardTitle>
          </div>
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
      <Card className="w-full max-w-lg animate-fade-in border-primary/20 backdrop-blur-md bg-card/80 shadow-lg">
        <CardHeader className="border-b border-primary/10">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Secure Note Ready</CardTitle>
          </div>
          <CardDescription className="text-center">
            Someone has shared a secure, self-destructing note with you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium text-green-600">End-to-End Encrypted</span>
          </div>
          
          <Alert className="bg-amber-50 text-amber-800 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              This note will be permanently deleted after viewing. Only view when you're ready to read the contents.
            </AlertDescription>
          </Alert>
          
          {/* Password entry form for protected notes */}
          {note && note.passwordProtected ? (
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-primary/10">
              <div className="flex justify-center">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Password Protected
                </div>
              </div>
              
              <Label htmlFor="note-password">Enter password to view this note</Label>
              <div className="relative">
                <Input
                  id="note-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the note password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(null);
                  }}
                  className={passwordError ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {passwordError && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {passwordError}
                </p>
              )}
              
              <Button 
                onClick={verifyPassword} 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                disabled={isVerifyingPassword || !password.trim()}
              >
                {isVerifyingPassword ? 'Verifying...' : 'Unlock Note'}
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleViewNote} 
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
            >
              I'm ready to view this secure note
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-lg animate-fade-in border-primary/20 backdrop-blur-md bg-card/80 shadow-lg">
      <CardHeader className="pb-2 border-b border-primary/10">
        <div className="flex items-center justify-center gap-2">
          {hasReadNote ? 
            <AlertTriangle className="h-5 w-5 text-amber-500" /> : 
            <Lock className="h-5 w-5 text-primary" />
          }
          <CardTitle>Secure Note</CardTitle>
        </div>
        <CardDescription className="text-center">
          {hasReadNote ? 
            (countdown > 0 
              ? `This note will self-destruct in ${countdown} seconds` 
              : "This note has been viewed and will be deleted soon")
            : "Reading your secure note..."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="p-4 bg-accent/50 rounded-md min-h-32 whitespace-pre-wrap break-words border border-primary/10 backdrop-blur-sm">
          {note.content}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium text-green-600">Secure Note</span>
          </div>
          <CopyButton textToCopy={note.content} />
        </div>
      </CardContent>
    </Card>
  );
};
