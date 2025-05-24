
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SharingButtonsProps {
  isMobile: boolean;
  shareUrl: string;
  onEmailClick: () => void;
}

export const SharingButtons = ({ isMobile, shareUrl, onEmailClick }: SharingButtonsProps) => {
  // On mobile, show no sharing buttons at all
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 pt-2">
        <Button 
          variant="outline" 
          className="w-full" 
          asChild
        >
          <Link to="/">Create another note</Link>
        </Button>
      </div>
    );
  }

  // On desktop, show email and create another note buttons
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
      </div>
    </div>
  );
};
