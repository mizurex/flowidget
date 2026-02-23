'use client';

import { supabase } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

const Spinner = () => (
  <div className="h-10 w-10 border-2 border-white/10 border-t-[#F04D26] animate-spin" />
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
    <div className="flex min-h-screen items-center justify-center bg-[#151515] p-4 font-mono">
      <div className="w-full max-w-sm border border-white/10 bg-[#0d0d0d] p-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        ) : !user ? (
          <div className="flex flex-col items-center py-4">
            <h1 className="font-mono text-xl font-bold tracking-tight text-white">
              Welcome
            </h1>
            <p className="mt-2 font-mono text-[13px] text-white/45">
              Sign in to continue
            </p>
            <button
              onClick={handleGoogleLogin}
              className="mt-8 w-full border border-white/10 bg-[#F04D26] px-4 py-3 font-mono text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Continue with Google
            </button>
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
