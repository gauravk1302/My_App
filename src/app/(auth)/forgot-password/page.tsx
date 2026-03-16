
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          redirectTo: "http://localhost:3000/reset-password",
        }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-zinc-900 border border-zinc-800 text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <h1 className="text-2xl font-bold text-white">Email Sent</h1>

            <p className="text-zinc-400 text-sm">
              A password reset link has been sent to
              <span className="text-white font-medium ml-1">{email}</span>.
            </p>

            <Button
              variant="outline"
              onClick={() => setStatus("idle")}
              className="mt-4"
            >
              Send Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-zinc-900 border border-zinc-800 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-white text-2xl font-bold">
            Forgot Password
          </CardTitle>

          <CardDescription className="text-zinc-400">
            Enter your email and we will send you a reset link
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-zinc-300">Email Address</Label>

              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            {status === "error" && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 p-2 rounded-md">
                Something went wrong. Please try again.
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "loading" || !email}
              className="w-full bg-white text-black hover:bg-zinc-200 font-semibold"
            >
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/sign-in"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                ← Back to Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

