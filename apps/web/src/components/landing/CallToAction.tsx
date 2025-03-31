import React from "react";
import { Wand2, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <section className="container px-4 py-16 mx-auto mb-16">
      <div className="max-w-4xl mx-auto text-center bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-3xl p-12 relative overflow-hidden border border-black/10 dark:border-white/10 hover:shadow-xl transition-all">
        <div className="relative space-y-6">
          <div className="inline-flex p-3 rounded-full bg-black/5 dark:bg-white/10">
            <Wand2 className="w-12 h-12 text-black dark:text-white" />
          </div>
          <h2 className="text-4xl font-bold">
            Start Creating Today
            <div className="mt-2 h-1 w-24 mx-auto bg-black/10 dark:bg-white/10 rounded-full" />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of creatives and bring your ideas to life
            with Inku's minimalist drawing experience. No complicated tools—just
            pure creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-gray-200 group"
            >
              Try Inku for Free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
