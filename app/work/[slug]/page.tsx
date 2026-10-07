import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import { projects } from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | SleepyEyesRetro`,
    description: project.description,
  };
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-24 md:px-8 md:pt-32">
      <Link href="/work" className="button-pill border border-zinc-900/10 bg-white/50 text-zinc-700">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to work
      </Link>

      <div className="mt-10 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="section-label">{project.category} / {project.year}</p>
          <h1 className="mt-4 text-5xl tracking-[-0.08em] md:text-7xl">{project.title}</h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-zinc-600">{project.summary}</p>
      </div>

      <div className="mt-12 overflow-hidden rounded-[2rem] border border-zinc-900/10 bg-white/50 shadow-[0_24px_80px_rgba(24,24,27,0.06)]">
        <div className="relative aspect-[40/27] bg-[#ece9e3]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="(min-width: 1400px) 1344px, calc(100vw - 32px)"
            className="object-cover object-top"
          />
        </div>
      </div>

      <section className="mt-16 md:mt-20">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Project overview</p>
            <h2 className="mt-3 text-3xl tracking-[-0.06em] md:text-4xl">What you’ll find on the site</h2>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="button-pill border border-zinc-900/10 bg-white/60 text-zinc-800 hover:bg-zinc-900 hover:text-white"
          >
            Visit live site <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-8 border-t border-zinc-900/10 md:grid-cols-3">
          {project.highlights.map((highlight, index) => (
            <div key={highlight.label} className="border-b border-zinc-900/10 py-5 md:border-b-0">
              <p className="section-label">0{index + 1} / {highlight.label}</p>
              <p className="mt-4 max-w-sm text-base leading-7 text-zinc-600">{highlight.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-col gap-8 border-t border-zinc-900/10 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between">
        <p className="section-label">More selected work</p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/work/${previousProject.slug}`} className="button-pill border border-zinc-900/10 bg-white/60 text-zinc-800">
            <ArrowLeft className="h-3.5 w-3.5" /> {previousProject.title}
          </Link>
          <Link href={`/work/${nextProject.slug}`} className="button-pill bg-zinc-900 text-white">
            {nextProject.title} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
