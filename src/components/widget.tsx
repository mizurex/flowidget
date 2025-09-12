"use client";
import { useEffect } from "react";

export default function Widget() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://widget-bot-ui.vercel.app/widget.js';
        script.setAttribute('user', '1a6a0ad9-7224-4215-89fa-e4854d4a030a');
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