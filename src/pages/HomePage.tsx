
import { NoteForm } from '@/components/NoteForm';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-center space-y-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Share Sensitive Information Securely</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create encrypted, self-destructing notes that disappear after they've been read.
        </p>
      </div>
      
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="w-full lg:w-1/2">
          <NoteForm />
        </div>
        
        <div className="w-full lg:w-1/2 space-y-6 mt-6 lg:mt-0">
          <div className="rounded-xl p-6 bg-accent/50 backdrop-blur-sm">
            <h3 className="text-lg font-medium mb-2">How it works</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <div className="text-primary font-bold">1.</div> 
                <div>Enter your sensitive information</div>
              </li>
              <li className="flex gap-2">
                <div className="text-primary font-bold">2.</div> 
                <div>Choose when the note should expire</div>
              </li>
              <li className="flex gap-2">
                <div className="text-primary font-bold">3.</div> 
                <div>Get a secure link to share with anyone</div>
              </li>
              <li className="flex gap-2">
                <div className="text-primary font-bold">4.</div> 
                <div>The note is permanently deleted after first view</div>
              </li>
            </ul>
          </div>
          
          <div className="rounded-xl p-6 border border-border">
            <h3 className="text-lg font-medium mb-2">Perfect for sharing</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Passwords & access credentials</li>
              <li>✓ Private links & meeting details</li>
              <li>✓ Sensitive personal information</li>
              <li>✓ One-time access codes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
