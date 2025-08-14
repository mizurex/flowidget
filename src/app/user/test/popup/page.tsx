"use client";
import Header from "@/components/Header";
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

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
});
const indie = Indie_Flower({
  subsets: ["latin"],
  display: "swap",
  weight: "400", 
});

const mont = Montserrat_Alternates({
   subsets: ["latin"],
  display: "swap",
  weight: "400",
})

const fakeUser = {
  id: "test-user-id",
  email: "fake@email.com",
  // add anything else your code expects
};

 
export default function HeroSection() {
  const [user, setUser] = useState<any | null>(null);
  const [showWidgetModal, setShowWidgetModal] = useState(false);

  useEffect(() => {
    // TEMP: Simulate a logged-in user
    setUser(fakeUser);
  }, []);
   
  return (
    <div className="text-white bg-[#010101]">
        {user ? (
        <HeaderLogged user={user} onCreateClick={() => setShowWidgetModal(true)} />
      ) : (
        <Header/>
      )}

        {user && (
        <CreateWidgetModal
          isOpen={showWidgetModal}
          onClose={() => setShowWidgetModal(false)}
          user={user}
        />
      )}
      
     <section className={`relative pt-20 w-full h-[122vh]  overflow-hidden bg-black `}>
      {/* === Content === */}
    <motion.div
  className="z-10 text-center px-4 pb-20 text-white pt-10 "
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ staggerChildren: 0.2 }}
>
  <motion.p
    className="mb-4 inline-block  rounded-full border px-4 py-1 text-sm font-medium"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }}
  >
    Your First Bot is Free
  </motion.p>

  <motion.h1
    className={`text-5xl md:text-7xl font-bold  mb-4 ${mont.className}`}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}
  >
    AI Powered Chat <span className="text-white">Bot </span> <br /> For Your Next Project
  </motion.h1>

  <motion.p
    className="text-lg  mb-6"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}
  >
   Smart Bots, Happy Users
    <br />
    Add AI to your site in minutes and free support that actually feels smart.
  </motion.p>

  <motion.div
    className="space-x-3.5"
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    }}
  >
      <button className="px-6 py-2 font-medium bg-white text-black w-fit transition-all shadow-[-2px_4px_0px_orange] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer">
        Get Started
      </button>
   
  </motion.div>
</motion.div>
    
        <motion.div
          className="flex-1 w-full flex justify-center "
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/demo_gif.gif"
            alt="How to use the AI bot"
            className="  font-medium bg-black text-white w-4xl transition-all shadow-[4px_7px_0px_orange] cursor-pointer"
          />
        </motion.div>
    </section>

 <section className="flex bg-[#ef9700] py-50 h-[95vh] px-60 w-full">
    

      
    <div className="flex-1">
      <h2 className={`text-2xl md:text-6xl font-bold text-gray-900 mb-4 ${bricolage.className}`}>
        Let AI enhance every conversation
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed">
        Deliver personalized support by responding within the context of a users journey.
        Our AI bot handles questions, assists visitors, and helps you offer exceptional customer
        experiences — automatically and effortlessly.
      </p>
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
    <section className="text-white py-30 h-[95vh] px-60">
      <div>
        <h3 className="text-3xl">Conversational UX That Learns and Grows</h3>
        <p>Learns from your content automatically</p>

      </div>
      <div className="mt-5 ">
        <h1>Every time you update your context or feed the bot, it improves its answers, no need to hardcode every FAQ.</h1>
        <p>
          Go beyond static FAQs. Let your users ask exactly what they want, and get human-like answers instantly.

 Improves with usage
The more users interact, the sharper your assistant gets always up-to-date with your business info.
        </p>

      </div>
      <div className="mt-9">
        <strong>“Embed once. Help forever.”</strong>
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
 <h3 className="text-7xl mb-8">
  FAQs Can&apos;t Cover Everything 
</h3>

<p className="text-lg  max-w-2xl mx-auto mb-8">
  Give your website visitors real-time answers and a more interactive experience.
</p>

  {/* CTA */}
  <div className="flex justify-center mb-3">
     <button className="px-10  py-2 font-medium bg-white text-black w-[15vw] transition-all shadow-[7px_3px_0px_orange] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer">
        Try Now
      </button>
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
        fill="#ef9700"  
      />
    </svg>
  </div>

  <span className="text-white font-semibold">Easy set-up •</span>

  {/* Underlined Word */}
  <span className="relative inline-block font-semibold text-white">
    Free 
    <svg
      className="absolute -bottom-1 left-0 w-full h-2"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <path
        d="M0,5 C30,10 70,10 100,5"
        stroke="#ef9700"
        strokeWidth="3"
        fill="none"
      />
    </svg>
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
