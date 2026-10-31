import dynamic from "next/dynamic";
import BackToTop from "@/components/BackToTop";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Marquee from "@/components/Marquee";
import Motion from "@/components/Motion";
import SlashCut from "@/components/SlashCut";
import Stack from "@/components/Stack";
import Work from "@/components/Work";

const Scene3D = dynamic(() => import("@/components/Scene3D"));

export default function Home() {
  return (
    <>
      <Intro />
      <Scene3D />
      <Cursor />
      <BackToTop />
      <Header />
      <main id="main" className="relative z-10">
        <Hero />
        <Marquee />
        <Work />
        <SlashCut />
        <Experience />
        <SlashCut />
        <Stack />
      </main>
      <div className="relative z-10">
        <SlashCut />
        <Contact />
      </div>
      <Motion />
    </>
  );
}
