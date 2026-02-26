"use client";
import { useEffect } from "react";

type WidgetAttrs = Record<string, string>;

export default function Widget({ attrs }: { attrs: WidgetAttrs }) {
  useEffect(() => {
    const script = document.createElement("script");

    Object.entries(attrs).forEach(([key, value]) => {
      script.setAttribute(key, value);
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