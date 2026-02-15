"use client";

import React from "react";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

export default function Hero() {
  const [ticketId, setTicketId] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    console.log("Tracking ticket:", ticketId);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl text-balance">
              Expert Repair Service for Your Digital Devices
            </h1>

            <p className="mb-8 text-lg text-muted-foreground text-balance">
              From shattered screens to software glitches, we bring your tech
              back to life with certified parts and expert precision.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-background border-foreground text-foreground hover:bg-muted"
              >
                View Pricing
              </Button>
            </div>
          </div>

          {/* Right Column - Check Repair Status Card */}
          {/* <div>
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-bold text-foreground">
                  Check Repair Status
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Enter your repair ticket ID to see the current progress of
                    your device repair.
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Ticket ID (e.g., FIX-1234)"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    className="mb-4"
                  />
                  <Button
                    onClick={handleTrack}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Track Status
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Need help finding your ticket?{" "}
                  <a href="#" className="text-primary hover:underline">
                    Contact Support
                  </a>
                </p>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </section>
  );
}
