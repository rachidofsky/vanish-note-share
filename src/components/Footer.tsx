
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 sm:px-8 mt-auto border-t border-white/10 backdrop-blur-md bg-background/80">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-gradient font-medium">OneTimeNote</span>. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/70">Secure. Private. Ephemeral.</p>
        </div>
        <div className="flex gap-8">
          <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
