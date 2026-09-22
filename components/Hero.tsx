"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from "react";
import { Mail, Download } from "lucide-react";
import GithubIcon from "./icon/GithubIcon";
import LinkedInIcon from "./icon/LinkedInIcon";

const skills = ["React.js", "Next.js", "TypeScript", "FastAPI", "Supabase"];

const roles = ["Software Engineer", "Frontend Developer", "Full-Stack Builder"];

const socials = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/yourusername",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
  },
  { icon: Mail, label: "Email", href: "mailto:ikmaldanielazmi@gmail.com" },
];

// ─────────────────────────────────────────────────────────────
// Reveal — typed props
// ─────────────────────────────────────────────────────────────
type RevealProps = {
  show: boolean;
  index: number;
  className?: string;
  children: ReactNode;
  as?: ElementType;
};

function Reveal({
  show,
  index,
  className = "",
  children,
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(14px)",
        transitionDelay: `${index * 110}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useRef(false);

  // Trigger entrance animation on mount
  useEffect(() => {
    reducedMotion.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Cycle the role text
  useEffect(() => {
    if (reducedMotion.current) return;
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setRoleVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Mouse-follow glow (desktop only, skipped for reduced-motion users)
  useEffect(() => {
    if (reducedMotion.current) return;
    const el = sectionRef.current;
    if (!el) return;

    let raf: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        raf = null;
      });
    };

    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  // Subtle parallax on scroll
  useEffect(() => {
    if (reducedMotion.current) return;
    let raf: number | null = null;
    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        setParallaxY(window.scrollY * 0.15);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Local keyframes */}
      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-16px, 22px); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(14px, -18px); }
        }
        @keyframes name-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <div className="absolute -top-24 right-[-10%] h-112 w-md animate-[float-a_12s_ease-in-out_infinite] rounded-full bg-sky-500/10 blur-[100px] motion-reduce:animate-none" />
        <div className="absolute bottom-[-15%] left-[-5%] h-72 w-72 animate-[float-b_14s_ease-in-out_infinite] rounded-full bg-white/4 blur-[100px] motion-reduce:animate-none" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          }}
        />

        {/* Mouse-follow glow */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 motion-reduce:hidden sm:opacity-100"
          style={{
            background: `radial-gradient(500px circle at ${mouse.x}% ${mouse.y}%, rgba(56,189,248,0.06), transparent 65%)`,
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-24">
        <div className="max-w-4xl">
          {/* Status + role */}
          <Reveal
            show={mounted}
            index={0}
            className="mb-7 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-sm font-medium text-gray-400">
              Open to opportunities
              <span className="mx-2 text-gray-700">/</span>
              <span
                className="inline-block text-gray-500 transition-all duration-300"
                style={{
                  opacity: roleVisible ? 1 : 0,
                  transform: roleVisible ? "translateY(0)" : "translateY(4px)",
                }}
              >
                {roles[roleIndex]}
              </span>
            </p>
          </Reveal>

          {/* Main heading */}
          <Reveal
            show={mounted}
            index={1}
            as="h1"
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="bg-size-[200%_auto] bg-linear-to-r from-sky-200 via-white to-sky-400 bg-clip-text text-transparent animate-[name-shimmer_6s_linear_infinite] motion-reduce:animate-none">
              Ikmal.
            </span>
          </Reveal>

          <Reveal
            show={mounted}
            index={2}
            as="h2"
            className="mt-4 text-3xl font-semibold tracking-tight text-gray-300 sm:text-4xl md:text-5xl"
          >
            Transforming Challenge Into Digital Solutions
          </Reveal>

          {/* Description */}
          <Reveal
            show={mounted}
            index={3}
            as="p"
            className="mt-8 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg"
          >
            A Software Engineering graduate from Universiti Sains Malaysia,
            passionate about building practical and user-focused web
            applications.
          </Reveal>

          {/* Buttons + socials */}
          <Reveal
            show={mounted}
            index={4}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10">View My Projects</span>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
            >
              Contact Me
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
            >
              Download Resume
              <Download
                size={15}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>

            <div className="ml-1 flex items-center gap-1 pl-3 sm:border-l sm:border-white/10">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full p-2.5 text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Technologies */}
          <Reveal show={mounted} index={5} className="mt-16">
            <p className="mb-4 text-sm text-gray-600">Stack I work with</p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-400 transition-colors duration-200 hover:border-white/20 hover:text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-600 transition-colors duration-200 hover:text-gray-400 sm:flex"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 700ms ease-out 900ms",
        }}
      >
        <span className="text-xs">Scroll</span>
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border border-gray-700 p-1">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-gray-500" />
        </span>
      </a>
    </section>
  );
}
