"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "iPhone User",
    content:
      "My iPhone screen was shattered and I was devastated. FixIt Pro fixed it within 24 hours at a great price. Highly recommend!",
    rating: 5,
    image: "👩‍💼",
  },
  {
    name: "Michael Chen",
    role: "Laptop Owner",
    content:
      "Professional service and fair pricing. My laptop was running slow and they optimized it perfectly. Great experience!",
    rating: 5,
    image: "👨‍💻",
  },
  {
    name: "Emma Davis",
    role: "Tablet User",
    content:
      "The team was friendly and knowledgeable. They explained everything clearly and my tablet works like new now.",
    rating: 5,
    image: "👩‍🔧",
  },
  {
    name: "James Wilson",
    role: "Console Gamer",
    content:
      "Couldn't play my favorite games due to console issues. FixIt Pro got me back in the game in no time!",
    rating: 5,
    image: "👨‍🎮",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            CUSTOMER FEEDBACK
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who trust FixIt Pro
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="pt-6 pb-6">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
