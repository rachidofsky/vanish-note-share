
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AdUnit } from '@/components/AdUnit';

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
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
        <a href="/" className="text-primary hover:text-primary/90 underline transition-colors">
          Return to Home
        </a>
      </div>
      
      {/* Ad below content */}
      <div className="w-full max-w-6xl mx-auto mt-8">
        <AdUnit adSlot="1122334455" adFormat="horizontal" />
      </div>
    </div>
  );
};

export default NotFound;
