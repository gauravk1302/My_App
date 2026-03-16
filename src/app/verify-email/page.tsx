"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const handleVerify = async () => {
    if (!email) {
      setError("Email not found. Please sign up again.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: resError } = await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });

    setLoading(false);

    if (resError) {
      setError(resError.message ?? "Invalid OTP. Please try again.");
      return;
    }

    router.push("/dashboard");
  };

  const handleResend = async () => {
    if (!email || resending) return;

    setResending(true);
    setError("");
    setSuccess("");

    const { error: resError } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });

    setResending(false);

    if (resError) {
      setError("Code not resend. Please try again.");
      return;
    }

    setSuccess("New code sended!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 backdrop-blur-md">

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Verify Email</h1>
          <p className="text-zinc-500 text-sm mt-2">
            6-digit code has been sent{" "}
            <span className="text-zinc-300 font-medium">{email || "aapki email pe"}</span>
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-center text-2xl tracking-[0.3em] font-mono focus:border-zinc-500 outline-none transition-all placeholder:text-zinc-700"
          />

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          {success && <p className="text-green-500 text-xs text-center">{success}</p>}

          <button
            onClick={handleVerify}
            disabled={loading || otp.length < 6}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "VERIFYING..." : "CONFIRM"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-zinc-600 text-xs mb-2">Code not received?</p>
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-xs text-zinc-400 hover:text-white uppercase tracking-widest font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resending ? "Sending..." : "Send Again"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/sign-up")}
            className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors"
          >
            ← Sign Up 
          </button>
        </div>

      </div>
    </div>
  );
}
