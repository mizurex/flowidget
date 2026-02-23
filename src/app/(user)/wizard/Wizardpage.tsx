'use client';

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import UserWidget from "@/components/widget/UserWidgetPopup";
import { AnimatePresence, motion } from "framer-motion";
import { widgetFormSchema } from "@/lib/schema/schema";
import { z } from "zod";

// ── tiny primitives ──────────────────────────────────────────────────────────

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-mono text-[11px] uppercase tracking-widest text-white/45">{label}</label>
    {children}
    {error && <p className="font-mono text-[11px] text-red-400">{error}</p>}
  </div>
);

const inputCls = (error?: string) =>
  `w-full bg-black/40 border ${error ? "border-red-400/60" : "border-white/10"} px-3 py-2.5 font-mono text-sm text-white placeholder:text-white/20 outline-none focus:border-[#F04D26]/60 transition-colors`;

const FormInput = ({ label, value, onChange, placeholder, error }: any) => (
  <Field label={label} error={error}>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputCls(error)}
    />
  </Field>
);

const FormTextarea = ({ label, value, onChange, placeholder, rows = 6, error }: any) => (
  <Field label={label} error={error}>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${inputCls(error)} resize-none`}
    />
  </Field>
);

// ── types ────────────────────────────────────────────────────────────────────

type Props = {
  user: User;
  widget: any;
  onSuccess: any;
};

// ── component ────────────────────────────────────────────────────────────────

export default function RedesignedDashboard2({ user, widget, onSuccess }: Props) {
  const [botName, setBotName]               = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [role, setRole]                     = useState("");
  const [content, setContent]               = useState("");
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");
  const [selectedUI, setSelectedUI]         = useState("classic");
  const [selectedColor, setSelectedColor]   = useState("#f59e0b");
  const [showEmbedPopup, setShowEmbedPopup] = useState(false);
  const [fieldErrors, setFieldErrors]       = useState<Partial<Record<keyof z.infer<typeof widgetFormSchema>, string>>>({});
  const [step, setStep]                     = useState(1);

  const STEPS = ["Bot Details", "Personality & Content", "Review & Confirm"];

  // ── validation (unchanged logic) ──────────────────────────────────────────
  const handleNextStep = () => {
    let partialData: Partial<z.infer<typeof widgetFormSchema>> = {};
    if (step === 1) partialData = { botName };
    else if (step === 2) partialData = { welcomeMessage, role, content };

    const result = widgetFormSchema.partial().safeParse(partialData);
    if (!result.success) {
      const errors: any = {};
      for (const issue of result.error.issues) errors[issue.path[0]] = issue.message;
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setStep(step + 1);
  };

  // ── submit (unchanged logic) ───────────────────────────────────────────────
  const handleCreateOrUpdateWidget = async () => {
    if (!user?.id) return;
    try {
      const finalContent = `Bot Name: ${botName}\nWelcome Message: ${welcomeMessage}\nRole: ${role}\nContent: ${content}`.trim();
      setLoading(true);
      setError("");
      const res = await fetch("https://widget-xxtv.onrender.com/add-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: finalContent, user_id: user.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create widget.");
      setShowEmbedPopup(true);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#151515] px-4 py-16">
      <div className="w-full max-w-lg border border-white/10 ">

        {/* top bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            Create widget
          </span>
          <span className="font-mono text-xs text-white/25">
            {step} / {STEPS.length}
          </span>
        </div>

        {/* step strip */}
        <div className="grid border-b border-white/10" style={{ gridTemplateColumns: `repeat(${STEPS.length}, 1fr)` }}>
          {STEPS.map((label, idx) => {
            const n = idx + 1;
            const active = step === n;
            const done   = step > n;
            return (
              <div
                key={label}
                className={`border-r border-white/10 px-4 py-3 last:border-r-0 ${active ? "bg-[#F04D26]/8" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: active ? "#F04D26" : done ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)" }}
                  >
                    {String(n).padStart(2, "0")}
                  </span>
                  {active && <div className="h-px flex-1 bg-[#F04D26]/30" />}
                </div>
                <div
                  className="mt-1 font-mono text-[11px] leading-tight"
                  style={{ color: active ? "rgba(255,255,255,0.8)" : done ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)" }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* step content */}
        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-5"
              >
                <FormInput
                  label="Bot name"
                  value={botName}
                  onChange={(e: any) => setBotName(e.target.value)}
                  placeholder="e.g. Support Pro"
                  error={fieldErrors.botName}
                />

                <Field label="UI Style">
                  <select
                    value={selectedUI}
                    onChange={(e) => setSelectedUI(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-[#F04D26]/60 transition-colors"
                  >
                    <option value="classic">Classic</option>
                  </select>
                </Field>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-5"
              >
                <FormInput
                  label="Welcome message"
                  value={welcomeMessage}
                  onChange={(e: any) => setWelcomeMessage(e.target.value)}
                  placeholder="Hi! How can I help you?"
                  error={fieldErrors.welcomeMessage}
                />
                <FormInput
                  label="Bot role / personality"
                  value={role}
                  onChange={(e: any) => setRole(e.target.value)}
                  placeholder="e.g. Friendly support assistant"
                  error={fieldErrors.role}
                />
                <FormTextarea
                  label="Content / knowledge base"
                  value={content}
                  onChange={(e: any) => setContent(e.target.value)}
                  placeholder="Paste FAQs, contact info, pricing…"
                  rows={7}
                  error={fieldErrors.content}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-0 border border-white/10"
              >
                {[
                  ["Name",    botName       || "—"],
                  ["Welcome", welcomeMessage || "—"],
                  ["Role",    role           || "—"],
                  ["Content", content ? content.slice(0, 60) + (content.length > 60 ? "…" : "") : "—"],
                  ["Style",   selectedUI],
                  ["Color",   selectedColor],
                ].map(([k, v]) => (
                  <div key={k} className="flex border-b border-white/10 last:border-b-0">
                    <div className="w-28 shrink-0 border-r border-white/10 px-3 py-2.5 font-mono text-[11px] text-white/40 uppercase tracking-widest">
                      {k}
                    </div>
                    <div className="px-3 py-2.5 font-mono text-sm text-white/75 break-all">{v}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* footer: nav buttons */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="font-mono text-sm text-white/40 transition-colors hover:text-white/70"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              onClick={handleNextStep}
              className="bg-[#F04D26] px-5 py-2 font-mono text-sm font-medium text-white transition-opacity hover:opacity-80"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleCreateOrUpdateWidget}
              disabled={loading}
              className="bg-[#F04D26] px-5 py-2 font-mono text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {loading ? "Saving…" : "Create widget"}
            </button>
          )}
        </div>

        {error && (
          <div className="border-t border-red-400/20 px-6 py-3">
            <p className="font-mono text-[11px] text-red-400">{error}</p>
          </div>
        )}
      </div>

      {showEmbedPopup && user?.id && (
        <UserWidget
          userId={user.id}
          onClose={() => {
            setShowEmbedPopup(false);
            onSuccess();
          }}
        />
      )}
    </div>
  );
}
