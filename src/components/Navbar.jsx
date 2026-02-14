"use client";

import { LayoutDashboard, LogOut, User, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // ১. usePathname ইম্পোর্ট করুন

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // ২. হুকটি কল করুন

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // ৩. চেক করার লজিকটি একটি ফাংশনে নিয়ে আসলাম
  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");

    if (loggedIn === "true" && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      // যদি লগআউট বা ডাটা না থাকে
      setIsLoggedIn(false);
      setUserName("");
    }
    setLoading(false);
  };

  useEffect(() => {
    checkLoginStatus(); // পেজ লোড হলে চেক করবে

    // ৪. ইভেন্ট লিসেনার যোগ করা (যাতে অন্য ট্যাবে লগিন করলে এই ট্যাব আপডেট হয়)
    window.addEventListener("storage", checkLoginStatus);

    // ৫. কাস্টম ইভেন্ট লিসেনার (একই ট্যাবে ইনস্ট্যান্ট আপডেটের জন্য)
    window.addEventListener("auth-change", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("auth-change", checkLoginStatus);
    };
  }, [pathname]); // ৬. pathname চেঞ্জ হলে (যেমন লগিন পেজ থেকে হোমে গেলে) আবার চেক করবে

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // ৭. ইভেন্ট ডিসপ্যাচ করা (যাতে সাথে সাথে UI আপডেট হয়)
    window.dispatchEvent(new Event("auth-change"));

    setIsLoggedIn(false);
    setUserName("");
    setShowDropdown(false);
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-lg bg-primary p-2">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FixIt Pro</span>
          </Link>

          {/* Center Links */}
          <div className="hidden gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              How it Works
            </Link>
          </div>

          {/* Right Side - User or Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium text-foreground">
                    {userName}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
