import { PropertyOnboardingForm } from "@/components/property-onboarding-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const HomePage = () => {
  return (
    <>
      <main>
        <section className="h-screen w-full font-fustat">
          <PropertyOnboardingForm />
        </section>
      </main>
    </>
  );
}


export default HomePage;