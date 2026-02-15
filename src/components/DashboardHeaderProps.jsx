"use client";

import { useState, useEffect } from "react";
import { Bell, LogOut, ChevronDown, User, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function DashboardHeader({
  breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Overview", href: "#" },
  ],
}) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ১. লোডিং স্টেট

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");

    if (loggedIn === "true" && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
    setLoading(false); // ২. চেক শেষ হলে লোডিং বন্ধ হবে
  };

  useEffect(() => {
    // পেজ লোড হওয়ার সাথে সাথে চেক করবে
    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("auth-change", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("auth-change", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.dispatchEvent(new Event("auth-change"));

    setIsLoggedIn(false);
    setUserName("");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side - Breadcrumbs */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">
                    {crumb.label}
                  </span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className="text-muted-foreground">/</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Side - Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden sm:block w-64">
            <Input
              placeholder="Search repairs..."
              className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground hover:bg-muted"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>

          {/* ৩. ইউজার প্রোফাইল সেকশন (উইথ লোডিং ইফেক্ট) */}
          {loading ? (
            // 👇 লোডিং স্কেলিটন (Loading Skeleton)
            <div className="flex items-center gap-3 pl-2 pr-4">
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />{" "}
              {/* Avatar Skeleton */}
              <div className="hidden sm:flex flex-col gap-1">
                <div className="h-3 w-20 bg-muted animate-pulse rounded" />{" "}
                {/* Name Skeleton */}
                <div className="h-2 w-12 bg-muted animate-pulse rounded" />{" "}
                {/* Role Skeleton */}
              </div>
            </div>
          ) : isLoggedIn ? (
            // 👇 লগইন থাকলে ড্রপডাউন
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-foreground hover:bg-muted pl-2 pr-4"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground">User</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-card border-border"
              >
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // 👇 লগইন না থাকলে লগইন বাটন
            <Link href="/login">
              <Button size="sm" className="bg-primary text-primary-foreground">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
