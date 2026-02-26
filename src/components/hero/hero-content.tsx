import { ArrowRight, Github } from "lucide-react";
import FeaturesSection from "./features";

export default function HeroContent() {
    return (<div className="relative z-10 mx-auto w-full sm:w-[88%] md:w-[85%] lg:w-[80%] xl:w-[80%] max-w-[1920px] overflow-x-hidden overflow-y-visible min-[120rem]:overflow-visible px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-10 min-[97.5rem]:px-12 pt-25 sm:pt-0">
            <div className=" gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 min-[97.5rem]:gap-20 items-start md:min-h-[560px] lg:min-h-[200px] xl:min-h-[200px] min-[120rem]:min-h-[860px]">
                <div className="md:pl-2 lg:pl-7 xl:pl-3 2xl:pl-13 min-[97.5rem]:pl-15 min-[120rem]:pl-17 lg:pr-6 xl:pr-8 flex flex-col items-center justify-center">
                    
                    <div className=" mt-0 sm:mt-2 md:mt-0 lg:mt-7 xl:mt-8 2xl:mt-9 items-center ">
                        <h1 className="font-mono text-2xl sm:text-2xl md:text-[26px] lg:text-[40px] xl:text-[45px] min-[97.5rem]:text-[50px] leading-tight lg:leading-[1.08] tracking-tight text-white mb-6 md:mb-8 text-center md:text-left">
                        <span className="block 2xl:whitespace-nowrap text-neutral-200"> <span className="text-neutral-500">Meet </span>flowidget</span>
                            <span className="block 2xl:whitespace-nowrap text-neutral-500 mt-[20px] md:mt-0">The embeddable AI bot for your next project.</span>
                            {/* <span className="block text-neutral-500 font-bold tracking-wide uppercase text-sm mt-2 2xl:whitespace-nowrap text-center w-full">flowidget — the embeddable AI bot for your next project</span> */}
                            
                        </h1>

                        <p className="max-w-xl 2xl:max-w-2xl mx-auto md:mx-0 text-sm lg:text-[17px] xl:text-[14px] 2xl:text-[18px] min-[97.5rem]:text-[18px] text-[#A1A1AA] mb-10 md:mb-10 leading-relaxed font-mono">
                            
                        </p>
                    </div>

                    
                  
                    
                    <div className="mx-auto flex w-fit max-w-full flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3 md:mx-0 md:w-full md:justify-start md:gap-4  mb-6 sm:mb-4 md:mb-0 md:mt-8 lg:mt-0">
                        <a href="/dashboard" className="group shrink-0 flex items-center gap-0.5 whitespace-nowrap bg-muted-foreground hover:bg-muted-foreground/80   pl-3 pr-2.5 md:pl-4 md:pr-3.5 min-[97.5rem]:pl-5 min-[97.5rem]:pr-4 h-9 md:h-10 lg:h-10 xl:h-10 2xl:h-11 min-[97.5rem]:h-12 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base min-[97.5rem]:text-base font-medium shadow-sm transition-[background-color,transform] duration-150 ease focus:outline-none active:scale-[0.97] motion-reduce:transition-none">
                            Get Started
                        
                        </a>
                        <a href="https://github.com/mizurex/flowidget" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-muted-foreground/30 hover:bg-muted-foreground/20 whitespace-nowrap text-white px-3 md:px-4 min-[97.5rem]:px-5 h-9 md:h-10 lg:h-10 xl:h-10 2xl:h-11 min-[97.5rem]:h-12 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base min-[97.5rem]:text-base font-medium shadow-sm transition-[background-color,transform] duration-150 ease flex items-center gap-1.5 md:gap-2 active:scale-[0.97] motion-reduce:transition-none">
                            <span>Star Github</span>
                           <Github className="w-4 h-4" />
                        </a>
                    </div>

                </div>

                
           
            </div>
         
            <FeaturesSection />
        </div>);
}