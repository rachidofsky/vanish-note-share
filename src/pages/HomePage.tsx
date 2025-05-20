
import { NoteForm } from '@/components/NoteForm';
import { LockIcon } from '@/components/icons/LockIcon';
import { AdUnit } from '@/components/AdUnit';

const HomePage = () => {
  return (
    <div className="container px-4 md:px-6">
      {/* Ad above the title */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <AdUnit adSlot="1122334455" adFormat="horizontal" />
      </div>

      {/* Main content with side ads */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto">
        {/* Left side vertical ad */}
        <div className="hidden lg:block w-64">
          <AdUnit adSlot="6677889900" adFormat="vertical" className="sticky top-20" />
        </div>
        
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-lg mx-auto text-center mb-8">
            <LockIcon className="mx-auto mb-4 h-14 w-14 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Share sensitive information securely
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl">
              Create encrypted, self-destructing notes that can only be viewed once before they disappear forever.
            </p>
          </div>
          <NoteForm />
        </div>
        
        {/* Right side vertical ad */}
        <div className="hidden lg:block w-64">
          <AdUnit adSlot="1100220033" adFormat="vertical" className="sticky top-20" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
