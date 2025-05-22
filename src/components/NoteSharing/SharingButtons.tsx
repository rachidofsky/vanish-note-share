
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SharingButtonsProps {
  isMobile: boolean;
  shareUrl: string;
  onEmailClick: () => void;
}

export const SharingButtons = ({ isMobile, shareUrl, onEmailClick }: SharingButtonsProps) => {
  // On mobile, direct SMS sharing via native share API
  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Secure Note',
          text: 'I\'ve shared a secure note with you. This note may self-destruct after viewing.',
          url: shareUrl
        });
        toast.success('Ready to share via SMS or any app');
      } else {
        toast.error('Sharing not supported on this device');
      }
    } catch (err: any) {
      console.error('Error sharing:', err);
      if (err.name !== 'AbortError') {
        toast.error('Failed to share note');
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-2">
      <Button 
        variant="outline" 
        className="w-full" 
        asChild
      >
        <Link to="/">Create another note</Link>
      </Button>
      
      <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-1"} w-full gap-2`}>
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          onClick={onEmailClick}
        >
          <Mail className="mr-2 h-4 w-4" /> Send via Email
        </Button>
        
        {isMobile && (
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={handleNativeShare}
          >
            <Phone className="mr-2 h-4 w-4" /> Send via SMS
          </Button>
        )}
      </div>
    </div>
  );
};
