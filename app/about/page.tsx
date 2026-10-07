"use client";

import { useEffect, useRef, useState } from "react";
import { ContactSection } from "@/components/ContactSection";

const greetings = [
  "Hi",
  "Hola",
  "Bonjour",
  "Namaste",
  "Assalamu Alaikum",
  "Ciao",
  "Hallo",
  "Привет",
  "你好",
  "こんにちは",
  "안녕하세요",
];

function AnimatedGreeting() {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGreetingIndex((currentIndex) => (currentIndex + 1) % greetings.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span key={greetingIndex} className="greeting-animation inline-flex items-center gap-1" aria-live="polite">
      {greetings[greetingIndex]}
      <span aria-hidden="true">,</span>
    </span>
  );
}

export default function AboutPage() {
  const [headingAnimation, setHeadingAnimation] = useState<"idle" | "forward" | "reverse">("idle");
  const reverseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (reverseTimer.current) {
        clearTimeout(reverseTimer.current);
      }
    };
  }, []);

  const startHeadingAnimation = () => {
    if (reverseTimer.current) {
      clearTimeout(reverseTimer.current);
    }
    setHeadingAnimation("forward");
  };

  const stopHeadingAnimation = () => {
    if (reverseTimer.current) {
      clearTimeout(reverseTimer.current);
    }
    setHeadingAnimation("reverse");
    reverseTimer.current = setTimeout(() => {
      setHeadingAnimation("idle");
      reverseTimer.current = null;
    }, 2100);
  };

  return (
    <>
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-24 md:px-8 md:pt-32">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="section-label">02 / About</p>
          <h1
            className={`about-heading mt-4 text-4xl tracking-[-0.08em] sm:text-5xl md:text-6xl lg:text-7xl about-heading--${headingAnimation}`}
            tabIndex={0}
            aria-label="There is always more than meets the eye if you look for it."
            onMouseEnter={startHeadingAnimation}
            onMouseLeave={stopHeadingAnimation}
            onFocus={startHeadingAnimation}
            onBlur={stopHeadingAnimation}
          >
            <span className="about-heading__idle" aria-hidden="true">
              I like building things that are useful, good-looking, and slightly more interesting than they need to be.
            </span>
            <span className="about-heading__revealed">
              <span className="about-heading__line">
                <span className="about-heading__text">There is always</span>
                <span className="about-heading__cover" aria-hidden="true" />
              </span>
              <span className="about-heading__line">
                <span className="about-heading__text">more than meets</span>
                <span className="about-heading__cover" aria-hidden="true" />
              </span>
              <span className="about-heading__line">
                <span className="about-heading__text">the eye if you</span>
                <span className="about-heading__cover" aria-hidden="true" />
              </span>
              <span className="about-heading__line">
                <span className="about-heading__text">look for it.</span>
                <span className="about-heading__cover" aria-hidden="true" />
              </span>
            </span>
          </h1>
        </div>
        <div className="space-y-5 text-base leading-8 text-zinc-600 md:text-lg">
          <p>
            <AnimatedGreeting />{" "}I’m Aliyu, a software developer and product minded enthusiast who enjoys turning ideas into things people can actually use.
          </p>
          <p>
            I work mainly with React, Next.js, TypeScript, and React Native, with tools like Tailwind, Supabase, and PostgreSQL filling in the gaps. I enjoy building everything from responsive web experiences to mobile products, especially when there’s an interesting problem hiding underneath the interface.

            I’m particularly drawn to projects where I can have a hand in more than just writing the code. Understanding the idea, figuring out the user flow, designing the interface, and building it.
          </p>
          <p>
            Outside of development, I enjoy reading and watching anime and manga, playing video games, and exploring and learning about new technologies and tools like: Blender, After Effects, Premiere Pro, and Figma. I also enjoy learning about new programming languages and frameworks, and experimenting with new ideas and concepts.
          </p>
          <p>
            I’m still learning, still experimenting, and still building. This website is basically a record of that process.
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
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-zinc-500">2020 — present</p>
        </div>

        <div className="grid gap-5 rounded-[2rem] border border-zinc-900/10 bg-white/50 p-6 md:grid-cols-[0.7fr_1.3fr_1fr] md:p-8">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">2026</div>
          <div>
            <p className="text-2xl tracking-[-0.06em]">Independent Software & Product Developer</p>
            <p className="mt-3 text-zinc-600">Currently doing freelance work in software development, and I am open to work with clients on new projects.</p>
          </div>
          <div className="text-zinc-500">Freelance</div>
        </div>

        <div className="grid gap-5 rounded-[2rem] border border-zinc-900/10 bg-white/50 p-6 md:grid-cols-[0.7fr_1.3fr_1fr] md:p-8">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">2025</div>
          <div>
            <p className="text-2xl tracking-[-0.06em]">Software Developer</p>
            <p className="mt-3 text-zinc-600">Building focused digital products, interfaces, and prototypes for Milab Signatures</p>
          </div>
          <div className="text-zinc-500">Full Time</div>
        </div>

        

        <div className="grid gap-5 rounded-[2rem] border border-zinc-900/10 bg-white/50 p-6 md:grid-cols-[0.7fr_1.3fr_1fr] md:p-8">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">2024</div>
          <div>
            <p className="text-2xl tracking-[-0.06em]">Web Developer</p>
            <p className="mt-3 text-zinc-600">An internship at CISCO Networking Center for experience in web development</p>
          </div>
          <div className="text-zinc-500">Internship</div>
        </div>

        <div className="grid gap-5 rounded-[2rem] border border-zinc-900/10 bg-white/50 p-6 md:grid-cols-[0.7fr_1.3fr_1fr] md:p-8">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">2020 - 2025</div>
          <div>
            <p className="text-2xl tracking-[-0.06em]">Student</p>
            <p className="mt-3 text-zinc-600">Studied Computer Science at Ahmadu Bello University.</p>
          </div>
          <div className="text-zinc-500">B.Sc. Computer Science</div>
        </div>
      </div>

    </div>
    <ContactSection />
    </>
  );
}
