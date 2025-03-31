import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

const PriceSection = () => {
  return (
    <section className="container px-4 py-16 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-3">
            {`Simple, transparent pricing`}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan thats right for you or your team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border border-black/10 hover:shadow-lg transition-all">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Starter</h3>
                <div className="text-3xl font-bold">$0</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">5 drawings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Basic drawing tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">PNG export</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Community support</span>
                </li>
              </ul>

              <Button className="w-full bg-white border border-black/20 text-black hover:bg-black/5">
                Choose Plan
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border border-black shadow-xl relative">
            <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-xs font-medium">
              Most Popular
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Pro</h3>
                <div className="text-3xl font-bold">$12</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Unlimited drawings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">All drawing tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Multiple export formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Real-time collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">AI enhancements</span>
                </li>
              </ul>

              <Button className="w-full bg-black text-white hover:bg-black/90">
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Team Plan */}
          <Card className="border border-black/10 hover:shadow-lg transition-all">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Team</h3>
                <div className="text-3xl font-bold">$49</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">5 team members</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Team folders</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Analytics dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Dedicated support</span>
                </li>
              </ul>

              <Button className="w-full bg-white border border-black/20 text-black hover:bg-black/5">
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
