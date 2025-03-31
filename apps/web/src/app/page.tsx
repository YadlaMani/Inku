import React from "react";

import Footer from "@/components/landing/Footer";
import CallToAction from "@/components/landing/CallToAction";
import PriceSection from "@/components/landing/PriceSection";
import Testimonials from "@/components/landing/Testimonials";
import FeatureBento from "@/components/landing/FeatureBento";
import Hero from "@/components/landing/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,0,0,0.02)_50%,transparent_52%)] bg-[length:24px_24px]" />
        <div className="absolute right-0 top-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Hero />

      <FeatureBento />

      <Testimonials />

      <PriceSection />

      <CallToAction />

      <Footer />
    </div>
  );
};

export default Index;
