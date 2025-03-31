import React from "react";
import { Card, CardContent } from "../ui/card";
import { QuoteIcon } from "lucide-react";
const Testimonials = () => {
  return (
    <section className="container px-4 py-16 mx-auto bg-accent/20 dark:bg-accent/30 rounded-3xl my-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Loved by creators worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our community is saying about Inku
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <Card className="bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <QuoteIcon className="h-6 w-6 text-black/20 dark:text-white/20" />
              <p className="italic text-muted-foreground">
                {`/"/Inku has completely transformed how I create digital art. The
                intuitive interface makes my workflow so much faster./"/`}
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs font-bold">
                  S
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    Freelance Illustrator
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card className="bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <QuoteIcon className="h-6 w-6 text-black/20 dark:text-white/20" />
              <p className="italic text-muted-foreground">
                {`/"/My team uses Inku daily for our design sprints. The
                collaborative features have been a game-changer for our remote
                workflow./"/`}
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs font-bold">
                  D
                </div>
                <div>
                  <p className="font-medium">David Chen</p>
                  <p className="text-sm text-muted-foreground">
                    Product Designer
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 3 */}
          <Card className="bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <QuoteIcon className="h-6 w-6 text-black/20 dark:text-white/20" />
              <p className="italic text-muted-foreground">
                {`/"/As someone who's not a professional artist, Inku makes it easy
                for me to create beautiful visuals for my presentations./"/`}
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs font-bold">
                  M
                </div>
                <div>
                  <p className="font-medium">Maria Rodriguez</p>
                  <p className="text-sm text-muted-foreground">
                    Marketing Manager
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
