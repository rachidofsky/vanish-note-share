
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AdUnit } from '@/components/AdUnit';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { NoteDetailsCard } from '@/components/NoteSharing/NoteDetailsCard';
import { SharingButtons } from '@/components/NoteSharing/SharingButtons';
import { EmailDialog } from '@/components/NoteSharing/EmailDialog';

const CreatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noteDetails, setNoteDetails] = useState<any>(null);
  const shareUrl = `${window.location.origin}/note/${id}`;
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Get note details from localStorage
    const notes = JSON.parse(localStorage.getItem('oneTimeNotes') || '{}');
    if (notes[id || '']) {
      setNoteDetails({
        expiryType: notes[id || ''].expiryType,
        passwordProtected: notes[id || ''].passwordProtected
      });
    }
    
    console.log("Created page loaded for note ID:", id);
    console.log("Share URL:", shareUrl);
    console.log("Is mobile device:", isMobile);
    
  }, [id, shareUrl, isMobile]);
  
  return (
    <div className="flex flex-col items-center mx-auto p-4 w-full max-w-2xl">
      <NoteDetailsCard 
        noteDetails={noteDetails} 
        shareUrl={shareUrl} 
      />
      
      <div className="w-full mt-6">
        <SharingButtons 
          isMobile={isMobile} 
          shareUrl={shareUrl} 
          onEmailClick={() => setEmailDialogOpen(true)} 
        />
      </div>
      
      <EmailDialog 
        open={emailDialogOpen} 
        onOpenChange={setEmailDialogOpen} 
        shareUrl={shareUrl} 
        senderEmail={user?.email} 
      />
      
      {/* Ad below the note card */}
      <div className="w-full mt-8">
        <AdUnit adSlot="5678901234" adFormat="rectangle" />
      </div>
    </div>
  );
};

export default CreatedPage;
