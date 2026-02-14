"use client";



import { Smartphone, Laptop2, Tablet, Gamepad2 } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const services = [
  {
    title: "Smartphone Repair",
    description: "Screen, battery, and camera repairs for all major brands.",
    icon: Smartphone,
  },
  {
    title: "Laptop Repair",
    description:
      "Hardware upgrades, logic board repairs, and OS troubleshooting.",
    icon: Laptop2,
  },
  {
    title: "Tablet Repair",
    description:
      "Screen replacement and charging port repairs for all tablets.",
    icon: Tablet,
  },
  {
    title: "Console Repair",
    description: "Internal cleaning, HDMI port fix, and component replacement.",
    icon: Gamepad2,
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            OUR SPECIALTIES
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Comprehensive Repair Services
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-border bg-card"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm mb-4">
                    {service.description}
                  </CardDescription>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-primary hover:bg-primary/5 p-0 h-auto"
                  >
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
