import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import Footer from "~/components/Footer";
import FAQSection from "~/components/landing/FAQs";
import Hero from "~/components/landing/Hero";
import HowItWorks from "~/components/landing/HowItWorks";
import WhyChooseUs from "~/components/landing/WhyChooseUs";
export const meta: MetaFunction = () => {
  return [
    { title: "Huddle" },
    { name: "description", content: "Welcome to Huddle, AI Powered Study Collaboration tool" },
    
  ];
};
export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
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
