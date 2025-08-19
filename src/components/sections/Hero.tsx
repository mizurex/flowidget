"use client";
import Header from "@/components/sections/Header";
import { Bricolage_Grotesque } from 'next/font/google';
import { Indie_Flower } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import { Montserrat_Alternates } from "next/font/google";
import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import CreateWidgetModal from "@/components/model/WidgetModel";
import HeaderLogged from "@/components/HeaderLoggedIn";
import { Compare } from "../ui/compare";
import { PT_Serif } from "next/font/google";
import { pt } from "zod/locales";
import { BiArrowToRight } from "react-icons/bi";
import { useSelectedLayoutSegment } from "next/navigation";


const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
});
const indie = Indie_Flower({
  subsets: ["latin"],
  display: "swap",
  weight: "400", 
});

const Ptfont = PT_Serif({
  subsets:["cyrillic-ext"],
  weight:"400",


})

const mont = Montserrat_Alternates({
   subsets: ["latin"],
  display: "swap",
  weight: "400",
})

interface HeroProps {
  initialUser?: User | null;
}

 
export default function HeroSection({ initialUser = null }: HeroProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [showWidgetModal, setShowWidgetModal] = useState(false);
  const [hasWid,setHasWid] = useState(false);
  const [showNoti,setShowNotification] = useState(false);

   useEffect(() => {
    // Listen for real-time auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

useEffect(() => {
  const fetchWidgetStatus = async () => {
    try {
      const response = await fetch(
        `https://widget-xxtv.onrender.com/widget-status?user_id=${user?.id}`

      );

      if (!response.ok) {
        console.error("Server returned:", response.status, response.statusText);
        return;
      }

      const data = await response.json();

      if (!data.success) {
        window.alert("error test");
        return;
      }

      setHasWid(data.status.wid);
    } catch (error) {
      console.error("Fetch failed:", error);
      window.alert("error test");
    }
  };

  if (user?.id) {
    fetchWidgetStatus();
  }
}, []);



  
  const handleCreateClick = () => {
    if (hasWid) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      setShowWidgetModal(true);
    }
  };
   
  return (
    <div className="text-white bg-[#010101]">
        {user ? (
        <HeaderLogged user={user} onCreateClick={handleCreateClick} />
      ) : (
        <Header/>
      )}
        {user && !hasWid && (
        <CreateWidgetModal
          isOpen={showWidgetModal}
          onClose={() => setShowWidgetModal(false)}
          user={user}
        />
      )}

      {showNoti && (
        <div className="fixed bottom-1 right-5 z-50 border border-zinc-300 animate-fade-in-down">
          <div className="bg-[#09090b] text-white px-4 py-3 shadow-lg flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>You’ve already created 1 free widget</span>
          </div>
        </div>
      )}
      
     <section className={`relative pt-20 w-full   overflow-hidden bg-black `}>
   
    <motion.div
  className="z-10 text-center px-4 pb-8 text-white pt-10 "
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ staggerChildren: 0.2 }}
>
  

  <motion.h1
    className={`text-5xl md:text-7xl   mb-4 `}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}
  >
    <span className={`text-white ${Ptfont.className}`}> AI Support Widget </span> <br />
  </motion.h1>

  <motion.h2
    className=" whitespace-nowrap text-gray-300 text-xl mt-6"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}
  >
   <span>Instant Answers, Happy Users  </span>
    <br />
    <span>
      Add AI widget to your site in minutes and free support that actually feels smart.
    </span>
    
  </motion.h2>

  <motion.div
    className="space-x-3.5 mt-5"
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    }}
  >
      <button className="px-6 py-3 font-medium bg-white text-black w-fit transition-all shadow-[-3px_5px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer">
        Get Started
      </button>
   
  </motion.div>
</motion.div>
      
  
   <div className="w-[70vw] h-[99vh] mx-auto flex justify-center bg-black shadow-[2px_0px_0px_orange,5px_0px_0px_#7cff3f]">
  <Compare
    firstImage="/comp.png"
    secondImage="/comp6.png"
    firstImageClassName="object-contain object-top w-full h-full"
    secondImageClassname="object-contain object-fit w-full h-full"
    className="w-[80vw] h-full"
    slideMode="hover"
    autoplay={true}
  />
