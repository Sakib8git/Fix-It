"use client";

import { Wrench, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center rounded-lg bg-primary p-2">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">FixIt Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium tech repair services since 2015. We repair smartphones,
              tablets, and more with certified experts.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">Share</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20v-7.21H5.5V9.25h2.79V7.04c0-2.78 1.7-4.29 4.16-4.29 1.18 0 2.2.09 2.49.13v2.89h-1.71c-1.34 0-1.6.64-1.6 1.57v2.05h3.2l-4.16 3.54v7.21H8.29z" />
                </svg>
              </a>
              <a
                href="https://x.com/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">X</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">QUICK LINKS</h4>
            <div className="space-y-2">
              <a
                href="#services"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Services
              </a>
              <a
                href="/dashboard"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/feedback"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Leave Feedback
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">COMPANY</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Reviews
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">CONTACT US</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  523 Tech Avenue, Dakbangla, Khulna
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+880123456789"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +880123456789
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:support@fixitpro.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  support@fixitpro.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground ">
          <p>&copy; 2026 FixIt Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
