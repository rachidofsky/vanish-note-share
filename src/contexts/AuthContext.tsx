
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  notesRemaining: number;
  totalNotesAllowed: number;
  decrementNotesRemaining: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Maximum number of notes allowed per month
const MONTHLY_NOTES_LIMIT = 30;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notesRemaining, setNotesRemaining] = useState(MONTHLY_NOTES_LIMIT);
  
  // Load the user's note usage from localStorage
  useEffect(() => {
    if (user) {
      const currentMonth = new Date().getMonth();
      const savedMonth = localStorage.getItem(`notes_month_${user.id}`);
      const savedCount = localStorage.getItem(`notes_count_${user.id}`);
      
      if (savedMonth && parseInt(savedMonth) === currentMonth && savedCount) {
        const usedNotes = parseInt(savedCount);
        setNotesRemaining(Math.max(0, MONTHLY_NOTES_LIMIT - usedNotes));
      } else {
        // Reset the counter for a new month or new user
        localStorage.setItem(`notes_month_${user.id}`, currentMonth.toString());
        localStorage.setItem(`notes_count_${user.id}`, '0');
        setNotesRemaining(MONTHLY_NOTES_LIMIT);
      }
    }
  }, [user]);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const decrementNotesRemaining = () => {
    if (user) {
      const currentMonth = new Date().getMonth();
      const savedCount = localStorage.getItem(`notes_count_${user.id}`) || '0';
      const newCount = parseInt(savedCount) + 1;
      
      localStorage.setItem(`notes_month_${user.id}`, currentMonth.toString());
      localStorage.setItem(`notes_count_${user.id}`, newCount.toString());
      
      setNotesRemaining(Math.max(0, MONTHLY_NOTES_LIMIT - newCount));
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signOut,
    notesRemaining,
    totalNotesAllowed: MONTHLY_NOTES_LIMIT,
    decrementNotesRemaining,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
