"use client";

import { useState } from "react";
import FadePattern from "./fade-pattern";

type PresetId = "retro" | "neutral" | "8bit";
type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left";
type Bubble = "" | "outline" | "soft";
type BubbleSize = "sm" | "md" | "lg";
type LauncherMode = "text" | "default";

type UIState = {
  preset: PresetId;
  position: Position;
  bubble: Bubble;
  bubbleSize: BubbleSize;
  surfaceFlat: boolean;
  launcher: LauncherMode;
  allowOverrides: boolean;
};

const DEFAULTS: UIState = {
  preset: "retro",
  position: "bottom-right",
  bubble: "",
  bubbleSize: "md",
  surfaceFlat: false,
  launcher: "default",
  allowOverrides: false,
};

const PRESETS: PresetId[] = ["retro", "neutral", "8bit"];

const btn = (active: boolean) =>
  `cursor-pointer border px-3 py-1.5 text-left font-mono text-[12px] transition-colors ${
    active ? "border-white bg-white text-black" : "border-white/10 bg-black/40 text-white/70 hover:border-white"
  }`;

const btnSm = (active: boolean) =>
  `cursor-pointer border px-2 py-1 text-left font-mono text-[12px] transition-colors ${
    active ? "border-white bg-white text-black" : "border-white/10 bg-black/40 text-white/70 hover:border-white"
  }`;

