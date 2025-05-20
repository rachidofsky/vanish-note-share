
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full py-6 px-6 sm:px-8 mt-auto border-t">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} OneTimeNote. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
