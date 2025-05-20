
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-security-pattern">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-8 sm:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
