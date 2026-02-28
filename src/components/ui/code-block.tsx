"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Lang = "html" | "tsx";

function tokenizeLine(line: string, lang: Lang): { text: string; className: string }[] {
  const out: { text: string; className: string }[] = [];
  const plain = "text-white/70";
  const keyword = "text-cyan-400";
  const string = "text-amber-400/90";
  const tag = "text-sky-400/90";
  const name = "text-white";
  const attr = "text-emerald-400/90";

  if (lang === "html") {
    const re = /(<\/?)(script)(\s*)(>)|(\s+)(\w+(?:-\w+)*)(=)("([^"]*)")/g;
    let last = 0;
    let m;
    while ((m = re.exec(line)) !== null) {
      if (m.index > last) out.push({ text: line.slice(last, m.index), className: plain });
      if (m[1]) {
        out.push({ text: m[1], className: tag });
        out.push({ text: m[2], className: name });
        out.push({ text: m[3], className: plain });
        out.push({ text: m[4], className: tag });
      } else if (m[6]) {
        out.push({ text: m[6], className: plain });
        out.push({ text: m[7], className: attr });
        out.push({ text: "=", className: plain });
        out.push({ text: `"${m[9]}"`, className: string });
      }
      last = re.lastIndex;
    }
    if (last < line.length) out.push({ text: line.slice(last), className: plain });
    return out;
  }

  const re = /\b(import|from|export|default|function|return|const|let|var|document|createElement|setAttribute|appendChild|removeChild|body|async|JSON\.stringify|type|Record|string|useEffect|useState|Object|entries|filter|forEach)\b|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(<\/?[\w.-]+)|(\/>|>)|([\w-]+)(=)/g;
  let last2 = 0;
  let m2;
  while ((m2 = re.exec(line)) !== null) {
    if (m2.index > last2) out.push({ text: line.slice(last2, m2.index), className: plain });
    if (m2[1]) out.push({ text: m2[1], className: keyword });
    else if (m2[2]) out.push({ text: m2[2], className: string });
    else if (m2[3]) out.push({ text: m2[3], className: name });
    else if (m2[4]) out.push({ text: m2[4], className: tag });
    else if (m2[5]) out.push({ text: m2[5], className: m2[5] === "=" ? plain : attr });
    else if (m2[6]) out.push({ text: m2[6], className: plain });
    last2 = re.lastIndex;
  }
  if (last2 < line.length) out.push({ text: line.slice(last2), className: plain });
  return out;
}

export function CodeBlock({ code, lang, title }: { code: string; lang: Lang; title?: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border border-white/10 bg-[#0d0d0d] overflow-hidden">
      {title && (
        <div className="border-b border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white/45">
          {title}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 text-white/40 hover:text-white/80 transition-colors z-10"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
        <pre className="p-4 overflow-x-auto font-mono text-[13px] leading-relaxed">
          <code className="block">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none w-8 shrink-0 pr-4 text-right text-white/25 font-mono text-[12px]">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  {tokenizeLine(line, lang).map((t, j) => (
                    <span key={j} className={t.className}>
                      {t.text}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
