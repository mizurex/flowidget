import Logo from "../svg/logo";

export default function Footer() {
  return (
    <div className="relative overflow-hidden border-t  mx-auto border-white/10 ">
           <div className="relative z-10 flex-1  max-w-4xl pt-14 pb-6 px-20 ">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
         
          <div className="col-span-2 sm:col-span-1 px-0 md:px-30">
            <span className="font-mono text-base font-bold tracking-tight text-white">
              <Logo />
            </span>    
          </div>
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
      

   
    </div>
  );
}
