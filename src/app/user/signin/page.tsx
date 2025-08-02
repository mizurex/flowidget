'use client';

import { supabase } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

// A simple SVG spinner component for loading states
const Spinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
);

// Google Icon SVG
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.887 5.625 29.824 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.887 5.625 29.824 4 24 4C16.791 4 10.463 7.824 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.37 44 30.021 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);


export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `https://flowidget.vercel.app//auth/callback`
    }
  });
  
  if (error) console.error('Error logging in:', error);
};

 
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  
  useEffect(() => {
    // Start with loading true
    setLoading(true);

    // Check for an existing session
    const getCurrUser = async () => {
      const { data:{user} } = await supabase.auth.getUser();
      if(!user){
        setUser(null);
      }
      else{
        setUser(user);
      } 
      setLoading(false);
    };
    getCurrUser();

    // Set up a listener for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Main component render
  return (
    <div className="min-h-screen bg-[url('/box.svg')] bg-no-repeat bg-cover bg-center flex items-center justify-center p-4 font-sans">
    
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : !user ? (
          // Login View
          <div className="text-center h-[40vh] z-40">
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome
            </h1>
            <p className="text-gray-600 mb-8">
              Sign in to continue to your account.
            </p>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 mt-25 cursor-pointer py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 font-semibold hover:bg-gray-50 transition-colors duration-300"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
        ) : (
          // Logged In View
          <div className="text-center">
            <img
              src={user.user_metadata.avatar_url || `https://api.dicebear.com/8.x/initials/svg?seed=${user.email}`}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-200"
            />
            <p className="text-gray-600">Logged in as:</p>
            <p className="font-semibold text-gray-900 break-words">
              {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full mt-8 py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-300"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}