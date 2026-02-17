"use client";
import { useEffect } from "react";

export default function Widget() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://widget-bot-ui.vercel.app/widget.js';
        script.setAttribute('user', '8693e0d8-fbd1-4ae2-9c64-f8641fcd7d56');
        script.async = true;
        
        document.body.appendChild(script);
       
        return () => {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      }, []);

    return null;

}