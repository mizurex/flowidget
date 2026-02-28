"use client";
import Header from "@/components/sections/Header";
import { Bricolage_Grotesque } from 'next/font/google';
import { Indie_Flower } from "next/font/google";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat_Alternates } from "next/font/google";
import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import CreateWidgetModal from "@/components/model/WidgetModel";
import HeaderLogged from "@/components/HeaderLoggedIn";
import { PT_Serif } from "next/font/google";
import { BiArrowToRight } from "react-icons/bi";
import { Siren } from "lucide-react";
import Widget from "../widget";


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

interface widgetStatus {
  status: {
    wid: boolean;
  }
}
 
export default function HeroSection({ initialUser = null }: HeroProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [showWidgetModal, setShowWidgetModal] = useState(false);
  const [hasWid,setHasWid] = useState(false);
  const [showNoti,setShowNotification] = useState(false);



   useEffect(() => {
   
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
        `https://widget-api.turfworks.site/widget-status?user_id=${user?.id}`

      );

      if (!response.ok) {
        console.error("Server returned:", response.status, response.statusText);
        return;
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error('Failed to fetch widget status');
        
      }
      
      const wid_stat = data.status.wid;
      setHasWid(wid_stat);
    } catch (error) {
      console.error("Fetch failed:", error);
      throw new Error('Failed to fetch widget status');
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
    <div className="text-white bg-[#010101] overflow-hidden">
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
          <Siren/>
            <span>You’ve already created 1 free widget</span>
          </div>
        </div>
      )}
      
     <section className={`relative pt-20 w-full overflow-hidden bg-black`}>
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7cff3f]/5 rounded-full blur-[120px] pointer-events-none" />

    <motion.div
  className="z-10 relative text-center px-4 pb-8 text-white pt-10"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ staggerChildren: 0.15 }}
