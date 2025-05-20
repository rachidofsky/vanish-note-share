
import { Link } from 'react-router-dom';
import { LockIcon } from './icons/LockIcon';

export const Header = () => {
  return (
    <header className="w-full py-4 px-6 sm:px-8 flex items-center justify-between border-b z-10">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground">
          <LockIcon />
        </div>
        <h1 className="text-xl font-bold text-foreground">OneTimeNote</h1>
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Create Note
        </Link>
        <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          About
        </Link>
      </div>
    </header>
  );
};
