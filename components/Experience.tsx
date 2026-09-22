"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  Code2,
  Server,
  Database,
  GitBranch,
  Bug,
  FolderTree,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Experience data
// ─────────────────────────────────────────────────────────────
const experiences = [
  {
    role: "Information Technology Intern",
    company: "INTEMATICS SDN BHD",
    location: "Bayan Lepas, Penang",
    period: "March 2025 – August 2025",
    duration: "6 months",
    description:
      "Completed a six-month internship gaining hands-on experience in frontend development, backend API integration, data management, and software research.",
    highlights: [
      { label: "Frontend Development", icon: Code2 },
      { label: "API Integration", icon: Server },
      { label: "Database Research", icon: Database },
      { label: "Debugging", icon: Bug },
      { label: "Data Management", icon: FolderTree },
      { label: "Version Control", icon: GitBranch },
    ],
    responsibilities: [
      "Developed frontend features for a Virtual Assistant project using React.js.",
      "Assisted with backend API integration using FastAPI.",
      "Researched and explored database technologies including MongoDB and PostgreSQL.",
      "Performed daily data entry and data management tasks while maintaining data accuracy.",
      "Used Git and GitHub for source code management and collaboration.",
    ],
    technologies: [
      "React.js",
      "FastAPI",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "GitHub",
    ],
    stats: [
      { label: "Duration", value: "6 months" },
      { label: "Technologies", value: "6+" },
      { label: "Focus", value: "Full-Stack" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Reusable: animated badge
// ─────────────────────────────────────────────────────────────
function TechBadge({ label, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.4 + index * 0.06,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2, scale: 1.05 }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 transition-colors duration-300 hover:border-sky-400/40 hover:bg-sky-400/5 hover:text-sky-300"
    >
      {label}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable: animated highlight pill
// ─────────────────────────────────────────────────────────────
function HighlightPill({ label, Icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 transition-colors duration-300 hover:border-sky-400/30 hover:bg-sky-400/[0.04]"
    >
      <Icon
        size={15}
        strokeWidth={1.75}
        className="text-gray-500 transition-colors duration-300 group-hover:text-sky-400"
      />
      <span className="text-xs font-medium text-gray-400 transition-colors duration-300 group-hover:text-gray-200">
        {label}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable: animated responsibility item
// ─────────────────────────────────────────────────────────────
function ResponsibilityItem({ text, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.5 + index * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex gap-3 text-sm leading-6 text-gray-400 transition-colors duration-300 hover:text-gray-200"
    >
      <CheckCircle2
        size={16}
        strokeWidth={2}
        className="mt-0.5 shrink-0 text-sky-400/60 transition-colors duration-300 group-hover:text-sky-400"
      />
      <span>{text}</span>
    </motion.li>
  );
}

// ─────────────────────────────────────────────────────────────
// Experience card — animated as it scrolls into view
// ─────────────────────────────────────────────────────────────
function ExperienceCard({ experience, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative md:pl-20">
      {/* Timeline node — pulses when active */}
      <div className="absolute left-0 top-0 hidden md:block">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/40 bg-gray-950 text-sky-400"
        >
          <Briefcase size={18} strokeWidth={1.75} />

          {/* Outer pulse ring */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={
              isInView
                ? { scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }
                : { scale: 0.8, opacity: 0 }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border border-sky-400/40"
          />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          delay: index * 0.12,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-950 p-6 transition-colors duration-500 hover:border-white/20 md:p-8"
      >
        {/* Cursor-following subtle glow (top accent) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.15 + index * 0.12, duration: 0.5 }}
              className="text-2xl font-semibold text-white"
            >
              {experience.role}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
              className="mt-2 text-lg text-gray-400"
            >
              {experience.company}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.25 + index * 0.12, duration: 0.5 }}
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-500"
            >
              <MapPin size={13} />
              {experience.location}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm text-gray-400"
          >
            <CalendarDays size={14} className="text-sky-400" />
            {experience.period}
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.35 + index * 0.12, duration: 0.5 }}
          className="mt-8 max-w-3xl leading-7 text-gray-400"
        >
          {experience.description}
        </motion.p>

        {/* Highlight pills */}
        <div className="mt-8">
          <h4 className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            <Sparkles size={13} className="text-sky-400" />
            Focus Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.highlights.map((h, i) => (
              <HighlightPill
                key={h.label}
                label={h.label}
                Icon={h.icon}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mt-8">
          <h4 className="text-sm font-medium text-white">Key contributions</h4>
          <ul className="mt-4 space-y-3">
            {experience.responsibilities.map((responsibility, i) => (
              <ResponsibilityItem
                key={responsibility}
                text={responsibility}
                index={i}
              />
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mt-8">
          <h4 className="mb-4 text-sm font-medium text-white">
            Technologies used
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((technology, i) => (
              <TechBadge key={technology} label={technology} index={i} />
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
          {experience.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              className="text-center md:text-left"
            >
              <div className="text-lg font-semibold text-white">
                {stat.value}
              </div>
              <div className="mt-0.5 text-xs uppercase tracking-wider text-gray-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────
export default function Experience() {
  const timelineRef = useRef(null);
  const [lineDrawn, setLineDrawn] = useState(false);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineDrawn(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl sm:mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Where I&apos;ve worked.
          </h2>
          <p className="mt-5 leading-7 text-gray-400">
            My professional experience and the skills I developed along the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical animated line */}
          <div
            className="absolute left-5 top-0 hidden w-px bg-gradient-to-b from-sky-400/70 via-white/20 to-white/5 transition-[height] duration-[1600ms] ease-out md:block"
            style={{ height: lineDrawn ? "100%" : "0%" }}
          />

          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`${experience.company}-${experience.role}`}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
