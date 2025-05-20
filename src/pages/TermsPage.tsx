
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdUnit } from '@/components/AdUnit';
import { FileText, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="flex flex-col items-center mx-auto p-4 max-w-4xl">
      {/* Ad above content */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <AdUnit adSlot="8899001122" adFormat="horizontal" />
      </div>
      
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-gradient">Terms of Service</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Guidelines for using OneTimeNote
        </p>
      </div>
      
      <Card className="w-full card-hover border-white/10 backdrop-blur-sm bg-card/80">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <p className="text-lg">
            By using the OneTimeNote service, you agree to these Terms of Service. 
            This document outlines your rights and responsibilities when using our secure note-sharing platform.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-secondary/50 backdrop-blur-sm">
              <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
                Acceptable Use
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                You agree to use OneTimeNote only for lawful purposes and in accordance with these Terms. 
                You will not use OneTimeNote to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Violate any applicable laws or regulations</li>
                <li>Share illegal or harmful content</li>
                <li>Attempt to breach or circumvent our security measures</li>
                <li>Interfere with the proper functioning of the service</li>
              </ul>
            </div>
          
            <div className="p-6 rounded-xl bg-secondary/50 backdrop-blur-sm">
              <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Service Limitations
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                OneTimeNote is provided "as is" without warranties of any kind. While we strive to provide a secure 
                and reliable service:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>We cannot guarantee 100% uptime or availability</li>
                <li>We make no guarantees about the absolute security of information</li>
                <li>Notes may be deleted at any time due to service needs</li>
              </ul>
            </div>
          </div>
          
          <div className="p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              User Responsibility
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Users are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Keeping shared links secure</li>
              <li>The content of notes they create</li>
              <li>Not relying on the service for critical long-term storage</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-xl bg-accent/50 border border-white/10">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Demo Implementation Notice
            </h3>
            <p className="text-sm text-muted-foreground">
              This is a demonstration implementation of OneTimeNote. In this demo version, 
              notes are stored in your browser's local storage rather than a secure database.
              This demo is intended for illustrative purposes only and should not be used for 
              truly sensitive information.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Ad below content */}
      <div className="w-full max-w-6xl mx-auto mt-8">
        <AdUnit adSlot="9900112233" adFormat="horizontal" />
      </div>
    </div>
  );
};

export default TermsPage;
