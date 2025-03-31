import React from "react";
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
  return (
    <section className="container px-4 py-16 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-3">
            A canvas for every creator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines simplicity with power, giving you all the
            tools you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {/* First row */}
          <Card className="group lg:col-span-2 bg-black text-white border border-black/10 hover:shadow-xl transition-all">
            <CardContent className="p-6 h-full">
              <Pen className="w-10 h-10 mb-4 text-white group-hover:rotate-12 transition-transform" />
              <h3 className="mb-2 text-lg font-semibold">Freehand Drawing</h3>
              <p className="text-white/80 text-sm">
                Express freely with intuitive pen tools and natural brushes
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 border border-black/10 hover:shadow-xl transition-all">
            <CardContent className="p-6 h-full">
              <MousePointer2 className="w-10 h-10 mb-4 text-black group-hover:rotate-12 transition-transform" />
              <h3 className="mb-2 text-lg font-semibold">Precision Controls</h3>
              <p className="text-muted-foreground text-sm">
                Create with pixel-perfect accuracy for detailed artwork
              </p>
            </CardContent>
          </Card>

          {/* Second row */}
          <Card className="group bg-white/80 border border-black/10 hover:shadow-xl transition-all">
            <CardContent className="p-6 h-full">
              <Users className="w-10 h-10 mb-4 text-black group-hover:rotate-12 transition-transform" />
              <h3 className="mb-2 text-lg font-semibold">
                Collaborative Canvas
              </h3>
              <p className="text-muted-foreground text-sm">
                Draw together in real-time with teammates anywhere
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 border border-black/10 hover:shadow-xl transition-all">
            <CardContent className="p-6 h-full">
              <Scissors className="w-10 h-10 mb-4 text-black group-hover:rotate-12 transition-transform" />
              <h3 className="mb-2 text-lg font-semibold">Smart Selection</h3>
              <p className="text-muted-foreground text-sm">
                Select, move, and transform elements with intelligent tools
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 border border-black/10 hover:shadow-xl transition-all">
            <CardContent className="p-6 h-full">
              <Share2 className="w-10 h-10 mb-4 text-black group-hover:rotate-12 transition-transform" />
              <h3 className="mb-2 text-lg font-semibold">Instant Sharing</h3>
              <p className="text-muted-foreground text-sm">
                Export and share your work across platforms with one click
              </p>
            </CardContent>
          </Card>

          {/* Third row */}
          <Card className="group bg-white/80 border border-black/10 hover:shadow-xl transition-all">
            <CardContent className="p-6 h-full">
              <Sparkles className="w-10 h-10 mb-4 text-black group-hover:rotate-12 transition-transform" />
              <h3 className="mb-2 text-lg font-semibold">AI Enhancement</h3>
              <p className="text-muted-foreground text-sm">
                Let our AI polish and enhance your rough sketches
              </p>
            </CardContent>
          </Card>

          <Card className="group lg:col-span-2 bg-white/80 border border-black/10 hover:shadow-xl transition-all">
            <CardContent className="p-6 h-full">
              <Palette className="w-10 h-10 mb-4 text-black group-hover:rotate-12 transition-transform" />
              <h3 className="mb-2 text-lg font-semibold">Color Harmony</h3>
              <p className="text-muted-foreground text-sm">
                Access curated color palettes that work beautifully together
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureBento;
