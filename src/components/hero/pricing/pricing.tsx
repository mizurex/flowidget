import FadePattern from "../fade-pattern";

export function Pricing() {
  return (
    <section id="pricing" className="relative max-w-6xl mx-auto  py-16 md:py-20 xl:pb-18 xl:pt-16 overflow-hidden">
     <FadePattern className="top-0"/>

      <div className="relative z-10 mx-auto flex w-[92%] max-w-6xl flex-col items-center md:w-[88%] lg:w-[90%]">
      
        <h2 className="mt-4 text-center font-mono text-2xl text-neutral-500 md:text-3xl">
          Pricing? it&apos;s <span className="text-neutral-200">free</span>, for now
        </h2>
        <p className="mt-3 max-w-md text-center text-sm text-neutral-400 font-sans">
          Design, train, and embed your AI widget at no cost. We&apos;ll figure out paid plans later.
        </p>

        <div className="mt-12 w-full max-w-[300px] border border-border/20 rounded-lg">
          <div className=" px-2 py-2 pb-6 md:pb-8">
            <div className="relative overflow-hidden px-4 py-2 rounded-lg">
              <div
                className="pointer-events-none absolute inset-0 z-0 text-white opacity-[0.17]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-35deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 4px)",
                }}
              />
              <div className="relative z-10 flex items-baseline justify-end pt-6 md:pt-8">
           
                <span className="font-mono text-2xl text-white">Free</span>
              </div>
            </div>
    

            <div className="px-4 py-2">

                <ul className="mt-2 space-y-3 font-mono text-sm text-white">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />100 messages per month</li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                Set bot name
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                Customize bot
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                200 words data
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                Set tone
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                Recent message logs
              </li>
            </ul>
            </div>

            
          </div>

          <div className="border-t border-white/10 px-6 py-4 md:px-8 md:py-4">
            <ul className="space-y-2 font-mono text-[13px] text-white/55">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 mb-5" />
                 Responses may take a few seconds
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                We&apos;re on free-tier infra
              </li>
            </ul>
          </div>
        </div>

        {/* support creator
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="inline-flex border border-muted-foreground/40 bg-muted/10 px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            Support creator
          </div>
          <h3 className="mt-4 font-mono text-xl text-white md:text-2xl">
            Like Flowidget? Support the creator
          </h3>
        
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#"
              className="border border-white/20 bg-white/5 px-4 py-2 font-mono text-sm text-white hover:border-white/40 hover:bg-white/10"
            >
              Star on GitHub
            </a>
          </div>
        </div> */}
      </div>
      <FadePattern className="bottom-0"/>
    </section>
  );
}
