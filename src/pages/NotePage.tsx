
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NoteCard } from '@/components/NoteCard';
import { AdUnit } from '@/components/AdUnit';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [noteExists, setNoteExists] = useState<boolean | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Enhanced logging for debugging
    console.log("NotePage loaded with ID:", id);
    console.log("Device is mobile:", isMobile);
    
    // Gather device information
    const windowWidth = window.innerWidth;
    const userAgent = navigator.userAgent;
    const touchPoints = navigator.maxTouchPoints;
    const hasLocalStorage = typeof localStorage !== 'undefined' && localStorage !== null;
    
    // Log all device details
    console.log("User Agent:", userAgent);
    console.log("Window Width:", windowWidth);
    console.log("Touch Points:", touchPoints);
    console.log("Local Storage Available:", hasLocalStorage);
    
    // Detailed debug info
    const debugText = `Device: ${isMobile ? 'Mobile' : 'Desktop'}, Width: ${windowWidth}px, Local Storage: ${hasLocalStorage ? 'Available' : 'Unavailable'}, UserAgent: ${userAgent.substring(0, 50)}...`;
    setDebugInfo(debugText);
    
    if (!id) {
      console.error("NotePage: No ID provided in URL parameters");
      setErrorMessage("Invalid note ID");
      setHasError(true);
      setIsLoading(false);
      return;
    }
    
    try {
      // Verify localStorage is available
      if (!hasLocalStorage) {
        const errorMsg = "Local storage is not available on this device";
        console.error(errorMsg);
        setErrorMessage(errorMsg);
        setHasError(true);
        setIsLoading(false);
        toast.error("Storage access error", {
          description: "Your browser doesn't support or blocks required storage features"
        });
        return;
      }
      
      // More detailed localStorage access testing
      try {
        // Test setting and getting from localStorage
        localStorage.setItem('test-storage', 'test');
        const testValue = localStorage.getItem('test-storage');
        console.log("Local storage test:", testValue === 'test' ? 'Successful' : 'Failed');
        localStorage.removeItem('test-storage');
      } catch (storageErr) {
        console.error("Local storage access test failed:", storageErr);
        setDebugInfo(prev => `${prev}\nStorage access test failed: ${storageErr instanceof Error ? storageErr.message : 'Unknown error'}`);
      }
      
      // Check local storage to see if the note exists
      console.log("Checking localStorage for notes...");
      const notesJson = localStorage.getItem('oneTimeNotes');
      console.log("Raw notes from storage:", notesJson ? `Found (length: ${notesJson.length})` : 'Not found');
      
      // If no notes in storage, create a test note for mobile devices
      // This helps determine if the issue is with storage or with a specific note
      if (isMobile && (!notesJson || notesJson === '{}')) {
        console.log("Mobile device with no notes found - creating a test note");
        const testNote = {
          id: "test-note",
          content: "This is a test note created to verify storage works",
          expiryType: "read",
          createdAt: new Date().toISOString(),
          viewed: false,
          passwordProtected: false
        };
        
        const testNotes = { "test-note": testNote };
        localStorage.setItem('oneTimeNotes', JSON.stringify(testNotes));
        console.log("Test note created in storage for diagnostics");
        
        // Now try reading it back
        const verifyJson = localStorage.getItem('oneTimeNotes');
        console.log("Verification - notes after test note creation:", verifyJson ? `Found (length: ${verifyJson.length})` : 'Still not found');
      }
      
      // Regular note checking flow continues
      if (!notesJson) {
        console.log("No notes found in localStorage");
        setErrorMessage(`No notes found in storage. This could be because the link is invalid or the note has already been viewed.`);
        setHasError(true);
        setNoteExists(false);
        toast.error("Note not found");
        return;
      }
      
      try {
        const notes = JSON.parse(notesJson);
        console.log("Notes in storage:", Object.keys(notes).length, "notes found");
        console.log("Available note IDs:", Object.keys(notes).join(", "));
        
        const noteExists = !!notes[id];
        setNoteExists(noteExists);
        console.log(`Note ${id} exists in storage:`, noteExists);
        
        if (!noteExists) {
          let errorMsg = "The note may have been deleted or already viewed";
          
          // For mobile, provide more detailed error message
          if (isMobile) {
            errorMsg = "Note not found. This may be because:\n1. The note has already been viewed\n2. The note has expired\n3. The link is incorrect";
          }
          
          setErrorMessage(errorMsg);
          setHasError(true);
          toast.error("Note not found", {
            description: errorMsg
          });
        }
        
        // Additional debugging for mobile
        if (isMobile) {
          console.log("Mobile device detected");
          console.log("Notes data structure:", 
            Object.keys(notes).length > 0 ? "Notes exist" : "No notes in storage");
            
          // For the requested note ID, log details if it exists
          if (notes[id]) {
            console.log("Found note details:", {
              id: notes[id].id,
              passwordProtected: !!notes[id].passwordProtected,
              expiryType: notes[id].expiryType || 'unknown',
              viewed: !!notes[id].viewed
            });
          }
        }
      } catch (parseError) {
        console.error("Error parsing notes from localStorage:", parseError);
        setErrorMessage("Error reading note data (invalid format)");
        setHasError(true);
        setDebugInfo(prev => `${prev}\nParse error: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        toast.error("Error loading note data");
      }
      
    } catch (err) {
      console.error("Error checking note existence:", err);
      setErrorMessage("Error accessing note data");
      setHasError(true);
      setDebugInfo(prev => `${prev}\nError: ${err instanceof Error ? err.message : 'Unknown error'}`);
      toast.error("Error loading note");
    } finally {
      setIsLoading(false);
    }
  }, [id, isMobile]);
  
  // Handle case when no ID is provided
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="text-destructive font-medium">Invalid note ID</div>
        <div className="text-sm text-muted-foreground mt-2">The URL appears to be incorrect or incomplete</div>
      </div>
    );
  }
  
  // For mobile devices with errors, show a custom mobile-friendly error card
  if (isMobile && hasError) {
    return (
      <div className="flex flex-col items-center mx-auto p-4 w-full">
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
              <AlertDescription>
                {errorMessage || "This note does not exist or has already been viewed."}
              </AlertDescription>
            </Alert>
            
            {/* Include a "create new note" button */}
            <div className="mt-6 mb-2">
              <Button 
                variant="default"
                className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
                asChild
              >
                <a href="/">Create a new note</a>
              </Button>
            </div>
            
            {/* Always show debug info on mobile error */}
            <div className="mt-4 p-2 border border-dashed border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs overflow-auto">
              <p className="font-mono break-words whitespace-pre-wrap">Debug: {debugInfo || 'No debug info available'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Default view (standard NoteCard)
  return (
    <div className="flex flex-col items-center mx-auto p-4 w-full">
      {/* Pass all necessary debug information to the NoteCard */}
      <NoteCard 
        id={id} 
        initialErrorState={hasError} 
        errorMessage={errorMessage} 
        debugInfo={debugInfo}
        noteExists={noteExists}
      />
      
      {/* Ad below the note card - this will show briefly before self-destruction */}
      <div className="w-full max-w-lg mt-8">
        <AdUnit adSlot="5678901234" adFormat="rectangle" />
      </div>
    </div>
  );
};

export default NotePage;
