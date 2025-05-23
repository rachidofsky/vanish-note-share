
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NoteCard } from '@/components/NoteCard';
import { AdUnit } from '@/components/AdUnit';
import { toast } from 'sonner';

const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Enhanced logging for debugging
    console.log("NotePage loaded with ID:", id);
    
    // Validate if the note exists in localStorage
    try {
      // Check local storage to see if the note exists
      const notes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
      console.log("Notes in storage:", Object.keys(notes));
      
      if (id) {
        const noteExists = !!notes[id];
        console.log(`Note ${id} exists in storage:`, noteExists);
        
        if (!noteExists) {
          toast.error("Note not found", {
            description: "The note may have been deleted or already viewed"
          });
          setHasError(true);
        }
      }
    } catch (err) {
      console.error("Error checking note existence:", err);
      toast.error("Error loading note");
      setHasError(true);
    }
    
    // Log device details
    console.log("User Agent:", navigator.userAgent);
    console.log("Window Width:", window.innerWidth);
    console.log("Touch Points:", navigator.maxTouchPoints);
    console.log("Is Mobile:", /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    console.log("Local Storage Available:", !!window.localStorage);
    
    setIsLoading(false);
  }, [id]);
  
  if (!id) {
    console.error("NotePage: No ID provided in URL parameters");
    return <div>Invalid note ID</div>;
  }
  
  return (
    <div className="flex flex-col items-center mx-auto p-4 w-full">
      <NoteCard id={id} />
      
      {/* Ad below the note card - this will show briefly before self-destruction */}
      <div className="w-full max-w-lg mt-8">
        <AdUnit adSlot="5678901234" adFormat="rectangle" />
      </div>
    </div>
  );
};

export default NotePage;
