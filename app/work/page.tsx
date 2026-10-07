import { ContactSection } from "@/components/ContactSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <>
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-24 md:px-8 md:pt-32">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-label">01 / Work</p>
          <h1 className="mt-4 max-w-xl text-5xl tracking-[-0.08em] md:text-7xl">Selected work.</h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-zinc-600 md:text-lg">
          Product thinking, interaction design, and careful front-end execution for digital products with a stronger point of view.
        </p>
      </div>

      <div className="space-y-20">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} />
        ))}
      </div>

    </div>
    <ContactSection />
    </>
  );
}
