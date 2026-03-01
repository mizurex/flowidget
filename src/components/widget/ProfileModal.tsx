// app/components/LogoutModalTrigger.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import { FiUsers, FiGift, FiCreditCard, FiLogOut } from "react-icons/fi";
import {motion} from "motion/react"
import { useRouter } from "next/navigation";

export default function LogoutModalTrigger({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      if (
        (modalRef.current && modalRef.current.contains(target)) ||
        (triggerRef.current && triggerRef.current.contains(target))
      ) {
        return;
      }
      
      setOpen(false);
    }

    if (open) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 10);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleMenuItemClick = (action?: () => void) => {
    setOpen(false);
    if (action) action();
  };

  const handlecreditsClick = () => {
   router.push("/user/plans");
  };

  return (
    <div className="relative">
      {user.user_metadata?.avatar_url && (
        <div 
          ref={triggerRef}
          className="cursor-pointer w-fit"
          onClick={handleTriggerClick}
        >
          <motion.img
  src={user.user_metadata.avatar_url}
  alt="Profile"
  className="w-10 h-9 border-2 border-orange-400 shadow-[1px_5px_0px_#7cff3f] hover:shadow-[1px_2px_0px_#7cff3f]"
  whileHover={{
    scale: 1.1,
    transition: { type:"keyframes", stiffness: 300 }
  }}
  whileTap={{
    scale: 0.95
  }}
/>
        </div>
      )}

      {open && (
        <div
          ref={modalRef}
      
          className="absolute right-0 top-12 mt-1 w-48 bg-[#000000] text-white rounded-md shadow-lg animate-fade-in-down z-50"
        >
          <div className="px-4 py-2 text-sm font-semibold border-b border-zinc-700">
            {user.user_metadata.user_name || user.email || "User"}
          </div>

          <div className="text-sm">
            <li 
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 cursor-pointer"
            
            >
              <FiUsers /> Organizations
            </li>
            <li 
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 cursor-pointer"
            
            >
              <FiGift /> Referrals
            </li>
            <button 
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 cursor-pointer"
              onClick={ handlecreditsClick}
            >
              <FiCreditCard /> Buy Credits
            </button>
          </div>

          <div className="border-t border-zinc-700"></div>

          <div
            onClick={() => handleMenuItemClick(handleLogout)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 cursor-pointer text-sm text-red-400"
          >
            <FiLogOut /> Log out
          </div>
        </div>
      )}
    </div>
  );
}