
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import { AdUnit } from '@/components/AdUnit';
import { useAuth } from '@/contexts/AuthContext';

const CreatedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noteUrl, setNoteUrl] = useState('');
  const { notesRemaining, totalNotesAllowed } = useAuth();
  
  useEffect(() => {
    if (id) {
      const url = `${window.location.origin}/note/${id}`;
      setNoteUrl(url);
    }
  }, [id]);
  
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
                    className="text-sm border-purple-400 border-2"
                  />
                  <CopyButton textToCopy={noteUrl} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ⚠️ Recipients will see a confirmation page before viewing the note. The note will be permanently deleted after it's viewed.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="text-center text-sm text-muted-foreground">
                  <span className="font-medium">
                    {notesRemaining}/{totalNotesAllowed} free notes remaining this month
                  </span>
                </div>
                
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
