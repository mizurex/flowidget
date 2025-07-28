'use client';

import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";


const space = Space_Grotesk({
  subsets:["latin"],
  weight:"600"
})

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
 
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full border-black text-black z-20 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md bg-white/80 shadow-md' : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'max-w-7xl' : 'max-w-3xl'
        }`}
      >
        {/* Left: Logo */}
        <div
          className={`text-lg md:text-xl space-x-3 font-bold transition-all flex justify-center items-center duration-500 ${
            scrolled ? 'translate-x-0' : 'translate-x-8'
          }`}
        >
      
          <span className={`text-stone-900  ${space.className}`}>Crompti.</span>
        </div>

        {/* Right: Links */}
        <nav
          className={`flex space-x-6 text-sm md:text-base font-medium transition-all duration-500 ${
            scrolled ? 'translate-x-0' : '-translate-x-8'
          }`}
        >
          <p className="cursor-pointer  transition">About</p>
          <p className="cursor-pointer  transition">Sign In</p>
        </nav>
      </div>
    </header>
  );
}
