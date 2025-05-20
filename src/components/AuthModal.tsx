
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.session) {
        toast.success("Signed in successfully!");
        onClose();
        // Navigate to home page after sign in
        navigate("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Skip email verification for better UX
          emailRedirectTo: window.location.origin,
          data: {
            email: email,
          }
        }
      });

      if (error) {
        setError(error.message);
      } else if (data.session) {
        // If we have a session, user is already signed in (email verification is disabled)
        toast.success("Account created! You are now signed in.");
        onClose();
        // Navigate to home page after sign up
        navigate("/");
      } else {
        // In case email verification is enabled in the Supabase project
        toast.success("Account created! Please check your email to confirm your account.");
        setIsSignIn(true);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSignIn ? "Sign In to OneTimeNote" : "Create an Account"}
          </DialogTitle>
          <DialogDescription>
            OneTimeNote is completely free to use. We just need you to sign in to prevent bots from abusing our service.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={isSignIn ? handleSignIn : handleSignUp} className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              autoComplete={isSignIn ? "email" : "new-email"}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete={isSignIn ? "current-password" : "new-password"}
              minLength={6}
            />
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <Button type="submit" disabled={loading}>
              {loading
                ? isSignIn
                  ? "Signing in..."
                  : "Creating account..."
                : isSignIn
                ? "Sign In"
                : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-primary"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