</div> 
 
  </section>

 <section className="flex bg-[#8fe457] py-50 h-[95vh]  gap-8 px-60 w-full">
    <div className="flex-1">
      <div>
      <h3 className={`text-2xl md:text-7xl font-extrabold text-black  ${Ptfont.className}`}>
          Let AI enhance every conversation
          
        </h3>
      
      </div>

      <div>

        <h3 className="leading-relaxed text-black ">
          Turn FAQs into Conversations
        </h3>
      </div>

     <h2 className="text-lg leading-relaxed opacity-70 text-gray-700 mt-8">
  Provide instant, personalized answers right when your visitors need them.  
  Our AI-powered widget guides users, resolves FAQs, and walks them through every step 
  making support faster, smarter, and effortless.
</h2>

    <div className="mt-6  w-fit">
     <a href="" className=" flex items-center gap-2 mt-4 text-sm font-medium border-b border-dotted pb-0.5 transition-colors text-black border-black/40 hover:text-blue-500 hover:border-blue-500">
      See How It Works
      <BiArrowToRight/>
     </a>
    </div>
    </div> 
    

  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">  
<motion.img
      src="/ai_bot.gif"
      alt="AI Dashboard Screenshot"
      className=" w-[300px]  h-[400px] transition-all shadow-[4px_7px_0px_black] cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    />

  </div>
    </section>

<section className="bg-black text-white py-50 px-55">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

   
    <div>
      <h2 className={`text-7xl font-bold mb-4 ${Ptfont.className}`}>
        Instant Compared to Manual Replies
      </h2>
      <h2 className="text-lg leading-relaxed opacity-70 text-gray mb-6">
        Instead of waiting for someone to answer, your visitors  
        get immediate responses trained directly on your description.
      </h2>

      <div className=" p-3 font-medium mb-6">
         Faster replies. Happier visitors.
      </div>

     <div>
      <h3 className="text-lg leading-relaxed opacity-70 text-gray mb-6">
       Create & embed your widget instantly. No special environment needed.
      </h3>
     </div>
     <div className="w-fit">
      <a href=""  className=" flex items-center gap-2 mt-4 text-sm font-medium border-b border-dotted pb-0.5 transition-colors text-white border-white hover:text-blue-500 hover:border-blue-500">View Setup Guide & Tips</a>
     </div>
    </div>

    {/* Right Graph */}
    <div className="bg-[#ffffff] py-15 px-13 transition-all shadow-[-7px_5px_0px_#7cff3f] border-4 border-l-amber-600 border-white text-black">
      <h4 className="font-semibold mb-4 text-center">Response Time</h4>
      <div className="w-full border border-b-1"></div>
      <div className="flex items-end gap-6 h-48">
        <div className="flex flex-col items-center flex-1">
          <div className="bg-[#29ab59] w-12 hover:bg-[#3bc06b] rounded-t-lg h-[18vh]"></div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="bg-[#29ab59] w-12 hover:bg-[#3bc06b]  rounded-t-lg h-[10vh]"></div>  
        </div>
      </div>
       <div className="w-full border border-b-2"></div>
       <div className="flex justify-between px-20 ">
        <span className="text-xs mt-2 ml-1">Manual</span>
        <span className="text-xs mt-2 mr-4">AI</span>
       </div>
       
      <p className="text-xs text-gray-500 mt-4">
        AI replies are instant, compared to long manual wait times.
      </p>
    </div>
  </div>
</section>



