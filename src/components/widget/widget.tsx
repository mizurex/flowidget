"use client";

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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [JSON.stringify(attrs)]);

  return null;
}
