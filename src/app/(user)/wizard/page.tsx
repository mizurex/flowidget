'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import UserWidget from "@/components/widget/UserWidgetPopup";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Code, LogOut, ListChecks, Lightbulb } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { widgetFormSchema } from "@/lib/schema/schema";
import {z} from "zod";

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

const FormInput = ({ label, value, onChange, placeholder, error }: any) => (
  <div className="w-[50vh]  mb-3">
    <label className="block text-lg font-medium leading-relaxed text-white mb-1.5">{label}</label>
   <input
  value={value}
  onChange={onChange}
  placeholder={placeholder}
  className={`w-full px-4 py-3 bg-[#1b1b1d] ${error && 'border-red-500'} text-white border border-stone-700 hover:border-orange-500 text-sm focus:outline-none  ${error && 'focus:ring-red-500'}`}
/>
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const FormTextarea = ({ label, value, onChange, placeholder, rows = 6, error }: any) => (
  <div className="w-full mb-3">
    <label className="block text-lg leading-relaxed font-medium text-white mb-1.5">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-[24vw] px-4 py-2  ${error ? 'border-red-500' : ''} bg-[#1b1b1d] text-white text-sm resize-none focus:outline-none border border-stone-700    hover:border-orange-500  ${error ? 'focus:ring-red-500' : 'focus:ring-amber-500'}`}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);


type Props = {
  user: User;
  widget: any;
  onSuccess:any;
};

export default function RedesignedDashboard2({ user, widget,onSuccess }: Props) {
  const [botName, setBotName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUI, setSelectedUI] = useState("classic");
  const [selectedColor, setSelectedColor] = useState("#f59e0b");
  const [showEmbedPopup, setShowEmbedPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof z.infer<typeof widgetFormSchema>, string>>>({});


  const [step, setStep] = useState(1);

  const handleNextStep = () => {
  let partialData: Partial<z.infer<typeof widgetFormSchema>> = {};

  if (step === 1) {
    partialData = { botName };
  } else if (step === 2) {
    partialData = { welcomeMessage, role, content };
  }

  const result = widgetFormSchema.partial().safeParse(partialData);

  if (!result.success) {
    const errors: any = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      errors[field] = issue.message;
    }
    setFieldErrors(errors);
    return;
  }

  setFieldErrors({});
  setStep(step + 1);
};


  const handleCreateOrUpdateWidget = async () => {
        if (!user?.id) {
            console.log("ded")
            return;
        };

    try { 
    const finalContent = `Bot Name: ${botName}\nWelcome Message: ${welcomeMessage}\nRole: ${role}\nContent: ${content}`.trim();

      setLoading(true);
      setError("");

      const res = await fetch("https://widget-xxtv.onrender.com/add-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: finalContent,
          user_id: user.id,
         // ui: selectedUI,
         // color: selectedColor,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create widget.");

     
      setShowEmbedPopup(true);
    } catch (err: any) {
      setError(err.message || "Unknown error,check handlewidget");
    }
     finally {
      setLoading(false);
 
    }
  };

 


  return (
    <div className={`flex items-center overflow-hidden ${space.className}`}>
          <div className="w-[30vw] h-fit p-7  bg-[#09090b] mx-auto border border-stone-800  space-y-8">
           
              <>
                <h1 className="text-3xl font-bold">Create Your AI Assistant</h1>
                <div className="flex items-center justify-between text-sm text-white mb-4">
                    <span className={step === 1 ? "text-[#7cff3f] font-semibold" : ""}> Bot Details </span>
                    <span className={step === 2 ? "text-[#7cff3f] font-semibold" : ""}> Personality & Content</span>
                    <span className={step === 3 ? "text-[#7cff3f] font-semibold" : ""}> Review & Confirm</span>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 bg-[#16151517] mx-5 "
                    ><FormInput
                        label=" Bot Name"
                        value={botName}
                        onChange={(e: any) => setBotName(e.target.value)}
                        placeholder="e.g., Support Pro"
                        error={fieldErrors.botName}
                        />
                      <div>
                        <label className="block text-lg leading-relaxed font-medium text-white mb-1.5"> Select UI Style</label>
                       <select
                        value={selectedUI}
                         onChange={(e) => setSelectedUI(e.target.value)}
                         className="w-[25vh] px-4 py-2 border border-stone-700 bg-[#1b1b1d] text-white text-sm  hover:border-orange-500 "
                        >
                          <option value="classic">Classic</option>
                          
                        </select>
                      </div>
                    
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 bg-[#0a0808] p-6"
                    >
                        <FormInput label="Welcome Message" value={welcomeMessage} onChange={(e: any) => setWelcomeMessage(e.target.value)} placeholder="Hi! How can I help you?" error={fieldErrors.welcomeMessage} />
                        <FormInput label="Bot Role / Personality" value={role} onChange={(e: any) => setRole(e.target.value)} placeholder="e.g., Friendly support assistant" error={fieldErrors.role} />
                        <FormTextarea label="Content / Knowledge Base" value={content} onChange={(e: any) => setContent(e.target.value)} placeholder="Paste FAQs, contact info, etc." rows={8} error={fieldErrors.content} />

                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#1b1b1d] p-6 mt-10 border border-stone-800 space-y-3"
                    >
                      <h2 className="text-lg font-semibold">Review Details</h2>
                      <p><strong>Name:</strong> {botName}</p>
                      <p><strong>Welcome:</strong> {welcomeMessage}</p>
                      <p><strong>Role:</strong> {role}</p>
                      <p><strong>Content:</strong> {content?.slice(0,20)}...</p>
                      <p><strong>Style:</strong> {selectedUI}</p>
                      <p><strong>Color:</strong> {selectedColor}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center mt-6">
                  {step > 1 && (
                    <button onClick={() => setStep(step - 1)} className="text-white underline hover:text-gray-400 cursor-pointer">
                      ← Back
                    </button>
                  )}
                  {step < 3 ? (
                          <button onClick={handleNextStep} className="bg-white text-black cursor-pointer px-6 py-2 font-medium shadow-[-2px_4px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px]">
                          Next →
                             </button>
                        ) : (
                 <button onClick={handleCreateOrUpdateWidget} disabled={loading} className="bg-white cursor-pointer text-black px-6 py-2 font-medium shadow-[-2px_4px_0px_#FF6600] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] disabled:opacity-50">
                      {loading ? "Saving..." : "Create Widget"}
                     </button>
                        )}
                </div>
             {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
              </>
          </div>
      {showEmbedPopup && user?.id && (
        <UserWidget userId={user?.id} onClose={() => {
      setShowEmbedPopup(false);
      onSuccess();  
    }} />
      )}
      
    </div>
  );
}
