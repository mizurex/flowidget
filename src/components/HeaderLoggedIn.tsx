import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import LogoutModalTrigger from './ProfileModal';

export default function HeaderLogged({ user, onCreateClick }: { user: User; onCreateClick : () => void }) {

 const handleLogout = async () => {
      await supabase.auth.signOut();
      window.location.href = "/";
    };

    
  return (
    <header
      className={`fixed top-0 px-20 py-1 left-0 w-full   h-fit bg-black  text-black z-50 transition-all duration-500 
      `}
    >
      <div
        className={`mx-auto  py-4 flex items-center justify-between transition-all duration-500 }`}
      >
       
        <h1
          className={`text-2xl font-bold text-white transition-all duration-500 `}
        >
          flowidget.
        </h1>

        <div
          className={`flex items-center gap-4 transition-all duration-500 
           `}
        >
          <button
            onClick={onCreateClick}
            className="px-6 py-2 font-medium bg-white text-black w-fit transition-all shadow-[-2px_4px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer"
          >
            Create Widget
          </button>

          <Link href="/user/dashboard">
            <button
              className="px-6 py-2 font-medium bg-white text-black w-fit transition-all shadow-[-2px_4px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer"
            >
              Dashboard
            </button>
          </Link>
      <LogoutModalTrigger user={user}/>
        </div>
      </div>
    </header>
  );
}