export function WidgetPresetsSection() {
  const [state, setState] = useState<UIState>(DEFAULTS);

  function pick(patch: Partial<UIState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  const { preset, position, bubble, bubbleSize, surfaceFlat, launcher, allowOverrides } = state;

  return (
    <section id="widget-presets" className="relative mx-auto bg-black max-w-5xl   py-2 md:py-20 xl:pb-18 xl:pt-16 overflow-hidden">
           <FadePattern className="top-0"/>
      

      <div className="relative z-10 mx-auto flex w-[92%] max-w-6xl flex-col gap-10 md:w-[88%] lg:w-[90%] lg:flex-row lg:items-start">
        {/* left: controls */}
        <div className="flex-1 space-y-5">
        
          <h2 className="font-mono text-2xl text-neutral-500 md:text-3xl text-center md:text-left">
           <span className="text-neutral-200">Customize</span> your widget
          </h2>
          <p className="max-w-md text-sm text-neutral-400 font-sans text-center md:text-left">
            Pick a preset to preview. Add your chat boxes below.
          </p>

          <div className="mt-4 space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-white/35">Preset</div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {PRESETS.map((id) => (
                <button key={id} type="button" onClick={() => pick({ preset: id })} className={btn(preset === id)}>
                  {id}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/35">Position</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["bottom-right", "bottom-left", "top-right", "top-left"] as const).map((pos) => (
                  <button key={pos} type="button" onClick={() => pick({ position: pos })} className={btnSm(position === pos)}>
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/35">Bubble</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { id: "" as Bubble, label: "default" },
                  { id: "outline" as Bubble, label: "outline" },
                  { id: "soft" as Bubble, label: "soft" },
                ].map((b) => (
                  <button key={b.id || "default"} type="button" onClick={() => pick({ bubble: b.id })} className={btnSm(bubble === b.id)}>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/35">Bubble size</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <button key={size} type="button" onClick={() => pick({ bubbleSize: size })} className={btnSm(bubbleSize === size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/35">Launcher</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["default", "text"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => pick({ launcher: m })} className={btnSm(launcher === m)}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            <button
              type="button"
              onClick={() => pick({ surfaceFlat: !surfaceFlat })}
              className={`cursor-pointer flex items-center justify-between border px-3 py-2 font-mono text-[12px] transition-colors ${
                surfaceFlat ? "border-white bg-white text-black" : "border-white/10 bg-black/40 text-white/70 hover:border-white"
              }`}
            >
              <span>Flat surface</span>
              <span>{surfaceFlat ? "on" : "off"}</span>
            </button>
            <button
              type="button"
              onClick={() => pick({ allowOverrides: !allowOverrides })}
              className={`cursor-pointer flex items-center justify-between border px-3 py-2 font-mono text-[12px] transition-colors ${
                allowOverrides ? "border-white bg-white text-black" : "border-white/10 bg-black/40 text-white/70 hover:border-white"
              }`}
            >
              <span>Allow theme overrides</span>
              <span>{allowOverrides ? "on" : "off"}</span>
            </button>
          </div>
        </div>

        {/* right: dummy chat preview per preset */}
        <div className="flex-1 border border-white/10 bg-[#0d0d0d] p-4">
          <div className="border-b border-white/10 pb-2 font-mono text-[11px] uppercase tracking-widest text-white/40">
            Preview — {preset}
          </div>
          <div className="mt-4 min-h-[280px]">
            {preset === "retro" && (
              <div className="flex justify-center">
                <div className="w-[380px] h-[600px] max-h-[85vh] flex flex-col overflow-hidden bg-amber-50 rounded-[10px] border-2 border-gray-900 shadow-[8px_8px_0_#111827]">
                  <div className="px-5 py-4 flex justify-between items-center flex-shrink-0 bg-amber-100 border-b border-gray-900">
                    <span className="font-medium text-gray-900">Support</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    <div className="px-4 py-3 rounded-[10px] rounded-br-[4px] max-w-[82%] text-sm leading-relaxed bg-gray-900 text-amber-50 self-end">
                      Hi, I need help with pricing
                    </div>
                    <div className="px-4 py-3 rounded-[10px] rounded-bl-[4px] max-w-[82%] text-sm leading-relaxed bg-amber-100 text-gray-900 self-start border border-gray-900">
                      Sure! Check our pricing page for plans.
                    </div>
                    <div className="px-4 py-3 rounded-[10px] rounded-br-[4px] max-w-[82%] text-sm leading-relaxed bg-gray-900 text-amber-50 self-end">
                      Thanks
                    </div>
                  </div>
                  <div className="flex p-4 gap-2 flex-shrink-0 border-t border-gray-900 bg-amber-100">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border-2 border-gray-900 bg-amber-50 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                      readOnly
                    />
                    <button
                      type="button"
                      className="bg-gray-900 text-amber-50 border-2 border-gray-900 rounded-lg px-5 py-2.5 font-medium text-sm shadow-[2px_2px_0_#111827] hover:bg-gray-800 active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_#111827]"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
            {preset === "neutral" && (
              <div className="flex justify-center">
                <div className="w-[380px] h-[600px] max-h-[85vh] flex flex-col overflow-hidden bg-white rounded-none border border-neutral-300 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  <div className="px-5 py-4 flex justify-between items-center flex-shrink-0 bg-white border-b border-neutral-300 rounded-none">
                    <div className="flex gap-2">
                      <button type="button" className="bg-transparent text-neutral-600 w-8 h-8 inline-flex items-center justify-center rounded-none cursor-pointer hover:bg-neutral-100 hover:text-neutral-900">
                        —
                      </button>
                      <button type="button" className="bg-transparent text-neutral-600 w-8 h-8 inline-flex items-center justify-center rounded-none cursor-pointer hover:bg-neutral-100 hover:text-neutral-900">
                        □
                      </button>
                      <button type="button" className="bg-transparent text-neutral-600 w-8 h-8 inline-flex items-center justify-center rounded-none cursor-pointer hover:bg-neutral-100 hover:text-neutral-900">
                        ×
                      </button>
                    </div>
                    <span className="font-medium text-neutral-900">Support</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    <div className="px-4 py-3 rounded-none max-w-[82%] text-sm leading-relaxed bg-neutral-900 text-white self-end">
                      Hi, I need help
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-3 rounded-none self-start max-w-16 bg-neutral-100 border border-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-none bg-neutral-600 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-none bg-neutral-600 animate-pulse [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-none bg-neutral-600 animate-pulse [animation-delay:300ms]" />
                    </div>
                    <div className="px-4 py-3 rounded-none max-w-[82%] text-sm leading-relaxed bg-neutral-100 text-neutral-900 self-start border border-neutral-300">
                      Sure, how can I help?
                    </div>
                    <div className="px-4 py-3 rounded-none max-w-[82%] text-sm leading-relaxed bg-neutral-900 text-white self-end">
                      Thanks
                    </div>
                  </div>
                  <div className="flex p-4 gap-2 flex-shrink-0 border-t border-neutral-300 bg-white">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border border-neutral-300 bg-white rounded-none px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-600 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                      readOnly
                    />
                    <button
                      type="button"
                      className="bg-neutral-900 text-white border border-neutral-300 rounded-none px-5 py-2.5 font-medium text-sm hover:bg-neutral-800 active:scale-[0.97]"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
            {preset === "8bit" && (
              <div className="flex justify-center">
                <div className="w-[380px] h-[600px] max-h-[85vh] flex flex-col overflow-hidden bg-slate-50 rounded-none border-2 border-slate-900 shadow-[8px_8px_0_#0f172a] font-mono">
                  <div className="px-5 py-4 flex justify-between items-center flex-shrink-0 bg-slate-200 border-b border-slate-900 rounded-none">
                    <div className="flex gap-2">
                      <button type="button" className="bg-transparent text-slate-700 w-8 h-8 inline-flex items-center justify-center rounded-none border-2 border-transparent cursor-pointer hover:bg-slate-300 hover:border-slate-900">
                        —
                      </button>
                      <button type="button" className="bg-transparent text-slate-700 w-8 h-8 inline-flex items-center justify-center rounded-none border-2 border-transparent cursor-pointer hover:bg-slate-300 hover:border-slate-900">
                        □
                      </button>
                      <button type="button" className="bg-transparent text-slate-700 w-8 h-8 inline-flex items-center justify-center rounded-none border-2 border-transparent cursor-pointer hover:bg-slate-300 hover:border-slate-900">
                        ×
                      </button>
                    </div>
                    <span className="font-medium text-slate-900">Support</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    <div className="px-4 py-3 rounded-none max-w-[82%] text-sm leading-relaxed bg-slate-900 text-slate-50 self-end border-2 border-slate-900">
                      What plans do you have?
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-3 rounded-none self-start max-w-16 bg-slate-200 border border-slate-900">
                      <span className="w-1.5 h-1.5 rounded-none bg-slate-700 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-none bg-slate-700 animate-pulse [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-none bg-slate-700 animate-pulse [animation-delay:300ms]" />
                    </div>
                    <div className="px-4 py-3 rounded-none max-w-[82%] text-sm leading-relaxed bg-slate-200 text-slate-900 self-start border border-slate-900">
                      We have Starter, Pro, and Enterprise.
                    </div>
                    <div className="px-4 py-3 rounded-none max-w-[82%] text-sm leading-relaxed bg-slate-900 text-slate-50 self-end border-2 border-slate-900">
                      Thanks
                    </div>
                  </div>
                  <div className="flex p-4 gap-2 flex-shrink-0 border-t border-slate-900 bg-slate-200">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border-2 border-slate-900 bg-slate-50 rounded-none px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-700 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      readOnly
                    />
                    <button
                      type="button"
                      className="bg-slate-900 text-slate-50 border-2 border-slate-900 rounded-none px-5 py-2.5 font-medium text-sm shadow-[2px_2px_0_#0f172a] hover:bg-slate-800 active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_#0f172a]"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          
          </div>
        </div>
      </div>
    </section>
  );
}
