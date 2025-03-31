"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Card, CardContent } from "../ui/card";
import {
  Pen,
  MousePointer2,
  Scissors,
  Sparkles,
  Share2,
  Users,
  Palette,
} from "lucide-react";

const FeatureBento = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="container px-4 py-16 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-3">
            A canvas for every creator
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{ color: isDark ? "#d1d5db" : "#4b5563" }}
          >
            Our platform combines simplicity with power, giving you all the
            tools you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {/* First row */}
          <Card
            className="group lg:col-span-2 border border-black/10 hover:shadow-xl transition-all"
            style={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              color: isDark ? "#f3f4f6" : "#111827",
            }}
          >
            <CardContent className="p-6 h-full">
              <Pen className="w-10 h-10 mb-4 group-hover:rotate-12 transition-transform" />
              <h3 className="mb-2 text-lg font-semibold">Freehand Drawing</h3>
              <p className="text-sm opacity-80">
                Express freely with intuitive pen tools and natural brushes
              </p>
            </CardContent>
          </Card>

          {[
            {
              icon: MousePointer2,
              title: "Precision Controls",
              desc: "Create with pixel-perfect accuracy for detailed artwork",
            },
            {
              icon: Users,
              title: "Collaborative Canvas",
              desc: "Draw together in real-time with teammates anywhere",
            },
            {
              icon: Scissors,
              title: "Smart Selection",
              desc: "Select, move, and transform elements with intelligent tools",
            },
            {
              icon: Share2,
              title: "Instant Sharing",
              desc: "Export and share your work across platforms with one click",
            },
            {
              icon: Sparkles,
              title: "AI Enhancement",
              desc: "Let our AI polish and enhance your rough sketches",
            },
            {
              icon: Palette,
              title: "Color Harmony",
              desc: "Access curated color palettes that work beautifully together",
            },
          ].map(({ icon: Icon, title, desc }, index) => (
            <Card
              key={index}
              className="group border border-black/10 hover:shadow-xl transition-all"
              style={{
                backgroundColor: isDark ? "#1f2937" : "#f9fafb",
                color: isDark ? "#f3f4f6" : "#111827",
              }}
            >
              <CardContent className="p-6 h-full">
                <Icon className="w-10 h-10 mb-4 group-hover:rotate-12 transition-transform" />
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm opacity-80">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBento;
