import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
type UserWidgetProps = {
  userId: string;
  onClose: any;
};

export default function UserWidget({ userId, onClose }: UserWidgetProps) {
  const [showModal, setShowModal] = useState(true);
  const scriptCode = `<script src="https://widget-bot-ui.vercel.app/widget.js" user="${userId}"></script>`;


  const handleClick = ()=>{
    setShowModal(false);
    onClose();
  }
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
              <button
                onClick={handleClick}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-white mb-2">Embed Code</h2>
              <p className="text-sm text-neutral-400 mb-4">
                Copy and paste this code into the desired place of your website (HTML editor, theme file, footer, etc.).
              </p>

              <div className="bg-[#1a1a1a] border border-neutral-700 rounded-lg p-4 font-mono text-sm text-white mb-4 overflow-auto">
                <div className="mockup-code w-full">
                  <pre data-prefix="1"><code>{`<!-- Do not remove this script -->`}</code></pre>
                  <pre data-prefix="2"><code>{scriptCode}</code></pre>
                </div>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(scriptCode)}
                className="bg-white text-black font-semibold px-4 py-2 rounded shadow hover:bg-neutral-200 transition"
              >
                Copy Code
              </button>

              <div className="mt-6">
                <h3 className="font-semibold text-white mb-2">Where to Paste It?</h3>
                <ul className="text-neutral-400 text-sm list-disc list-inside space-y-1">
                  <li>Paste before closing <code className="text-white">&lt;/body&gt;</code> tag.</li>
                  <li>Add to your website footer template for site-wide chat.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-white mb-2">Need Help?</h3>
                <a
                  href="https://example.com/setup-video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm hover:text-blue-400"
                >
                  ▶️ Watch setup video
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
     
  );
}