<section className="text-black font-light bg-[#8fe457] py-20 min-h-[95vh] px-10 md:px-60">
  <div className="max-w-4xl mx-auto space-y-12">
    
    
    <div className="text-center">
       <h3 className={`text-7xl font-bold mb-4 ${Ptfont.className}`}>
    Conversational Support <br/>
    <span className="">Without Endless FAQs</span>
  </h3>
  <p className="text-lg leading-relaxed opacity-70 text-gray-700 mt-8">
    Answer customer questions automatically — straight from your own content.
  </p>
    </div>

    
    <div className="grid md:grid-cols-2 gap-10 items-start">
      {/* Left Column */}
      <div className="space-y-8">
        <div>
           <h2 className="text-2xl font-semibold mb-4 text-black">
        From Description to Answers
      </h2>
      <p className="text-lg leading-relaxed opacity-70 text-gray-700 mt-8">
        Forget creating a long list of FAQs. Just give the widget a short description of your product or service, and it will handle visitor questions instantly.
      </p>
      <p className="text-lg leading-relaxed opacity-70 text-gray-700 mt-8">
        Your customers get accurate, human-like answers in real time — without you having to predefine every possible question.
      </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        <div className=" backdrop-blur p-8 border-4 border-l-black  transition-all shadow-[-3px_5px_0px_orange] border-white border-b-amber-600">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
             <span className="text-black">Add</span> Setup Guidance
          </h3>
          <p className="text-gray-800 mb-6 leading-relaxed">
            If your app or product needs a setup process, your AI widget can walk new users through it — one step at a time, making complex onboarding feel effortless.
          </p>

          <div className="bg-white border border-gray-300  p-4 mb-6">
            <p className="text-gray-900 font-medium">
               Clear instructions. No confusion.
            </p>
          </div>

          <p className="text-gray-800 leading-relaxed">
            From account creation to advanced configuration, your AI assistant transforms complicated processes into simple conversations.
          </p>
        </div>
      </div>
    </div>

    {/* Quote Section */}
    <div className="text-center py-8">
      <blockquote className="text-3xl md:text-4xl font-bold text-gray-900 italic">
        "Embed once. Help forever."
      </blockquote>
      <p className="text-lg text-gray-700 mt-4 font-normal">
        One widget, endless possibilities for user engagement
      </p>
    </div>

  

  </div>
</section>

    <section className="py-30 h-[95vh] px-60">
      <div className="mb-28">
        <h3 className="text-5xl ">What Our Users Are Saying</h3>
      </div>
        <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </section>
   
     <section className="bg-black">
        <div className="flex justify-center py-4   ">
        
           <img src="/line.png" alt=""  className="pt-10  pl-5"/>
            <h3 className={`text-5xl  ${mont.className}`}>Got Questions?</h3>
        </div>
      <section className="py-1 flex justify-center mb-">
      <div className="join join-vertical bg-black w-[90vh]">
  <div className="collapse collapse-arrow join-item border-white border">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title font-semibold">How do I create an account?</div>
    <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>
  <div className="collapse collapse-arrow join-item border-white border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
    <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
  </div>
  <div className="collapse collapse-arrow join-item border-white border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold">How do I update my profile information?</div>
    <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
  </div>
</div>
      </section>
     </section>

   <section className="py-20 text-center px-4 bg-black text-white">
   
  {/* Heading */}
 <h3 className={`text-7xl mb-8 ${Ptfont.className}`}>
  FAQs Can&apos;t Cover Everything 
</h3>

<p className="text-lg leading-relaxed opacity-70 text-white mt-8">
  Give your website visitors real-time answers and a more interactive experience.
</p>

  {/* CTA */}
  <div className="flex justify-center mb-3  gap-2.5 items-center">
   First time? Check out our <span><a href="" className=" mt-4 text-sm font-medium border-b border-dotted pb-0.5 transition-colors text-green-400 border-green-500 hover:text-blue-500 hover:border-blue-500"> First time Guide </a> </span>
  </div>


 
 <div className="text-gray-700 text-sm flex justify-center items-center gap-1 relative">

  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    <svg
      className="w-full h-20"
      xmlns="/demo.svg"
      viewBox="0 0 1200 70"
      preserveAspectRatio="none"
    >
      <path
        d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
        fill="#7cff3f"  
      />
    </svg>
  </div>

  <span className="text-white font-semibold">Easy set-up •</span>

  {/* Underlined Word */}
  <span className="relative inline-block font-semibold text-white">
    Free 
  
  </span>

 
</div>
</section>


 </div>
   
  );
}



const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  
];
