'use client';

import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

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
      className={`fixed top-0 bg-black z-50 left-0 w-full h-[10vh] border-black text-black  transition-all duration-500 
      `}
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
      
          <span className={`text-white  ${space.className}`}>flowidget.</span>
        </div>

        {/* Right: Links */}
        <nav
          className={`flex space-x-6 text-sm md:text-base items-center font-medium transition-all duration-500 ${
            scrolled ? 'translate-x-0' : '-translate-x-8'
          }`}
        >
          <p className="cursor-pointe text-blue-600  transition">About</p>
          <Link href={"/signin"}>
            <button className="px-3 py-1 font-medium bg-white text-black w-fit transition-all shadow-[-2px_4px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer">
              Signin
            </button>
          </Link>
          
        
        </nav>
      </div>
    </header>
  );
}