>

  <motion.h1
    className={`text-5xl md:text-7xl mb-4`}
    variants={{
      hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
  >
    <span className={`text-white ${Ptfont.className}`}> Train an AI Website Widget </span> <br />
  </motion.h1>

  <motion.h2
    className="whitespace-nowrap text-gray-300 text-xl mt-6"
    variants={{
      hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
  >
   <span>Instant answers, trained on your business  </span>
    <br />
    <span>
      Paste services, hours, pricing, FAQs and contacts, our widget answers like your team.
    </span>
  </motion.h2>

  <motion.div
    className="space-x-3.5 mt-5"
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    }}
  >
      <Link href="/dashboard">
       <button className="px-6 py-3 font-medium bg-white text-black w-fit transition-all shadow-[-3px_5px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer">
        Get Started
      </button>
      </Link>
  </motion.div>


</motion.div>

  </section>

 <section className="flex flex-col lg:flex-row bg-[#8fe457] py-12 lg:py-50 min-h-[95vh] gap-8 px-6 sm:px-12 md:px-24 lg:px-60 w-full overflow-hidden">
    <div className="flex-1">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
      <h3 className={`text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold text-black  ${Ptfont.className}`}>
          Let AI enhance every conversation
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      >
        <h3 className="leading-relaxed text-black text-lg sm:text-xl md:text-2xl">
          Turn FAQs into Conversations
        </h3>
      </motion.div>

    <motion.h2
      className="text-base sm:text-lg leading-relaxed opacity-70 text-gray-700 mt-6 lg:mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 0.7, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
    >
 Turn your business details into conversations. Add your services, pricing, hours, locations,
 contacts and policies, our widget gives accurate, friendly answers 24/7.
</motion.h2>

    <motion.div
      className="mt-6 w-fit"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
    >
     <a href="" className=" flex items-center gap-2 mt-4 text-sm font-medium border-b border-dotted pb-0.5 transition-colors text-black border-black/40 hover:text-blue-500 hover:border-blue-500">
      See How It Works
      <BiArrowToRight/>
     </a>
    </motion.div>
    </div> 

  <div className="flex flex-col items-center justify-center lg:items-start gap-6 flex-shrink-0">  
<motion.img
      src="/ai_bot.gif"
      alt="AI Dashboard Screenshot"
      className="w-[250px] sm:w-[300px] lg:w-[300px] h-[320px] sm:h-[400px] lg:h-[400px] transition-all shadow-[4px_7px_0px_black] cursor-pointer animate-float"
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      whileHover={{ scale: 1.03, rotate: 1, transition: { duration: 0.3 } }}
    />

  </div>
    </section>

<section className="bg-black text-white py-12 md:py-24 lg:py-50 px-4 sm:px-6 md:px-12 lg:px-55 overflow-hidden">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

    <motion.div
      className="space-y-4 md:space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 ${Ptfont.className}`}
        variants={{
          hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
          visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
        }}
      >
      Instant <br /> Compared to <br /> Manual Replies
      </motion.h2>
      <motion.h2
        className="text-base sm:text-lg leading-relaxed opacity-70 text-gray mb-4 md:mb-6"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 0.7, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
        }}
      >
        No more waiting for manual replies. Your visitors get instant answers trained on your
        business description, policies, docs and website links.
      </motion.h2>

      <motion.div
        className="p-2 md:p-3 font-medium mb-4 md:mb-6"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
         Faster replies. Happier visitors.
      </motion.div>

     <motion.div
       variants={{
         hidden: { opacity: 0, y: 15 },
         visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
       }}
     >
      <h3 className="text-base sm:text-lg leading-relaxed opacity-70 text-gray mb-4 md:mb-6">
       Create and embed in minutes. Add business info, URLs or docs — no special setup.
      </h3>
     </motion.div>
     <motion.div
       className="w-fit"
       variants={{
         hidden: { opacity: 0, x: -20 },
         visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
       }}
     >
      <a href="#"  className=" flex items-center gap-2 mt-4 text-sm font-medium border-b border-dotted pb-0.5 transition-colors text-white border-white hover:text-blue-500 hover:border-blue-500">View Setup Guide & Tips</a>
     </motion.div>
    </motion.div>

    <motion.div
      className="bg-[#ffffff] py-6 md:py-10 lg:py-15 px-4 md:px-8 lg:px-13 transition-all shadow-[-4px_3px_0px_#7cff3f] md:shadow-[-7px_5px_0px_#7cff3f] border-2 md:border-4 border-l-amber-600 border-white text-black"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h4 className="font-semibold mb-4 text-center text-sm md:text-base">Response Time</h4>
      <div className="w-full border border-b-1"></div>
      <div className="flex items-end gap-4 md:gap-6 h-32 sm:h-40 md:h-48 my-4">
        <div className="flex flex-col items-center flex-1">
          <motion.div
            className="bg-[#29ab59] w-8 sm:w-10 md:w-12 hover:bg-[#3bc06b] rounded-t-lg h-[12vh] sm:h-[15vh] md:h-[18vh] origin-bottom"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
          <motion.span
            className="text-xs font-bold mt-1 text-[#29ab59]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
          >
            ~5-10 min
          </motion.span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <motion.div
            className="bg-[#29ab59] w-8 sm:w-10 md:w-12 hover:bg-[#3bc06b] rounded-t-lg h-[6vh] sm:h-[8vh] md:h-[2vh] origin-bottom"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          />
          <motion.span
            className="text-xs font-bold mt-1 text-[#29ab59]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3 }}
          >
            &lt;5-8 sec
          </motion.span>
        </div>
      </div>
       <div className="w-full border border-b-2"></div>
       <div className="flex justify-between px-4 sm:px-8 md:px-16 lg:px-20">
        <span className="text-xs mt-2 ml-1">Manual</span>
        <span className="text-xs mt-2 mr-4">AI</span>
       </div>
       
      <p className="text-xs text-gray-500 mt-4">
        AI replies are instant, compared to long manual wait times.
      </p>
    </motion.div>
  </div>
</section>



