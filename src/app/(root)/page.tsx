import HeroSection from "@/components/root-components/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const HomePage = () => {
  return (
    <>
      <main>
        <section className="h-screen w-full bg-gradient-to-b from-[#0f172a] to-[#83a4d8]">
          <HeroSection />
        </section>
      </main>
    </>
  );
}


export default HomePage;