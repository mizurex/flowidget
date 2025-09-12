"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
type UserWidgetProps = {
  userId: string;
  onClose: () => void;
 
};

export default function UserWidget({ userId, onClose }: UserWidgetProps) {
  const [showModal, setShowModal] = useState(true);
  const [tab, setTab] = useState<"html" | "react">("html");

  const htmlCode = `<script src="https://widget-bot-ui.vercel.app/widget.js" user="${userId}"></script>`;

  const reactCode = `"use client";
import { useEffect } from "react";

export default function Widget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget-bot-ui.vercel.app/widget.js";
    script.setAttribute("user", "${userId}");
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}`;

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const codeToShow = tab === "html" ? htmlCode : reactCode;

  return (
    <div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#0e0e0e] w-full max-w-2xl p-6 rounded-xl shadow-2xl relative border border-neutral-800"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Heading */}
              <h2 className="text-xl font-bold text-white mb-2">Embed Widget</h2>
              <p className="text-sm text-neutral-400 mb-4">
                Choose your platform and copy the code.
              </p>

              {/* Tabs */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setTab("html")}
                  className={`px-4 py-2 rounded ${
                    tab === "html" ? "bg-white text-black" : "bg-neutral-800 text-white"
                  }`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setTab("react")}
                  className={`px-4 py-2 rounded ${
                    tab === "react" ? "bg-white text-black" : "bg-neutral-800 text-white"
                  }`}
                >
                  React / Next.js
                </button>
              </div>

              {/* Code Box */}
              <div className="bg-[#1a1a1a] border border-neutral-700 rounded-lg p-4 font-mono text-sm text-white mb-4 overflow-auto">
                <pre>{codeToShow}</pre>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => navigator.clipboard.writeText(codeToShow)}
                className="bg-white text-black font-semibold px-4 py-2 rounded shadow hover:bg-neutral-200 transition"
              >
                Copy Code
              </button>

              {/* Additional Notes */}
              <div className="mt-6 text-sm text-neutral-400">
                {tab === "html" ? (
                  <>
                    <h3 className="font-semibold text-white mb-2">Where to Paste It?</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Place before the closing <code className="text-white">&lt;/body&gt;</code> tag.</li>
                      <li>Works in any HTML or CMS like WordPress, Webflow, etc.</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-white mb-2">How to Use?</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Create a component like <code className="text-white">Widget.tsx</code></li>
                      <li>Paste the code above into it</li>
                      <li>Use it anywhere: <code className="text-white">&lt;Widget /&gt;</code></li>
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
