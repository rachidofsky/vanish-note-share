
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AdUnit } from '@/components/AdUnit';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container px-4 md:px-6 flex flex-col items-center">
      {/* Ad above content */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <AdUnit adSlot="0011223344" adFormat="horizontal" />
      </div>
      
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">404</h1>
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full -z-10"></div>
        </div>
        <p className="text-xl text-muted-foreground mb-8">This page has self-destructed</p>
        <Button asChild className="btn-gradient">
          <a href="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Return to Home
          </a>
        </Button>
      </div>
      
      {/* Ad below content */}
      <div className="w-full max-w-6xl mx-auto mt-8">
        <AdUnit adSlot="1122334455" adFormat="horizontal" />
      </div>
    </div>
  );
};

export default NotFound;
