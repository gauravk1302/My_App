"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetSuccess = searchParams.get("reset") === "success";
  const isDisabled = loading || !email || !password;

  const handleSignIn = async () => {
    setLoading(true);
    setError("");

    const { error } = await signIn.email({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Something went wrong");
      return;
    }

    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Welcome Back</CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Reset success message */}
          {resetSuccess && (
            <p className="text-green-400 text-sm bg-green-950 px-3 py-2 rounded-md text-center">
              Password has been reset.Please login back to your account.
            </p>
          )}

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-sm bg-red-950 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          <div className="space-y-2">
            <Label className="text-zinc-300">Email</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-zinc-300">Password</Label>
              <Link
                href="/forgot-password"
                className="text-zinc-500 text-xs hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <Button
            onClick={handleSignIn}
            disabled={isDisabled}
            className="w-full bg-white text-black hover:bg-zinc-200"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-500">
                or continue with
              </span>
            </div>
          </div>

          <Button
            onClick={handleGoogle}
            className="w-full bg-white text-black hover:bg-zinc-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </Button>

        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-white hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}