"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import LogoutModalTrigger from './ProfileModal';
import { Hamburger } from 'lucide-react';

export default function HeaderLogged({ user, onCreateClick }: { user: User; onCreateClick : () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

 const handleLogoClick =  () => {
      window.location.href = "/";
    };

    
  return (
    <header
      className={`fixed top-0 px-2 md:px-20 py-1 left-0 w-full   h-fit bg-black  text-black z-50 transition-all duration-500 
      `}
    >
      <div
        className={`mx-auto  py-4 flex items-center justify-between transition-all duration-500 }`}
      >
       
        <h1
          onClick={handleLogoClick}
          className={`text-2xl font-bold text-white transition-all duration-500 cursor-pointer`}
        >
          flowidget.
        </h1>

        {/* Desktop actions */}
        <div className={`hidden md:flex items-center gap-4 transition-all duration-500`}>
          <button
            onClick={onCreateClick}
            className="px-3 py-1.5 text-sm sm:px-6 sm:py-2 sm:text-base font-medium bg-white text-black w-fit transition-all shadow-[-2px_4px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer whitespace-nowrap"
          >
            Create Widget
          </button>
          <Link href="/dashboard">
            <button
              className="px-3 py-1.5 text-sm sm:px-6 sm:py-2 sm:text-base font-medium bg-white text-black w-fit transition-all shadow-[-2px_4px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer whitespace-nowrap"
            >
              Dashboard
            </button>
          </Link>
          <LogoutModalTrigger user={user}/>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <LogoutModalTrigger user={user}/>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded border border-zinc-800 text-white"
          >
            <Hamburger/>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 border-t border-zinc-800 bg-black">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setMenuOpen(false); onCreateClick(); }}
              className="w-full px-3 py-2 text-sm font-medium bg-white text-black transition-all shadow-[-2px_4px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] text-left"
            >
              Create Widget
            </button>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
              <button
                className="w-full px-3 py-2 text-sm font-medium bg-white text-black transition-all shadow-[-2px_4px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] text-left"
              >
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
