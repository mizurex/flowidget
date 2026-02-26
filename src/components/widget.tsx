"use client";

import { useEffect } from "react";

type WidgetAttrs = Record<string, string>;

const BASE_ATTRS: WidgetAttrs = {
  src: "https://widget-bot-ui.vercel.app/widget.js",
  user: "8693e0d8-fbd1-4ae2-9c64-f8641fcd7d56",
};

export default function Widget({ attrs = {} }: { attrs?: WidgetAttrs }) {
  useEffect(() => {
    const merged = { ...BASE_ATTRS, ...attrs };
    const filtered = Object.fromEntries(
      Object.entries(merged).filter(([, v]) => v != null && v !== "")
    );

    const script = document.createElement("script");
    Object.entries(filtered).forEach(([key, value]) => {
      script.setAttribute(key, String(value));
    });

    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [JSON.stringify(attrs)]);

  return null;
}
