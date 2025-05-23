
import { Link } from 'react-router-dom';
import { Mail, Phone, Share2, MessageSquare } from 'lucide-react';
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
      // Log detailed share link info for debugging
      console.log("Attempting to share URL:", shareUrl);
      console.log("Full URL information:", {
        origin: window.location.origin,
        fullShareUrl: shareUrl,
        urlLength: shareUrl.length
      });
      
      if (navigator.share) {
        await navigator.share({
          title: 'Secure Note',
          text: 'I\'ve shared a secure note with you. This note may self-destruct after viewing.',
          url: shareUrl
        });
        toast.success('Ready to share via SMS or any app');
        console.log("Native sharing successfully triggered");
      } else {
        // Fallback for browsers that don't support sharing
        console.log("Native sharing not supported on this device");
        toast.error('Sharing not supported on this device');
        
        // Try to open SMS on mobile anyway as a fallback
        if (isMobile) {
          console.log("Attempting SMS fallback for mobile");
          const encodedMessage = encodeURIComponent(`I've shared a secure note with you: ${shareUrl}`);
          try {
            window.location.href = `sms:?body=${encodedMessage}`;
            console.log("SMS fallback launched");
          } catch (err) {
            console.error("SMS fallback failed:", err);
            toast.error("Could not launch SMS app");
          }
        }
      }
    } catch (err: any) {
      console.error('Error during share operation:', err);
      if (err.name !== 'AbortError') {
        toast.error('Failed to share note');
      } else {
        console.log("Share dialog was closed by user");
      }
    }
  };

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

  // Handle SMS sharing directly with a special handler for iOS
  const handleSmsShare = () => {
    try {
      console.log("Attempting direct SMS share");
      const encodedMessage = encodeURIComponent(`I've shared a secure note with you: ${shareUrl}`);
      
      // iOS uses different SMS URI format
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      // Add an empty recipient field for iOS
      const smsUri = isIOS ? `sms:&body=${encodedMessage}` : `sms:?body=${encodedMessage}`;
      
      console.log("SMS URI:", smsUri);
      console.log("Is iOS:", isIOS);
      
      // Use window.location.href for more reliable SMS app launching
      window.location.href = smsUri;
      toast.success('Opening SMS app');
    } catch (err) {
      console.error("SMS sharing error:", err);
      toast.error("Could not open SMS app");
      
      // Alternative approach for some mobile browsers
      try {
        const textMsg = `I've shared a secure note with you: ${shareUrl}`;
        const fallbackUri = `sms:?&body=${encodeURIComponent(textMsg)}`;
        console.log("Trying fallback SMS approach:", fallbackUri);
        window.open(fallbackUri, '_blank');
      } catch (fallbackErr) {
        console.error("SMS fallback also failed:", fallbackErr);
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
          <>
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={handleNativeShare}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              onClick={handleWhatsAppShare}
            >
              <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
            </Button>
            
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              onClick={handleSmsShare}
            >
              <Phone className="mr-2 h-4 w-4" /> SMS
            </Button>
          </>
        )}
        
        {!isMobile && (
          <Button 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            onClick={handleWhatsAppShare}
          >
            <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
          </Button>
        )}
      </div>
    </div>
  );
};
