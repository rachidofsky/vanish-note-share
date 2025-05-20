
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdUnit } from '@/components/AdUnit';
import { Shield, Lock, AlertCircle, Eye } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="flex flex-col items-center mx-auto p-4 max-w-4xl">
      {/* Ad above content */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <AdUnit adSlot="6677889900" adFormat="horizontal" />
      </div>
      
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-gradient">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          How we handle your data at OneTimeNote
        </p>
      </div>
      
      <Card className="w-full card-hover border-white/10 backdrop-blur-sm bg-card/80">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            Our Privacy Commitment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <p className="text-lg">
            At OneTimeNote, privacy isn't just a feature - it's our core mission. Our service is designed 
            from the ground up to ensure your sensitive information remains private and secure.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-secondary/50 backdrop-blur-sm">
              <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
                <Lock className="h-5 w-5 text-primary" />
                What We Collect
              </h3>
              <p className="text-muted-foreground mb-3">
                In a production environment, we would collect minimal data:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Encrypted note content (deleted after viewing or expiration)</li>
                <li>Note creation timestamp (for expiration purposes only)</li>
                <li>Basic anonymized access logs (for security and debugging)</li>
              </ul>
            </div>
          
            <div className="p-6 rounded-xl bg-secondary/50 backdrop-blur-sm">
              <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5 text-primary" />
                What We Don't Collect
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Personal identification information</li>
                <li>IP addresses (beyond immediate security needs)</li>
                <li>Browser fingerprints</li>
                <li>Permanent records of note content</li>
              </ul>
            </div>
          </div>
          
          <div className="p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="font-medium mb-3 text-lg">How We Secure Your Data</h3>
            <p className="text-muted-foreground mb-3">
              In a production implementation:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>All notes would be encrypted at rest with strong encryption</li>
              <li>All connections secured with HTTPS</li>
              <li>Notes would be permanently deleted after viewing or expiration</li>
              <li>No backup copies would be retained</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-xl bg-accent/50 border border-white/10">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5 text-primary" />
              Demo Implementation Notice
            </h3>
            <p className="text-sm text-muted-foreground">
              This is a demonstration implementation of OneTimeNote. In this demo version, 
              notes are stored in your browser's local storage rather than a secure database. 
              In a production environment, we would implement proper server-side encryption 
              and secure deletion practices.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Ad below content */}
      <div className="w-full max-w-6xl mx-auto mt-8">
        <AdUnit adSlot="7788990011" adFormat="horizontal" />
      </div>
    </div>
  );
};

export default PrivacyPage;
