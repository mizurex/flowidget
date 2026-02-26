"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
interface FAQItem {
    question: string;
    answer: string;
}
const faqData: FAQItem[] = [
    {
        question: "What is Flowidget?",
        answer:
            "Flowidget lets you design, train, and embed an AI support bot as a simple widget on your site — no custom frontend or backend needed.",
    },
    {
        question: "How do I train the bot?",
        answer:
            "Inside the wizard you set the bot name, welcome message, tone, and then paste links or raw text (FAQs, docs, policies). We turn that into search‑ready embeddings automatically.",
    },
    {
        question: "Can I customize the design?",
        answer:
            "Yes. You can switch between layouts (bubble, sidebar, inline), tweak colors, corners, and placement so the widget matches your brand.",
    },
    {
        question: "Does it work on my stack?",
        answer:
            "If you can paste a small <script> tag into your site, Flowidget works — Next.js, plain HTML, Webflow, Framer, Shopify and more.",
    },
    {
        question: "What about privacy and data?",
        answer:
            "Your training data is stored only for your workspace. We never cross‑train between customers and you can remove sources at any time.",
    },
    {
        question: "Is there a free tier?",
        answer:
            "We start with a generous free tier so you can design a bot, train it on a small dataset, and embed it on a real site before paying.",
    },
];
export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <section id="faq" className="relative  py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-6">
                <div className="flex flex-col gap-12 xl:flex-row xl:gap-16">
             
                    <div className="flex shrink-0 flex-col xl:w-[340px]">
                      
                        <h2 className="mt-4 font-mono text-2xl text-neutral-500 md:text-3xl text-center md:text-left">
                          <span className="text-neutral-200">  Questions</span>  about Flowidget
                        </h2>
                        <p className="mt-3 text-xs md:text-sm text-neutral-400 text-center md:text-left">
                            Short answers to the things you might ask before adding an AI widget to
                            your project.
                        </p>
                    </div>
                    <div className="flex-1 border-t border-white/10 pt-4">
                        {faqData.map((item, index) => (
                            <div key={index} className="border-b border-white/10">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="group flex w-full items-center justify-between gap-4 py-3 text-left"
                                    aria-expanded={openIndex === index}
                                >
                                    <span className="flex-1 font-mono text-sm text-neutral-200">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`size-4 shrink-0 text-white/40 transition-transform duration-200 ${
                                            openIndex === index ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <div
                                    className={`grid text-sm text-white/55 transition-all duration-200 ${
                                        openIndex === index
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >
                                    <div className="overflow-hidden pb-3 pr-6">
                                        <p className="font-mono text-[13px] leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

         
        </section>
    );
}