import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import UgcCarousel from "@/components/UgcCarousel";
import Formats from "@/components/Formats";
import Process from "@/components/Process";
import RoiCalculator from "@/components/RoiCalculator";
import CompareTable from "@/components/CompareTable";
import Promises from "@/components/Promises";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import WhatsappFab from "@/components/WhatsappFab";
import MobileCtaBar from "@/components/MobileCtaBar";
import { SectionHead } from "@/components/Section";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="pb-[76px] md:pb-0">
        <Hero />

        <section id="showcase" className="px-6 pt-[clamp(56px,9vw,104px)]">
          <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
            <SectionHead
              eyebrow="Creativos en acción"
              title="Videos hechos para detener el scroll"
              subtitle="Un vistazo al tipo de creativos verticales que producimos, con las métricas que buscamos en cada uno."
            />
            <UgcCarousel />
          </div>
        </section>

        <Formats />
        <Process />
        <RoiCalculator />
        <CompareTable />
        <Promises />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsappFab />
      <MobileCtaBar />
    </>
  );
}
