import { ContactSection } from "@/components/ContactSection";

export default function AboutPage() {
  return (
    <>
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-24 md:px-8 md:pt-32">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="section-label">02 / About</p>
          <h1 className="mt-4 text-5xl tracking-[-0.08em] md:text-7xl">I build interfaces that feel calm, useful, and alive.</h1>
        </div>
        <div className="space-y-5 text-base leading-8 text-zinc-600 md:text-lg">
          <p>
            I’m a frontend developer and product-minded designer focused on interfaces that are as thoughtful as they are practical. I like turning complex ideas into experiences that feel understandable from the first glance.
          </p>
          <p>
            My work sits between product strategy, visual design, and front-end engineering. I enjoy shaping clear systems, subtle motion, and polished interactions that help software feel more human.
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2.2rem] border border-zinc-900/10 bg-white/60 p-8 md:p-10">
          <p className="section-label">Current focus</p>
          <div className="mt-8 space-y-8 text-zinc-700">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.28em] text-zinc-500">Frontend</p>
              <p className="mt-3 text-2xl tracking-[-0.06em]">React, Next.js, TypeScript, UI systems</p>
            </div>
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.28em] text-zinc-500">Mobile</p>
              <p className="mt-3 text-2xl tracking-[-0.06em]">React Native, Expo, product flows</p>
            </div>
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.28em] text-zinc-500">Design</p>
              <p className="mt-3 text-2xl tracking-[-0.06em]">Interaction design, motion, and interface systems</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.2rem] border border-zinc-900/10 bg-[#1a1a1a] p-8 text-zinc-100 md:p-10">
          <p className="section-label text-zinc-400">Selected stack</p>
          <ul className="mt-8 space-y-4 text-lg text-zinc-200">
            <li>React</li>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind</li>
            <li>Framer Motion</li>
            <li>Supabase</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
      </div>

      <div className="mt-20 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-900/10 pb-4">
          <p className="section-label">Experience</p>
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-zinc-500">2023 — present</p>
        </div>

        <div className="grid gap-5 rounded-[2rem] border border-zinc-900/10 bg-white/50 p-6 md:grid-cols-[0.7fr_1.3fr_1fr] md:p-8">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">2025</div>
          <div>
            <p className="text-2xl tracking-[-0.06em]">Independent Product Designer & Developer</p>
            <p className="mt-3 text-zinc-600">Building focused digital products, interfaces, and prototypes for early-stage ideas.</p>
          </div>
          <div className="text-zinc-500">Freelance / Contract</div>
        </div>

        <div className="grid gap-5 rounded-[2rem] border border-zinc-900/10 bg-white/50 p-6 md:grid-cols-[0.7fr_1.3fr_1fr] md:p-8">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">2024</div>
          <div>
            <p className="text-2xl tracking-[-0.06em]">Frontend Developer</p>
            <p className="mt-3 text-zinc-600">Focused on editorial web experiences, interaction systems, and component architecture.</p>
          </div>
          <div className="text-zinc-500">Studio work</div>
        </div>
      </div>

    </div>
    <ContactSection />
    </>
  );
}
