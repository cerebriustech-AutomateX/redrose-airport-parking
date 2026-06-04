import Header from "@/components/Header";
import CinematicStage from "@/components/CinematicStage";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <CinematicStage>
        <main id="main">
          {/* Opening — discover RedRose and get a quote */}
          <Hero />
          <TrustBar />

          {/* Story spine: each chapter aligns with the cinematic scroll beat */}
          <HowItWorks />
          <WhyChooseUs />
          <Services />
          <FinalCTA />
        </main>
        <Footer />
      </CinematicStage>
    </>
  );
}
