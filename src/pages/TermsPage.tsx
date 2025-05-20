
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsPage = () => {
  return (
    <div className="flex flex-col items-center mx-auto p-4 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg text-muted-foreground">
          Guidelines for using OneTimeNote
        </p>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            By using the OneTimeNote service, you agree to these Terms of Service. 
            This document outlines your rights and responsibilities when using our secure note-sharing platform.
          </p>
          
          <div>
            <h3 className="font-medium mb-2">Acceptable Use</h3>
            <p className="text-sm text-muted-foreground">
              You agree to use OneTimeNote only for lawful purposes and in accordance with these Terms. 
              You will not use OneTimeNote to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Violate any applicable laws or regulations</li>
              <li>Share illegal or harmful content</li>
              <li>Attempt to breach or circumvent our security measures</li>
              <li>Interfere with the proper functioning of the service</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Service Limitations</h3>
            <p className="text-sm text-muted-foreground">
              OneTimeNote is provided "as is" without warranties of any kind. While we strive to provide a secure 
              and reliable service:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
              <li>We cannot guarantee 100% uptime or availability</li>
              <li>We make no guarantees about the absolute security of information</li>
              <li>Notes may be deleted at any time due to service needs</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">User Responsibility</h3>
            <p className="text-sm text-muted-foreground">
              Users are responsible for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Keeping shared links secure</li>
              <li>The content of notes they create</li>
              <li>Not relying on the service for critical long-term storage</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Demo Implementation Notice</h3>
            <p className="text-sm text-muted-foreground">
              This is a demonstration implementation of OneTimeNote. In this demo version, 
              notes are stored in your browser's local storage rather than a secure database.
              This demo is intended for illustrative purposes only and should not be used for 
              truly sensitive information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage;
