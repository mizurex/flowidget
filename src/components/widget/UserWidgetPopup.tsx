"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, ExternalLink } from "lucide-react";

type UserWidgetProps = {
  userId: string;
  onClose: () => void;
};

const SCRIPT_URL = "https://widget-bot-ui.vercel.app/widget.js";

function buildScript(attrs: Record<string, string>) {
  const parts = Object.entries(attrs)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `  ${k}="${String(v).replace(/"/g, "&quot;")}"`)
    .join("\n");
  return `<script\n${parts}\n></script>`;
}

function Highlight({ code, lang }: { code: string; lang: "html" | "js" }) {
  if (lang === "html") {
    const tokens: { t: string; c: string }[] = [];
    const re = /(<\/?)(script)(\s*)(>)|(\s+)(\w+(?:-\w+)*)(=)("([^"]*)")/g;
    let last = 0;
    let m;
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) tokens.push({ t: code.slice(last, m.index), c: "text-white/70" });
      if (m[1]) {
        tokens.push({ t: m[1], c: "text-white/50" });
        tokens.push({ t: m[2], c: "text-white" });
        tokens.push({ t: m[3], c: "text-white/70" });
        tokens.push({ t: m[4], c: "text-white/50" });
      } else if (m[6]) {
        tokens.push({ t: m[6], c: "text-white/70" });
        tokens.push({ t: m[7], c: "text-white/90" });
        tokens.push({ t: "=", c: "text-white/70" });
        tokens.push({ t: `"${m[9]}"`, c: "text-white/60" });
      }
      last = re.lastIndex;
    }
    if (last < code.length) tokens.push({ t: code.slice(last), c: "text-white/70" });
    return (
      <code className="font-mono text-[12px] leading-relaxed">
        {tokens.map((x, i) => (
          <span key={i} className={x.c}>{x.t}</span>
        ))}
      </code>
    );
  }
  const re = /\b(import|from|export|default|function|return|const|document|createElement|setAttribute|appendChild|removeChild|body|async|JSON\.stringify)\b|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g;
  const tokens: { t: string; c: string }[] = [];
  let last = 0;
  let m;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) tokens.push({ t: code.slice(last, m.index), c: "text-white/70" });
    if (m[1]) tokens.push({ t: m[1], c: "text-white/90" });
    else if (m[2]) tokens.push({ t: m[2], c: "text-white/60" });
    last = re.lastIndex;
  }
  if (last < code.length) tokens.push({ t: code.slice(last), c: "text-white/70" });
  return (
    <code className="font-mono text-[12px] leading-relaxed">
      {tokens.map((x, i) => (
        <span key={i} className={x.c}>{x.t}</span>
      ))}
    </code>
  );
}

const WIDGET_COMPONENT = `"use client";

import { useEffect } from "react";

type WidgetAttrs = Record<string, string>;

export default function Widget({ attrs = {} }: { attrs?: WidgetAttrs }) {
  useEffect(() => {
    const filtered = Object.fromEntries(
      Object.entries(attrs).filter(([, v]) => v != null && v !== "")
    );
    const script = document.createElement("script");
    Object.entries(filtered).forEach(([key, value]) => {
      script.setAttribute(key, String(value));
    });
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [JSON.stringify(attrs)]);

  return null;
}`;

export default function UserWidget({ userId, onClose }: UserWidgetProps) {
  const [tab, setTab] = useState<"html" | "react">("html");
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const htmlCode = buildScript({
    src: SCRIPT_URL,
    user: userId,
  });

  const layoutCode = `import Widget from "@/components/widget";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Widget attrs={{
          "src": "${SCRIPT_URL}",
          "user": "${userId}",
        }} />
        <main>{children}</main>
      </body>
    </html>
  );
}`;

  const reactCodeToCopy = layoutCode + "\n\n" + WIDGET_COMPONENT;
  const codeToShow = tab === "html" ? htmlCode : reactCodeToCopy;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setVisible(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleClose = () => setVisible(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToShow);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btn = (active: boolean) =>
    `border px-3 py-1.5 font-mono text-[12px] transition-colors ${active ? "border-white bg-white text-black" : "border-white/10 bg-black/40 text-white/70 hover:border-white/40"}`;

  return (
    <AnimatePresence onExitComplete={onClose}>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            ref={modalRef}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-6 md:p-8 max-h-[90vh] flex flex-col overflow-hidden"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-white/40 hover:text-white/80">
              <X className="w-4 h-4" />
            </button>

            <div className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-1">Embed</div>
            <h2 className="font-mono text-lg text-white md:text-xl mb-1">Add flowidget to your site</h2>
            <p className="font-mono text-sm text-white/55 mb-4">
              {tab === "html"
                ? "Paste before the closing <body> tag."
                : "In Next.js/React use the Widget component in your layout. Your components/widget.tsx looks like the code below."}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => setTab("html")} className={btn(tab === "html")}>HTML</button>
              <button onClick={() => setTab("react")} className={btn(tab === "react")}>Next.js / React</button>
            </div>

            <div className="flex justify-end mb-1">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[12px] text-white/80 hover:border-white/40 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy code"}
              </button>
            </div>

            <div className="border border-white/10 bg-[#0d0d0d] overflow-auto min-h-[200px] max-h-[calc(100vh-320px)]">
              <pre className="p-4 overflow-x-auto whitespace-pre font-mono text-[12px]">
                {tab === "html" ? (
                  <Highlight code={htmlCode} lang="html" />
                ) : (
                  <>
                    <span className="block font-mono text-[11px] uppercase tracking-widest mb-2">Layout (e.g. app/layout.tsx)</span>
                    <Highlight code={layoutCode} lang="js" />
                    <span className="block text-white/45 font-mono text-[11px] uppercase tracking-widest mt-4 mb-2">components/widget.tsx</span>
                    <Highlight code={WIDGET_COMPONENT} lang="js" />
                  </>
                )}
              </pre>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 font-mono text-sm text-white/70 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View docs for customizations (presets, bubble styles, position, avatar, etc.)
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
