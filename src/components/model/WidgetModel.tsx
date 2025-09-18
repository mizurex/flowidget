// CreateWidgetModal.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import RedesignedDashboard2 from '@/app/(user)/wizard/Wizardpage';
import { X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

export default function CreateWidgetModal({ isOpen, onClose, user }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const keypress = (e:KeyboardEvent)=>{
      if(e.key === 'Escape'){
        onClose();
      }
    }
      if (isOpen) {
      window.addEventListener('keydown', keypress);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', keypress);
      document.body.style.overflow = '';
    };
    
  },[isOpen,onClose]);

  const handleClickOutside = (e:React.MouseEvent<HTMLDivElement>)=>{
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClickOutside}
     className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex  items-center justify-center">
      <div 
       ref={modalRef}
        className="relative w-fit h-fit">
        <button
          onClick={onClose}
          className="absolute top-[-2.5rem] right-0 bg-black px-3 py-1 rounded hover:bg-neutral-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <RedesignedDashboard2 user={user} widget={null} onSuccess={onClose} />
      </div>
    </div>
  );
}