<section className="text-black font-light bg-[#8fe457] py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-60 overflow-hidden">
  <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 sm:gap-12 md:gap-16">

    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h3 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 ${Ptfont.className}`}>
        Conversational Support <br/>
        <span>Without Endless FAQs</span>
      </h3>
      <p className="text-base sm:text-lg leading-relaxed opacity-70 text-gray-700 mt-4 sm:mt-6">
        Answer customer questions automatically — straight from your own content.
      </p>
    </motion.div>

    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 italic">
        &ldquo;Embed once. Help forever.&rdquo;
      </blockquote>
      <p className="text-base sm:text-lg text-gray-700 mt-4 font-normal">
        One widget, endless possibilities for user engagement
      </p>
    </motion.div>

  </div>
</section>

     <section className="bg-black overflow-hidden py-20">
        <motion.div
          className="flex justify-center py-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
           <img src="/line.png" alt=""  className="pt-6 sm:pt-8 md:pt-10 pl-2 sm:pl-3 md:pl-5 w-auto h-8 sm:h-10 md:h-12"/>
            <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${mont.className}`}>Got Questions?</h3>
        </motion.div>
      <section className="py-1 flex justify-center mb- px-4 sm:px-6 md:px-8">
      <motion.div
        className="join join-vertical bg-black w-full max-w-[90vh] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ staggerChildren: 0.1 }}
      >
  <motion.div
    className="collapse collapse-arrow join-item border border-neutral-600"
    variants={{
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }}
  >
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title font-semibold text-sm sm:text-base md:text-lg">How do I create an account?</div>
    <div className="collapse-content text-xs sm:text-sm md:text-base">Click the &ldquo;Sign Up&rdquo; button in the top right corner and follow the registration process.</div>
  </motion.div>
  <motion.div
    className="collapse collapse-arrow join-item border border-neutral-600"
    variants={{
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }}
  >
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold text-sm sm:text-base md:text-lg">I forgot my password. What should I do?</div>
    <div className="collapse-content text-xs sm:text-sm md:text-base">Click on &ldquo;Forgot Password&rdquo; on the login page and follow the instructions sent to your email.</div>
  </motion.div>
  <motion.div
    className="collapse collapse-arrow join-item border border-neutral-600"
    variants={{
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }}
  >
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold text-sm sm:text-base md:text-lg">How do I update my profile information?</div>
    <div className="collapse-content text-xs sm:text-sm md:text-base">Go to &ldquo;My Account&rdquo; settings and select &ldquo;Edit Profile&rdquo; to make changes.</div>
  </motion.div>
</motion.div>
      </section>
     </section>

   <section className="py-12 sm:py-16 md:py-20 text-center px-4 bg-black text-white overflow-hidden">
   
  <motion.h3
    className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-6 sm:mb-8 ${Ptfont.className}`}
    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
  FAQs Can&apos;t Cover Everything 
</motion.h3>

<motion.p
  className="text-base sm:text-lg leading-relaxed opacity-70 text-white mt-6 sm:mt-8"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 0.7, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
>
  Give your website visitors real-time answers and a more interactive experience.
</motion.p>

  <motion.div
    className="flex flex-col sm:flex-row justify-center mb-3 gap-1 sm:gap-2.5 items-center text-sm sm:text-base"
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
  >
   <span>First time? Check out our</span> <span><a href="" className="text-sm font-medium border-b border-dotted pb-0.5 transition-colors text-green-400 border-green-500 hover:text-blue-500 hover:border-blue-500"> First time Guide </a> </span>
  </motion.div>

 <div className="text-gray-700 text-xs sm:text-sm flex justify-center items-center gap-1 relative">

  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    <svg
      className="w-full h-16 sm:h-20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 70"
      preserveAspectRatio="none"
    >
      <path
        d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
        fill="#7cff3f"  
      />
    </svg>
  </div>

  <motion.span
    className="text-white font-semibold"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.5 }}
  >Easy set-up &bull;</motion.span>

  <motion.span
    className="relative inline-block font-semibold text-white"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.65 }}
  >
    Free 
  </motion.span>

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
