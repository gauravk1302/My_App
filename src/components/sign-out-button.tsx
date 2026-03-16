"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh(); // ✅ middleware ko fresh session check karne dega
        },
      },
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full text-center text-[10px] text-zinc-500 hover:text-red-400 transition-all uppercase tracking-[0.3em] font-bold"
    >
      Sign Out & Switch Account
    </button>
  );
}
