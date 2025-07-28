'use client';

import { useEffect, useState } from 'react';
import { ClipboardCheck, Video, Bot, Upload, Globe, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase-browser';
import type { User } from '@supabase/supabase-js';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';

export default function WidgetInstall() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.data);
    };
    fetchUser();
  }, []);

  const userId = user?.id || '';
  const scriptTag = `<script src="https://yourcdn.com/dist/widget.js"user="${userId}"></script>`;

  return (
    <ProtectedRoute>
      <div className="bg-white flex h-screen text-black overflow-y-auto">
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
          >
            {/* Header */}
            <div className="text-center mb-1">
              <h1 className="text-3xl font-bold text-slate-800">🎉 Your Chat Widget is Ready</h1>
              <p className="text-slate-500 mt-2">Install this on your site to start engaging visitors instantly.</p>
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-700">
                  <ClipboardCheck className="w-5 h-5" />
                  Step 1: Copy the Code Snippet
                </h2>
                <p className="text-slate-600 ml-6 mt-1">
                  Add the following code snippet to every page where you want the chat widget to appear.
                </p>
                <div className="bg-gray-900 text-white p-4 rounded-xl relative font-mono text-sm mt-2  overflow-x-auto ml-1">
                  
                  <div className="mockup-code bg-black  text-primary-content w-full">
                    <pre><code>{scriptTag}</code></pre>
                 </div>
                  
                  
                
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-700">
                  <Upload className="w-5 h-5" />
                  Step 2: Paste Before <code>{`</body>`}</code>
                </h2>
                <p className="text-slate-600 ml-6 mt-1">
                  Paste the script just before the closing <code>{`</body>`}</code> tag of your HTML layout.
                </p>
                <div className="ml-6 bg-amber-50 border-l-4 border-amber-400 p-4 mt-4 rounded-r-lg text-sm text-amber-800">
                  💡 Pro Tip: Add it inside your website’s global footer or layout template so it loads on every page.
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-700">
                  <Globe className="w-5 h-5" />
                  Step 3: Preview & Verify
                </h2>
                <p className="text-slate-600 ml-6 mt-1">
                  Once installed, visit your website and check the bottom-right corner — your chat widget should appear!
                </p>
                <div className="ml-6 mt-4">
                  <a
                    href="#"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    🔍 Preview Widget on Site →
                  </a>
                </div>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg ml-2 flex items-start gap-3"
              >
                <Video className="w-5 h-5 mt-1 text-blue-500" />
                <div className="text-blue-800 text-sm">
                  <strong>Need help?</strong> Watch our quick installation video or contact support if the widget doesn’t show up.
                  <div className="mt-2">
                    <a
                      href="https://youtube.com/demo-install-video"
                      target="_blank"
                      className="text-blue-600 underline font-medium hover:text-blue-800"
                    >
                      🎥 Watch Installation Tutorial
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
