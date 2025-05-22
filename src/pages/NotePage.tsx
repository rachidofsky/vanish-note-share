
import { useParams } from 'react-router-dom';
import { NoteCard } from '@/components/NoteCard';
import { AdUnit } from '@/components/AdUnit';
import { useEffect } from 'react';

const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // Enhanced logging for debugging
    console.log("NotePage loaded with ID:", id);
    
    // Check local storage to see if the note exists
    const notes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
    console.log("Notes in storage:", Object.keys(notes));
    
    if (id) {
      console.log(`Note ${id} exists in storage:`, !!notes[id]);
    }
    
    // Log device details
    console.log("User Agent:", navigator.userAgent);
    console.log("Window Width:", window.innerWidth);
    console.log("Touch Points:", navigator.maxTouchPoints);
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
