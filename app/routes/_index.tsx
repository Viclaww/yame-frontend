import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";
import FAQSection from "~/components/landing/FAQs";
import Hero from "~/components/landing/Hero";
import HowItWorks from "~/components/landing/HowItWorks";
import WhyChooseUs from "~/components/landing/WhyChooseUs";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex bg-[#070707] flex-col items-center justify-center">
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <FAQSection />
      <Footer />
    </div>
  );
}
