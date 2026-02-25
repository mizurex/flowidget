'use client';

import { supabase } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import Logo from '../svg/logo';
import { RiGoogleFill } from 'react-icons/ri';

const Spinner = () => (
  <div className="flex items-end gap-[3px]">
    {[0, 150, 300].map((delay) => (
      <div
        key={delay}
        className="h-4 w-[3px] bg-[#F04D26] animate-spin"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
);

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback`
      }
    });
    if (error) console.error('Error logging in:', error);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    setLoading(true);
    const getCurrUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user ?? null);
      setLoading(false);
    };
    getCurrUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 font-mono">
      <div className="w-full max-w-2xl mx-auto ">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        ) : !user ? (
          <div className="flex flex-col items-stretch gap-8 px-6 py-10 md:flex-row md:items-center md:gap-12">
           
            <div className="flex flex-1 items-center justify-center">
              <div className="mb-6">
                <Logo  width={100} height={100} />
              </div>
            </div>

           
            <div className="flex flex-1 flex-col items-start gap-4">
              <div>
                <h1 className="font-mono text-xl font-semibold text-white md:text-2xl">
                  Login
                </h1>
                <p className="mt-1 max-w-xs text-sm text-white/50">
                  Continue with Google to continue.
                </p>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="shadow-sm flex items-center gap-2 bg-muted-foreground px-5 py-3 text-sm font-medium uppercase tracking-wide text-background transition-colors hover:bg-muted-foreground/90 w-full md:w-auto"
              >
                <RiGoogleFill/>  Google
              </button>

              
            </div>
          </div>
        ) : (
          <div className="text-center">
            <img
              src={user.user_metadata?.avatar_url || `https://api.dicebear.com/8.x/initials/svg?seed=${user.email}`}
              alt=""
              className="mx-auto mb-4 h-20 w-20 border border-white/10 object-cover"
            />
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/35">
              Logged in as
            </p>
            <p className="mt-1 break-words font-mono text-sm text-white/80">
              {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="mt-8 w-full border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
