"use client";


import { Clock, CheckCircle2, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const indicators = [
  {
    icon: Clock,
    title: "Same Day Repair",
    description:
      "Most common screen and battery repairs are completed within hours.",
  },
  {
    icon: CheckCircle2,
    title: "90-Day Warranty",
    description:
      "Every repair is backed by our comprehensive warranty on parts and labor.",
  },
  {
    icon: Users,
    title: "Expert Technicians",
    description:
      "Our certified team has handled over 10,000+ gadget repairs successfully.",
  },
];

export default function TrustIndicators() {
  return (
    <section id="trust" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-3">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <Card
                key={index}
                className="border-border bg-background text-center transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {indicator.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {indicator.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
