import Morph from "@/components/hero/morph";
import DiagonalPattern from "@/components/ui/pattern";
import Lines from "@/components/ui/lines";
import Header from "@/components/header/header";
import HeroContent from "@/components/hero/hero-content";
import Footer from "@/components/sections/Footer";
import { TemplatesSection } from "@/components/hero/showcase";
import { WidgetPresetsSection } from "@/components/hero/wids";
import { FAQSection } from "@/components/hero/faq";
import { Pricing } from "@/components/hero/pricing";
import FooterLogo from "@/components/ui/footer-logo";
export default function WizardPage(){
    return(
    <div className="relative bg-black ">
        <Header />
        <Lines />
        <Morph />
        <DiagonalPattern side="left" />
        <DiagonalPattern side="right" />
        <HeroContent/> 
        <TemplatesSection />
        <WidgetPresetsSection />
        <Pricing />
        <FAQSection />
        <Footer />
        <FooterLogo />
    </div>
    )
}


