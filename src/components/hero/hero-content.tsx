import { ArrowRight, Github } from "lucide-react";
import FeaturesSection from "./features";

export default function HeroContent() {
    return (<div className="relative z-10 mx-auto w-full sm:w-[88%] md:w-[85%] lg:w-[80%] xl:w-[80%] max-w-[1920px] overflow-x-hidden overflow-y-visible min-[120rem]:overflow-visible px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-10 min-[97.5rem]:px-12 pt-25 sm:pt-0">
            <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 2xl:gap-20 min-[97.5rem]:gap-24 justify-center items-center md:min-h-[560px] lg:min-h-[200px] xl:min-h-[200px] min-[120rem]:min-h-[860px] w-full">
                <div className="w-full flex flex-col justify-center items-center md:items-start px-0 md:px-7 lg:px-9 xl:px-12 2xl:px-16 min-[97.5rem]:px-20">
                    
                    <div className="w-full min-w-0 flex flex-col items-center md:items-start text-center md:text-left mt-4 sm:mt-6 md:mt-0 lg:mt-7 xl:mt-8 2xl:mt-9">
                        <h1 className="min-w-0 w-full font-mono text-2xl sm:text-2xl md:text-[26px] lg:text-[40px] xl:text-[45px] min-[97.5rem]:text-[50px] leading-tight lg:leading-[1.08] tracking-tight text-white mb-6 md:mb-8 text-center md:text-left">
                            <span className="block min-[97.5rem]:whitespace-nowrap text-neutral-200 break-words">
                                <span className="text-neutral-500">Meet </span>flowidget
                            </span>
                            <span className="block min-[97.5rem]:whitespace-nowrap text-neutral-500 mt-[20px] md:mt-0 break-words">
                                The embeddable AI bot for your next project.
                            </span>
                        </h1>
                        <p className="max-w-xl 2xl:max-w-2xl mx-auto md:mx-0 text-sm lg:text-[17px] xl:text-[14px] 2xl:text-[18px] min-[97.5rem]:text-[18px] text-neutral-500 mb-6 md:mb-8 leading-tight font-mono">
                            Add AI to your site instantly. Embed, configure, and connect in seconds. No coding required—customize however you want. Works great on all major browsers and devices.
                        </p>
                    </div>
                    <div className="w-full flex flex-col items-center md:items-start">
                        <div className="flex flex-row flex-nowrap gap-3 sm:gap-4 justify-center md:justify-start items-center w-full mb-8 md:mb-0 md:mt-8 lg:mt-10">
                            <a 
                                href="/dashboard"
                                className="group shrink-0 flex items-center gap-1 whitespace-nowrap bg-muted-foreground hover:bg-muted-foreground/80 pl-3 pr-2.5 md:pl-4 md:pr-3.5 min-[97.5rem]:pl-5 min-[97.5rem]:pr-4 h-9 md:h-10 lg:h-10 xl:h-10 2xl:h-11 min-[97.5rem]:h-12 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base min-[97.5rem]:text-base font-medium shadow-sm transition-[background-color,transform] duration-150 ease focus:outline-none active:scale-[0.97] motion-reduce:transition-none text-white"
                            >
                                Dashboard
                            </a>
                            <a 
                                href="https://github.com/mizurex/flowidget"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 bg-muted-foreground/30 hover:bg-muted-foreground/20 whitespace-nowrap text-white px-3 md:px-4 min-[97.5rem]:px-5 h-9 md:h-10 lg:h-10 xl:h-10 2xl:h-11 min-[97.5rem]:h-12 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base min-[97.5rem]:text-base font-medium shadow-sm transition-[background-color,transform] duration-150 ease flex items-center gap-1.5 md:gap-2 active:scale-[0.97] motion-reduce:transition-none"
                            >
                                <span>Star Github</span>
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                  
                </div>
            </div>
         
            <FeaturesSection />
        </div>);
}