import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WidgetEmbedPopup({ userId }: { userId: string }) {
  const [showModal, setShowModal] = useState(false);
  const scriptCode = `<script src="https://widget-bot-ui.vercel.app/widget.js" user="${userId}"></script>`;

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="border border-white bg-white px-4 py-2 font-mono text-sm text-black transition-colors hover:bg-white/90"
      >
        Show script
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative w-full max-w-2xl border border-white/10 bg-[#0a0a0a] px-6 py-6 md:px-8 md:py-7 shadow-[0_22px_60px_rgba(0,0,0,0.9)]"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="font-mono text-[11px] uppercase tracking-widest text-white/45">
                Embed snippet
              </div>
              <h2 className="mt-2 font-mono text-lg text-white">Add flowidget to your site</h2>
              <p className="mt-1 text-sm text-white/55">
                Paste this script near the end of your HTML, before the closing {'</body>'} tag.
              </p>

              <div className="mt-4 border border-white/10 bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-white/75 overflow-x-auto">
                <pre>
{`// Do not remove this script
${scriptCode}`}
                </pre>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(scriptCode)}
                className="mt-3 border border-white bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-black transition-colors hover:bg-white/90"
              >
                Copy code
              </button>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-mono text-[13px] text-white">Where to paste it</h3>
                  <ul className="mt-1 list-disc list-inside text-sm text-white/55 space-y-1">
                    <li>
                      Add it before the closing <code className="font-mono text-white/80">&lt;/body&gt;</code> tag.
                    </li>
                    <li>Use your site footer template to load it on every page.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-[13px] text-white">Need help?</h3>
                  <p className="mt-1 text-sm text-white/55">
                    Docs & setup guides are coming soon. For now, reach out if you need a hand wiring it up.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
