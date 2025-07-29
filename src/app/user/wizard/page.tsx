"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/ProtectedRoute";
import WidgetEmbedPopup from "@/components/WidgetPopup";
import UserWidget from "@/components/UserWidgetPopup";

import {
  Bot,
  Code,
  EyeIcon,
  LogOut,
  Settings,
  UploadCloud,
  ListChecks,
  Lightbulb,
  FileText,
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Widget {
  id: string;
  bot_name: string;
  welcome_message: string;
  role: string;
  content: string;
  created_at: string;
}

// Reusable Input Field Component for consistent styling
const FormInput = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
    />
  </div>
);

// Reusable Textarea Component
const FormTextarea = ({ label, value, onChange, placeholder, rows = 6 }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm resize-none"
    />
  </div>
);

export default function RedesignedDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [botName, setBotName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [dummymsg, setDummymsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [hasExistingWidget, setHasExistingWidget] = useState(false);
  const [existingWidget, setExistingWidget] = useState<Widget | null>(null);
  const [checkingWidget, setCheckingWidget] = useState(true);
  const [showEmbedPopup, setShowEmbedPopup] = useState(false);

// Fetch user and check for existing widget

useEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      const res = await fetch("/api/auth/me");
      const { data } = await res.json();

      if (data && data.id) {
        setUser(data);
        await checkExistingWidget(data.id); // ✅ calling it here
      }

      setCheckingWidget(false);
    }
  });

  return () => {
    authListener?.subscription.unsubscribe();
  };
}, []);
   

      const checkExistingWidget = async (userId: string) => {
        try {
          const res = await fetch(`https://widget-xxtv.onrender.com/get-widget?user_id=${userId}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.content) {
              const content = data.content;
              const lines = content.split('\n');
              const parsedWidget: Partial<Widget> = { id: data.id, created_at: data.created_at };

              lines.forEach((line: string) => {
                if (line.startsWith('Bot Name:')) parsedWidget.bot_name = line.replace('Bot Name:', '').trim();
                else if (line.startsWith('Welcome Message:')) parsedWidget.welcome_message = line.replace('Welcome Message:', '').trim();
                else if (line.startsWith('Role:')) parsedWidget.role = line.replace('Role:', '').trim();
                else if (line.startsWith('Content:')) parsedWidget.content = line.replace('Content:', '').trim();
              });

              setHasExistingWidget(true);
              setExistingWidget(parsedWidget as Widget);
              setBotName(parsedWidget.bot_name || "");
              setWelcomeMessage(parsedWidget.welcome_message || "");
              setRole(parsedWidget.role || "");
              setContent(parsedWidget.content || "");
            }
          }
        } catch (err) {
          console.error("Error checking widget:", err);
        }
      };

       

  const handleCreateOrUpdateWidget = async () => {
    if (!user?.id) return;
    const finalContent = `Bot Name: ${botName}\nWelcome Message: ${welcomeMessage}\nRole: ${role}\nContent: ${content}`.trim();

    try {
      setLoading(true);
      setError("");
      const res = await fetch("https://widget-xxtv.onrender.com/add-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: finalContent, user_id: user.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create widget.");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newWidget = { id: data.id, bot_name: botName, welcome_message: welcomeMessage, role, content, created_at: new Date().toISOString() };

      setHasExistingWidget(true);
      setExistingWidget(newWidget);
      setShowEmbedPopup(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  if (checkingWidget) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-screen bg-slate-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className={`text-slate-600 ${space.className}`}>Loading your dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

 

  return (
    <ProtectedRoute>
      <div className={`flex h-screen bg-slate-100 text-slate-800 overflow-hidden ${space.className}`}>
        {/* ===== HEADER ===== */}
        <header className="fixed top-0 left-0 w-full z-30 bg-white border-b border-slate-200 h-16">
          <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between h-full">
            <div className="text-xl font-bold tracking-tight text-slate-900">
              flowidget.
            </div>
            <div className="flex items-center gap-4">
               <button onClick={handleLogout} className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors flex items-center gap-2">
                <LogOut size={16}/>
                Logout
              </button>
              <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white">
                {user?.email?.[0]?.toUpperCase() ?? "U"}
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 pt-16 overflow-hidden">
          {/* ===== SIDEBAR ===== */}
          <aside className="w-[320px] p-6 border-r border-slate-200 bg-white overflow-y-auto flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Welcome, {user?.email?.split("@")[0] ?? "Guest"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {hasExistingWidget
                  ? "Your AI assistant is active."
                  : "Let's create your AI assistant."}
              </p>
            </div>
            
            {hasExistingWidget && existingWidget ? (
              // Widget Info Card
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">{existingWidget.bot_name}</h3>
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                          Active
                        </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEmbedPopup(true)}
                    className="w-full bg-slate-900 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2"
                  >
                    <Code size={14} />
                    Get Embed Code
                  </button>
              </div>
            ) : (
              // Setup Tips
              <div className="space-y-6 text-sm">
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2"><ListChecks size={16} className="text-amber-500"/>Setup Steps</h3>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                    <li>Give your bot a name & welcome message.</li>
                    <li>Define the bot's role or personality.</li>
                    <li>Paste your website content or FAQs.</li>
                    <li>Click "Save" and embed on your site!</li>
                  </ol>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2"><Lightbulb size={16} className="text-amber-500"/>Tips for Best Results</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                    <li>Provide clear, concise information.</li>
                    <li>Include contact details like email or phone.</li>
                    <li>Add your return policy or shipping info.</li>
                  </ul>
                </div>
              </div>
            )}
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
              {/* === WIDGET CREATION FORM === */}
              {!hasExistingWidget && (
                 <>
                  <h1 className="text-3xl font-bold text-slate-900">Create Your AI Assistant</h1>
                  <p className="text-slate-500 mt-1 mb-8">Fill in the details below to train your new bot.</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Form Fields */}
                    <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200">
                      <FormInput label="Bot Name" value={botName} onChange={(e:any) => setBotName(e.target.value)} placeholder="e.g., Support Pro" />
                      <FormInput label="Welcome Message" value={welcomeMessage} onChange={(e:any) => setWelcomeMessage(e.target.value)} placeholder="👋 Hi! How can I help you today?" />
                      <FormInput label="Bot Role / Personality" value={role} onChange={(e:any) => setRole(e.target.value)} placeholder="A friendly and helpful assistant" />
                      <FormTextarea label="Content / Knowledge Base" value={content} onChange={(e:any) => setContent(e.target.value)} placeholder="Paste your website FAQs, about us page, contact info, etc." rows={10} />
                    </div>

                    {/* Right Column: Live Preview */}
                    <div className=" top-8 w-[18vw]">
                       <h3 className="text-lg font-semibold text-slate-800 mb-3">Demo Preview</h3>
                       <div className="bg-white w-full max-w-sm rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="bg-black text-white p-4 flex items-center justify-between">
                            <h4 className="font-bold">{botName || "My Bot"}</h4>
                        </div>
                        <div className="p-4 h-64 bg-slate-50 flex flex-col gap-3">
                          <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0"></div>
                              <div className="bg-white text-slate-800 px-4 py-2 rounded-lg rounded-tl-none text-sm shadow-sm">
                                {welcomeMessage || "👋 Hi! How can I help you today?"}
                              </div>
                          </div>
                          <div className="flex items-start gap-2.5 self-end">
                              <div className="bg-amber-500 text-white px-4 py-2 rounded-lg rounded-tr-none text-sm shadow-sm">
                                {dummymsg || "I have a question!"}
                              </div>
                              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-sm">You</div>
                          </div>
                        </div>
                        <div className="p-4 border-t border-slate-200">
                           <input onChange={(e) => setDummymsg(e.target.value)} type="text" placeholder="Type a message..." className="w-full border-slate-300 rounded-md text-sm shadow-sm" />
                        </div>
                       </div>
                    </div>
                  </div>
                 </>
              )}

              {/* === EXISTING WIDGET DASHBOARD === */}
              {hasExistingWidget && existingWidget && (
                <>
                  <h1 className="text-3xl font-bold text-slate-900">Widget Dashboard</h1>
                  <p className="text-slate-500 mt-1 mb-8">Here are the details and content for your active AI assistant.</p>
                  
                  <div className="bg-white p-8 rounded-xl border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Configuration</h2>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                          <dt className="text-sm font-medium text-slate-500">Bot Name</dt>
                          <dd className="mt-1 text-slate-900">{existingWidget.bot_name}</dd>
                      </div>
                      <div>
                          <dt className="text-sm font-medium text-slate-500">Bot Role</dt>
                          <dd className="mt-1 text-slate-900">{existingWidget.role}</dd>
                      </div>
                      <div className="col-span-2">
                          <dt className="text-sm font-medium text-slate-500">Welcome Message</dt>
                          <dd className="mt-1 text-slate-900">{existingWidget.welcome_message}</dd>
                      </div>
                      <div className="col-span-2">
                          <dt className="text-sm font-medium text-slate-500">Knowledge Base Content</dt>
                          <dd className="mt-1 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-md p-4 h-48 overflow-y-auto">
                            <pre className="whitespace-pre-wrap font-sans">{existingWidget.content}</pre>
                          </dd>
                      </div>
                    </dl>
                  </div>
                </>
              )}
               
              {/* === SAVE BUTTON (for both states) === */}
              <div className="mt-8 flex flex-col items-end gap-3">
                <button
                  onClick={handleCreateOrUpdateWidget}
                  disabled={loading}
                  className="bg-amber-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : hasExistingWidget ? "Update Widget" : "Save & Create Widget"}
                </button>
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

            </div>
          </main>
        </div>

        {/* Widget Embed Popup */}
        {showEmbedPopup && user?.id && (
          <UserWidget onClose={() => setShowEmbedPopup(false)} userId={user.id} />
        )}
      </div>
    </ProtectedRoute>
  );
}