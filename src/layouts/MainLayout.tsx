
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdUnit } from '@/components/AdUnit';
import { SecurityBadge } from '@/components/SecurityBadge';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-gradient-mesh">
      <Header />
      <main className="flex-1 flex flex-col w-full py-8 sm:py-12 px-4 relative z-10">
        <div className="absolute inset-0 bg-security-pattern opacity-30 z-0 pointer-events-none"></div>
        <Outlet />
      </main>
      
      {/* Ad placement above footer */}
      <div className="w-full max-w-6xl mx-auto px-4 py-4">
        <AdUnit adSlot="9876543210" adFormat="horizontal" />
      </div>
      
      <Footer />
      <SecurityBadge />
    </div>
  );
};

export default MainLayout;
