"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Bot, Code2, Gauge, MessageSquareText, Sparkles } from "lucide-react";
import React, { useMemo, useState } from "react";

type StepId = "create" | "train" | "embed" | "monitor";

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
    accent: "#F04D26",
    soft: "rgba(240, 77, 38, 0.14)",
  },
  {
    id: "train",
    title: "Train your bot",
    subtitle: "Feed links, docs, FAQs — watch sources get indexed.",
    icon: Bot,
    accent: "#FF8201",
    soft: "rgba(255, 130, 1, 0.14)",
  },
  {
    id: "embed",
    title: "Embed script",
    subtitle: "Copy one snippet. Works on any site in minutes.",
    icon: Code2,
    accent: "#60A5FA",
    soft: "rgba(96, 165, 250, 0.14)",
  },
  {
    id: "monitor",
    title: "Watch dashboard",
    subtitle: "Logs, recent messages, handoffs — all in one place.",
    icon: Activity,
    accent: "#22C55E",
    soft: "rgba(34, 197, 94, 0.14)",
  },
];

function PreviewShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden  border border-white/10 bg-[#0F0F0F]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#101010] px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <div className="ml-3 truncate font-mono text-[12.5px] text-white/55">{title}</div>
        <div className="ml-auto flex items-center gap-2">
          <Gauge className="h-4 w-4 text-white/35" />
          <MessageSquareText className="h-4 w-4 text-white/35" />
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
    <pre className="overflow-hidden rounded-[16px] border border-white/10 bg-black/50 p-4 text-[12px] leading-relaxed text-white/75">
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
      className="relative overflow-hidden  py-16 md:py-20 xl:py-24"
    >
   

      <div className="relative z-10 mx-auto w-[92%] max-w-6xl md:w-[88%] lg:w-[90%]">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-8 items-center gap-2 rounded-[11px] border border-[#F04D26] bg-[#F04D26]/5 px-2.5 text-xs font-medium text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F04D26]" />
            <span className="font-mono tracking-wide">HOW IT WORKS</span>
          </div>
          <h2 className="mt-4 text-pretty font-mono text-2xl text-white md:text-3xl lg:text-4xl">
            From idea to live widget in 4 steps
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/60 md:text-base">
            Create it, train it, embed it — then watch real conversations and logs in your dashboard.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* left: step list */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2.5">
              {STEPS.map((step, idx) => {
                const isActive = step.id === activeId;
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveId(step.id)}
                    onMouseEnter={() => setActiveId(step.id)}
                    className={`group w-full rounded-[18px] border px-4 py-3.5 text-left transition duration-200 ${
                      isActive
                        ? "border-white/20 bg-white/[0.06]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-[13px] border border-white/10"
                        style={{ backgroundColor: step.soft }}
                      >
                        <Icon className="h-[18px] w-[18px]" style={{ color: step.accent }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-white/40">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <div className="mt-1.5 font-mono text-base text-white/90">{step.title}</div>
                        <div className="mt-1 text-sm text-white/55">{step.subtitle}</div>
                      </div>
                      <div
                        className="mt-1.5 h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: isActive ? step.accent : "rgba(255,255,255,0.12)",
                        }}
                      />
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
                        <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-3">
                          <div className="font-mono text-[11px] text-white/45">Widget name</div>
                          <div className="mt-1.5 font-mono text-white/80">Support Assistant</div>
                        </div>
                        <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-3">
                          <div className="font-mono text-[11px] text-white/45">Brand color</div>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span
                              className="h-4 w-4 rounded-[6px] border border-white/10"
                              style={{ backgroundColor: activeStep.accent }}
                            />
                            <span className="font-mono text-white/70">{activeStep.accent}</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-3">
                        <div className="font-mono text-[11px] text-white/45">Website</div>
                        <div className="mt-1.5 font-mono text-white/75">https://your-site.com</div>
                      </div>
                      <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-black/35 p-3">
                        <div className="text-sm text-white/70">Create widget and continue to training</div>
                        <div
                          className="rounded-[13px] px-3 py-2 text-sm font-medium text-white"
                          style={{ backgroundColor: activeStep.accent }}
                        >
                          Create
                        </div>
                      </div>
                    </div>
                  </PreviewShell>
                )}

                {activeStep.id === "train" && (
                  <PreviewShell title="Dashboard / Train bot">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-3">
                        <div className="font-mono text-[11px] text-white/45">Sources</div>
                        <div className="mt-2 space-y-2">
                          {[
                            { label: "Homepage + pricing", pct: 1 },
                            { label: "Docs / FAQ", pct: 0.66 },
                            { label: "Policies / hours", pct: 0.4 },
                          ].map((s) => (
                            <div key={s.label} className="flex items-center gap-3">
                              <div className="min-w-0 flex-1 truncate font-mono text-[12px] text-white/70">
                                {s.label}
                              </div>
                              <div className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${Math.round(s.pct * 100)}%`,
                                    backgroundColor: activeStep.accent,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[16px] border border-white/10 bg-black/35 p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-white/70">Embeddings + retrieval configured</div>
                          <div className="font-mono text-[12px] text-white/50">LIVE</div>
                        </div>
                        <div className="mt-2 font-mono text-[12px] text-white/55">
                          1,842 chunks · 0 errors · last update 12s ago
                        </div>
                      </div>
                    </div>
                  </PreviewShell>
                )}

                {activeStep.id === "embed" && (
                  <PreviewShell title="Dashboard / Embed script">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-3">
                        <div className="font-mono text-[11px] text-white/45">
                          Paste before closing body tag
                        </div>
                        <div className="mt-2">
                          <CodeBlock>{`<!-- Flowidget embed -->\n<script\n  async\n  data-widget-id="wid_4f2a..."\n  src="https://cdn.flowidget.ai/widget.js"\n></script>`}</CodeBlock>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-black/35 p-3">
                        <div className="text-sm text-white/70">Verify installation</div>
                        <div
                          className="rounded-[13px] px-3 py-2 text-sm font-medium text-white"
                          style={{ backgroundColor: activeStep.accent }}
                        >
                          Check
                        </div>
                      </div>
                    </div>
                  </PreviewShell>
                )}

                {activeStep.id === "monitor" && (
                  <PreviewShell title="Dashboard / Live activity">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-3">
                          <div className="font-mono text-[11px] text-white/45">Recent messages</div>
                          <div className="mt-2 space-y-2">
                            {[
                              "Do you support refunds?",
                              "What are your hours?",
                              "Can I embed on Webflow?",
                            ].map((m) => (
                              <div
                                key={m}
                                className="truncate rounded-[12px] bg-black/35 px-3 py-2 text-[12px] text-white/70"
                              >
                                {m}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-3">
                          <div className="font-mono text-[11px] text-white/45">Run log</div>
                          <div className="mt-2 space-y-2">
                            {[
                              "retrieval: 12ms · topK=6",
                              "guardrails: pass",
                              "response: 420ms",
                            ].map((l) => (
                              <div key={l} className="flex items-center gap-2">
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: activeStep.accent }}
                                />
                                <span className="font-mono text-[12px] text-white/65">{l}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[16px] border border-white/10 bg-black/35 p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-white/70">Hand off to human when needed</div>
                          <div className="font-mono text-[12px] text-white/50">AUTO</div>
                        </div>
                        <div className="mt-2 text-[12px] text-white/55">
                          Rules: confidence &lt; 0.55, billing keywords, angry sentiment
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
    </section>
  );
}
