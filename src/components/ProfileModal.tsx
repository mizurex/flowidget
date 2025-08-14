// app/components/LogoutModalTrigger.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import { FiUsers, FiGift, FiCreditCard, FiLogOut } from "react-icons/fi";
import {motion} from "motion/react"

export default function LogoutModalTrigger({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Don't close if clicking on the trigger or inside the modal
      if (
        (modalRef.current && modalRef.current.contains(target)) ||
        (triggerRef.current && triggerRef.current.contains(target))
      ) {
        return;
      }
      
      setOpen(false);
    }

    if (open) {
      // Add a small delay to prevent immediate closing when opening
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
    // Prevent modal from closing when clicking inside it
    e.stopPropagation();
  };

  const handleMenuItemClick = (action?: () => void) => {
    // Close modal when menu item is clicked
    setOpen(false);
    if (action) action();
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
          onClick={handleModalClick}
          className="absolute right-0 top-12 mt-1 w-48 bg-[#000000] text-white rounded-md shadow-lg animate-fade-in-down z-50"
        >
          <div className="px-4 py-2 text-sm font-semibold border-b border-zinc-700">
            {user.user_metadata.user_name || user.email || "User"}
          </div>

          <ul className="text-sm">
            <li 
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 cursor-pointer"
              onClick={() => handleMenuItemClick(() => alert('Organizations clicked'))}
            >
              <FiUsers /> Organizations
            </li>
            <li 
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 cursor-pointer"
              onClick={() => handleMenuItemClick(() => alert('Referrals clicked'))}
            >
              <FiGift /> Referrals
            </li>
            <li 
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 cursor-pointer"
              onClick={() => handleMenuItemClick(() => alert('Buy Credits clicked'))}
            >
              <FiCreditCard /> Buy Credits
            </li>
          </ul>

          {/* Divider */}
          <div className="border-t border-zinc-700"></div>

          {/* Logout */}
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