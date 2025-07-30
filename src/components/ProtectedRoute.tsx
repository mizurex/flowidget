// components/ProtectedRoute.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import type { User } from '@supabase/supabase-js';


const FullPageLoader = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
  </div>
);

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser) {
        router.push('/user/signin');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  
  if (loading) {
    return <FullPageLoader />;
  }

  // If a user is present, render the protected content
  return <>{user ? children : null}</>;
}