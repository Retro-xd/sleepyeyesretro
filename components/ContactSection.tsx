"use client";

import { useState } from "react";
import { BriefcaseBusiness, Check, CodeXml, Copy, Mail } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("aleeyu011@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8">
      <div className="rounded-[2.5rem] border border-zinc-900/10 bg-[#171717] p-6 text-zinc-50 md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-label text-zinc-400">04 / Contact</p>
            <h2 className="mt-4 text-4xl tracking-[-0.07em] md:text-6xl">Let’s make something worth scrolling for.</h2>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="button-pill border border-zinc-700 bg-white/5 text-zinc-100 hover:border-zinc-500 hover:bg-white/10"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        <div className="mt-10 grid gap-6 border-t border-zinc-700/80 pt-8 md:grid-cols-3">
          <a href="mailto:aleeyu011@gmail.com" aria-label="Email aleeyu011@gmail.com" className="group flex min-w-0 items-center gap-3 rounded-[1.5rem] border border-zinc-700/80 bg-white/5 p-4 text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-white/10">
            <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-zinc-300" />
            <span className="min-w-0 break-all text-lg tracking-[-0.04em]">aleeyu011@gmail.com</span>
          </a>

          <a href="https://github.com/Retro-xd" aria-label="GitHub profile" target="_blank" rel="noreferrer" className="group flex min-w-0 items-center gap-3 rounded-[1.5rem] border border-zinc-700/80 bg-white/5 p-4 text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-white/10">
            <CodeXml aria-hidden="true" className="h-5 w-5 shrink-0 text-zinc-300" />
            <span className="min-w-0 break-all text-lg tracking-[-0.04em]">github.com/Retro-xd</span>
          </a>

          <a href="https://www.linkedin.com/in/aliyu-abubakar-094081191/" aria-label="LinkedIn profile" target="_blank" rel="noreferrer" className="group flex min-w-0 items-center gap-3 rounded-[1.5rem] border border-zinc-700/80 bg-white/5 p-4 text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-white/10">
            <BriefcaseBusiness aria-hidden="true" className="h-5 w-5 shrink-0 text-zinc-300" />
            <span className="min-w-0 break-all text-lg tracking-[-0.04em]">linkedin.com/in/aliyu-abubakar-094081191</span>
          </a>
        </div>
      </div>
    </section>
  );
}
