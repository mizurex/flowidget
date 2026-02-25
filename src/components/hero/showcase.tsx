"use client";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Transition, } from "framer-motion";
import { ArrowRight, Copy, FolderKanban, MessageSquareText, Plus, ShieldCheck, Upload, } from "lucide-react";
type TemplateId = "ai-automation" | "business" | "devops" | "marketing";
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
        id: "ai-automation",
        label: "Retro 8‑bit",
        shortLabel: "8‑bit",
        accent: "#a1a1aa",
        soft: "rgba(161, 161, 170, 0.14)",
        status: undefined,
        pages: [
            {
                title: "Pixel chat bubble",
                subtitle: "Sharp 8‑bit frame with blocky avatar and low-res message feed.",
                icon: MessageSquareText,
                image: "/test.png",
            },
            {
                title: "CRT support dock",
                subtitle: "Left-docked, retro glass reflection and scanline overlay.",
                icon: ShieldCheck,
                image: "/test.png",
            },
            {
                title: "Arcade full‑screen bot",
                subtitle: "Full viewport, chunky typography and neon accent grid.",
                icon: FolderKanban,
                image: "/test.png",
            },
        ],
    },
    {
        id: "business",
        label: "Muted layouts",
        shortLabel: "Muted",
        accent: "#a1a1aa",
        soft: "rgba(161, 161, 170, 0.14)",
        pages: [
            {
                title: "Minimal bottom-right bubble",
                subtitle: "Muted foreground, no border radius, tucked into the corner.",
                icon: FolderKanban,
                image: "/test.png",
            },
            {
                title: "Inline FAQ strip",
                subtitle: "Flat bar that lives inside your pricing or docs sections.",
                icon: ShieldCheck,
                image: "/test.png",
            },
            {
                title: "Two-column help desk",
                subtitle: "Chat on the right, suggested questions on the left.",
                icon: MessageSquareText,
                image: "/test.png",
            },
        ],
    },
    {
        id: "devops",
        label: "Terminal skins",
        shortLabel: "Terminal",
        accent: "#a1a1aa",
        soft: "rgba(161, 161, 170, 0.14)",
        pages: [
            {
                title: "Command-line assistant",
                subtitle: "Monospace, dark grid background, cursor-style prompt.",
                icon: FolderKanban,
                image: "/test.png",
            },
            {
                title: "Logs & traces bot",
                subtitle: "Sidecar panel with live log stream and quick filters.",
                icon: ShieldCheck,
                image: "/test.png",
            },
            {
                title: "Deploy helper widget",
                subtitle: "Compact widget that sits near your deploy button.",
                icon: MessageSquareText,
                image: "/test.png",
            },
        ],
    },
    {
        id: "marketing",
        label: "Floating layouts",
        shortLabel: "Floating",
        accent: "#a1a1aa",
        soft: "rgba(161, 161, 170, 0.14)",
        pages: [
            {
                title: "Hero corner bot",
                subtitle: "Large floating bubble that anchors your hero copy.",
                icon: FolderKanban,
                image: "/test.png",
            },
            {
                title: "Card-based concierge",
                subtitle: "Stack of quick actions above the chat to drive clicks.",
                icon: MessageSquareText,
                image: "/test.png",
            },
            {
                title: "Sticky sidebar companion",
                subtitle: "Follows scroll on the right edge with subtle motion.",
                icon: ShieldCheck,
                image: "/test.png",
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
const CATEGORY_ICONS: Record<TemplateId, React.ReactNode> = {
    "ai-automation": (<svg aria-hidden="true" width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.0015 10.6253H14.3844L18.1976 4.03185L15.8178 2.65564L13.3762 6.87552V2H10.6253V9.61713L4.03185 5.80393L2.65563 8.1837L6.87707 10.6253H2V13.3747H9.61713L5.80393 19.9681L8.18525 21.3459L10.6253 17.1245V22H13.3762V14.3844L19.9697 18.1976L21.3459 15.8163L17.1245 13.3747H22.0015V10.6253Z" fill="currentColor"/></g></svg>),
    "business": (<svg aria-hidden="true" width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 12V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/><path d="M9.5002 4H14.5002M9.5002 4L8.93432 8.52703C8.70381 10.3711 10.1417 12 12.0002 12C13.8587 12 15.2966 10.3711 15.0661 8.52703L14.5002 4M9.5002 4H6.70577C5.39362 4 4.23372 4.85275 3.84233 6.10517L3.17593 8.23768C2.59278 10.1038 3.98689 12 5.94195 12C7.40345 12 8.63624 10.9117 8.81751 9.46151L9.5002 4ZM14.5002 4H17.2946C18.6068 4 19.7667 4.85275 20.1581 6.10517L20.8245 8.23768C21.4076 10.1038 20.0135 12 18.0585 12C16.597 12 15.3642 10.9117 15.1829 9.46151L14.5002 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>),
    "devops": (<svg aria-hidden="true" width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7 19C4.23858 19 2 16.7614 2 14C2 11.4673 3.88316 9.37436 6.32568 9.04508C7.13649 6.69118 9.37075 5 12 5C15.3137 5 18 7.68629 18 11C20.2091 11 22 12.7909 22 15C22 17.2091 20.2091 19 18 19H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>),
    "marketing": (<svg aria-hidden="true" width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><path d="M15 15L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M14.8735 20.5309C13.0122 21.1564 10.9868 21.1564 9.12546 20.5309M20.5304 9.12595C21.1559 10.9873 21.1559 13.0126 20.5304 14.874M9.12549 3.46912C10.9869 2.84362 13.0122 2.84363 14.8736 3.46913M3.46864 14.874C2.84314 13.0127 2.84313 10.9874 3.46864 9.12598" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>),
};
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
const BUTTON = {
    duration: 0.13,
    easeEnter: [0.165, 0.84, 0.44, 1] as const,
    easeExit: [0.55, 0, 0.1, 1] as const,
    yOffset: "110%",
    rotateX: 28,
    widthSpring: { type: "spring" as const, stiffness: 500, damping: 35 },
};
export function TemplatesSection() {
    const router = useRouter();
    const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>("ai-automation");
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [hoveredDesktopPageIndex, setHoveredDesktopPageIndex] = useState<number | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const tickerMeasureRef = useRef<HTMLSpanElement>(null);
    const [tickerWidth, setTickerWidth] = useState<number | undefined>(undefined);
    const visibleTemplates = useMemo(() => TEMPLATE_CATEGORIES, []);
    const selectedTemplate = useMemo<TemplateCategory>(() => TEMPLATE_CATEGORIES.find((item) => item.id === selectedTemplateId) ?? DEFAULT_TEMPLATE_CATEGORY, [selectedTemplateId]);
    useEffect(() => {
        setActivePageIndex(0);
    }, [selectedTemplateId]);
    useLayoutEffect(() => {
        if (tickerMeasureRef.current) {
            setTickerWidth(tickerMeasureRef.current.scrollWidth);
        }
    }, [selectedTemplate.label]);
    const orderedPageIndexes = useMemo(() => {
        const allIndexes = selectedTemplate.pages.map((_, index) => index);
        return [activePageIndex, ...allIndexes.filter((index) => index !== activePageIndex)];
    }, [selectedTemplate.pages, activePageIndex]);
    const pagePositionByIndex = useMemo(() => new Map(orderedPageIndexes.map((pageIndex, position) => [pageIndex, position])), [orderedPageIndexes]);
    const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;
    const entranceTransition: Transition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.25, ease: easeOutQuad };
    const tabTransition: Transition = shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 380, damping: 28, mass: 0.75 };
    const prewarmTemplatesNavigation = useCallback(() => {
        router.prefetch("/home/templates");
        void fetch("/api/auth/get-session", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        }).catch(() => undefined);
    }, [router]);
    return (<>
    
    <div className="hidden md:flex justify-center">
     
    </div>
    <section id="templates" className="relative min-h-screen snap-start py-16 md:py-20 xl:py-24 overflow-x-hidden">
      <div className="relative z-10 w-[92%] md:w-[88%] lg:w-[60%] mx-auto">
      


        
        <div className="relative mt-3">
          <AnimatePresence mode="wait">
            <motion.div key={selectedTemplateId} initial={{ opacity: 0, scale: TAB_FADE.scale, filter: `blur(${TAB_FADE.blur}px)` }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{
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
                              index === 0 ? "shadow-[0_22px_44px_-24px_rgba(0,0,0,0.95)]" : ""
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
                              <span className="ml-4 hidden font-mono text-[11px] text-white/35 sm:block">
                                bot-design-{pageIndex + 1}.png
                              </span>
                            </div>

                            {/* Screenshot area */}
                            <div className="border-t border-white/10 bg-[#151515] p-3">
                              <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#2A2A2A] bg-[#141414]">
                                <Image
                                  src={page.image}
                                  alt={page.title}
                                  fill
                                  className="object-contain object-center"
                                  sizes="(max-width: 1280px) 90vw, 1000px"
                                  unoptimized
                                  priority={pageIndex === activePageIndex}
                                />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,rgba(20,20,20,0)_0%,rgba(20,20,20,0.86)_90%,#141414_100%)] backdrop-blur-[4px]" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </button>);
        })}
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,rgba(21,21,21,0)_0%,rgba(21,21,21,0.85)_60%,#151515_100%)]"/>
              </div>
            </motion.div>
          </AnimatePresence>

          
          <div className="absolute bottom-0 left-1/2 z-[60] isolate -translate-x-1/2">
        
          </div>
        </div>
      </div>
    </section>
    

    </>);
}