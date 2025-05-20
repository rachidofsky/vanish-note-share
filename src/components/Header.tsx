
import { Link } from 'react-router-dom';
import { LockIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="w-full py-4 px-6 sm:px-8 flex items-center justify-between border-b z-10">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground">
          <LockIcon className="w-4 h-4" />
        </div>
        <h1 className="text-xl font-bold text-foreground">OneTimeNote</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Create Note
        </Link>
        <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          About
        </Link>
        {user && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-1 ml-2"
          >
            <LogOutIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        )}
      </div>
    </header>
  );
};
