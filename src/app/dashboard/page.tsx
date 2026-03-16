import SignOutButton from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (!session.user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(session.user.email)}`);
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm bg-zinc-900/40 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl backdrop-blur-md">

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 mb-6">
            <span className="text-3xl font-light text-white uppercase">
              {user.name?.charAt(0)}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-zinc-500 font-mono text-xs mt-2 bg-zinc-800/50 px-3 py-1 rounded-md">
            {user.email}
          </p>

          <div className="mt-8">
            <span className="px-5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.2em]">
              VERIFIED
            </span>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800/50">
          <SignOutButton />
        </div>

      </div>
    </div>
  );
}