"use client";

import { LayoutDashboard, LogOut, User, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");
    if (loggedIn === "true" && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserName("");
    setShowDropdown(false);
    router.push("/");
  };
  // if (loading) {
  //   return <p>Loading..☺️.</p>;
  // }
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
            <a
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              How it Works
            </a>
            <a
              href="#footer"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right Side - User or Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
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
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
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
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors text-left"
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
