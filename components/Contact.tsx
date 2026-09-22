"use client";

import { useState, type ComponentType, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight, Copy, Check, Sparkles } from "lucide-react";
import GithubIcon from "./icon/GithubIcon";
import LinkedInIcon from "./icon/LinkedInIcon";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type AccentKey = "sky" | "blue" | "violet";

type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type ContactLinkItem = {
  name: string;
  value: string;
  href: string;
  icon: IconComponent;
  accent: AccentKey;
  copyable: boolean;
};

type AccentStyles = {
  text: string;
  hoverBorder: string;
  hoverBg: string;
  glow: string;
  iconBg: string;
};

// ─────────────────────────────────────────────────────────────
// Contact data
// ─────────────────────────────────────────────────────────────
const contactLinks: ContactLinkItem[] = [
  {
    name: "Email",
    value: "ikmaldanielazmi@gmail.com",
    href: "mailto:ikmaldanielazmi@gmail.com",
    icon: Mail,
    accent: "sky",
    copyable: true,
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/ikmal-daniel-azmi",
    href: "https://www.linkedin.com/in/ikmal-daniel-azmi",
    icon: LinkedInIcon,
    accent: "blue",
    copyable: false,
  },
  {
    name: "GitHub",
    value: "github.com/yourusername",
    href: "https://github.com/",
    icon: GithubIcon,
    accent: "violet",
    copyable: false,
  },
];

const ACCENTS: Record<AccentKey, AccentStyles> = {
  sky: {
    text: "text-sky-400",
    hoverBorder: "hover:border-sky-400/40",
    hoverBg: "hover:bg-sky-400/4",
    glow: "shadow-[0_0_40px_-10px_rgba(56,189,248,0.4)]",
    iconBg: "group-hover:bg-sky-400/10 group-hover:border-sky-400/30",
  },
  blue: {
    text: "text-blue-400",
    hoverBorder: "hover:border-blue-400/40",
    hoverBg: "hover:bg-blue-400/4",
    glow: "shadow-[0_0_40px_-10px_rgba(96,165,250,0.4)]",
    iconBg: "group-hover:bg-blue-400/10 group-hover:border-blue-400/30",
  },
  violet: {
    text: "text-violet-400",
    hoverBorder: "hover:border-violet-400/40",
    hoverBg: "hover:bg-violet-400/4",
    glow: "shadow-[0_0_40px_-10px_rgba(167,139,250,0.4)]",
    iconBg: "group-hover:bg-violet-400/10 group-hover:border-violet-400/30",
  },
};

// ─────────────────────────────────────────────────────────────
// Animated background: orbs + grid
// ─────────────────────────────────────────────────────────────
type AnimatedBackgroundProps = {
  reduceMotion: boolean;
};

function AnimatedBackground({ reduceMotion }: AnimatedBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Drifting orbs */}
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 60, -40, 0],
                y: [0, -40, 30, 0],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/4 top-1/4 h-105 w-105 rounded-full bg-sky-500/7 blur-[120px]"
      />
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, -50, 40, 0],
                y: [0, 50, -30, 0],
              }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-1/4 top-1/3 h-95 w-95 rounded-full bg-violet-500/7 blur-[120px]"
      />
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 30, -50, 0],
                y: [0, 30, -40, 0],
              }
        }
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 h-90 w-90 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]"
      />

      {/* Top gradient edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Availability status pill
// ─────────────────────────────────────────────────────────────
type AvailabilityPillProps = {
  reduceMotion: boolean;
};

function AvailabilityPill({ reduceMotion }: AvailabilityPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/6 px-3 py-1.5 text-xs font-medium text-emerald-300"
    >
      <span className="relative flex h-2 w-2">
        {!reduceMotion && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Available for opportunities
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Contact link card with copy support
// ─────────────────────────────────────────────────────────────
type ContactLinkProps = {
  link: ContactLinkItem;
  index: number;
};

function ContactLink({ link, index }: ContactLinkProps) {
  const [copied, setCopied] = useState(false);
  const accent = ACCENTS[link.accent] ?? ACCENTS.sky;
  const Icon = link.icon;

  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(link.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Silently fail — most browsers support clipboard now
    }
  };

  return (
    <motion.a
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.35 + index * 0.1,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3 }}
      href={link.href}
      target={link.name === "Email" ? undefined : "_blank"}
      rel={link.name === "Email" ? undefined : "noopener noreferrer"}
      className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm transition-all duration-500 ${accent.hoverBorder} ${accent.hoverBg}`}
    >
      {/* Hover glow */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent.glow}`}
      />

      <div className="relative flex min-w-0 items-center gap-4">
        {/* Icon container */}
        <div
          className={`shrink-0 rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-500 ${accent.iconBg}`}
        >
          <Icon
            size={20}
            className={`text-gray-400 transition-all duration-500 group-hover:scale-110 ${accent.text}`}
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-white">{link.name}</p>
          <p className="mt-1 truncate text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
            {link.value}
          </p>
        </div>
      </div>

      {/* Right side: copy button (email only) + arrow */}
      <div className="relative flex shrink-0 items-center gap-2">
        {link.copyable && (
          <button
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy email"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/2 text-gray-500 opacity-0 transition-all duration-300 hover:border-white/25 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
          >
            {copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        )}

        <ArrowUpRight
          size={18}
          className={`text-gray-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${accent.text}`}
        />
      </div>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────
export default function Contact() {
  const reduceMotion = useReducedMotion() ?? false;
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gray-950 py-28 sm:py-36"
    >
      <AnimatedBackground reduceMotion={reduceMotion} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* ─── Left side: CTA ─────────────────────────── */}
          <div>
            <AvailabilityPill reduceMotion={reduceMotion} />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-gray-500"
            >
              Contact
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Let&apos;s build
              <br />
              <span className="bg-linear-to-r from-white via-sky-200 to-violet-300 bg-clip-text text-transparent">
                something great
              </span>
              <br />
              together.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 max-w-xl text-lg leading-8 text-gray-400"
            >
              I&apos;m currently open to opportunities where I can contribute,
              learn, and grow as a software engineer. Whether it&apos;s a
              full-time role, freelance project, or just a chat about code — my
              inbox is always open.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {/* Primary CTA */}
              <a
                href="mailto:ikmaldanielazmi@gmail.com"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)]"
              >
                {/* Shine sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Sparkles size={16} />
                Get in touch
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              {/* Secondary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/2 px-6 py-3 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                View my work
              </a>
            </motion.div>
          </div>

          {/* ─── Right side: Contact links ───────────────── */}
          <div className="space-y-4">
            {contactLinks.map((link, index) => (
              <ContactLink key={link.name} link={link} index={index} />
            ))}
          </div>
        </div>

        {/* ─── Footer ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-28 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col gap-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear} Ikmal. All rights reserved.</p>

            <div className="flex items-center gap-4">
              <p>Built with Next.js &amp; TypeScript.</p>
              <a
                href="#top"
                className="inline-flex items-center gap-1 text-gray-500 transition hover:text-white"
              >
                Back to top
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
