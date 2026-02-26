"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import { FolderKanban, MessageSquareText, ShieldCheck } from "lucide-react";

type TemplateId = "Designs";
type TemplatePage = {
    title: string;
    subtitle: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    image: string;
};
type TemplateCategory = {
    id: TemplateId;
    label: string;
    shortLabel: string;
    accent: string;
    soft: string;
    status?: "NEW" | "SOON";
    disabled?: boolean;
    pages: TemplatePage[];
};
const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "Designs",
    label: "Retro 8‑bit",
    shortLabel: "8‑bit",
    accent: "#a1a1aa",
    soft: "rgba(161, 161, 170, 0.14)",
    status: undefined,
    pages: [
      {
        title: "Pixel chat bubble",
        subtitle: "",
        icon: MessageSquareText,
        image: "/avatar.jpeg",
      },
      {
        title: "Neutral bubble dock",
        subtitle: "",
        icon: ShieldCheck,
        image: "/neutral.jpeg",
      },
      {
        title: "Arcade image bubble",
        subtitle: "",
        icon: FolderKanban,
        image: "/retro.jpeg",
      },
    ],
  },
];
function getDefaultTemplateCategory(): TemplateCategory {
    const firstTemplate = TEMPLATE_CATEGORIES[0];
    if (!firstTemplate) {
        throw new Error("TEMPLATE_CATEGORIES must contain at least one template");
    }
    return firstTemplate;
}
const DEFAULT_TEMPLATE_CATEGORY = getDefaultTemplateCategory();
const TAB_CARDS = {
    stagger: 0.15,
    initialScale: 0.96,
    spring: { type: "spring" as const, stiffness: 600, damping: 28 },
};
const TAB_FADE = {
    exitDuration: 0.25,
    enterDuration: 0.35,
    exitEase: [0.55, 0, 1, 0.45] as const,
    enterEase: [0.165, 0.84, 0.44, 1] as const,
    scale: 0.98,
    blur: 4,
};

export function TemplatesSection() {
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [hoveredDesktopPageIndex, setHoveredDesktopPageIndex] = useState<number | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const selectedTemplate = DEFAULT_TEMPLATE_CATEGORY;

    const orderedPageIndexes = useMemo(() => {
        const allIndexes = selectedTemplate.pages.map((_, index) => index);
        return [activePageIndex, ...allIndexes.filter((index) => index !== activePageIndex)];
    }, [selectedTemplate.pages, activePageIndex]);
    const pagePositionByIndex = useMemo(() => new Map(orderedPageIndexes.map((pageIndex, position) => [pageIndex, position])), [orderedPageIndexes]);
    const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;
   
    return (<>
    
    <div className="hidden md:flex justify-center max-w-xl">
     
    </div>
    <section id="templates" className="relative min-h-screen snap-start py-16 md:py-20 xl:py-0 overflow-x-hidden">
      <div className="relative z-10 w-[92%] md:w-[88%] lg:w-[50%] mx-auto">
      


        
        <div className="relative mt-3">
          <AnimatePresence mode="wait">
            <motion.div key="templates" initial={{ opacity: 0, scale: TAB_FADE.scale, filter: `blur(${TAB_FADE.blur}px)` }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{
            opacity: 0,
            scale: TAB_FADE.scale,
            filter: `blur(${TAB_FADE.blur}px)`,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : { duration: TAB_FADE.exitDuration, ease: TAB_FADE.exitEase },
        }} transition={shouldReduceMotion
            ? { duration: 0 }
            : { duration: TAB_FADE.enterDuration, ease: TAB_FADE.enterEase }}>
              <div className="relative z-0 max-h-[85vh] overflow-hidden pb-20">
                <div className="relative mx-auto grid w-full max-w-6xl justify-items-center pt-[7.25rem] [perspective:10000px]">
                  {selectedTemplate.pages.map((page, pageIndex) => {
            const Icon = page.icon;
            const index = pagePositionByIndex.get(pageIndex) ?? pageIndex;
            const widths = ["100%", "94%", "88%"];
            const offset = index * -65;
            const hoverLift = hoveredDesktopPageIndex === pageIndex ? -12 : 0;
            return (<button key={page.title} type="button" onClick={index === 0 ? undefined : () => setActivePageIndex(pageIndex)} onMouseEnter={() => setHoveredDesktopPageIndex(pageIndex)} onMouseLeave={() => setHoveredDesktopPageIndex(null)} className={`origin-top text-left [grid-area:1/1] transition-[transform,width] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${index === 0 ? "cursor-default" : "cursor-pointer active:scale-[0.97]"}`} style={{
                    width: widths[index] ?? "100%",
                    transform: `translateY(${offset + hoverLift}px) translateZ(${-index}px)`,
                    zIndex: 20 - index,
                }}>
                        <motion.div initial={{ opacity: 0, scale: TAB_CARDS.initialScale }} animate={{
                    opacity: index > 2 ? 0 : 1,
                    scale: 1,
                }} transition={shouldReduceMotion
                    ? { duration: 0 }
                    : { ...TAB_CARDS.spring, delay: pageIndex * TAB_CARDS.stagger }}>
                          <div
                            className={`w-full origin-top select-none border border-white/10 bg-[#0F0F0F] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              index === 0 ? "" : ""
                            }`}
                          >
                            {/* Mac-style top bar */}
                            <div className="flex items-center justify-between border-b border-white/10 bg-[#101010] px-3.5 py-2.5">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBE2E]" />
                                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                                </div>
                                <div className="min-w-0">
                                  <span className="block truncate font-mono text-[12px] text-white/75">
                                    {page.title}
                                  </span>
                                  <span className="block truncate font-mono text-[11px] text-white/40">
                                    {page.subtitle}
                                  </span>
                                </div>
                              </div>
                          
                            </div>

                            <div className=" p-3">
                              <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#2A2A2A] ">
                                <Image
                                  src={page.image}
                                  alt={page.title}
                                  fill
                                  className="object-contain object-center"
                                  sizes="(max-width: 1280px) 90vw, 1000px"
                                  unoptimized
                                  priority={pageIndex === activePageIndex}
                                />
                      
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </button>);
        })}
                </div>


              </div>
            </motion.div>
          </AnimatePresence>

     
        </div>
      </div>
    </section>
    

    </>);
}