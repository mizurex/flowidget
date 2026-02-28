import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import LogoIcon from "@/components/svg/logo";


export default function EmbedPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <div className="mb-12 flex items-center gap-2">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-widest text-white/45 hover:text-white/70 mb-1">
            <LogoIcon width={20} height={20} />
          </Link>
          <h1 className="font-mono text-lg md:text-2xl font-medium text-white ">
          Docs
        </h1>
        </div>

       
        <p className="mt-3 font-mono text-sm text-white/55">
          Add the flowidget chat widget to your site. Copy the code below and paste it before the closing <code className="text-white/80">&lt;/body&gt;</code> tag. For Next.js/React, use the Widget component in your layout.
        </p>

        <section className="mt-12">
          <h2 className="font-mono text-xl text-white">How to embed</h2>
          <p className="mt-2 font-mono text-sm text-white/55">
            Choose HTML or Next.js/React. For HTML, paste the script tag. For Next.js, add the Widget component and create components/widget.tsx.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest ">HTML</p>
              <CodeBlock code={HTML_CODE} lang="html" />
            </div>

            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-white">Next.js / React</p>
              <p className="mb-3 font-mono text-sm text-white/55">
                Import the Widget in your layout and pass attrs. Create the component file below.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-white/45">1. Layout (app/layout.tsx)</p>
                  <CodeBlock code={LAYOUT_CODE} lang="tsx" />
                </div>
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-white/45">2. Component (components/widget.tsx)</p>
                  <CodeBlock code={WIDGET_COMPONENT} lang="tsx" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-mono text-xl text-white">Anatomy</h2>
          <p className="mt-2 font-mono text-sm text-white/55">
            The Widget is a client component that injects a script tag. Add it inside your body, typically in the root layout. It accepts an attrs object with src, user, and data-* attributes.
          </p>
          <div className="mt-4">
            <CodeBlock code={ANATOMY_CODE} lang="tsx" />
          </div>
          <ul className="mt-4 space-y-2 font-mono text-sm text-white/55">
            <li className="flex gap-2">
              <span className="text-white/45">•</span>
              Widget renders nothing—it only mounts the script.
            </li>
            <li className="flex gap-2">
              <span className="text-white/45">•</span>
              Pass attrs with src, user, and any data-* options.
            </li>
            <li className="flex gap-2">
              <span className="text-white/45">•</span>
              Replace YOUR_USER_ID with your ID from the dashboard.
            </li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-mono text-xl text-white">Attributes</h2>
          <p className="mt-2 font-mono text-sm text-white/55">
            All attributes are passed as key-value pairs in the attrs object (React) or as script attributes (HTML).
          </p>
          <div className="mt-6 space-y-6">
            {ATTRS.map((a) => (
              <div key={a.name} className="border-b border-white/10 pb-6 last:border-0">
                <div className="flex flex-wrap items-center gap-2">
                  <code className="font-mono text-sm text-white">{a.name}</code>
                  {a.required && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">required</span>
                  )}
                  <span className="font-mono text-[12px] text-white/50">{a.values}</span>
                </div>
                <p className="mt-1 font-mono text-sm text-white/55">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 pb-12">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-widest text-white/45 hover:text-white/70">
             Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

const ATTRS = [
  { name: "user", required: true, values: "string", desc: "Your flowidget user ID from the dashboard." },
  { name: "preset", values: "retro | neutral | 8bit", desc: "Visual style of the chat widget." },
  { name: "bubble", values: "outline | soft | (empty)", desc: "Message bubble style. Empty = default filled." },
  { name: "bubbleSize", values: "sm | md | lg", desc: "Size of message bubbles." },
  { name: "avatar", values: "URL", desc: "Image URL for the launcher button icon." },
  { name: "position", values: "bottom-right | bottom-left | top-right | top-left", desc: "Where the launcher appears on screen." },
];
const SCRIPT_URL = "https://widget-bot-ui.vercel.app/widget.js";

const HTML_CODE = `<script
  src="${SCRIPT_URL}"
  user="YOUR_USER_ID"
  preset="retro"
  bubble="outline"
  bubbleSize="sm"
  avatar="https://example.com/avatar.png"
></script>`;

const LAYOUT_CODE = `import Widget from "@/components/widget";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Widget attrs={{
          "src": "${SCRIPT_URL}",
          "user": "YOUR_USER_ID",
          "preset": "retro",
          "bubble": "outline",
          "bubbleSize": "sm",
          "avatar": "https://example.com/avatar.png",
        }} />
        <main>{children}</main>
      </body>
    </html>
  );
}`;

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

const ANATOMY_CODE = `<body>
  <Widget attrs={{ "src": "...", "user": "...", "preset": "retro", "bubble": "outline", "bubbleSize": "sm", "avatar": "https://example.com/avatar.png" }} />
  <main>{children}</main>
</body>`;