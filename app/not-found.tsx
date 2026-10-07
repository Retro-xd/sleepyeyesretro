import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1200px] items-center justify-center px-4 pb-24 pt-32">
      <div className="max-w-xl text-center">
        <p className="section-label">404</p>
        <h1 className="mt-5 text-5xl tracking-[-0.08em] md:text-7xl">This page wandered off.</h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600">The work is still here, just not at this address.</p>
        <Link href="/" className="button-pill mt-8 border border-zinc-900/10 bg-white/60 text-zinc-800">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </div>
  );
}
