import RulerTicks from "@/components/hero/morph";
import DiagonalPattern from "@/components/hero/pattern";
import EditorialLines from "@/components/hero/hero-lines";
import Header from "@/components/hero/header";
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
        <EditorialLines />
        <RulerTicks />
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


