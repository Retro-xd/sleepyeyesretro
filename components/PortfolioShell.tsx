"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

function CustomCursor() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    const handleMove = (event: MouseEvent) => {
      setPointer({ x: event.clientX, y: event.clientY });
    };

    const handleHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setCursorHidden(!!target?.closest("[data-hide-custom-cursor='true']"));
      const isInteractive = !!target?.closest("a, button, [data-hoverable='true']");
      setHovering(isInteractive);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mouseout", () => setHovering(false));

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mouseout", () => setHovering(false));
    };
  }, []);

  if (!mounted || reducedMotion || cursorHidden) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <motion.div
        animate={{
          x: pointer.x - 5,
          y: pointer.y - 5,
          scale: hovering ? 1.8 : 1,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
        className="absolute flex h-3 w-3 items-center justify-center rounded-full bg-zinc-900"
      />
      <motion.div
        animate={{
          x: pointer.x - 18,
          y: pointer.y - 18,
          scale: hovering ? 1.8 : 1,
          opacity: hovering ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.7 }}
        className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-zinc-900/40 bg-white/30 backdrop-blur-sm"
      >
        {hovering ? <span className="text-[0.42rem] uppercase tracking-[0.14em] text-zinc-800">view</span> : null}
      </motion.div>
    </div>
  );
}

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <div className="relative min-h-screen bg-[#f3efe8] text-zinc-900 antialiased">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,156,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(236,155,121,0.08),transparent_20%)]" />
      <div className="pointer-events-none fixed inset-0 grain opacity-50" />

      <CustomCursor />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
        <div
          className={[
            "mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-4 py-5 transition-all duration-300 md:px-6",
            isScrolled
              ? "border-white/50 bg-white/30 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          ].join(" ")}
        >
          <Link href="/" className="inline-flex items-center text-[0.78rem] font-medium uppercase tracking-[0.28em] text-zinc-800">
            sleepyeyesretro
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[0.62rem] uppercase tracking-[0.28em] text-zinc-700 transition-colors hover:text-zinc-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <span className="inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.22em] text-zinc-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(34,197,94,0.9)]" /> Available for projects
            </span>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-900/10 bg-white/70 p-0 text-zinc-900 shadow-sm md:hidden"
            onClick={() => setMenuOpen((state) => !state)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#f3efe8] px-6 py-24 md:hidden"
          >
            <div className="flex flex-col gap-4 pt-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-zinc-900/10 pb-4 text-2xl font-medium tracking-[-0.06em]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="relative z-10 mx-auto max-w-[1400px] px-4 pb-10 pt-20 md:px-8">
        <div className="flex flex-col gap-6 border-t border-zinc-900/10 pt-6 text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-zinc-900">sleepyeyesretro</span>
            <span>•</span>
            <span>Based in Lagos</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="mailto:aleeyu011@gmail.com" className="inline-flex items-center gap-2 hover:text-zinc-900">
              aleeyu011@gmail.com
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <a href="https://github.com/Retro-xd" target="_blank" rel="noreferrer" className="hover:text-zinc-900">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/aliyu-abubakar-094081191/" target="_blank" rel="noreferrer" className="hover:text-zinc-900">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
