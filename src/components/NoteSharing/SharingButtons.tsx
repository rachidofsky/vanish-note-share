
import { Link } from 'react-router-dom';
import { Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SharingButtonsProps {
  isMobile: boolean;
  shareUrl: string;
  onEmailClick: () => void;
}

export const SharingButtons = ({ isMobile, shareUrl, onEmailClick }: SharingButtonsProps) => {
  // Handle WhatsApp sharing with improved compatibility
  const handleWhatsAppShare = () => {
    try {
      console.log("Attempting WhatsApp share with URL:", shareUrl);
      
      // Use the direct WhatsApp API for more reliable sharing
      const encodedMessage = encodeURIComponent(`I've shared a secure note with you. This note may self-destruct after viewing: ${shareUrl}`);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      
      // Log the generated WhatsApp URL for debugging
      console.log("WhatsApp share URL:", whatsappUrl);
      
      // On mobile, try to use the app directly
      if (isMobile) {
        // For iOS devices
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isIOS) {
          // iOS sometimes works better with a direct timeout approach
          window.location.href = whatsappUrl;
        } else {
          // For Android and other devices
          window.open(whatsappUrl, '_blank');
        }
      } else {
        // Desktop flow
        window.open(whatsappUrl, '_blank');
      }
      
      toast.success('Opening WhatsApp');
    } catch (err) {
      console.error("WhatsApp sharing error:", err);
      toast.error("Could not open WhatsApp");
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
      
      <div className="w-full">
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          onClick={onEmailClick}
        >
          <Mail className="mr-2 h-4 w-4" /> Send via Email
        </Button>
        
        {!isMobile && (
          <Button 
            className="w-full mt-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            onClick={handleWhatsAppShare}
          >
            <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
          </Button>
        )}
      </div>
    </div>
  );
};
