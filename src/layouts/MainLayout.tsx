
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdUnit } from '@/components/AdUnit';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-security-pattern">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-8 sm:py-12">
        <Outlet />
      </main>
      
      {/* Ad placement above footer */}
      <div className="w-full max-w-6xl mx-auto px-4 py-4">
        <AdUnit adSlot="9876543210" adFormat="horizontal" />
      </div>
      
      <Footer />
      
      {/* Admin Link - In a real app, you'd only show this to admins */}
      <div className="text-center text-xs text-muted-foreground pb-2">
        <a href="/admin" className="hover:underline">Admin</a>
      </div>
    </div>
  );
};

export default MainLayout;
