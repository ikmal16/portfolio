"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type ElementType,
  type MouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Mail, Download, ArrowRight, Sparkles, Code2 } from "lucide-react";
import GithubIcon from "./icon/GithubIcon";
import LinkedInIcon from "./icon/LinkedInIcon";

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────
const PROFILE_IMAGE = "/p33.jpg";

const roles = ["Software Engineer", "Frontend Developer", "Full-Stack Builder"];

const socials = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/ikmal16",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ikmal-daniel-azmi",
  },
  { icon: Mail, label: "Email", href: "mailto:ikmaldanielazmi@gmail.com" },
];

// Deterministic float durations per badge — no Math.random in render.
// Values chosen to feel organic but stay idempotent across re-renders.
const orbitBadges = [
  {
    label: "",
    className: "left-[-8%] top-[18%]",
    delay: 0.9,
    floatDuration: 4.6,
  },
  {
    label: "",
    className: "right-[-6%] top-[30%]",
    delay: 1.05,
    floatDuration: 5.4,
  },
  {
    label: "",
    className: "left-[2%] bottom-[16%]",
    delay: 1.2,
    floatDuration: 4.9,
  },
  {
    label: "",
    className: "right-[4%] bottom-[8%]",
    delay: 1.35,
    floatDuration: 5.8,
  },
];

// ─────────────────────────────────────────────────────────────
// Reveal helper
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

// ─────────────────────────────────────────────────────────────
// Profile card
// ─────────────────────────────────────────────────────────────
type ProfileCardProps = {
  reduceMotion: boolean;
  mounted: boolean;
};

function ProfileCard({ reduceMotion, mounted }: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const sx = useSpring(px, { stiffness: 150, damping: 20 });
  const sy = useSpring(py, { stiffness: 150, damping: 20 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      px.set(nx);
      py.set(ny);

      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    [px, py, reduceMotion],
  );

  const handleLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={
        mounted
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.92, y: 20 }
      }
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group/profile relative mx-auto aspect-square w-full max-w-105 sm:max-w-115"
    >
      {/* Soft animated glow */}
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? {}
            : {
                scale: [1, 1.06, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-linear-to-tr from-sky-500/30 via-violet-500/20 to-emerald-500/20 blur-3xl"
      />

      {/* Rotating dashed ring */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-[-6%] rounded-full border border-dashed border-white/10"
        />
      )}

      {/* Static inner ring */}
      <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />

      {/* Cursor-following glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover/profile:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.12), transparent 55%)",
        }}
      />

      {/* Profile image */}
      <div className="relative h-full w-full overflow-hidden rounded-full border border-white/15 bg-gray-950 shadow-2xl shadow-black/50">
        <div className="absolute inset-0 -z-10 flex items-center justify-center bg-linear-to-br from-sky-500/10 to-violet-500/10">
          <Code2 size={48} className="text-white/10" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROFILE_IMAGE}
          alt="Portrait of Ikmal Daniel Azmi, Software Engineer"
          draggable={false}
          loading="eager"
          decoding="async"
          className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover/profile:scale-[1.04]"
        />

        {/* Bottom gradient + name overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 p-6 text-center opacity-0 transition-all duration-500 group-hover/profile:translate-y-0 group-hover/profile:opacity-100">
          <p className="text-lg font-semibold text-white">Ikmal Daniel</p>
          <p className="mt-0.5 text-xs text-gray-300">Software Engineer</p>
        </div>
      </div>

      {/* Top pill: Available */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute left-1/2 top-[-6%] -translate-x-1/2"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-gray-950/90 px-3 py-1.5 text-xs font-medium text-emerald-300 shadow-lg shadow-black/40 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            {!reduceMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for opportunities
        </div>
      </motion.div>

      {/* Bottom pill: Role */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-gray-950/90 px-4 py-2 text-xs font-medium text-sky-300 shadow-lg shadow-black/40 backdrop-blur-sm">
          <Sparkles size={13} />
          Software Engineer
        </div>
      </motion.div>

      {/* Orbiting tech badges — deterministic float durations */}
      {orbitBadges.map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
          }
          transition={{ duration: 0.5, delay: badge.delay }}
          className={`absolute hidden ${badge.className} sm:block`}
        >
          <motion.div
            animate={reduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{
              duration: badge.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full border border-white/15 bg-gray-950/90 px-3 py-1.5 text-xs font-medium text-gray-300 shadow-lg shadow-black/40 backdrop-blur-sm"
          >
            {badge.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Decorative code chip */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-4 hidden h-10 w-10 rounded-lg border border-white/10 bg-gray-950/80 p-2 shadow-lg shadow-black/40 backdrop-blur-sm lg:block"
      >
        <div className="flex h-full flex-col justify-center gap-1">
          <span className="h-0.5 w-full rounded-full bg-sky-400/60" />
          <span className="h-0.5 w-3/4 rounded-full bg-violet-400/50" />
          <span className="h-0.5 w-1/2 rounded-full bg-emerald-400/50" />
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────────────────────
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const reduceMotion = prefersReduced ?? false;

  // Entrance animation
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Cycle role text
  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setRoleVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  // Subtle parallax on scroll
  useEffect(() => {
    if (reduceMotion) return;
    let raf: number | null = null;
    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        setParallaxY(window.scrollY * 0.12);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

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
        style={
          reduceMotion ? undefined : { transform: `translateY(${parallaxY}px)` }
        }
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
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-28 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* ─── LEFT: Introduction ─────────────────────── */}
          <div>
            <Reveal
              show={mounted}
              index={0}
              className="mb-7 flex flex-wrap items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <p className="text-sm font-medium text-gray-400">
                Hello, I&apos;m <span className="text-white">Ikmal Daniel</span>
                <span className="mx-2 text-gray-700">/</span>
                <span
                  className="inline-block text-gray-500 transition-all duration-300"
                  style={{
                    opacity: roleVisible ? 1 : 0,
                    transform: roleVisible
                      ? "translateY(0)"
                      : "translateY(4px)",
                  }}
                >
                  {roles[roleIndex]}
                </span>
              </p>
            </Reveal>

            <Reveal
              show={mounted}
              index={1}
              as="h1"
              className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="text-white">Transforming </span>
              <span className="bg-size-[200%_auto] bg-linear-to-r from-sky-200 via-white to-sky-400 bg-clip-text text-transparent animate-[name-shimmer_6s_linear_infinite] motion-reduce:animate-none">
                real-world problems
              </span>
              <span className="text-white"> into digital solutions.</span>
            </Reveal>

            <Reveal
              show={mounted}
              index={2}
              as="p"
              className="mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg"
            >
              A Software Engineering graduate from Universiti Sains Malaysia,
              passionate about building practical and user-focused web
              applications — from responsive frontends to reliable backend
              services.
            </Reveal>

            <Reveal
              show={mounted}
              index={3}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)] active:scale-[0.98]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative z-10">Explore My Work</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
              >
                Let&apos;s Connect
              </a>

              <a
                href="/Muhammad_Ikmal_Daniel_Resume. (2).pdf"
                download="Ikmal-Daniel-Resume.pdf"
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
                    className="rounded-full p-2.5 text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ─── RIGHT: Profile card ───────────────────── */}
          <div
            style={
              reduceMotion
                ? undefined
                : { transform: `translateY(${parallaxY * 0.3}px)` }
            }
          >
            <ProfileCard reduceMotion={reduceMotion} mounted={mounted} />
          </div>
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
