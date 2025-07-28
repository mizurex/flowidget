// app/components/HeroSection.jsx or src/components/HeroSection.jsx
"use client";
import Header from "./Header";
import { Bricolage_Grotesque } from 'next/font/google';
import { Indie_Flower } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import { Montserrat_Alternates } from "next/font/google";

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




export default function HeroSection() {
  return (
    <div className="text-black bg-[#ef9700]">
     <section className={`relative  w-full h-[120vh] pt-20 flex items-center justify-center overflow-hidden bg-amber-600 `}>
      <Header />

      <div className="flex  justify-center">
     <div className="absolute w-[180vh] h-[100vh]  ml-[13vh] mt-[10vh] border rounded-2xl inset-0 bg-gradient-to-br from-[#000000] via-white to-[#160b11] animate-gradient-move opacity-50 z-0" />
    <img
        src="/new.svg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none mix-blend-overlay"
      />
      </div>
     
   
      

      {/* === Content === */}
    <motion.div
  className="z-10 text-center px-4 pb-20"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ staggerChildren: 0.2 }}
>
  <motion.p
    className="mb-4 inline-block  rounded-full border text-black px-4 py-1 text-sm font-medium"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }}
  >
    Your First Bot is Free
  </motion.p>

  <motion.h1
    className={`text-5xl md:text-7xl font-bold text-gray-900 mb-4 ${mont.className}`}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}
  >
    AI Powered Chat <span className="text-white">Bot </span> <br /> For Your Next Project
  </motion.h1>

  <motion.p
    className="text-lg text-gray-600 mb-6"
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
    <button className="bg-black text-white px-20 py-2 rounded-xl font-medium hover:bg-gray-800 transition">
      Learn More
    </button>
    <Link href={"/user/wizard"}>
      <button className="border text-black px-20 py-2 rounded-xl font-medium hover:bg-gray-200 transition">
        Try Now
      </button>
    </Link>
  </motion.div>
</motion.div>
    </section>

   <section className="bg-white py-8">
    <div>
      <h2 className={`text-5xl md:text-7xl font-extrabold text-gray-900 mb-2 ${mont.className}`}>
        How it works
      </h2>
    </div>
    </section> 

   

 
 <section className="relative bg-white overflow-hidden py-24 px-6">
      {/* Wave Background (TOP) */}
      <img
        src="/wave-haikei (3).svg"
        alt="wave"
        className="absolute top-0 left-0 w-full h-[500px] object-cover z-0 opacity-100 pointer-events-none"
      />

      {/* Section Number Label */}
      <h2 className="absolute top-8 left-8 text-[100px] font-extrabold text-orange-300 opacity-40 z-10">
        01
      </h2>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Text Content */}
     

        {/* Right Image with Motion */}
        <motion.div
          className="flex-1 w-full"
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
            className="w-full max-w-xl rounded-xl shadow-lg"
          />
        </motion.div>

           <div className="flex-1">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Custom AI assistant for your site that requires coding
          </h3>
          <p className="text-gray-700 mb-6">
            Deploy your personalized AI bot in minutes. Let it answer questions,
            guide users, and increase your conversions automatically.
          </p>

       
        </div>
      </div>
    </section>







 <section className="flex flex-col md:flex-row items-center justify-between bg-gray-100 py-5 h-[80vh] px-6 w-full">
      {/* Left Section Number */}
      <div className="relative md:w-1/3 mb-10 md:mb-0 text-center md:text-left">
  {/* SVG Blob Background */}
  <img src="/blob.svg" alt="" className="w-[200px]" />

  {/* Number on top */}
  <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-extrabold text-gray-300">
    02
  </h2>
</div>

      {/* Right White Card */}
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md w-full md:w-2/3">
  {/* Inner flex row for image and text */}
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    
    {/* Image on the left */}
    <motion.img
      src="/ai_bot.gif"
      alt="AI Dashboard Screenshot"
      className="rounded-xl w-[300px]  h-[400px]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    />

    {/* Text on the right */}
    <div className="flex-1">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Let AI enhance every conversation
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed">
        Deliver personalized support by responding within the context of a user's journey.
        Our AI bot handles questions, assists visitors, and helps you offer exceptional customer
        experiences — automatically and effortlessly.
      </p>
    </div>

  </div>
</div>
    </section>


   
     <section className="bg-[#FCF8DD]">
        <div className="flex justify-center py-4 mt-2  ">
        
           <img src="/line.png" alt=""  className="pt-10  pl-5"/>
            <h3 className={`text-5xl  ${mont.className}`}>Got Questions?</h3>
        </div>
      <section className="py-1 flex justify-center mb-">
      <div className="join join-vertical bg-white w-[90vh]">
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title font-semibold">How do I create an account?</div>
    <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
    <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold">How do I update my profile information?</div>
    <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
  </div>
</div>
      </section>
     </section>
   <section className="py-20 text-center px-4 bg-[#FCF8DD]">
   
  {/* Heading */}
 <h2 className="text-4xl  text-gray-900 mb-4">
  FAQs Can't Cover Everything 
</h2>

<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
  Give your website visitors real-time answers and a more interactive experience.
</p>

  {/* CTA */}
  <div className="flex justify-center">
    <button className="bg-orange-400  text-center  text-white text-lg font-semibold px-6 py-3 rounded-md flex items-center justify-center gap-2 mb-6">
    <span></span> Try Now - Free.
  </button>
  </div>


  {/* Line with Underline */}
 <div className="text-gray-700 text-sm flex justify-center items-center gap-1 relative">
  {/* Wavy SVG Divider at Top */}
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

  <span>Easy set-up •</span>

  {/* Underlined Word */}
  <span className="relative inline-block font-semibold text-black">
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

  <span>• Secure</span>
</div>
</section>


 </div>
   
  );
}
