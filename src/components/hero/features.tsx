"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Code2, Gauge, MessageSquareText, Sparkles } from "lucide-react";
import React, { useMemo, useState } from "react";
import FadePattern from "./fade-pattern";

type StepId = "create" | "train" | "embed";

type Step = {
  id: StepId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  soft: string;
};

const STEPS: Step[] = [
  {
    id: "create",
    title: "Create widget",
    subtitle: "Pick a name, brand color, and where it will live.",
    icon: Sparkles,
    accent: "#a1a1aa",
    soft: "rgba(161, 161, 170, 0.18)",
  },
  {
    id: "train",
    title: "Train your bot",
    subtitle: "Feed links, docs, FAQs — watch sources get indexed.",
    icon: Bot,
    accent: "#a1a1aa",
    soft: "rgba(161, 161, 170, 0.18)",
  },
  {
    id: "embed",
    title: "Embed script",
    subtitle: "Copy one snippet. Works on any site in minutes.",
    icon: Code2,
    accent: "#a1a1aa",
    soft: "rgba(161, 161, 170, 0.18)",
  },
];

function PreviewShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#0F0F0F]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#101010] px-4 py-3">
        <div className="ml-3 truncate font-mono text-[12.5px] text-white/55">{title}</div>
        <div className="ml-auto flex items-center gap-2">
          <Gauge className="h-4 w-4 text-white/45" />
          <MessageSquareText className="h-4 w-4 text-white/45" />
        </div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent 0px, transparent 14px, rgba(255,255,255,0.03) 14px, rgba(255,255,255,0.03) 15px)",
          WebkitMaskImage:
            "radial-gradient(70% 65% at 55% 35%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0) 70%)",
          maskImage:
            "radial-gradient(70% 65% at 55% 35%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0) 70%)",
        }}
      />
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-hidden border border-white/10 bg-black/50 p-4 text-[12px] leading-relaxed text-white/75">
      <code>{children}</code>
    </pre>
  );
}

export default function FeaturesSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<StepId>("create");

  const activeStep = useMemo(
    () => STEPS.find((s) => s.id === activeId) ?? STEPS[0],
    [activeId],
  );

  return (
    <section
      id="features"
      className="relative overflow-hidden  py-16 md:py-20 xl:py-24 font-mono"
    >
    <FadePattern className="top-9"/>
      {/* background pattern over blank space */}
      <div
        className="pointer-events-none absolute bg-background inset-0 z-0 text-white opacity-[0.05]"
      
      />

      <div className="relative z-10 mx-auto w-[92%] max-w-6xl md:w-[88%] lg:w-[90%] ">
        <div className="flex flex-col items-center text-center">
        
          <h2 className="mt-4 text-pretty font-mono text-2xl text-neutral-500 md:text-3xl lg:text-4xl">
            Live <span className="text-neutral-200"> widget </span> in 3 steps
          </h2>
         
        </div>

        <div className="py-20 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* left: step list */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2.5">
              {STEPS.map((step, idx) => {
                const isActive = step.id === activeId;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveId(step.id)}
                    onMouseEnter={() => setActiveId(step.id)}
                    className={`group w-full border px-4 py-3.5 text-left transition duration-200 ${
                      isActive
                        ? "border-muted-foreground/60 bg-muted/15"
                        : "border-white/10 bg-white/[0.02] hover:border-muted-foreground/60 hover:bg-muted/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-9 w-9 items-center justify-center border border-white/10 bg-black/40"
                      >
                        <span className="font-mono text-sm text-white">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-base text-white/90">{step.title}</div>
                        <div className="mt-1 text-sm text-white/55">{step.subtitle}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* right: animated preview */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(6px)" }
                }
                animate={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                exit={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, filter: "blur(6px)" }
                }
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {activeStep.id === "create" && (
                  <PreviewShell title="Dashboard / Create widget">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="border border-white/10 bg-white/[0.03] p-3">
                          <div className="font-mono text-[11px] text-white/45">Widget name</div>
                          <div className="mt-1.5 font-mono text-white/80">Support Assistant</div>
                        </div>
                        <div className="border border-white/10 bg-white/[0.03] p-3">
                          <div className="font-mono text-[11px] text-white/45">Brand color</div>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="h-4 w-4 border border-white/10 bg-muted-foreground" />
                            <span className="font-mono text-white/70">muted</span>
                          </div>
                        </div>
                      </div>
                      <div className="border border-white/10 bg-white/[0.03] p-3">
                        <div className="font-mono text-[11px] text-white/45">Website</div>
                        <div className="mt-1.5 font-mono text-white/75">https://your-site.com</div>
                      </div>
                    
                    </div>
                  </PreviewShell>
                )}

                {activeStep.id === "train" && (
                  <PreviewShell title="Dashboard / Train bot">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="border border-white/10 bg-white/[0.03] p-3">
                        <div className="font-mono text-[11px] text-white/45">Persona & tone</div>
                        <div className="mt-2 space-y-1 font-mono text-[12px] text-white/70">
                          <p>
                            <span className="text-white/45">Name:</span> Support Assistant
                          </p>
                          <p>
                            <span className="text-white/45">Welcome:</span> “Hey, I’m here to help
                            you get unstuck.”
                          </p>
                          <p>
                            <span className="text-white/45">Tone:</span> concise, friendly, no small
                            talk
                          </p>
                        </div>
                      </div>
                    </div>
                  </PreviewShell>
                )}

                {activeStep.id === "embed" && (
                  <PreviewShell title="Dashboard / Script">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="relative overflow-hidden border border-white/10 bg-white/[0.03] p-3">
                        <div
                          className="pointer-events-none absolute inset-0 z-0 text-white opacity-[0.07] dark:opacity-[0.1]"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(-35deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 4px)",
                          }}
                        />
                        <div className="relative z-10">
                          <CodeBlock>{`<script\n  async\n  data-widget-id="wid_4f2a..."\n  src="https://cdn.flowidget.ai/widget.js"\n></script>`}</CodeBlock>
                        </div>
                      </div>
                    </div>
                  </PreviewShell>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <FadePattern className="bottom-16"/>
    </section>
  );
}
