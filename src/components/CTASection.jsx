"use client";

import { Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to fix your gadget?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-0">
                Join 50,000+ satisfied customers. Get a free quote in under 2
                minutes.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90"
              >
                Get Free Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (555) 012-3456
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
