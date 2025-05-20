
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import { AdUnit } from '@/components/AdUnit';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Link as LinkIcon, AlertTriangle } from 'lucide-react';

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
          <Card className="w-full max-w-lg border-primary/20 shadow-lg backdrop-blur-md bg-card/80">
            <CardHeader className="border-b border-primary/10">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="p-3 rounded-full bg-green-500/20 backdrop-blur-sm">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-center text-2xl">Secure Note Created!</CardTitle>
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
                  <Input 
                    value={noteUrl}
                    readOnly 
                    className="text-sm border-primary/30 bg-background/80 backdrop-blur-sm"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <CopyButton textToCopy={noteUrl} />
                </div>
                <div className="flex items-start gap-2 mt-4 bg-amber-50 border border-amber-200 rounded-md p-3">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    Important: This link can only be viewed once before it self-destructs. The note will be permanently deleted from our servers after it's viewed.
                  </p>
                </div>
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
