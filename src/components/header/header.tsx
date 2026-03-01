"use client";
import React from "react";
import Link from "next/link";
import { LinesHeader } from "@/components/header/lines-header";
import { LinesHeader2 } from "@/components/header/lines-header2";
import { motion } from "framer-motion";
import { LogInIcon } from "lucide-react";
import Logo from "../svg/logo";
const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string,
) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const viewport = element.closest<HTMLElement>(
      '[data-slot="scroll-area-viewport"]',
    );
    if (viewport) {
      const viewportRect = viewport.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const baseTop = viewport.scrollTop + (elementRect.top - viewportRect.top);
      const sectionOverflow = Math.max(
        0,
        elementRect.height - viewport.clientHeight,
      );
      const overflowCompensation =
        sectionOverflow > 0 ? Math.min(sectionOverflow, 96) : 0;
      const top = baseTop + overflowCompensation;
      viewport.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      return;
    }
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
const NodeSvg = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="8" height="8" rx="2" fill="#cacaca" />
  </svg>
);
export default function Header() {
  return (
    <div className="flex flex-col items-center pt-3 mt-2 md:pt-4 fixed sm:static -top-6 w-full backdrop-blur-md z-50">
      <div className="relative z-20 flex w-full items-center justify-center gap-6 lg:gap-0 px-4 lg:px-0">
        <LinesHeader side="left" />

        <header
          className={`
                    relative z-10 flex h-14 mt-4 items-center justify-between gap-3
                    bg-[#151515]/95 backdrop-blur-md
                    border border-white/20
                
                    px-3.5 lg:h-auto lg:p-3
                    w-full max-w-[calc(100vw-2rem)] sm:w-[90%] md:w-[85%] lg:w-auto md:shadow-lg md:shadow-black/20
                `}
        >
          <div className="flex items-center pl-2 lg:pl-3">
            <Link
              href="/"
              className="focus:outline-none flex items-center gap-2"
            >
                <Logo width={20} height={20} />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-5 mx-10">
          
            <Link
              href="/docs"
              className="text-sm font-medium text-[#C1B9B9] hover:text-white transition-colors duration-150 ease motion-reduce:transition-none mt-1"
            >
              Docs
            </Link>
          
        
          </nav>

          <div className="flex items-center pr-2 lg:pr-3">
            <motion.a
              href="/signin"
              className="group bg-muted-foreground hover:bg-muted-foreground/80 text-white/80  px-3.5 h-8 text-sm font-medium flex items-center gap-2 transition-[background-color,transform] duration-150 ease focus:outline-none active:scale-[0.97] motion-reduce:transition-none"
              initial="idle"
              whileHover="hover"
            >
              <span>Signin</span>
              <LogInIcon className="w-4 h-4 text-white/80" />
            </motion.a>
          </div>
        </header>

        <LinesHeader side="right" />
        <div className="absolute inset-0  mx-auto pointer-events-none hidden lg:block">
          {" "}
          <LinesHeader2 side="right" />
        </div>
      </div>
    </div>
  );
}
