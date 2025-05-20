
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import { AdUnit } from '@/components/AdUnit';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Link as LinkIcon, AlertTriangle, CheckCircle, Share2 } from 'lucide-react';

const CreatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noteUrl, setNoteUrl] = useState('');
  const navigate = useNavigate();
  const { notesRemaining, totalNotesAllowed } = useAuth();
  
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
          title: 'Secure Note from OneTimeNote',
          text: 'I\'ve shared a secure, self-destructing note with you',
          url: noteUrl,
        });
        toast.success('Link shared successfully!');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Failed to share link');
        }
      }
    } else {
      toast.info('Web Share API not supported on this browser');
    }
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
          <Card className="w-full max-w-lg border-primary/20 shadow-xl backdrop-blur-md bg-card/80 animate-fade-in">
            <CardHeader className="border-b border-primary/10">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm border border-green-500/30">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600">
                  Secure Note Created!
                </CardTitle>
              </div>
              <CardDescription className="text-center">
                Your self-destructing note is ready to be shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-primary" />
                  Share this secure link with the recipient:
                </p>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-grow">
                    <Input 
                      value={noteUrl}
                      readOnly 
                      className="text-sm border-2 border-primary/30 bg-background/80 backdrop-blur-sm pr-12 focus-visible:border-primary"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <div className="absolute right-1 top-1">
                      <CopyButton 
                        textToCopy={noteUrl} 
                        compact={true}
                        successMessage="Secure link copied to clipboard!"
                      />
                    </div>
                  </div>
                  
                  {navigator.share && (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleShare}
                      className="border-primary/30"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex items-start gap-2 mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
                  <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-800">
                    Security verification: <span className="font-semibold">ID#{id?.substring(0, 8)}</span> has been generated for this note. The note is encrypted and stored securely.
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-2 bg-amber-50 border border-amber-200 rounded-md p-3">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    Important: This link can only be viewed once before it self-destructs. The note will be permanently deleted after it's viewed.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-center text-sm">
                  <span className="font-medium flex items-center justify-center gap-1 text-green-700">
                    <Shield className="h-4 w-4 text-green-600" />
                    {notesRemaining}/{totalNotesAllowed} free notes remaining this month
                  </span>
                </div>
                
                <Button 
                  variant="default" 
                  className="w-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-600 text-white"
                  onClick={() => navigate('/')}
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
