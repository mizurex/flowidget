import RulerTicks from "@/components/hero/morph";
import DiagonalPattern from "@/components/hero/pattern";
import EditorialLines from "@/components/hero/hero-lines";
import Header from "@/components/hero/header";
import HeroContent from "@/components/hero/hero-content";
import Footer from "@/components/sections/Footer";
export default function WizardPage(){
    return(
    <div className="relative bg-background ">
        <Header />
        <EditorialLines />
        <RulerTicks />
        <DiagonalPattern side="left" />
        <DiagonalPattern side="right" />
        <HeroContent/>   
        <Footer />
    </div>
    )
}


