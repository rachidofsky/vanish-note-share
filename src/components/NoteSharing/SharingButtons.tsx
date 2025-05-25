
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SharingButtonsProps {
  isMobile: boolean;
  shareUrl: string;
  onEmailClick: () => void;
}

export const SharingButtons = ({ isMobile, shareUrl, onEmailClick }: SharingButtonsProps) => {
  // Show only "Create another note" button for both mobile and desktop
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
};
