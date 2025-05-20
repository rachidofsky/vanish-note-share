
import { Link } from 'react-router-dom';
import { LockIcon, LogOutIcon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthModal } from '@/components/AuthModal';

export const Header = () => {
  const { user, signOut, notesRemaining, totalNotesAllowed } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  return (
    <header className="w-full py-6 px-6 sm:px-8 backdrop-blur-md bg-background/80 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30 animate-float">
            <LockIcon className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold font-display text-gradient">OneTimeNote</h1>
        </Link>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex gap-6 items-center">
          {user && (
            <div className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
              <span className="font-bold">{notesRemaining}/{totalNotesAllowed}</span> notes left
            </div>
          )}
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Create Note
          </Link>
          <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <ThemeToggle />
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2 ml-2 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
              onClick={openAuthModal}
            >
              Sign In
            </Button>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="text-foreground p-2" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-xl p-4 flex flex-col gap-4 md:hidden animate-fade-in">
          <Link to="/" className="px-4 py-2 rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
            Create Note
          </Link>
          <Link to="/blog" className="px-4 py-2 rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
            Blog
          </Link>
          <Link to="/about" className="px-4 py-2 rounded-md hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          {user && (
            <div className="px-4 py-2">
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{notesRemaining}/{totalNotesAllowed}</span> notes left
              </span>
            </div>
          )}
          {user ? (
            <Button
              variant="ghost"
              onClick={() => {
                handleSignOut();
                setMobileMenuOpen(false);
              }}
              className="justify-start px-4"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="justify-start px-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
            >
              Sign In
            </Button>
          )}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
}
