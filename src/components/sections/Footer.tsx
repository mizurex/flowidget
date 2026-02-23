import Logo from "../svg/logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t   border-white/10 ">
           <div className="relative z-10 flex-1  max-w-6xl pt-14 pb-6 px-20 ">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
         
          <div className="col-span-2 sm:col-span-1 px-0 md:px-30">
            <span className="font-mono text-base font-bold tracking-tight text-white">
              <Logo />
            </span>
           
          </div>

          {/* site */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-white/25">
              Site
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {["Home", "Pricing", "Usage"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="font-mono text-[13px] text-white/45 transition-colors hover:text-white/80"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

     

          {/* community */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-white/25">
              Community
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {[ "Twitter", "GitHub"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="font-mono text-[13px] text-white/45 transition-colors hover:text-white/80"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

    
      </div>
      <div className="flex items-center justify-center text-white pt-10 border-t border-white/10">

      <div className="w-[40%] bottom-0 max-w-[480px] font-bold font-mono  overflow-hidden relative flex justify-center items-center text-lg sm:text-3xl  text-muted-foreground/30 pointer-events-none select-none" aria-hidden="true">
         
          FLOWIDGET
        </div>
        <div className="hidden md:flex w-full justify-center gap-2">
          
          <div className="w-[40%] bottom-0 max-w-[480px] font-bold font-mono overflow-hidden relative flex justify-center items-center text-3xl max-sm:text-6xl text-muted-foreground/30 pointer-events-none select-none" aria-hidden="true">
            FLOWIDGET
          </div>
          <div className="w-[40%] bottom-0 max-w-[480px] font-bold font-mono overflow-hidden relative flex justify-center items-center text-3xl max-sm:text-6xl text-muted-foreground/30 pointer-events-none select-none" aria-hidden="true">
            FLOWIDGET
          </div>
          <div className="w-[40%] bottom-0 max-w-[480px] font-bold font-mono overflow-hidden relative flex justify-center items-center text-3xl max-sm:text-6xl text-muted-foreground/30 pointer-events-none select-none" aria-hidden="true">
            FLOWIDGET
          </div>
          <div className="w-[40%] bottom-0 max-w-[480px] font-bold font-mono overflow-hidden relative flex justify-center items-center text-3xl max-sm:text-6xl text-muted-foreground/30 pointer-events-none select-none" aria-hidden="true">
            FLOWIDGET
          </div>
        </div>
      </div>

   
    </footer>
  );
}
