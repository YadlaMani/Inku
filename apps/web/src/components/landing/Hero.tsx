"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Rocket, PenLine } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="container px-4 pt-24 pb-16 mx-auto text-center">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 mb-6"
        style={{
          backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
          color: isDark ? "#f3f4f6" : "#1f2937",
        }}
      >
        <Rocket className="w-4 h-4" />
        <span className="text-sm font-medium">Welcome to Inku ✨</span>
      </div>

      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
        Where
        <span className="relative mx-4 inline-block">
          Doodles
          <svg className="absolute -bottom-2 left-0 w-full" height="8">
            <path
              d="M0,4 C50,0 50,8 100,4 C150,0 150,8 200,4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
        <br />
        Come to Life
      </h1>
      <p
        className="max-w-2xl mx-auto text-xl mb-8"
        style={{ color: isDark ? "#d1d5db" : "#4b5563" }}
      >
        Turn your thoughts into visual stories with our minimalist drawing
        canvas, inspired by Zen simplicity and creative expression.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Button
          size="lg"
          className="w-full sm:w-auto bg-black text-white hover:bg-black/90 group dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <PenLine className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Start Drawing
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full sm:w-auto border-black/20 bg-white text-black dark:bg-black dark:text-white dark:border-white/20"
        >
          <Link href="/register">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
