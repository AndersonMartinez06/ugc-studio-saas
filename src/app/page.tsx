import Hero from "@/components/Hero";
import RoiCalculator from "@/components/RoiCalculator";
import CompareTable from "@/components/CompareTable";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <RoiCalculator />
      <CompareTable />
      <Testimonials />
      <Faq />
      <Pricing />
      <footer className="border-t border-glass-stroke py-14 text-center text-[0.82rem] text-text-low">
        Scrollstop — UGC por suscripción · Demo · Space Grotesk / Inter / IBM Plex Mono
      </footer>
    </main>
  );
}
