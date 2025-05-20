
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdUnit } from '@/components/AdUnit';

const PrivacyPage = () => {
  return (
    <div className="flex flex-col items-center mx-auto p-4 max-w-3xl">
      {/* Ad above content */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <AdUnit adSlot="6677889900" adFormat="horizontal" />
      </div>
      
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">
          How we handle your data at OneTimeNote
        </p>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Our Privacy Commitment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            At OneTimeNote, privacy isn't just a feature - it's our core mission. Our service is designed 
            from the ground up to ensure your sensitive information remains private and secure.
          </p>
          
          <div>
            <h3 className="font-medium mb-2">What We Collect</h3>
            <p className="text-muted-foreground">
              In a production environment, we would collect minimal data:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Encrypted note content (deleted after viewing or expiration)</li>
              <li>Note creation timestamp (for expiration purposes only)</li>
              <li>Basic anonymized access logs (for security and debugging)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">What We Don't Collect</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Personal identification information</li>
              <li>IP addresses (beyond immediate security needs)</li>
              <li>Browser fingerprints</li>
              <li>Permanent records of note content</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">How We Secure Your Data</h3>
            <p className="text-muted-foreground">
              In a production implementation:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
              <li>All notes would be encrypted at rest with strong encryption</li>
              <li>All connections secured with HTTPS</li>
              <li>Notes would be permanently deleted after viewing or expiration</li>
              <li>No backup copies would be retained</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Demo Implementation Notice</h3>
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
