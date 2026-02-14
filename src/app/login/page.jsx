"use client";

import React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Wrench, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/auth";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    try {
      await signInWithEmail(email, password);
      // ---------------------------------------------------------
      
      // ---------------------------------------------------------

      // লোকাল স্টোরেজে ডাটা সেট করা
      localStorage.setItem("isLoggedIn", "true");
      
      localStorage.setItem("userName", email.split("@")[0]);
      localStorage.setItem("userEmail", email);

      // ইভেন্ট ডিসপ্যাচ করা যাতে Navbar আপডেট হয়
      window.dispatchEvent(new Event("auth-change"));

      // ---------------------------------------------------------
      // ☝️ কোড শেষ ☝️
      // ---------------------------------------------------------
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        text: `Welcome back, ${email}`,
        confirmButtonColor: "#16a34a",
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please check your credentials and try again.",
        confirmButtonColor: "#dc2626", // red-600
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Simulate login
    setTimeout(() => {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", email.split("@")[0]);
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="flex items-center justify-center rounded-lg bg-primary p-2">
          <Wrench className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold text-foreground">FixIt Pro</span>
      </Link>

      {/* Login Card */}
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to access your repairs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">
              Or continue as
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Demo Login */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="w-full bg-amber-200 border-border text-foreground hover:bg-amber-400 "
              onClick={() => {
                setEmail("demo@user.com");
                setPassword("User1234");
              }}
            >
              Demo User
            </Button>
            <Button
              variant="outline"
              className="w-full bg-green-200 border-border text-foreground hover:bg-green-400"
              onClick={() => {
                setEmail("demo@staff.com");
                setPassword("Staff1234");
              }}
            >
              Demo Staff
            </Button>
            <Button
              variant="outline"
              className="w-full bg-sky-200 border-border text-foreground hover:bg-sky-400"
              onClick={() => {
                setEmail("demo@example.com");
                setPassword("Admin1234");
              }}
            >
              Demo Admin
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-xs text-muted-foreground text-center mt-6">
        By signing in, you agree to our{" "}
        <Link href="#" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
