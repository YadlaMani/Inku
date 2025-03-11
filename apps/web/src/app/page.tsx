import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pen,
  PenLine,
  Sparkles,
  Share2,
  Users,
  Eraser,
  MousePointer2,
  Scissors,
  Rocket,
  Palette,
  Wand2,
} from "lucide-react";

const DoodleLine = () => (
  <svg
    className="absolute w-full h-full pointer-events-none opacity-[0.15]"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100,500 C200,300 300,700 400,500 C500,300 600,700 700,500 C800,300 900,700 1000,500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="5,12"
      className="animate-draw"
    />
  </svg>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,0,0,0.02)_50%,transparent_52%)] bg-[length:24px_24px]" />
        <div className="absolute right-0 top-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section with Interactive Elements */}
      <section className="container px-4 py-32 mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <DoodleLine />
        </div>
        <div className="relative animate-fade-up space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/50 text-accent-foreground border border-black/10 hover:scale-105 transition-transform cursor-pointer">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Welcome to Inku ✨</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              Where
              <span className="relative mx-4 inline-block">
                Doodles
                <svg className="absolute -bottom-2 left-0 w-full" height="8">
                  <path
                    d="M0,4 C50,0 50,8 100,4 C150,0 150,8 200,4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                    className="animate-draw-line"
                  />
                </svg>
              </span>
              <br />
              Come to Life
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Turn your thoughts into visual stories with our minimalist drawing
              canvas, inspired by Zen simplicity and creative expression.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="animate-fade-in bg-black text-white hover:bg-black/90 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <PenLine className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Drawing
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Palette className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid with Interactive Cards */}
      <section className="container px-4 py-24 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-black/10 bg-white/50 backdrop-blur-sm relative overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="absolute top-0 right-0 w-32 h-32 -mt-12 -mr-12 bg-gradient-to-br from-black/5 to-transparent rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500" />
                {feature.icon}
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Call to Action */}
      <section className="container px-4 py-24 mx-auto">
        <div className="max-w-3xl mx-auto text-center bg-white/50 backdrop-blur-sm rounded-3xl p-12 relative overflow-hidden border-2 border-black/10 group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:16px_16px] group-hover:scale-110 transition-transform duration-500" />
          <div className="relative space-y-8">
            <div className="inline-flex p-3 rounded-full bg-black/5">
              <Wand2 className="w-12 h-12 text-black group-hover:rotate-12 transition-transform" />
            </div>
            <h2 className="text-4xl font-bold">
              Start Creating Today
              <div className="mt-2 h-1 w-24 mx-auto bg-black/10 rounded-full group-hover:w-32 transition-all duration-300" />
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our growing community of creatives and bring your ideas to
              life with Inku's minimalist drawing experience
            </p>
            <Button
              size="lg"
              className="bg-black text-white hover:bg-black/90 group relative overflow-hidden"
            >
              <span className="relative z-10">Try Inku for Free</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="container px-4 py-8 mx-auto mt-24 text-center">
        <div className="flex items-center justify-center gap-8 mb-8 text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Discord
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Documentation
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2024 Inku. Crafted with simplicity in mind.
        </p>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: (
      <Pen className="w-12 h-12 mb-4 text-black group-hover:rotate-12 transition-transform" />
    ),
    title: "Freehand Magic",
    description: "Express freely with intuitive pen tools",
  },
  {
    icon: (
      <MousePointer2 className="w-12 h-12 mb-4 text-black group-hover:rotate-12 transition-transform" />
    ),
    title: "Perfect Precision",
    description: "Create with pixel-perfect accuracy",
  },
  {
    icon: (
      <Users className="w-12 h-12 mb-4 text-black group-hover:rotate-12 transition-transform" />
    ),
    title: "Team Canvas",
    description: "Draw together in real-time",
  },
  {
    icon: (
      <Scissors className="w-12 h-12 mb-4 text-black group-hover:rotate-12 transition-transform" />
    ),
    title: "Smart Tools",
    description: "Advanced tools for your creativity",
  },
];

export default Index;
