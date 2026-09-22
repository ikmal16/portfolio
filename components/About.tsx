"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  ArrowUpRight,
  Code2,
  Layers,
  Sparkles,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Animated stats — count up when scrolled into view
// ─────────────────────────────────────────────────────────────
const stats = [
  {
    icon: GraduationCap,
    value: 1,
    suffix: "",
    label: "Degree Earned",
    sublabel: "B.Sc. Software Engineering",
    accent: "sky",
  },
  {
    icon: Layers,
    value: 7,
    suffix: "+",
    label: "Projects Built",
    sublabel: "Full-stack & desktop",
    accent: "violet",
  },
  {
    icon: Code2,
    value: 15,
    suffix: "+",
    label: "Technologies Used",
    sublabel: "Across the stack",
    accent: "emerald",
  },
  {
    icon: Briefcase,
    value: 6,
    suffix: " mo",
    label: "Internship",
    sublabel: "INTEMATICS Sdn Bhd",
    accent: "amber",
  },
];

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Bachelor of Software Engineering, Universiti Sains Malaysia",
  },
  {
    icon: Briefcase,
    title: "Experience",
    description: "6-month IT internship at INTEMATICS SDN BHD",
  },
  {
    icon: MapPin,
    title: "Based in",
    description: "Kuala Lumpur, Malaysia",
  },
];

const ACCENTS = {
  sky: {
    text: "text-sky-400",
    border: "hover:border-sky-400/40",
    glow: "from-sky-500/20 via-sky-500/5 to-transparent",
    iconBg: "group-hover:bg-sky-400/10 group-hover:border-sky-400/30",
  },
  violet: {
    text: "text-violet-400",
    border: "hover:border-violet-400/40",
    glow: "from-violet-500/20 via-violet-500/5 to-transparent",
    iconBg: "group-hover:bg-violet-400/10 group-hover:border-violet-400/30",
  },
  emerald: {
    text: "text-emerald-400",
    border: "hover:border-emerald-400/40",
    glow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    iconBg: "group-hover:bg-emerald-400/10 group-hover:border-emerald-400/30",
  },
  amber: {
    text: "text-amber-400",
    border: "hover:border-amber-400/40",
    glow: "from-amber-500/20 via-amber-500/5 to-transparent",
    iconBg: "group-hover:bg-amber-400/10 group-hover:border-amber-400/30",
  },
};

// ─────────────────────────────────────────────────────────────
// Count-up number that animates when in view
// ─────────────────────────────────────────────────────────────
function CountUp({ value, suffix = "", duration = 1.4, reduceMotion }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      if (reduceMotion) setDisplay(value);
      return;
    }

    let start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────────────────────
function StatCard({ stat, index, reduceMotion }) {
  const accent = ACCENTS[stat.accent] || ACCENTS.sky;
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? {} : { y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm transition-all duration-500 ${accent.border}`}
    >
      {/* Cursor glow */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent.glow}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-all duration-500 ${accent.iconBg}`}
          >
            <Icon
              size={17}
              strokeWidth={1.75}
              className={`text-gray-500 transition-all duration-500 group-hover:scale-110 ${accent.text}`}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <CountUp
              value={stat.value}
              suffix={stat.suffix}
              reduceMotion={reduceMotion}
            />
          </div>
          <div className="mt-1.5 text-sm font-medium text-gray-300">
            {stat.label}
          </div>
          <div className="mt-0.5 text-xs text-gray-500">{stat.sublabel}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Highlight row
// ─────────────────────────────────────────────────────────────
function HighlightRow({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.35 + index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex items-start gap-5 border-b border-white/10 py-6 first:pt-0 last:border-b-0"
    >
      <div className="mt-0.5 rounded-lg border border-white/10 bg-white/[0.03] p-2 transition-colors duration-300 group-hover:border-sky-400/30 group-hover:bg-sky-400/[0.06]">
        <Icon
          size={16}
          strokeWidth={1.75}
          className="text-gray-500 transition-colors duration-300 group-hover:text-sky-400"
        />
      </div>
      <div>
        <h3 className="font-medium text-white">{item.title}</h3>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────
export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gray-950 py-24 sm:py-32"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-sky-500/[0.05] blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-xl sm:mb-20"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            A little about me.
          </h2>
          <div className="mt-5 h-px w-16 bg-gradient-to-r from-sky-400/80 to-transparent" />
        </motion.div>

        {/* Main content */}
        <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          {/* About text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg leading-8 text-gray-200"
            >
              I&apos;m a Software Engineering graduate from Universiti Sains
              Malaysia with a passion for building software that solves
              practical problems.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 leading-7 text-gray-400"
            >
              Throughout my studies, I developed experience in web development,
              software engineering, databases, and API integration. I enjoy
              turning ideas into functional applications while continuously
              learning new technologies and improving my development skills.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 leading-7 text-gray-400"
            >
              During my six-month internship at INTEMATICS SDN BHD, I gained
              hands-on experience in frontend development, backend API
              integration, data management, and software research.
            </motion.p>

            {/* Resume button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
              >
                {/* Shine sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Sparkles size={15} className="text-sky-400" />
                View My Resume
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* Highlights */}
          <div className="flex flex-col">
            <div className="border-t border-white/10">
              {highlights.map((item, i) => (
                <HighlightRow key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ─── Stats strip ─────────────────────────────── */}
        <div className="mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              By the numbers
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-white/10 via-white/5 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
