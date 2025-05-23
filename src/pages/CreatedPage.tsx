
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AdUnit } from '@/components/AdUnit';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { NoteDetailsCard } from '@/components/NoteSharing/NoteDetailsCard';
import { SharingButtons } from '@/components/NoteSharing/SharingButtons';
import { EmailDialog } from '@/components/NoteSharing/EmailDialog';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { toast } from 'sonner';

const CreatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noteDetails, setNoteDetails] = useState<any>(null);
  const shareUrl = `${window.location.origin}/note/${id}`;
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  useEffect(() => {
    // Get note details from localStorage
    try {
      // Device info for debugging
      const deviceInfo = `Device: ${isMobile ? 'Mobile' : 'Desktop'}, UA: ${navigator.userAgent.substring(0, 50)}...`;
      setDebugInfo(deviceInfo);
      
      console.log("Created page loaded for note ID:", id);
      console.log("Share URL:", shareUrl);
      console.log("Is mobile device:", isMobile);
      
      // Verify localStorage functionality
      const hasLocalStorage = typeof localStorage !== 'undefined' && localStorage !== null;
      console.log("Local storage available:", hasLocalStorage);
      
      if (!hasLocalStorage) {
        toast.error("Storage access error", {
          description: "Your browser has limited storage access"
        });
        return;
      }
      
      // Test the localStorage
      try {
        localStorage.setItem('test-created', 'test');
        const testValue = localStorage.getItem('test-created');
        console.log("Storage test result:", testValue === 'test' ? 'Success' : 'Failed');
        localStorage.removeItem('test-created');
      } catch (storageErr) {
        console.error("Storage test error:", storageErr);
        toast.error("Storage access issue", {
          description: "There was a problem accessing your browser's storage"
        });
      }
      
      const notesJson = localStorage.getItem('oneTimeNotes');
      console.log("Notes in storage:", notesJson ? 'Found' : 'Not found');
      
      if (notesJson) {
        const notes = JSON.parse(notesJson);
        console.log("Available note IDs:", Object.keys(notes).join(", "));
        
        if (notes[id || '']) {
          setNoteDetails({
            expiryType: notes[id || ''].expiryType,
            passwordProtected: notes[id || ''].passwordProtected
          });
          
          console.log("Note details fetched successfully");
          
          // For mobile, verify the note data is complete
          if (isMobile) {
            const noteData = notes[id || ''];
            console.log("Mobile verification - note data:", {
              hasId: !!noteData.id,
              hasContent: !!noteData.content,
              hasExpiryType: !!noteData.expiryType,
              isPasswordProtected: !!noteData.passwordProtected
            });
          }
        } else {
          console.log("Note ID not found in storage:", id);
        }
      } else {
        console.log("No notes found in storage");
      }
    } catch (err) {
      console.error("Error accessing note details:", err);
      toast.error("Could not access note details");
    }
  }, [id, shareUrl, isMobile]);
  
  return (
    <div className="flex flex-col items-center mx-auto p-4 w-full max-w-2xl">
      {isMobile && import.meta.env.DEV && (
        <Alert className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            Mobile device detected. Note link has been generated for sharing.
          </AlertDescription>
        </Alert>
      )}
      
      <NoteDetailsCard 
        noteDetails={noteDetails} 
        shareUrl={shareUrl} 
        debugInfo={debugInfo}
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
