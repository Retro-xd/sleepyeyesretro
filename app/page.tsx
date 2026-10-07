import Link from "next/link";
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";

import { ContactSection } from "@/components/ContactSection";
import { HeroScene } from "@/components/HeroScene";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Expo", "Product flows"],
  },
  {
    title: "Backend",
    items: ["Supabase", "PostgreSQL", "REST APIs"],
  },
  {
    title: "Design",
    items: ["UI systems", "Interaction", "Motion"],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8">
      <section className="flex min-h-[100vh] items-center pb-14 pt-28 md:pt-32">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-label">sleepyeyesretro / creative developer</p>
            <div className="mt-6">
              <span className="block text-[clamp(3.6rem,9vw,9rem)] leading-[0.78] tracking-[-0.09em] text-zinc-900">
                build
              </span>
              <span className="block text-[clamp(3.2rem,7vw,7.6rem)] leading-[0.82] tracking-[-0.09em] text-zinc-500">
                weirdly
              </span>
              <span className="block text-[clamp(3.2rem,7vw,7.6rem)] leading-[0.82] tracking-[-0.09em] text-zinc-900">
                good
              </span>
              <span className="block text-[clamp(3.2rem,7vw,7.6rem)] leading-[0.82] tracking-[-0.09em] text-[#d9825a]">
                digital
              </span>
              <span className="block text-[clamp(3.2rem,7vw,7.6rem)] leading-[0.82] tracking-[-0.09em] text-zinc-900">
                things.
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/work"
                className="button-pill bg-zinc-900 text-zinc-50"
              >
                View work <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="button-pill border border-zinc-900/15 bg-white/40 text-zinc-700"
              >
                About me <MoveRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <HeroScene />
        </div>
      </section>

      <section id="intro" className="pb-20 pt-10 md:pb-28">
        <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-start">
          <div className="relative h-56 md:min-h-[430px]">
            <p className="section-label absolute left-0 top-14 z-10 md:top-0">01 / Introduction</p>
            <span
              className="hello-wave absolute left-0 right-auto top-[5rem] flex h-32 w-auto items-center justify-start text-[7.5rem] leading-none md:inset-0 md:h-full md:w-full md:justify-center md:text-[15rem]"
              role="img"
              aria-label="Waving hand"
            >
              👋
            </span>
          </div>
          <div className="space-y-6">
            <p className="max-w-[800px] text-3xl leading-[1.08] tracking-[-0.06em] text-zinc-900 md:text-5xl">
              I design and build digital products that feel as considered as the ideas behind them. My work balances product thinking, visual clarity, and precise interaction design.
            </p>
            <div className="grid gap-6 pt-4 md:grid-cols-2">
              <div className="rounded-[1.7rem] border border-zinc-900/10 bg-white/60 p-5">
                <p className="text-[0.58rem] uppercase tracking-[0.24em] text-zinc-500">Approach</p>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  Product strategy, editorial design, and interface craftsmanship shaped around user behavior.
                </p>
              </div>
              <div className="rounded-[1.7rem] border border-zinc-900/10 bg-white/60 p-5">
                <p className="text-[0.58rem] uppercase tracking-[0.24em] text-zinc-500">Focus</p>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  Clear systems, delightful motion, and interfaces that help people understand without friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="pb-20 md:pb-28">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">02 / Selected work</p>
            <h2 className="mt-4 text-4xl tracking-[-0.08em] md:text-6xl">A few projects with substance.</h2>
          </div>
          <Link href="/work" className="button-pill border border-zinc-900/10 bg-white/50 text-zinc-700">
            See all work <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-20">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-zinc-900/10 bg-[#1a1a1a] p-7 text-zinc-100 md:p-8">
            <p className="section-label text-zinc-400">03 / Now</p>
            <h3 className="mt-4 max-w-sm text-3xl tracking-[-0.07em] md:text-4xl">Building, learning, and refining the details.</h3>
            <div className="mt-8 space-y-6 text-zinc-300">
              <p>
                <span className="block text-[0.6rem] uppercase tracking-[0.24em] text-zinc-500">Currently</span>
                Exploring richer product storytelling and motion for digital interfaces.
              </p>
              <p>
                <span className="block text-[0.6rem] uppercase tracking-[0.24em] text-zinc-500">Learning</span>
                More advanced interaction patterns, motion systems, and product strategy.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-[1.8rem] border border-zinc-900/10 bg-white/60 p-6">
                <p className="section-label">{group.title}</p>
                <ul className="mt-6 space-y-3 text-lg leading-7 text-zinc-700">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
