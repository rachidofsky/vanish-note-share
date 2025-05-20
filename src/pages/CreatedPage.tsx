
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import { AdUnit } from '@/components/AdUnit';

const CreatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noteUrl, setNoteUrl] = useState('');
  
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
      } catch (error) {
        toast.error('Error sharing');
      }
    } else {
      toast.info('Web Share API not available');
    }
  };
  
  return (
    <div className="flex flex-col items-center mx-auto p-4 max-w-lg w-full">
      <Card className="w-full">
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
            <Button 
              className="w-full" 
              onClick={handleShare}
            >
              Share via...
            </Button>
            
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
      
      {/* Ad placement below the card */}
      <div className="w-full mt-8">
        <AdUnit adSlot="1234567890" className="mx-auto" />
      </div>
    </div>
  );
};

export default CreatedPage;
