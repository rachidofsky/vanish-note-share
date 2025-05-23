
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NoteCard } from '@/components/NoteCard';
import { AdUnit } from '@/components/AdUnit';
import { toast } from 'sonner';

const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  useEffect(() => {
    // Enhanced logging for debugging
    console.log("NotePage loaded with ID:", id);
    
    // Gather device information
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const windowWidth = window.innerWidth;
    const userAgent = navigator.userAgent;
    const touchPoints = navigator.maxTouchPoints;
    const hasLocalStorage = typeof localStorage !== 'undefined' && localStorage !== null;
    
    // Log all device details
    console.log("User Agent:", userAgent);
    console.log("Window Width:", windowWidth);
    console.log("Touch Points:", touchPoints);
    console.log("Is Mobile:", isMobile);
    console.log("Local Storage Available:", hasLocalStorage);
    
    // Detailed debug info
    const debugText = `Device: ${isMobile ? 'Mobile' : 'Desktop'}, Width: ${windowWidth}px, Local Storage: ${hasLocalStorage ? 'Available' : 'Unavailable'}`;
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
      
      // Check local storage to see if the note exists
      const notes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
      console.log("Notes in storage:", Object.keys(notes));
      
      const noteExists = !!notes[id];
      console.log(`Note ${id} exists in storage:`, noteExists);
      
      if (!noteExists) {
        const errorMsg = "The note may have been deleted or already viewed";
        setErrorMessage(errorMsg);
        setHasError(true);
        toast.error("Note not found", {
          description: errorMsg
        });
      }
      
      // Additional debugging for mobile
      if (isMobile) {
        console.log("Mobile device detected, notes data structure:", 
          Object.keys(notes).length > 0 ? "Notes exist" : "No notes in storage");
      }
      
    } catch (err) {
      console.error("Error checking note existence:", err);
      setErrorMessage("Error accessing note data");
      setHasError(true);
      toast.error("Error loading note");
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="text-destructive font-medium">Invalid note ID</div>
        <div className="text-sm text-muted-foreground mt-2">The URL appears to be incorrect or incomplete</div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center mx-auto p-4 w-full">
      {/* Pass all necessary debug information to the NoteCard */}
      <NoteCard 
        id={id} 
        initialErrorState={hasError} 
        errorMessage={errorMessage} 
        debugInfo={debugInfo} 
      />
      
      {/* Ad below the note card - this will show briefly before self-destruction */}
      <div className="w-full max-w-lg mt-8">
        <AdUnit adSlot="5678901234" adFormat="rectangle" />
      </div>
    </div>
  );
};

export default NotePage;
