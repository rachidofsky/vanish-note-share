
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import { AdUnit } from '@/components/AdUnit';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Share, Mail, MessageSquare } from 'lucide-react';

const CreatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noteUrl, setNoteUrl] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  useEffect(() => {
    if (id) {
      const url = `${window.location.origin}/note/${id}`;
      setNoteUrl(url);
    }
  }, [id]);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'OneTimeNote - Secure Note',
          text: 'I\'ve shared a secure, self-destructing note with you.',
          url: noteUrl,
        });
        toast.success('Note shared successfully');
      } catch (error) {
        // Only show error if it's not a user cancellation
        if ((error as Error).name !== 'AbortError') {
          toast.error('Error sharing the note');
        }
      }
    } else {
      setShowShareMenu(true);
      toast.info('Use one of these sharing options');
    }
  };
  
  const handleEmailShare = () => {
    const subject = encodeURIComponent('OneTimeNote - Secure Note');
    const body = encodeURIComponent(`I've shared a secure, self-destructing note with you: ${noteUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    toast.success('Email client opened');
  };
  
  const handleSMSShare = () => {
    const text = encodeURIComponent(`I've shared a secure, self-destructing note with you: ${noteUrl}`);
    // Try to use SMS scheme, works on mobile devices
    window.location.href = `sms:?body=${text}`;
    toast.success('Message app opened');
  };
  
  return (
    <div className="container px-4 md:px-6">
      {/* Ad above the content */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <AdUnit adSlot="7788991010" adFormat="horizontal" />
      </div>

      {/* Main content with side ads */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto">
        {/* Left side vertical ad */}
        <div className="hidden lg:block w-64">
          <AdUnit adSlot="2233445566" adFormat="vertical" className="sticky top-20" />
        </div>
        
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Note Created!</CardTitle>
              <CardDescription className="text-center">
                Your secure, self-destructing note is ready to be shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Share this secure link with the recipient:
                </p>
                <div className="flex gap-2">
                  <Input 
                    value={noteUrl}
                    readOnly 
                    className="text-sm"
                  />
                  <CopyButton textToCopy={noteUrl} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ⚠️ This note will be permanently deleted after it's viewed.
                </p>
              </div>
              
              <div className="space-y-3">
                <DropdownMenu open={showShareMenu} onOpenChange={setShowShareMenu}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      className="w-full" 
                      onClick={handleShare}
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share via...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56">
                    <DropdownMenuItem onClick={handleEmailShare}>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSMSShare}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>SMS Message</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/'}
                >
                  Create another note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right side vertical ad */}
        <div className="hidden lg:block w-64">
          <AdUnit adSlot="3344556677" adFormat="vertical" className="sticky top-20" />
        </div>
      </div>
      
      {/* Ad below the content */}
      <div className="w-full max-w-6xl mx-auto mt-8">
        <AdUnit adSlot="1234567890" adFormat="horizontal" />
      </div>
    </div>
  );
};

export default CreatedPage;
