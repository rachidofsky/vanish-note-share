
import { useParams } from 'react-router-dom';
import { NoteCard } from '@/components/NoteCard';
import { AdUnit } from '@/components/AdUnit';
import { useEffect } from 'react';

const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // Log when the note page is accessed for debugging
    console.log("NotePage loaded with ID:", id);
  }, [id]);
  
  if (!id) {
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
