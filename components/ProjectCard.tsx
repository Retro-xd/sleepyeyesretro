"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import type { Project } from "@/lib/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/work/${project.slug}`} className="block">
        <div className="mb-4 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <div className="relative aspect-[40/27] overflow-hidden rounded-[2rem] border border-zinc-900/10 bg-[#ece9e3] shadow-[0_24px_80px_rgba(24,24,27,0.06)]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            loading={priority ? "eager" : "lazy"}
            sizes="(min-width: 1400px) 1344px, calc(100vw - 32px)"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
          />
        </div>

        <div className="mt-6 flex items-end justify-between gap-4 border-b border-zinc-900/10 pb-3">
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.06em] text-zinc-900 md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">{project.description}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900/10 bg-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
