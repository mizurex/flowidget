import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
type UserWidgetProps = {
  userId: string;
  onClose: () => void;
};

export default function UserWidget({ userId, onClose }: UserWidgetProps) {
  const [showModal, setShowModal] = useState(true);
  const scriptCode = `<script src="https://yourcdn.com/dist/widget.js" user="${userId}"></script>`;


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
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl relative"
            >
              <button
                onClick={handleClick}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Embed Code</h2>
              <p className="text-gray-600 text-sm mb-4">
                Copy and paste this code into the desired place of your website (HTML editor, theme file, footer, etc.).
              </p>
              <div className=" rounded-lg p-4 font-mono text-sm mb-1">
                <div className="mockup-code w-full">
                <pre data-prefix="1"><code>`Do not remove this script`</code></pre>
                <pre data-prefix="2"><code > {scriptCode}</code></pre>
               </div>
                
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(scriptCode)}
                className=" text-black px-4 py-2 rounded "
              >
                Copy Code
              </button>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Where to Paste It?</h3>
                <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                  <li>Paste before closing <code>&lt;/body&gt;</code> tag.</li>
                  <li>Add to your website footer template for site-wide chat.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                <a
                  href="https://example.com/setup-video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
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
